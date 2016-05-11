var queue ="";
function operate(event){
    var str = event.target.id;
    var txt = document.getElementById("in").value;
    var parent = document.getElementsByClassName("queue")[0];
    if(str == "LI"||str == "RI") {
        if (txt == "")
            return;
        txt = createNode(txt);
        if(str == "LI"){
            queue = txt + queue;

        }
        else if(str == "RI"){
            queue += txt;
        }
    }

    if(str == "LO"){
        if(queue == "")
            return alert("没元素了你还删呐！");
        var index = queue.indexOf("/") +5;
        queue = queue.slice(index);
    }
    else if(str == "RO"){
        if(queue == "")
            return alert("没元素了你还删呐！");
        var index = queue.lastIndexOf("/",queue.length - 6);
        queue = queue.slice(0,index + 5);
    }
    parent.innerHTML = queue;
}
function createNode(text){
    var txt = "<div class = 'node'>" + text +"</div>";
    return txt;
}