var queue = [];
var count = 0;
function operate(event){
    var str = event.target.id;
    var value = document.getElementById("in").value;
    var parent = document.getElementsByClassName("queue")[0];
    value = value.split(/[\s\.\'\;,，\r、\t]+/);


    if(str == "LI"||str == "RI") {

        if(str == "LI"){
            for(var i =value.length-1; i > -1;i--){
                queue.unshift(value[i]);
                count++;
            }
        }
        else if(str == "RI"){
            value.forEach(function(e){
                queue.push(e);
                count++;
            });
        }
    }

    else if(str == "LO"){
        if(queue.empty)
            return alert("没元素了你还删呐！");
        queue.shift();
        count--;
    }
    else{
        if(queue.empty)
            return alert("没元素了你还删呐！");
        queue.pop();
        count--;
    }
    innerHTML();
}

function createNode(text){
    var txt = "<div class = 'node'>" +text+ "</div>";
    return txt;
}
function searching(){
    var queueDivs =document.getElementsByClassName("queue")[0].getElementsByTagName("div");
    for(var i = 0, len = queueDivs.length; i < len; i++ ){
        if(queueDivs[i].style.backgroundColor != "")
            queueDivs[i].style.backgroundColor = "#ff0000";
    }

    var value = document.getElementById("search").value.trim();
    if(value =="")
        return ;
    var count = [];//储存被找到的index
    queue.forEach(function(e,i){
        if(e.indexOf(value) != -1){
            count.push(i);
        }
    });
    if(count.length){
        var temp =  document.getElementsByClassName("queue")[0].getElementsByTagName("div");
        count.forEach(function(e){
            temp[e].style.backgroundColor = "#123456";
        });
    }
}
function innerHTML(){
    var inner = "";
    for(let item in queue){
        inner +=createNode(queue[item]);
    }
    document.getElementsByClassName("queue")[0].innerHTML = inner;
}