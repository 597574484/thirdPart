/**
 * 当提交的时候验证表单信息
 * @param event  事件 submit 和click的处理对象
 * @returns {boolean}  如果表单格式正确返回true  否则返回false
 */
function confirms(event){
    event.preventDefault();
    var inputItem = event.target.form.name; //表单名字
    var value = inputItem.value.trim();//获取值
    var tips = event.target.form.getElementsByClassName("tips")[0];//获取提示的节点项
    var charCounts = value.length + getHanCounts(value); //判断字符数
    if(value == ""){
        tips.style.color = "#ff0000";
        tips.innerHTML= "姓名不能为空"
        inputItem.style.border  = "2px solid #ff0000";
        return false;
    }
    else{
        if( charCounts < 4 || charCounts > 16){
            tips.style.color = "#ff0000";
            tips.innerHTML= "长度4-6位字符"
            inputItem.style.border  = "2px solid #ff0000";
            return false;
        }
        else{
            tips.style.color = "#00ff00";
            inputItem.style.border  = "2px solid #00ff00";
            tips.innerHTML= "名称格式正确"
            return true;
        }
    }
}

function getHanCounts(value){
    var v = value.match(/[\u4e00-\u9fa5]+/g);
    if(v == null)
        return 0;
    else{
        return v.join().length;
    }

}