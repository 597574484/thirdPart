//不支持FF  FF中有毒 是事件的问题event
window.onload = function(event){

    //在这可以new n个对象 通过传参 绑定控制的元素
    var inp = new inputItem(document.getElementById("inputTags"),
        document.getElementsByClassName("tags")[0]);

    var text = new textareaItem(document.getElementById("textTags"),
        document.getElementsByClassName("interests")[0],
        document.getElementsByClassName("insureInterests")[0]);
}

/**
 *  Item inputItem和textareaItem的父类最原始的类
 *  参数operatedItem是被这个类控制的div
 *  参数container表示是新增元素所存放的父节点div
 *  数组que 表示被插入的数据的队列
 *  count表示此时数据的个数。  因为que有length 属性 所以可以不用这个变量
 */
function Item(operatedItem,container){
    this.que = new Array();
    this.count = 0;
    this.operatedItem = operatedItem;
    this.container = container;
}

/**
 * operate函数是绑定事件处理的函数，父类函数没有函数体表示空函数
 */
Item.prototype.operate = function(){}

/**
 * output函数 将数据队列que中的数据通过函数createNode转化成HTML中的节点
 * 然后直接添加到响应的div当中---> inputTags
 */

Item.prototype.output = function(){
    var inner = "";
    for(let item in this.que){
        inner +=this.createNode(this.que[item]);
    }
    this.container.innerHTML = inner;
}

/**
 * createNode函数 将每个传过来的que中的数据做成html的div元素并返回。
 * @param text  ：数据值
 * @returns {string}  返回节点的内容
 */

Item.prototype.createNode = function(text){
    var txt = "<div class = 'node'><button class = 'del' style = 'display : none'><small>删除这个元素</small></button>" +text+ "</div>";
    return txt;
}
/**
 * 鼠标离开tag上的时候触发的函数
 */
Item.prototype.theblur = function(event,that){
    event.stopPropagation();
    event.cancelBubble = true;
    let node = event.target.firstChild;
    if(node.nodeName == "BUTTON"){
        setTimeout(function(){node.style.display = "none";},500);
    }
}

/**
 * 鼠标悬停在tag 上时触发的函数
 */
Item.prototype.thefocus = function(event,that){
    event.stopPropagation();
    event.cancelBubble = true;
    let node = event.target.firstChild;
    if(node.nodeName == "BUTTON"){
        node.style.display = "inline-block";
        node.onclick = function(){
            that.que.splice(that.que.indexOf(event.target.innerText.slice(6)),1);
            that.container.removeChild(event.target);
            that.count--;
        }
    }
}

/**
 * 子类inputItem 继承自Item 与input[type = 'text']绑定
 * @param operatedItem 是operate的操作对象
 */
function inputItem(operatedItem,container){
    Item.call(this,operatedItem,container);

    //添加事件   oninput事件
    if(this.operatedItem.onpropertychange) //只有IE中当input中的数值改变时出发此事件
        this.operatedItem.onpropertychange = (function(that){
            return function (){
                return that.operate(event,that);
            }
        })(this);
    else
        this.operatedItem.oninput = (function(that){
            //大部分浏览器input中的数值改变时出发此事件
            return function (event){
                return that.operate(event,that);
            }
        })(this);

    //添加onfocus事件
    this.container.onmouseover = (function(that){
        return function (){
            return that.thefocus(event,that);
        }
    })(this);
    this.container.onmouseout = (function(that){ return function() { return that.theblur(event,that);}})(this);

}
inputItem.prototype = Object.create(Item.prototype);//原型复制
inputItem.prototype.constructor = inputItem;// 设置"constructor" 属性指向Student


/**
 * input的操作的函数，当数值改变的时候执行这个函数
 */
inputItem.prototype.operate = function(event,that){
    let value = event.target.value;
    if(/[\s,]+/.test(value[value.length - 1])){
        value = value.slice(0,value.length -1);
        if(value.trim() =="" || that.que.indexOf(value.trim())!= -1 ){
            event.target.value = "";
            return ;
        }

        event.target.value = "";
        if(that.count >= 10) {
            that.que.shift();
            that.count = 10;
            that.que.push(value.trim());
            that.output();
            return ;
        }
        that.que.push(value.trim());
        that.count++;
        that.output();
    }

}

function textareaItem(operatedItem,container,btn){
    Item.call(this,operatedItem,container);
    this.btn = btn;

    this.btn.onclick  = (function(that){
        return function(){
            return that.operate(event,that);
        }
    })(this);
}
textareaItem.prototype = Object.create(Item.prototype);
textareaItem.prototype.constructor = textareaItem;

textareaItem.prototype.operate = function(event,that){
    var value = that.operatedItem.value.trim().split(/[\s\.\'\;,，\r、\t]+/);
    for(let i in value){
        if(that.que.indexOf(value[i]) == -1){
            that.que.push(value[i]);
            if(that.que.length == 11)
                that.que.shift();
        }
    }

    that.output();
}
