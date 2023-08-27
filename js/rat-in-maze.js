const svgns = "http://www.w3.org/2000/svg";
let setSpeed = document.getElementById("speed");
let timeValue = document.getElementById("timeValue");
let start_btn = document.getElementById("startBtn");
let clear_btn = document.getElementById("clearBtn");
let create_btn = document.getElementById("createbtn");
let startpos_btn = document.getElementById("change_startposbtn");
let endpos_btn = document.getElementById("change_endposbtn");

var group_arr = [];
var rect_arr = [];

var group_x = 30;
var group_y = 120;
var group_gap = 65;

var rect_ry = 10;
var rect_width = 60;
var rect_height = 60;

var row_size = 6;
var col_size = 12;

var starting_row = 0;
var starting_col = 0;
var ending_row = row_size - 1;
var ending_col = col_size - 1;

var solved = false;

var ms = 200;

setSpeed.addEventListener("input", function () {
    let x = 1000 - (setSpeed.value * 1000);
    timeValue.innerHTML = setSpeed.value;
    ms = x;
});

clear_btn.addEventListener("click", () => {
    starting_row = 0;
    starting_col = 0;
    ending_row = row_size - 1;
    ending_col = col_size - 1;

    clear_canvas();
});

function change_start_pos() {
    var temp = (document.getElementById("starting-pos").value).split(",");

    var new_starting_row = parseInt(temp[0]);
    var new_starting_col = parseInt(temp[1]);

    if ((new_starting_row < 0) || (new_starting_col < 0)
        || (new_starting_row >= row_size) || (new_starting_col >= col_size)
        || (new_starting_row !== 0 && !new_starting_row) || (new_starting_col !== 0 && !new_starting_col)) {
        let guid = document.getElementById("guid");
        guid.style.padding = "0px 10px";
        guid.style.backgroundColor = "red";
        guid.style.border = "2px solid var(--black)";
        guid.style.borderRadius = "15px";
        guid.innerHTML = "invalid starting position";
    } else {
        let guid = document.getElementById("guid");
        guid.style.backgroundColor = "transparent";
        guid.style.border = "none";
        guid.style.borderRadius = "none";

        starting_row = new_starting_row;
        starting_col = new_starting_col;
        clear_canvas();
    }
}

function change_end_pos() {
    var temp = (document.getElementById("ending-pos").value).split(",");

    var new_ending_row = parseInt(temp[0]);
    var new_ending_col = parseInt(temp[1]);

    if ((new_ending_row < 0) || (new_ending_col < 0)
        || (new_ending_row >= row_size) || (new_ending_col >= col_size)
        || (new_ending_row !== 0 && !new_ending_row) || (new_ending_col !== 0 && !new_ending_col)) {
        let guid = document.getElementById("guid");
        guid.style.padding = "0px 10px";
        guid.style.backgroundColor = "red";
        guid.style.border = "2px solid var(--black)";
        guid.style.borderRadius = "15px";
        guid.innerHTML = "invalid starting position";
    } else {
        let guid = document.getElementById("guid");
        guid.style.backgroundColor = "transparent";
        guid.style.border = "none";
        guid.style.borderRadius = "none";

        ending_row = new_ending_row;
        ending_col = new_ending_col;
        clear_canvas();
    }
}

function create_user_defined_maze() {
    row_size = parseInt(document.getElementById("mat-row").value);
    col_size = parseInt(document.getElementById("mat-col").value);

    if (!row_size || !col_size) {
        let guid = document.getElementById("guid");
        guid.style.padding = "0px 10px";
        guid.style.backgroundColor = "red";
        guid.style.border = "2px solid var(--black)";
        guid.style.borderRadius = "15px";
        guid.innerHTML = "incorrect rows and cols";
    } else if (row_size < 4 || row_size > 6 || col_size < 4 || col_size > 13) {
        let guid = document.getElementById("guid");
        guid.style.padding = "0px 10px";
        guid.style.backgroundColor = "red";
        guid.style.border = "2px solid var(--black)";
        guid.style.borderRadius = "15px";
        guid.innerHTML = "(4 >= rows <= 13) && (4 >= columns <= 13)";
    } else {
        let guid = document.getElementById("guid");
        guid.style.backgroundColor = "transparent";
        guid.style.border = "none";
        guid.style.borderRadius = "none";

        starting_row = 0;
        starting_col = 0;
        ending_row = row_size - 1;
        ending_col = col_size - 1;

        clear_canvas();
    }
}

function clear_canvas() {
    let canvas = document.getElementById("canvas");

    while (canvas.firstChild) {
        canvas.firstChild.remove();
    }

    create_maze();
    document.getElementById("guid").innerHTML = "<u>Rat in the Maze</u>";

    clear_btn.disabled = true;
    create_btn.disabled = false;
    start_btn.disabled = false;
    startpos_btn.disabled = false;
    endpos_btn.disabled = false;
}

function wait() {
    return new Promise(resolve => {
        setTimeout(() => { resolve("") }, ms);
    })
}

function create_group(i, j) {
    group_arr[i][j] = document.createElementNS(svgns, "g");
    group_arr[i][j].setAttribute("transform", "translate(" + group_x + ", " + group_y + ")");
    document.getElementById("canvas").appendChild(group_arr[i][j]);

    group_x += group_gap;
}

function create_rect(i, j, value, rect_fill) {
    rect_arr[i][j] = document.createElementNS(svgns, "rect");
    rect_arr[i][j].setAttribute("ry", rect_ry.toString());
    rect_arr[i][j].setAttribute("width", rect_width.toString());
    rect_arr[i][j].setAttribute("height", rect_height.toString());
    rect_arr[i][j].setAttribute("stroke", "black");
    rect_arr[i][j].setAttribute("fill", rect_fill);
    rect_arr[i][j].setAttribute("value", value);

    rect_arr[i][j].addEventListener("click", (event) => {
        if (event.target.getAttribute("value") == 0) {
            event.target.setAttribute("value", "1");
            event.target.setAttribute("fill", "black");
        } else if (event.target.getAttribute("value") == 1) {
            event.target.setAttribute("value", "0");
            event.target.setAttribute("fill", rect_fill);
        }
    });

    group_arr[i][j].appendChild(rect_arr[i][j]);
}

function create_maze() {
    for (let i = 0; i < row_size; i++) {
        group_arr[i] = [];
        rect_arr[i] = [];
        for (let j = 0; j < col_size; j++) {
            create_group(i, j);
            if ((i === starting_row && j === starting_col) || (i === ending_row && j === ending_col)) {
                create_rect(i, j, 2, "grey");
            } else {
                create_rect(i, j, 0, "orange");
            }
        }
        group_x = 30;
        group_y += group_gap;
    }

    group_y = 120;
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

async function solve_maze(row = starting_row, col = starting_col) {

    if (row >= row_size || col >= col_size || row < 0 || col < 0 || rect_arr[row][col].getAttribute("value") == 1) {
        return false;
    }

    if (row === ending_row && col === ending_col) {
        highlight_line(4);
        await wait();
        unhighlight_line(4);
        await wait();
        solved = true;
        return solved;
    }

    rect_arr[row][col].setAttribute("value", "1");
    highlight_line(5);
    await wait();
    if (row != starting_row || col != starting_col) {
        rect_arr[row][col].setAttribute("fill", "blue");
    }
    await wait();
    unhighlight_line(5);
    await wait();

    if (! await solve_maze(row - 1, col)) {

        if (! await solve_maze(row, col + 1)) {

            if (! await solve_maze(row, col - 1)) {

                if (! await solve_maze(row + 1, col)) {

                }
            }
        }
    }

    if (solved) {
        if (row != starting_row || col != starting_col) {
            rect_arr[row][col].setAttribute("fill", "green");
        }
    } else {
        highlight_line(9);
        await wait();
        rect_arr[row][col].setAttribute("fill", "orange");
        unhighlight_line(9);
        await wait();
    }
    await wait();

    return solved;
}

async function start() {
    let guid = document.getElementById("guid");
    guid.style.backgroundColor = "transparent";
    guid.style.border = "none";
    guid.style.borderRadius = "none";
    document.getElementById("guid").innerHTML = "<u>Rat in the Maze</u>";

    start_btn.disabled = true;
    create_btn.disabled = true;
    startpos_btn.disabled = true;
    endpos_btn.disabled = true;


    if (await solve_maze()) {
        document.getElementById("guid").innerHTML = "The maze is solved";
    } else {
        document.getElementById("guid").innerHTML = "This maze can not be solved";
    }

    clear_btn.disabled = false;
}