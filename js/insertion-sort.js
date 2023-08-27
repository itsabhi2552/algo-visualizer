const svgns = "http://www.w3.org/2000/svg";
let setSpeed = document.getElementById("speed");
let timeValue = document.getElementById("timeValue");
let createbtn = document.getElementById("createbtn");
let generatebtn = document.getElementById("generatebtn");
let sortbtn = document.getElementById("sortbtn");

var value_arr = [];
var help_arr = [];
var prev_arr = [];
var group_arr = [];
var rect_arr = [];
var text_arr = [];
var indx_arr = [];
var x_axis_arr = [];

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
var up = 240;
var down = 360;

var flag = true;


setSpeed.addEventListener("input", function () {
    let x = 1000 - (setSpeed.value * 1000);
    timeValue.innerHTML = setSpeed.value;
    ms = x;
});

function clear_canvas() {
    for (let i = value_arr.length - 1; i >= 0; i--) {
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
    for (let i = 0; i < 12; i++) {
        value_arr[i] = Math.floor(Math.random() * 100) + 1;
    }
    generate_array(value_arr);
    document.getElementById("user-arr").value = value_arr.toString();
}

function user_array() {
    var flag = false;
    var temp = (document.getElementById("user-arr").value).split(",");
    var j = 0;
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] != "") {
            value_arr[j] = parseInt(temp[i]);
            if(value_arr[j] !== 0 && !value_arr[j]) {
                flag = true;
                break;
            }
            j += 1;
        }
    }

    if(value_arr.length === 0) {
        let guid = document.getElementById("guid");

        guid.style.padding = "0px 10px";
        guid.style.backgroundColor = "red";
        guid.style.border = "2px solid var(--black)";
        guid.style.borderRadius = "15px";
        guid.innerHTML = "please enter some input";

        sortbtn.disabled = true;
    } else if(flag) {
        let guid = document.getElementById("guid");

        guid.style.padding = "0px 10px";
        guid.style.backgroundColor = "red";
        guid.style.border = "2px solid var(--black)";
        guid.style.borderRadius = "15px";
        guid.innerHTML = "incorrect input";

        value_arr = [];

        sortbtn.disabled = true;
    } else {
        let guid = document.getElementById("guid");
        guid.style.backgroundColor = "transparent";
        guid.style.border = "none";
        guid.style.borderRadius = "none";
        guid.innerHTML = "<u>Insertion Sort</u>";

        generate_array(value_arr);
    }
}

function create_group(i) {
    group_arr[i] = document.createElementNS(svgns, "g");
    group_arr[i].setAttribute("transform", "translate(" + group_x + ", " + group_y + ")");
    document.getElementById("canvas").appendChild(group_arr[i]);

    x_axis_arr[i] = group_x;
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
    for (let i = 0; i < value_arr.length; i++) {
        create_group(i);
        create_rect(i);
        create_text(i);
        create_indx(i);
    }
    group_x = 30;
    sortbtn.disabled = false;
    document.getElementById("guid").innerHTML = "<u>Insetion Sort</u>";
}

function move_up(i) {
    group_arr[i].setAttribute("transform", "translate(" + x_axis_arr[i] + ", " + up + ")");
}

function move_left(i) {
    x_axis_arr[i] -= group_gap;
    group_arr[i].setAttribute("transform", "translate(" + x_axis_arr[i] + ", " + down + ")");
}

function move_right(i) {
    x_axis_arr[i] += group_gap;
    group_arr[i].setAttribute("transform", "translate(" + x_axis_arr[i] + ", " + up + ")");
}

function move_down(i) {
    group_arr[i].setAttribute("transform", "translate(" + x_axis_arr[i] + ", " + down + ")");
}

function change_color(i, color) {
    rect_arr[i].setAttribute("fill", color);
}

function highlight_line(line) {
    var code_line = document.getElementById("line" + line);
    code_line.style.backgroundColor = "orange";
    code_line.style.border = "2px solid var(--black)";
    code_line.style.borderRadius = "15px";
}

function unhighlight_line(line) {
    var code_line = document.getElementById("line" + line);
    code_line.style.backgroundColor = "";
    code_line.style.border = "";
    code_line.style.borderRadius = "";
}

async function insertion_sort() {
    createbtn.disabled = true;
    generatebtn.disabled = true;
    sortbtn.disabled = true;

    highlight_line(2);
    document.getElementById("guid").innerHTML = "Mark first element " + value_arr[0] + " as sorted."
    await wait();
    change_color(0, "green");
    await wait();
    unhighlight_line(2);
    await wait();
    help_arr[0] = 0;
    for (let i = 1; i < value_arr.length; i++) {
        var key = value_arr[i];
        var j = i - 1;
        prev_arr = []
        prev_arr.push(...value_arr);
        help_arr[i] = i;
        while (j >= 0 && key < value_arr[j]) {
            value_arr[j + 1] = value_arr[j];
            help_arr[j + 1] = help_arr[j];
            j -= 1;
        }
        value_arr[j + 1] = key;
        help_arr[j + 1] = i;
        sorting_visualization(i, j + 1);
        flag = true;
        while (flag) {
            await wait();
        }
    }
    document.getElementById("guid").innerHTML = "All the elements of the array is sorted";
    createbtn.disabled = false;
    generatebtn.disabled = false;
    sortbtn.disabled = false;
}

async function sorting_visualization(i, j) {
    var temp = i;
    highlight_line(4);
    document.getElementById("guid").innerHTML = "Extract the first unsorted element " + prev_arr[temp];
    await wait();
    change_color(i, "red");
    await wait();
    move_down(i);
    await wait();
    unhighlight_line(4);
    document.getElementById("guid").innerHTML = "Compare " + prev_arr[temp] + " with " + prev_arr[temp - 1];
    await wait();
    while (j != temp) {
        highlight_line(6);
        await wait();
        document.getElementById("guid").innerHTML = prev_arr[temp - 1] + " > " + value_arr[j] + " is True, move " + prev_arr[temp - 1] + " to right by 1 index";
        change_color(help_arr[temp], "red");
        await wait();
        unhighlight_line(6);
        await wait();
        highlight_line(7);
        await wait();
        move_right(help_arr[temp]);
        indx_arr[help_arr[temp]].innerHTML = temp;
        await wait();
        change_color(help_arr[temp], "green");
        await wait();
        unhighlight_line(7);
        await wait();
        move_left(i);
        indx_arr[i].innerHTML = temp - 1;
        temp -= 1;
        if (temp > 0) {
            document.getElementById("guid").innerHTML = "Compare " + prev_arr[temp - 1] + " with " + value_arr[j];
        }
        await wait();
    }
    if (temp > 0) {
        highlight_line(6);
        await wait();
        change_color(help_arr[temp - 1], "red");
        await wait();
        unhighlight_line(6);
        change_color(help_arr[temp - 1], "green");
        document.getElementById("guid").innerHTML = prev_arr[temp - 1] + " > " + value_arr[temp] + " is False, insert " + value_arr[temp] + " at current position";
        await wait();
    }
    else {
        document.getElementById("guid").innerHTML = "insert " + value_arr[temp] + " at current position";
    }
    highlight_line(9);
    await wait();
    move_up(i);
    await wait();
    change_color(i, "green");
    await wait();
    unhighlight_line(9);
    flag = false;
}