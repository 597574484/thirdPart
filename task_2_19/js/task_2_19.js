
var queue = [];
var count = 0;
function operate(event){
    var str = event.target.id;
    var value = document.getElementById("in").value.trim();
    value = parseInt(value);
    var parent = document.getElementsByClassName("queue")[0];

    if(str == "LI"||str == "RI") {
        if (value == ""||!(/\d+/.test(value) ) ){
            alert("输入数字!");
            return ;
        }
        if(value <10 ||value >= 100){
            alert("输入数字要在1-100之间!");
            return ;
        }

        if(count >60){
            alert("队列已达上限，最多存在60个数据!");
            return ;
        }
        if(str == "LI"){
            queue.unshift(value);

        }
        else if(str == "RI"){
            queue.push(value);
        }
        count++;
    }

    else if(str == "LO"){
        if(queue == "")
            return alert("没元素了你还删呐！");
        queue.shift();
        count--;
    }
    else{
        if(queue == "")
            return alert("没元素了你还删呐！");
        queue.pop();
        count--;
    }
    innerHTML();
}
function sortArr(event){
    queue.sort(function(a,b){return a-b;});
    innerHTML();
}
function randomArr(event){
    count = 0;
    queue.splice(0,queue.length - 1);
    for(var i = 0; i < 50; i++){
        queue.push(Math.floor(Math.random()*300));
        count++;
    }
    innerHTML();
}
function createNode(text){
    var txt = "<div class = 'node'  style = 'height:" +text+ "px'></div>";
    return txt;
}
function innerHTML(){
    var inner = "";
    for(let item in queue){
        inner +=createNode(queue[item]);
    }
    document.getElementsByClassName("queue")[0].innerHTML = inner;
}