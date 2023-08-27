const svgns =  "http://www.w3.org/2000/svg";

var value_arr = [];
var group_arr = [];
var rect_arr = [];
var text_arr = [];
var indx_arr = [];

var group_x = 30;
var group_y = 240;
var group_gap =65;

var rect_ry = 10;
var rect_width = 60;
var rect_height = 60;
var rect_fill = "orange";

var text_x = 30;
var text_y = 35;

var indx_x = 30;
var indx_y = 80;

var ms = 500;

const speed = document.getElementById('speed-bar');
speed.oninput=function(event){
  ms =  1000 - event.target.value;
}


function wait() {
    return new Promise(resolve => {
        setTimeout(() => { resolve("") }, ms);
    })
}

function clear_canvas() {
    for(let i = value_arr.length - 1; i >= 0; i--) {
        document.getElementById("canvas").removeChild(group_arr[i]);
        value_arr.pop();
        group_arr.pop();
        rect_arr.pop();
        text_arr.pop();
        indx_arr.pop();
    }
}

function random_array() {
    for(let i = 0; i < 12; i++) {
        value_arr[i] = Math.floor(Math.random() * 100) + 1;
    }
    generate_array(value_arr);

}

function user_array() {
    var temp = (document.getElementById("user-arr").value).split(",");
    var j = 0;
    for(let i = 0; i < temp.length; i++) {
        if(temp[i] != "") {
            value_arr[j] = parseInt(temp[i]);
            j += 1;
        } 
    }
    generate_array(value_arr);
}

function create_group(i) {
    group_arr[i] = document.createElementNS(svgns, "g");
    group_arr[i].setAttribute("transform", "translate(" + group_x + ", " + group_y +")");
    document.getElementById("canvas").appendChild(group_arr[i]);
    group_x += group_gap;
}

function create_rect(i) {
    rect_arr[i] = document.createElementNS(svgns, "rect");
    rect_arr[i].setAttribute("ry", rect_ry.toString());
    rect_arr[i].setAttribute("width", rect_width.toString());
    rect_arr[i].setAttribute("height", rect_height.toString());
    rect_arr[i].setAttribute("stroke", "black");
    rect_arr[i].setAttribute("fill", rect_fill);
    group_arr[i].appendChild(rect_arr[i]);
}

function create_text(i) {
    text_arr[i] = document.createElementNS(svgns, "text");
    text_arr[i].setAttribute("x", text_x.toString());
    text_arr[i].setAttribute("y", text_y.toString());
    text_arr[i].setAttribute("text-anchor", "middle");
    text_arr[i].setAttribute("stroke", "black");
    text_arr[i].innerHTML = value_arr[i];
    group_arr[i].appendChild(text_arr[i]);
}

function create_indx(i) {
    indx_arr[i] = document.createElementNS(svgns, "text");
    indx_arr[i].setAttribute("x", indx_x.toString());
    indx_arr[i].setAttribute("y", indx_y.toString());
    indx_arr[i].setAttribute("text-anchor", "middle");
    indx_arr[i].setAttribute("stroke", "black");
    indx_arr[i].innerHTML = [i];
    group_arr[i].appendChild(indx_arr[i]);
}

function generate_array() {
    for(let i = 0; i < value_arr.length; i++) {
        create_group(i);
        create_rect(i);
        create_text(i);
        create_indx(i);
    }
    group_x = 30;
    document.getElementById("guid").innerHTML = "<u>Bubble Sort</u>";
}


function setGuid(str){
    document.getElementById("guid").innerHTML = str;
}

function highlight_line(line) {
    var code_line = document.getElementById("line" + line).style.backgroundColor = "orange";
}

function unhighlight_line(line) {
    var code_line = document.getElementById("line" + line).style.backgroundColor = "";
}

async function swapVisual(i){
    rect_arr[i].setAttribute("fill", "red");
    rect_arr[i+1].setAttribute("fill", "red");
    await wait();
    var temp = text_arr[i].innerHTML;
    text_arr[i].innerHTML = text_arr[i+1].innerHTML;
    text_arr[i+1].innerHTML = temp;
    rect_arr[i+1].setAttribute("fill", "blue");
    rect_arr[i].setAttribute("fill", "orange");
    rect_arr[i].setAttribute("fill", "blue");
}

async function bubble_sort() {
    var len = value_arr.length;
    for(var i=0; i<len; i++){
        setGuid("Iteration");
        highlight_line(2);
        await wait();
        unhighlight_line(2);
        for(var j=0; j<len-i-1; j++){
            highlight_line(3);
            await wait();
            unhighlight_line(3);
            setGuid("Comparing Elements "+ value_arr[j] +" > " + value_arr[j+1]);
            rect_arr[j].setAttribute("fill", "blue");
            await wait();
            rect_arr[j+1].setAttribute("fill", "blue");
            await wait();
            highlight_line(4);
            await wait();
            unhighlight_line(4);
            if(value_arr[j]>value_arr[j+1]){
                setGuid("True");
                await wait();
                highlight_line(5);
                setGuid("Swapping("+ value_arr[j] +" , " + value_arr[j+1]+ ")");
                swapVisual(j);
                await wait();
                unhighlight_line(5);
                var temp = value_arr[j];
                value_arr[j] = value_arr[j+1];
                value_arr[j+1] = temp;
            }
            else{
                setGuid("False");
            }
            highlight_line(6);
            await wait();
            unhighlight_line(6);
            rect_arr[j].setAttribute("fill", "orange");
            await wait();
        }
        highlight_line(7);
        await wait();
        unhighlight_line(7);
        rect_arr[len-i-1].setAttribute("fill", "green");
    }
    highlight_line(8);
    await wait();
    unhighlight_line(8);
    setGuid("<strong>Sorted</strong>");
}

