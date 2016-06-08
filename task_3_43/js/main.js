;(function(win,doc,undefined){
	"use strict";
    function Tangram (element,width,height){//
        this.container = element;
        this.wrap = null;
        this.imgList = [];
        this.width  = width;
        this.height = height;
    }

    Tangram.prototype = {
        init : function(){
            this.container = doc.querySelector("." + this.container) || doc.body;
            this.wrap = doc.createElement("div");
            this.wrap.classList.add("imgFrame","imgFrame" + this.imgList.length);
            this.width = parseInt(this.width)||win.innerWidth;
            this.height = parseInt(this.height)||win.innerHeight;
            this.wrap.style.width  = this.width +"px";
            this.wrap.style.height = this.height + "px";

            this.imgList = this.imgList.map(function(item,index){
                var tempNode = doc.createElement("div");
                tempNode.classList.add("imgItem","imgItem" + (index + 1));
                tempNode.dataset.src  = item;
                tempNode.style.width  = this[index].width + "px";
                tempNode.style.height = this[index].height + "px";
                tempNode.dataset.index = index + 1;
                tempNode.style.backgroundImage = "url("+item+")";
                return tempNode;
            },this.computeSize(this.imgList.length));

            this.imgList.forEach(function(element){
                this.wrap.appendChild(element);
            },this);
        },
        append : function(src){
            this.imgList.push(src);
        },
        layout : function(){
            this.container.appendChild(this.wrap);
        },
        computeSize : function(count){
            var width = 0,height = 0;
            count = count || this.imgList.length;
            switch(count){
                case 1 :{
                    width  = this.width || "100%";
                    height = this.height || "100%";

                    return [{
                        width : width,
                        height : height
                    }];

                }break;
                case 2 :{
                    width  = this.width;
                    height = this.height ;

                    return [
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        }
                    ];
                }break;
                case 3 :{
                    width  = this.width / 4 || "25%";
                    height = this.height /2 || "50%";

                    return [
                        {
                            width : width * 3,
                            height : height *2
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        }
                    ];
                }break;
                case 4 : {
                    width = this.width/2 || "50%";
                    height = this.height/2 || "50%";

                    return [
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height:height
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        }
                    ];
                }break;
                case 5 :{
                    width = this.width / 3 ||"33.3333%";
                    height = this.height /3 || "33.3333%";

                    return [
                        {
                            width : width * 2,
                            height : height * 2
                        },
                        {
                            width : width,
                            height : width
                        },
                        {
                            width : width,
                            height : this.height - width
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        }
                    ];
                }break;
                case 6 : {
                    width = this.width / 3 || "33.3333%";
                    height = this.height / 3 || "33.3333%";

                    return [
                        {
                            width : width * 2,
                            height : height * 2
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        },
                        {
                            width : width,
                            height : height
                        }
                    ];
                }break;
                default : {return {}}
            }

        }
    }

    window.Tangram = Tangram;
})(window,document);