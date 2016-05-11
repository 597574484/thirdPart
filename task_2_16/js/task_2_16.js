/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var value = document.getElementById("aqi-value-input").value.trim();
    if(city=="" ||!/^([A-Za-z]|[\u4E00-\u9FA5])+$/.test(city)){
        alert("city");
        ;
    }
    if(value == ""||! /^\d+$/.test(value)){
        alert("zheng");
        return ;
    }
    aqiData[city] = value;
    init();
}
/**
 * 渲染aqi-table表格
 */
/*
 *创建tag标签，并插入value文本
 */
function createMetaData(tag,value){
    var temp = document.createElement(tag);
    temp.appendChild(document.createTextNode(value));
    return temp;
}
function renderAqiList() {
    var eleValue = [];
    var eleTable = document.getElementById("aqi-table");
    //获得所有的tr元素然后forEach
    Array.prototype.slice.call(document.getElementsByTagName("tr")).forEach(function(thisNode){
        thisNode.parentNode.removeChild(thisNode);
    });

    for(var item in aqiData){
        eleValue.push( [ createMetaData("td",item),
            createMetaData("td",aqiData[item]),
            createMetaData("button","删除")] );
    }
    var once = false;
    eleValue.forEach(function(e){
        if(!once) {
            var thead = createMetaData("tr");
            thead.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>";
            eleTable.appendChild(thead);
            once = !once;
        }
        var temp = createMetaData("tr","");
        temp.appendChild(e[0]);
        temp.appendChild(e[1]);
        temp.appendChild(e[2]);
        eleTable.appendChild(temp);
    });
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
// do sth.
    var cityName = city.getElementsByTagName("td")[0].innerText;
    delete aqiData[cityName];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click",addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click",function(event){
        if(event.target.nodeName.toLowerCase() == "button")
            delBtnHandle.call(null,event.target.parentNode);
    })

}
init();