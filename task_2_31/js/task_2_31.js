/**
 * 初始化两个select 选项 并且添加响应事件
 */

window.onload = function (){
    var schools = {
        "北京" : ["北京大学","清华大学","中国人民大学","中央财经大学","中国政法大学"],
        "上海" : ["上海交通大学","复旦大学","同济大学"],
        "天津" : ["南开大学","天津大学"],
        "浙江" : ["浙江大学","杭州电子科技大学"],
        "辽宁" : ["大连理工大学","东北大学","大连财经大学"]
    }
    let schoolDiv    = document.getElementsByClassName("schoolDiv")[0];
    let schoolSelect = schoolDiv.getElementsByTagName("select");
    let radioBtns = document.getElementsByClassName("radioBtn")[0].getElementsByTagName("input");
    let detailsDiv = document.getElementsByClassName("details")[0].getElementsByTagName("div");
    for(let item in schools){
        schoolSelect[0].innerHTML += "<option>" + item + "</option>";
    }

    //添加事件
    Array.prototype.slice.call(radioBtns).forEach(function(radioItem){
        radioItem.addEventListener("click",function(event){
            let status = event.path[0].value;
            if(status == "off"){
                detailsDiv[0].style.display = "none";
                detailsDiv[1].style.display = "block";
            }
            else{
                detailsDiv[1].style.display = "none";
                detailsDiv[0].style.display = "block";
            }
        });
    });
    schoolSelect[0].addEventListener('change',function(event){
        let value = event.target.value.trim();
        let schoolIndex = findSchool(value);
        schoolSelect[1].innerHTML = "";
        schoolSelect[1].innerHTML += "<optgroup label = '"+ value + "'></optgroup>";
        for(let school in schools[value]){
            schoolSelect[1].innerHTML +=  "<option>"+schools[value][school] + "</option>";
        }
    });
    //根据地点改变学校项的内容
    function findSchool(value){
        let index = 0;
        for(let province in schools){
            if(province == value)
                return index;
            index++;
//                    for(let school in schools[province]){
//
//                    }
        }
    }
}
