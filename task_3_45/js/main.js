;(function(win,doc,undefined){
    "use strict";
    function Cask(wrapClassName){
        this.wrap = doc.querySelector("." + wrapClassName);
        this.imgItems = [];
        this.init();
    }
    Cask.prototype = {
        init : function(){
            this.wrap = this.wrap || doc.createElement("div");
            this.wrap.classList.add("container");
            if(win.PopUpper) {
                this.wrap.addEventListener("click",function(event){
                    event.stopPropagation();
                    if (event.target.nodeName.toLowerCase() === "img") {
                        var pop = new PopUpper(event.target.src);
                        pop.show();
                    }
                });
            }
            if(win.Loading){
                var create = function (){
                    var arr = [];
                    for(var i = 0; i < 10; i++){
                        arr.push( "image/"+ (Math.floor((Math.random()*10))%10+1) +".jpg");
                    }
                    this.append(arr);
                }
                var x = new Loading("s",create.bind(this));
            }
        },
        createElements : function (src){
            var imgWrap,img;
            var imgArr = src.map(function(value,index){
                imgWrap = doc.createElement("div");
                imgWrap.classList.add("imgItem");
                img = doc.createElement("img");
                img.src = value;
                imgWrap.appendChild(img);
                return {element : imgWrap,ratio : (img.naturalWidth||img.width)/(img.naturalHeight||img.height) || 1};
            },this);
            return imgArr;
			
        },
        append : function (src){
            var imgArr = this.createElements(src);
            Array.prototype.push.apply(this.imgItems,imgArr);
            this.insertIntoDoc();
        },
        insertIntoDoc : function(){
            var len = this.imgItems.length,
                minHeight = 200,
                width = this.wrap.clientWidth,
                minRatio = width / minHeight,
                currRatio = 0,
                items = this.imgItems.slice(0),
                rows = [],
                row = [];
            var docFrame = doc.createDocumentFragment();

            for(var i = 0,len = items.length; i < len; i++){
                currRatio += items[i].ratio;
                row.push(items[i].element);
                if(currRatio >= minRatio){
                    rows.push({row : row ,rowRatio : currRatio});
                    row = [];
                    currRatio = 0;
                }
            }
            this.imgItems = [];
            rows.map(function(row,index){
                var rowDiv = doc.createElement("div");
                var wid = width;
                rowDiv.classList.add("row");
                rowDiv.style.height = parseInt(wid/row.rowRatio) + "px";
                row.row.map(function(element,index){
                    this.appendChild(element);
                },rowDiv);
                docFrame.appendChild(rowDiv);
            },this);
            this.wrap.appendChild(docFrame);
        }
    }
    win['Cask'] = Cask;
})(window,document);