;(function(win,doc,undefined){
    "use strict";
    function WaterFall(wrap,columnsCount,padding){
        this.wrap = doc.querySelector("." + wrap);
        this.columnsCount = columnsCount || 5;
        this.padding = padding || 20;
        this.columns = null;
        this.imgItems = [];
        this.innerDiv = null;
        this.firstTimeInit = true;
        this.init();
    }
    WaterFall.prototype = {
        init : function(){
            var that = this,width,wrapWidth,html = "",mySpinner;
            if(this.firstTimeInit){
                this.wrap.classList.add("wrap");
                this.innerDiv= doc.createElement("div");
                this.innerDiv.classList.add("inner");
                this.wrap.appendChild(this.innerDiv);
                win.onresize = (function(){
                    var oldCol = that.columnsCount;
                    return function(event){
                        var width = parseInt(win.getComputedStyle(that.wrap,null)['width']),col = -1;
                        if(width < 510)
                            col = 1;
                        else if(width < 750)
                            col = 2;
                        else if(width < 1050)
                            col = 3;
                        else if(width < 1400)
                            col = 4;
                        else
                            col = 5;
                        if(col === oldCol){
                            return;
                        }
                        else{
                            oldCol = col;
                            that.columnsCount = col;
                            that.init();
                            that.imgItems.map(function(currValue){
                                this.getMinColumn().appendChild(currValue);
                            },that);
                        }

                    }
                })();
                if(win.PopUpper) {
                    this.wrap.addEventListener("click",function(event){
                        event.stopPropagation();
                        if (event.target.dataset.src) {
                            var pop = new PopUpper(event.target.dataset['src']);
                            pop.show();
                        }
                    });
                }
                if(win.Loading){
                    var create = function (){
                        var arr = [];
                        for(var i = 0; i < 10; i++){
                            arr.push( "image/"+ (Math.floor((Math.random()*10))%6+1) +".jpg");
                        }
                        this.append(arr);
                    }
                    var x = new Loading("s",create.bind(this));
                }
                this.firstTimeInit = false;
            }
            wrapWidth = parseInt(win.getComputedStyle(this.wrap,null)['width'])||win.innerWidth;
            width = (wrapWidth - (this.columnsCount - 1) * this.padding) / (this.columnsCount + 1) ;
            width = width >230 ?width : 230;
            for(var i = 0,len = this.columnsCount ; i < len; i++){
                html += "<div class = 'column "+ "column" + (i + 1)  + "' "
                    + "style = 'width : "+ width + "px;margin-right:" +that.padding+"px;"
                    + "'></div>";
            }
            this.innerDiv.innerHTML = html;
            this.columns = doc.querySelectorAll(".column");
        },
        append : (function(){
            var imgIndex = 1;
            return function (src){
                var imgItem = src.map(function(currValue){
                    var imgWrap,imgItem,imgDesp;
                    imgWrap = doc.createElement("div");
                    imgItem = doc.createElement("div");
                    imgDesp = doc.createElement("div");
                    imgWrap.classList.add("imgWrap","imgWrap" + imgIndex);
                    imgItem.classList.add("imgItem");
                    imgItem.dataset.src = currValue;
                    imgDesp.classList.add("description");
                    imgItem.style.backgroundImage = "url("+currValue+")";
                    imgItem.style.height = (Math.random() + 1) * 150 + "px";
                    imgDesp.innerHTML = currValue + "<br/>" + imgIndex++ ;
                    imgWrap.appendChild(imgItem);
                    imgWrap.appendChild(imgDesp);
                    return imgWrap;
                });
                Array.prototype.push.apply(this.imgItems,imgItem);
                if(imgItem.length < 100 ){
                    imgItem.map(function(currValue){
                        this.getMinColumn().appendChild(currValue);
                    },this);
                }
                else{
                    //优化 : 当大于5个时候可以新建五个碎片然后加到碎片上，然后一次性把5个碎片加到文档中
                }
            }
        })(),
        getMinColumn :function(){
            var colHeights = Array.prototype.slice.call(this.columns).map(function(item){
                return parseInt(window.getComputedStyle(item,null)['height']);
            });
            return this.columns[colHeights.indexOf(Math.min.apply(null,colHeights))];
        }
    }
    window['WaterFall'] = WaterFall;
})(window,document);
