/**
 * 整个表单所对应的行为以及验证方法。
 * @type {{名称: {default: string, failed: string, succeeded: string}, 密码: {default: string, failed: string, succeeded: string}, 确认密码: {default: string, failed: string, succeeded: string}, 邮箱: {default: string, failed: string, succeeded: string}, 手机: {default: string, failed: string, succeeded: string}, colorDefault: string, colorFailed: string, colorSucceeded: string, setDefaultTip: Function, setFailedTip: Function, setSucceededTip: Function}}
 */
var tipsMessage = {
    "名称" :{
        default : "必填，长度为4-16个字符<small>(汉字算两个字符)</small>",
        failed  : "长度为4-16个字符",
        succeeded : "格式正确"
    },
    "密码" :{
        default : "记得输入密码啊",
        failed  : "密码要在6位以上啊！！",
        succeeded : "格式正确"
    },
    "确认密码"  :{
        default : "这个据说要和上一项一样-_-",
        failed  : "这个密码有问题，你再好好看看！！",
        succeeded : "密码一致    "
    },
    "邮箱"  :{
        default : "邮箱格式一定要正确啊！！",
        failed  : "邮箱格式错了，错了，再好好看看！！",
        succeeded : "格式正确"
    },
    "手机"  :{
        default : "告诉我手机号，咱们面基！！！！",
        failed  : "你这是真的手机号？憋逗我",
        succeeded : "格式正确"
    },
    colorDefault   : "#a9a9a9",
    colorFailed    : "#ff0000",
    colorSucceeded : "#00ff00",
    setDefaultTip :function(tag,item,status){
        var color = this["colorDefault"];
        tag.style.borderColor = color
        tag.style.visibility = "visible";
        tag.style.color = color;
        tag.parentNode.getElementsByClassName("form-control")[0].style.borderColor = color;
        tag.innerHTML = this[item][status];
        return this[item][status];
    },
    setFailedTip :function(tag,item,status){
        var color = this["colorFailed"];
        tag.style.borderColor = color;
        tag.style.visibility = "visible";
        tag.style.color = color;
        tag.parentNode.getElementsByClassName("form-control")[0].style.borderColor = color;
        tag.innerHTML = this[item][status];
        return this[item][status];
    },
    setSucceededTip :function(tag,item,status){
        var color = this["colorSucceeded"];
        tag.style.borderColor = color;
        tag.style.visibility = "visible";
        tag.style.color = color;
        tag.parentNode.getElementsByClassName("form-control")[0].style.borderColor = color;
        tag.innerHTML = this[item][status];
        return this[item][status];
    }
}

/**
 * 初始化，并为每一个表单项添加事件
 */
window.onload = function(){
    var inputs = document.getElementsByTagName("input");
    //为每一个表单项添加响应函数
    Array.prototype.slice.call(inputs).forEach(function(e){
        e.addEventListener('focus',function(event){
            var tips = event.target.parentNode.getElementsByTagName("i")[0];
            var item = event.target.parentNode.parentNode.getElementsByClassName("inputLabel")[0];
            tipsMessage.setDefaultTip(tips,item.innerText.trim(),"default");
        });
        e.addEventListener('blur',function(event){
            confirms(event);
        });
    });
    //为button添加处理函数，其中调用confirmes函数
    document.getElementsByClassName("submitBtn")[0].addEventListener("click",function(event){
        var theForm = document.forms["search"];
        var successful = true;
        Array.prototype.slice.call(theForm).forEach(function(e){
            if(e.name != "" && e.style.borderColor != "rgb(0, 255, 0)"){
                successful = false;
                //e.value ="";
                return;
            }
        });
        if(successful){
            alert("提交成功");
        }
        else
            alert("提交失败");
    });

}


/**
 * 检测表单的每个数据项的正误
 * @param event 事件
 * @returns {boolean} 如果表单格式正确 则返回true 否则返回false
 */
function confirms(event){
    //获取当前input标签的node
    var inputItem = event.target;
    //input 节点的值
    var value = inputItem.value.trim();
    //下方的提示信息tips
    var tips = inputItem.parentNode.getElementsByClassName("tips")[0];
    //获取姓名 手机 邮箱 密码等label的标签
    var inputLabel = inputItem.parentNode.parentNode.getElementsByClassName("inputLabel")[0];
    //获取input中的值的字数
    var charCounts = value.length + getHanCounts(value);

    /**
     * confirm！！判断开始！！！！！
     */

    //为空时后
    if(value == ""){
        tips.innerHTML= inputLabel.innerText.trim() +"不能为空"
        tips.style.color = "#ff0000";
        inputItem.style.border  = "2px solid #ff0000";
        return false;
    }
    else{
        //字符在4个字符和30个字符之间
        if(charCounts < 4 || charCounts > 16){
            tips.innerHTML = inputLabel.innerText.trim()+"长度要在4到16个字符之间";//
            tips.style.color = "#ff0000";
            inputItem.style.border  = "2px solid #ff0000";
            return ;
        }
        else{

            if(inputItem.name == "name"){
                tipsMessage.setSucceededTip(tips,inputLabel.innerText.trim(),"succeeded");
            }
            else if(inputItem.name == "pwd"){
                tipsMessage.setSucceededTip(tips,inputLabel.innerText.trim(),"succeeded");
            }
            else if(inputItem.name == "pwdConfirm"){
                var pwdInputNode =  event.target.parentNode.parentNode.parentNode.pwd;
                if(pwdInputNode.value.trim() == ""){
                    tipsMessage.setFailedTip(tips,inputLabel.innerText.trim(),"failed");
                    tips.innerText = "不输入密码就添这个？！！！";
                    return ;
                }
                if(pwdInputNode.value.trim() != value){
                    tipsMessage.setFailedTip(tips,inputLabel.innerText.trim(),"failed");
                    return ;
                }
                else{
                    tipsMessage.setSucceededTip(tips,inputLabel.innerText.trim(),"succeeded");
                }
            }
            else if(inputItem.name == "email"){
                var emailFormit  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if(!emailFormit.test(value))
                    tipsMessage.setFailedTip(tips,inputLabel.innerText.trim(),"failed");
                else
                    tipsMessage.setSucceededTip(tips,inputLabel.innerText.trim(),"succeeded");
            }
            else if(inputItem.name == "phoneNumber"){
                var phoneNumberFormit = /^[1][358][0-9]{9}$/;
                if(!phoneNumberFormit.test(value))
                    tipsMessage.setFailedTip(tips,inputLabel.innerText.trim(),"failed");
                else
                    tipsMessage.setSucceededTip(tips,inputLabel.innerText.trim(),"succeeded");
            }
            else{
                alert("出bug了！！ 是input检查的地方");
            }
        }
    }
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