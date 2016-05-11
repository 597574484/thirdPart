
/**
 * onload 文档加载时启动，getFormNode负责主逻辑。
 * PS：  最大的两个耦合就素这两个 onload还有getFormNode 其他部分正常
 * 好喵的大的一坨耦合.
 */
window.onload = function(){
    let Items = ["input", "textarea", "button"];
    let ItemType = {input: ["text",  "password","email","number"]};
    let selectArray = document.getElementsByClassName("selectDiv")[0].getElementsByTagName("select");
    let radioINodes = document.getElementsByClassName("styleRadio");
    let radio = document.getElementsByClassName("styleRadio")[0];
    for (let item in Items) {
        selectArray[0].innerHTML += "<option class = 'parentOpt'>" + Items[item] + "</option>";
    }
    selectArray[0].addEventListener('change', function (event) {
        let value = event.target.value;
        let allInputs = document.getElementsByClassName("controler")[0].getElementsByTagName("input");
        selectArray[1].innerHTML = "";
        selectArray[1].style.display = "inline-block";
        for (let item in ItemType[value]) {
            selectArray[1].innerHTML += "<option class = 'parentOpt'>" + ItemType[value][item] + "</option>";
            ;
        }
        if (selectArray[1].selectedIndex == -1) {
            selectArray[1].style.display = "none";
        }
        Array.prototype.slice.call(allInputs).forEach(function(e){
            e.disabled = false;
        });
        if(value == "button" ||(value == "input" && selectArray[1].value == "radio")){
            Array.prototype.slice.call(allInputs).forEach(function(e){
                e.disabled = true;
            });
        }

    });
    selectArray[1].style.display = "none";
    document.getElementsByClassName("btnAdd")[0].addEventListener('click',function(event){
        getFormNode(event);

    });
    Array.prototype.slice.call(radioINodes).forEach(function (e) {
        e.addEventListener('change', styleChange);
    });
    dispatchMyEvent(selectArray[0],'HTMLevents','change');
    dispatchMyEvent(radio,"HTMLEvents","change");
}

/**
 * 点击提交按钮后的响应函数。获取下方的表单信息。
 * @param event  提交的事件
 * @returns {boolean}返回false  不提交。
 */
function getFormNode(event) {

    let tagInfo = getInfo(document.forms["controlForm"]);
    let container = document.getElementsByClassName("container")[0];
    let radio = document.getElementsByClassName("styleRadio")[0];
    let htmlFron = "<div class ='form-group' >" + createLabel(tagInfo.label,tagInfo.childType);
    let htmlEnd = "</div>";
    let htmlCont = createFormTag(tagInfo.type, tagInfo.childType);
    let html = htmlFron + htmlCont + htmlEnd;
    addIntoForm(container,html,radio);
    addEvent(container.lastChild.getElementsByClassName("input")[0],tagInfo);
    dispatchMyEvent(radio,"HTMLEvents","change");
    return false;
}
/**
 * 获取输入的新建节点的信息
 * @param cForm 输入表单的内容  返回生成的对象
 * @returns {{label: string, type: string, childType: string, rules: string, succeed: string, fail: string, validator: string, colorDefault: string, colorFailed: string, colorSucceeded: string, setRulesTip: Function, setFailTip: Function, setSucceedTip: Function}}
 */
function getInfo(cForm) {
    /**
     * 对象包括用于储存节点的信息 其实函数放在原型当中更好 包括处理事件以及相应的属性
     * @type {{label: string, type: string, childType: string, rules: string, succeed: string, fail: string, validator: string, colorDefault: string, colorFailed: string, colorSucceeded: string, setRulesTip: Function, setFailTip: Function, setSucceedTip: Function}}
     */
    let tagInfo = {
        label: "",
        type: "",
        childType: "",
        rules: "",
        succeed: "",
        fail: "",
        validator: "",
        colorDefault   : "#a9a9a9",
        colorFailed    : "#ff0000",
        colorSucceeded : "#00ff00",
        setRulesTip :function(tag){
            var color = this["colorDefault"];
            tag.style.borderColor = color
            tag.style.visibility = "visible";
            tag.style.color = color;
            tag.parentNode.getElementsByClassName("input")[0].style.borderColor = color;
            tag.innerHTML = this["rules"];
            return this["rules"];
        },
        setFailTip :function(tag){
            var color = this["colorFailed"];
            tag.style.borderColor = color;
            tag.style.visibility = "visible";
            tag.style.color = color;
            tag.parentNode.getElementsByClassName("input")[0].style.borderColor = color;
            tag.innerHTML = this["fail"];
            return this["fail"];
        },
        setSucceedTip :function(tag){
            var color = this["colorSucceeded"];
            tag.style.borderColor = color;
            tag.style.visibility = "visible";
            tag.style.color = color;
            tag.parentNode.getElementsByClassName("input")[0].style.borderColor = color;
            tag.innerHTML = this["succeed"];
            return this["succeed"];
        }
    };
    var count = 0;
    for (let item in tagInfo) {
        if (count > 5){
            if(tagInfo.type == "button"){
                tagInfo.label ="";
                document.getElementsByClassName("btnAdd")[0].disabled = true;
            }
            return tagInfo;
        }
        tagInfo[item] = cForm[item].value.trim();
        if (tagInfo[item] == "")
            tagInfo[item] = "姓名";
        count++;
    }

}
/**
 * 发送指定事件
 * @param node  事件的接收节点
 * @param eventType  事件的类型1    专指 是HTML节点事件类类型等
 * @param type  事件的类型2   指 click checked 等具体事件
 */
function dispatchMyEvent(node, eventType,type){
    let event = document.createEvent(eventType);
    event.initEvent(type,true,false);
    node.dispatchEvent(event);
}
/**
 * 创建表单中每一项的Label节点
 * @param value Label的value 内容
 * @param name  Label的name属性
 * @returns {*} 返回新建的字符串。
 */
function createLabel(value,name) {
    if(value == "")
        return "&nbsp&nbsp&nbsp&nbsp";
    return "<label class = 'inputLabel' name = '"+ name + "'>" + value + "</label>";
}
/**
 * 创建表单的input textarea button节点
 * @param type 表单类型 如 input buttton
 * @param childType   子类型 比如 input中的 text password等
 * @returns {string}  返回新建的字符串。
 */
function createFormTag(type, childType) {
    let htmlFro = "<" + type + " class = 'input' ";
    let htmlEnd = "</" + type + ">";
    if (type == "input")
        return htmlFro + "type = '" + childType + "' />" + "<i class = 'tips' name = 'tips'>&nbsp</i>";
    else if (type == "button")
        return htmlFro + "type ='" + "submit'>" + "提交" + htmlEnd;
    else
        return htmlFro + ">" + htmlEnd + "<i class = 'tips' name = 'tips'>&nbsp</i>";
}
/**
 * 把新加入的节点添加到container当中
 * @param container  存放所有表单节点的容器
 * @param html   新建表单Node的内容
 * @param radio  控制radio，使样式表的重置
 */
function addIntoForm(container,html,radio) {
    let div = document.createElement("div");
    div.innerHTML = html;
    container.appendChild(div);
    radio.checked = "checked";
}

/**..
 * radio的触发事件，修改样式
 * @param event  事件    这个存在耦合，待修复
 */
function styleChange(event) {
    let style = {
        inputLabel: {
            0: "display : inline-block;width : 8rem;height : 2.5rem;font-size : 2.5rem;line-height: 2.5rem;text-align: center;border: 0.1rem solid #a3a3a3;vertical-align: top;",
            1: "display: inline-block;flex: 0 1 8rem;font-size : 2.5rem;font-weight: bolder;line-height: 2.5rem;align-self: center;"
        },
        inputDiv: {
            0: "margin-top :.5rem;",
            1: "display : flex;flex-flow  : row nowrap;justify-content: space-around;height : 3rem;width : 40rem;text-align : center;margin-top : .5rem;"
        },
        inputNode: {
            0: "width : 30rem;font-size : 2.5rem;line-height: 2.4rem;border: 0.1rem solid #a3a3a3;background-color: #fffff0;align-self: center;",
            1: "display: inline-block;flex: 1 5 20rem;font-size : 1.5rem;line-height: 2.5rem; -webkit-border-radius: .4rem; -moz-border-radius: .4rem;border-radius: .4rem;border : .1rem solid #a9a9a9; -webkit-box-shadow: .2rem .2rem .2rem 0  #666666; -moz-box-shadow:    .2rem .2rem .2rem 0  #666666;box-shadow:  .2rem .2rem .2rem 0  #666666;"
        }
    }
    let index = event.target.value.trim();
    let inputLabels = document.getElementsByClassName("inputLabel");
    let inputDivs = document.getElementsByClassName("form-grounp");
    let inputNodes = document.getElementsByClassName("input");
    let inputTips     = document.getElementsByClassName("tips");
    Array.prototype.slice.call(inputLabels).forEach(function (e) {
        e.style = style["inputLabel"][index];
    });
    Array.prototype.slice.call(inputDivs).forEach(function (e) {
        e.style = style["inputDiv"][index];
    });
    Array.prototype.slice.call(inputNodes).forEach(function (e) {
        e.style = style["inputNode"][index];
    });
    Array.prototype.slice.call(inputTips).forEach(function (e) {
        e.style = "display: inline-block;flex: 1 1 10rem;font-size : 1.5rem;line-height: 2.5rem;font-style : normal;align-self: center;text-align :left;white-space: nowrap;";
    });
}
/**
 * 获取输入值，返回value的长度，汉字算两个字节
 * @param value待检测的value变量
 * @returns {*} 返回value的长度
 */
function getHanCounts(value){
    var v = value.match(/[\u4e00-\u9fa5]+/g);
    if(v == null)
        return 0;
    else{
        return v.join().length;
    }

}
/**
 * 为每次新加入的节点添加事件
 * @param input  节点Node本身
 * @param tipsMessage  输入的信息包括处理信息，节点的类型。
 */
function addEvent(input, tipsMessage){
    if(input.nodeName.toLowerCase() =="button"){
        input.addEventListener('click',function(event){
            let is = true;
            let inputNodes = document.getElementsByClassName("container")[0].getElementsByClassName("input");
            Array.prototype.slice.call(inputNodes).forEach(function(e){
                if(e.nodeName != "BUTTON"){
                    dispatchMyEvent(e,'HTMLEvents','blur');
                    if(e.style.borderColor == "rgb(255, 0, 0)"){
                        is = false;
                    }
                }

            });
            alert("提交" + (is?"成功":"失败"));
        });
        return;
    }
    input.addEventListener('blur',function(event){
        let inputItem = event.target;
        let value = inputItem.value.trim();
        //下方的提示信息tips
        let tips = inputItem.parentNode.getElementsByClassName("tips")[0];
        //获取input中的值的字数
        let charCounts = value.length + getHanCounts(value);
        if(tipsMessage.childType == "radio")
            return ;
        if(value == ""){
            tips.innerHTML=  "此项不能为空"
            tips.style.color = "#ff0000";
            inputItem.style.border  = "2px solid #ff0000";
            return false;
        }
        else{
            //字符在4个字符和30个字符之间
            if(charCounts < 4 || charCounts > 16){
                tips.innerHTML = "长度要在4到16个字符之间";//
                tips.style.color = "#ff0000";
                inputItem.style.border  = "2px solid #ff0000";
                return ;
            }
            else{

                if(inputItem.type == "text"){
                    tipsMessage.setSucceedTip(tips);
                }
                else if(inputItem.type == "password"){
                    tipsMessage.setSucceedTip(tips);
                }
                else if(inputItem.type == "email"){
                    let emailFormit  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    if(!emailFormit.test(value))
                        tipsMessage.setFailTip(tips);
                    else
                        tipsMessage.setSucceedTip(tips);
                }
                else if(inputItem.type == "number"){
                    var phoneNumberFormit = /^[1][358][0-9]{9}$/;
                    if(!phoneNumberFormit.test(value))
                        tipsMessage.setFailTip(tips);
                    else
                        tipsMessage.setSucceedTip(tips);
                }
                else{
                    alert("出bug了！！ 是input检查的地方");
                }
            }
        }
    });
    input.addEventListener('focus',function(event){
        if(event.target.nodeName.toLowerCase() == "button"||event.target.nodeName.toLowerCase() == "textarea")
            return ;
        let tips = event.target.parentNode.getElementsByClassName("tips")[0];
        tipsMessage.setRulesTip(tips);

    });
}