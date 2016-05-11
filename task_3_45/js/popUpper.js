/**
 * function PopUpper 弹出窗口组件。
 * @url 表示弹出窗口所 显示的图片的url
 */
;(function(win,doc,undefined){
	"use strict";
    function PopUpper(url){
        this.url = url;
        this.pop = null;
        this.imgItem = null;
        this.init();
    }

    PopUpper.prototype = {
        init : function(){
            var popItem = doc.createElement("div");
            var popFn = null,keyFn = null;
            popItem.classList.add("pop-wrap");
			popItem.innerHTML =  '<div class = "pop-shadow"></div>' +
                              '<div class = "pop-body" ><img width = "100%"></div>';
            this.imgItem = popItem.querySelector("img");
            popItem.addEventListener('click',popFn = function(event){
                event.stopPropagation();
                if(event.target.className ==="pop-shadow"){
                    var target = event.target;
                    target.parentElement.removeEventListener('click',popFn);
                    doc.body.removeChild(target.parentElement);
                }
            });

            return (this.pop = popItem);
        },
        show : function(url){
            if(url){
                this.url = url;
            }
            this.imgItem.src = this.url;
            doc.body.appendChild(this.pop);

        }
    }
    win['PopUpper'] = PopUpper;
})(window,document)