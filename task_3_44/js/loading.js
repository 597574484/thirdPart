/**
 * function Loading 加载组件。
 * @wrap 组建放置的位置，默认在body中。
 * @scrollFn 当scroll滑到底部的时候触动的函数。
 */
;(function(win,doc,undefined){
    "use strict";
    function Loading(wrap,scrollFn){
        this.wrap = doc.querySelector("." + wrap)||doc.body;
        this.loading = false;
        this.loadingItem = null;
        this.scrollFn = scrollFn;
        this.init();
    }
    Loading.prototype = {
        init : function(){
            var ele = doc.createElement("div"),that = this;
            ele.classList.add("loading");
            ele.innerHTML = '<div class = "point point-left"></div><div class = "point point-middle"></div><div class = "point point-right"></div>';
            this.wrap.appendChild(ele);
            this.loadingItem = doc.querySelector(".loading");
            ele = null;
            if(this.scrollFn){
                win.addEventListener("scroll",function(event){
                    if(that.loading)
                        return;
                    var scrollTop = doc.documentElement.scrollTop  || doc.body.scrollTop;
                    if(scrollTop + win.innerHeight > doc.body.clientHeight){
                        that.toggle();
                        that.scrollFn(that);
                        setTimeout(that.toggle.bind(that),500);
                    }
                });
            }
        },
        toggle : function(toggleFn){
            this.loading = !this.loading;
            if(this.loading){
                this.loadingItem.style.display = "block";
            }
            else{
                this.loadingItem.style.display = "none";
            }
            if(toggleFn){
                toggleFn(this.loading);
                this.toggle();
            }
        }
    }
    win.Loading = Loading;
})(window,document);