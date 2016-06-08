/*数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var city = document.getElementById("city-select").value;
    var time = document.getElementById("form-gra-time").getElementsByTagName("input");
    Array.prototype.slice.call(time).forEach(function(e){
        if(e.checked){
            time = e.value;
        }
    });
    var data = chartData[city][time];
    var inner = "";
    for(item in data){
        inner += "<div class = '" + time + "' style = 'height : " + data[item] + "px; background-color : #" +(Math.random()+"").slice(2,8) +" ' title = '"+ item +" : " + data[item] + "' ></div>"
    }
    document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML = inner;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    if(pageState["nowGraTime"] != event.target.value){
        pageState["nowGraTime"] = event.target.value;
        renderChart();
        return true;
    }
    return false;
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
    // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
    if(pageState.nowSelectCity != event.target.value){
        pageState.nowSelectCity = event.target.value;
        renderChart();
        return true;
    }
    return false;

}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var eleInput = document.getElementById("form-gra-time").getElementsByTagName("input");
    Array.prototype.slice.call(eleInput).forEach(function(e){
        e.onclick = graTimeChange;
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var eleOpts = "";
    for(item in aqiSourceData){
        eleOpts += "<option>" + item  +"</option>";
    }
    document.getElementById("city-select").innerHTML = eleOpts;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    document.getElementById("city-select").onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    for(item in aqiSourceData){ //item 是 北京，上海等....
        chartData[item] = {};
        chartData[item].day = {};
        chartData[item].week = {};
        chartData[item].month = {};
        var cityLength = aqiSourceData.length;
        var dayLength = aqiSourceData[item].length;
        var weekSum = 0, monthSum = 0;
        var count = 1;
        for(it in aqiSourceData[item]){ //it 是 2016-01-01.....
            var data = aqiSourceData[item][it]
            chartData[item]["day"][it] = data;
            weekSum += data;
            monthSum+= data;
            if(!(count % 7)){
                chartData[item]["week"]["week" + count/7] = weekSum/7;
                weekSum = 0;
            }
            if(count == 32 || count == 61 || count == 91){
                chartData[item]["month"]["month" + Math.floor(count/30)] = monthSum/30;
                monthSum = 0;
            }
            count++;
        }
    }

}
/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();