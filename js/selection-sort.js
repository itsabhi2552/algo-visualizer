const svgns =  "http://www.w3.org/2000/svg";

var value_arr = [];
var group_arr = [];
var rect_arr = [];
var text_arr = [];
var indx_arr = [];


var group_x = 30;
var group_y = 240;
var group_gap = 65;

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


//var min = documnet.createElementNS("svgns","text");

//var min_x = 30;

// function createMin(){
//     min.innerHTML = "MIN";
//     min.setAttribute("x", min_x.toString());
//     min.setAttribute("y", "180");
//     min.setAttribute("stroke","black");
//     documnet.getElementById("canvas").appendChild(min);
// }

function clear_canvas() {
    for(var i = value_arr.length - 1; i >= 0; i--) {
        document.getElementById("canvas").removeChild(group_arr[i]);
        value_arr.pop();
        group_arr.pop();
        rect_arr.pop();
        text_arr.pop();
        indx_arr.pop();
    }
}

function wait() {
    return new Promise(resolve => {
        setTimeout(() => { resolve("") }, ms);
    })
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
    //createMin();
    for(let i = 0; i < value_arr.length; i++) {
        create_group(i);
        create_rect(i);
        create_text(i);
        create_indx(i);
    }
    group_x = 30;
    document.getElementById("guid").innerHTML = "<u>Selection Sort</u>";
}

function textSwap(min_index,j){
    var temp = text_arr[min_index].innerHTML;
    text_arr[min_index].innerHTML = text_arr[j].innerHTML;
    text_arr[j].innerHTML = temp;
}

function swap(min_index,i){
    var temp = value_arr[min_index];
    value_arr[min_index] = value_arr[i];
    value_arr[i] = temp;
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

async function selection_sort(){
    for(var i=0; i<value_arr.length; i++){
        highlight_line(2);
        await wait();
        unhighlight_line(2);
        setGuid("Assuming "+i+"<sup>th</sup> index as min value");
        var min_index=i;
        highlight_line(3);
        await wait();
        unhighlight_line(3);
        rect_arr[min_index].setAttribute("fill","red");
        await wait();
        for(var j=i+1; j<value_arr.length; j++){
            highlight_line(4);
            await wait();
            unhighlight_line(4);
            rect_arr[j].setAttribute("fill","blue");
            setGuid("Comparing Elements " + value_arr[min_index] + " > " + value_arr[j]);
            await wait();
            if(value_arr[min_index]>value_arr[j]){
                setGuid("True");
                highlight_line(5);
                await wait();
                unhighlight_line(5);
                rect_arr[min_index].setAttribute("fill","orange");
                rect_arr[j].setAttribute("fill","red");
                setGuid("Now minimum element is "+value_arr[min_index]+ " at index: "+ min_index);
                await wait()
                min_index = j;
                highlight_line(5);
                await wait();
                unhighlight_line(5);
            }
            else{
                setGuid("False");
                rect_arr[j].setAttribute("fill","orange");
                await wait();
            }
        }
        highlight_line(6);
        await wait();
        unhighlight_line(6);
        setGuid("Swapping("+value_arr[min_index]+","+value_arr[i]+")");
        swap(min_index,i);
        highlight_line(7);
        await wait();
        unhighlight_line(7);
        rect_arr[i].setAttribute("fill","red");
        textSwap(min_index, i);
        rect_arr[min_index].setAttribute("fill","orange");
        rect_arr[i].setAttribute("fill","green");
        await wait();
    }
    highlight_line(8);
    await wait();
    unhighlight_line(8);
    document.getElementById("guid").innerHTML="Hurrah!! Sorted";
}