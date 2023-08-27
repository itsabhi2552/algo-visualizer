const svgns = "http://www.w3.org/2000/svg";

var array = [];
var group = [];
var text = [];

var group_x = 200;
var group_y = 140;

//Inputs
var profit = [];
var weight = [];
var value = 8;

//placeholders
var profit_array = document.getElementById('profit_array');
var weight_array = document.getElementById('weight_array');
var capacity = document.getElementById('capacity');

//tag profit & weight
let profitEle = [];
let weightEle = [];

let setSpeed = document.getElementById("speed");
let timeValue = document.getElementById("timeValue");
let speed = 500;

let code_guide = document.getElementById('code_guide')

let random_btn = document.getElementById('random')
let set_btn = document.getElementById('set')
let checked = document.getElementById('checked')


let profitRect = [];
let weightRect = [];







function createMaze() {

    for (let i = 0; i <= weight.length; i++) {
        array[i] = [];
        group[i] = [];
        text[i] = [];
        group_x = 30;

        for (var j = 0; j <= value; j++) {

            if (i === 0) {
                let z = document.createElementNS(svgns, "text");
                z.setAttribute("x", (group_x + 30).toString());
                z.setAttribute("y", (group_y - 20).toString());
                z.setAttribute("text-anchor", "middle");
                z.setAttribute("stroke", "black");
                z.setAttribute("fill", "black");
                z.innerHTML = j;
                document.getElementById("canvas").appendChild(z);

            }


            group[i][j] = document.createElementNS(svgns, "g");
            group[i][j].setAttribute("transform", "translate(" + group_x + ", " + group_y + ")");
            document.getElementById("canvas").appendChild(group[i][j]);

            array[i][j] = document.createElementNS(svgns, "rect");
            array[i][j].setAttribute("width", "50");
            array[i][j].setAttribute("height", "50");
            array[i][j].setAttribute("stroke", "black");
            array[i][j].setAttribute("fill", "orange");

            group[i][j].appendChild(array[i][j]);

            text[i][j] = document.createElementNS(svgns, "text");
            text[i][j].setAttribute("x", (27).toString());
            text[i][j].setAttribute("y", (30).toString());
            text[i][j].setAttribute("text-anchor", "middle");
            text[i][j].setAttribute("stroke", "black");
            text[i][j].setAttribute("fill", "black");
            group[i][j].appendChild(text[i][j]);
            group_x += 50;
        }
        if (i == 0) {
            profitEle[i] = document.createElementNS(svgns, "text");
            profitEle[i].setAttribute("x", (group_x + 55).toString());
            profitEle[i].setAttribute("y", (group_y + 30).toString());


            profitEle[i].setAttribute("text-anchor", "middle");
            profitEle[i].setAttribute("stroke", "black");
            profitEle[i].setAttribute("fill", "black");
            profitEle[i].innerHTML = 'Profit(i)';
            document.getElementById("canvas").appendChild(profitEle[i]);

            weightEle[i] = document.createElementNS(svgns, "text");
            weightEle[i].setAttribute("x", (group_x + 135).toString());
            weightEle[i].setAttribute("y", (group_y + 30).toString());
            weightEle[i].setAttribute("text-anchor", "middle");
            weightEle[i].setAttribute("stroke", "black");
            weightEle[i].setAttribute("fill", "black");
            weightEle[i].innerHTML = 'Weight(i)';
            document.getElementById("canvas").appendChild(weightEle[i]);
        }
        else {

            profitRect[i] = document.createElementNS(svgns, "rect");
            profitRect[i].setAttribute("width", "50");
            profitRect[i].setAttribute("height", "50");
            profitRect[i].setAttribute("stroke", "white");
            profitRect[i].setAttribute("fill", "white");
            profitRect[i].setAttribute("x", (group_x + 30).toString());
            profitRect[i].setAttribute("y", (group_y).toString());
            profitRect[i].setAttribute("rx", "30");
            document.getElementById("canvas").appendChild(profitRect[i]);

            weightRect[i] = document.createElementNS(svgns, "rect");
            weightRect[i].setAttribute("width", "50");
            weightRect[i].setAttribute("height", "50");
            weightRect[i].setAttribute("stroke", "white");
            weightRect[i].setAttribute("fill", "white");
            weightRect[i].setAttribute("x", (group_x + 110).toString());
            weightRect[i].setAttribute("y", (group_y).toString());
            weightRect[i].setAttribute("rx", "30");
            document.getElementById("canvas").appendChild(weightRect[i]);





            profitEle[i] = document.createElementNS(svgns, "text");
            // profitEle[i].setAttribute("x", (group_x + 420).toString());
            profitEle[i].setAttribute("x", (group_x + 55).toString());


            profitEle[i].setAttribute("y", (group_y + 30).toString());
            profitEle[i].setAttribute("text-anchor", "middle");
            profitEle[i].setAttribute("stroke", "rgb(0,0,0)");
            profitEle[i].setAttribute("fill", "black");
            profitEle[i].innerHTML = profit[i - 1];
            document.getElementById("canvas").appendChild(profitEle[i]);

            weightEle[i] = document.createElementNS(svgns, "text");
            weightEle[i].setAttribute("x", (group_x + 135).toString());
            weightEle[i].setAttribute("y", (group_y + 30).toString());
            weightEle[i].setAttribute("text-anchor", "middle");
            weightEle[i].setAttribute("stroke", "rgb(0,0,0)");
            weightEle[i].setAttribute("fill", "black");
            weightEle[i].innerHTML = weight[i - 1];
            document.getElementById("canvas").appendChild(weightEle[i]);
        }

        group_y += 50;
    }


}

function clearCanvas() {

    let svg = document.getElementById('canvas')
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);

    }

    array = [];
    group = [];
    text = [];
    profitEle = [];
    weightEle = [];
    group_x = 100;
    group_y = 140;
    code_guide.innerHTML = "Knapsack"

}

function random() {

    clearCanvas()
    checked.innerText = 'Run'
    checked.disabled = true


    for (let i = 0; i <= 5; i++) {
        let temp = (Math.floor(Math.random() * 10) + 1);
        if (profit.indexOf(temp) === -1) {
            profit[i] = temp;

        }
        else {
            i -= 1;
        }
    }


    for (let i = 0; i <= 5; i++) {
        let temp = (Math.floor(Math.random() * 10) + 1);
        if (weight.indexOf(temp) === -1) {

            weight[i] = temp;

        }
        else {
            i -= 1;
        }
    }

    value = (Math.floor(Math.random() * 10) + 1);

    for (let i = 0; i < weight.length - 1; i++) {

        for (let j = 0; j < weight.length - 1 - i; j++) {
            if (weight[j] > weight[j + 1]) {
                let temp;
                temp = weight[j];
                weight[j] = weight[j + 1];
                weight[j + 1] = temp;

                temp = profit[j];
                profit[j] = profit[j + 1];
                profit[j + 1] = temp;
            }
        }


    }

    profit_array.value = profit.toString();
    weight_array.value = weight.toString();
    capacity.value = value;

}

async function knapsack() {
    let n = profit.length;
    let arr = []


    for (let i = 0; i <= n; i++) {
        arr[i] = []


        code_snippet_set(2)
        await wait();
        code_snippet_reset(2)
        await wait();

        if (i > 0) {
            if (i === 1) {
                curr_ele(1, null)
            }
            else {
                curr_ele(i, i - 1)
            }
        }

        for (let w = 0; w <= value; w++) {



            await wait();
            code_snippet_set(3)
            await wait();
            code_snippet_reset(3)
            await wait();


            if (i == 0 || w == 0) {
                code_snippet_set(4)
                await wait();
                code_snippet_reset(4)
                await wait();
                code_snippet_set(5)
                await wait();
                code_snippet_reset(5)

                arr[i][w] = 0;

            }
            else if (weight[i - 1] <= w) {

                code_snippet_set(6)
                await wait();
                code_snippet_reset(6)
                await wait();
                code_snippet_set(7)
                await wait();
                code_snippet_reset(7)

                arr[i][w] = Math.max(profit[i - 1]
                    + arr[i - 1][w - weight[i - 1]],
                    arr[i - 1][w]);
            }
            else {
                code_snippet_set(8)
                await wait();
                code_snippet_reset(8)
                await wait();
                code_snippet_set(9)
                await wait();
                code_snippet_reset(9)
                arr[i][w] = arr[i - 1][w];
            }
            text[i][w].innerHTML = arr[i][w];

        }

    }

    code_guide.innerHTML = "Maximum Profit : " + arr[n][value];

    profitRect[n].setAttribute("fill", "white")
    weightRect[n].setAttribute("fill", "white");

    await wait();

    let res = arr[n][value];
    let w = value;



    for (i = n; i > 0 && res > 0; i--) {

        if (res == arr[i - 1][w])
            continue;
        else {

            //  including this item.

            profitRect[i].setAttribute("fill", "rgb(205,92,92)")
            weightRect[i].setAttribute("fill", "rgb(205,92,92)");

            // including this weight 
            // value is subtracted
            res = res - profit[i - 1];
            w = w - weight[i - 1];
        }
    }

    set_btn.disabled = false
    random_btn.disabled = false

}

function wait() {

    return new Promise(resolve => {
        setTimeout(() => { resolve("") }, speed);
    })
}

setSpeed.addEventListener("input", function () {
    let x = 1000 - (setSpeed.value * 1000);
    timeValue.innerHTML = setSpeed.value;
    speed = x;
});


function code_snippet_set(i) {
    document.getElementById("pre" + i).style.backgroundColor = "var(--orange)";
    document.getElementById("pre" + i).style.borderRadius = "25px";
    document.getElementById("pre" + i).style.border = "2px solid var(--black)";
}
function code_snippet_reset(i) {
    document.getElementById("pre" + i).style.backgroundColor = "transparent";
    document.getElementById("pre" + i).style.borderRadius = "0s";
    document.getElementById("pre" + i).style.border = "0";
}

function curr_ele(i, j) {

    if (j === null) {

        profitRect[i].setAttribute("fill", "green")
        weightRect[i].setAttribute("fill", "green");



    }
    else {


        profitRect[i].setAttribute("fill", "green")
        weightRect[i].setAttribute("fill", "green");

        profitRect[j].setAttribute("fill", "white")
        weightRect[j].setAttribute("fill", "white");


    }

}

function set() {

    clearCanvas()
    weight = weight_array.value.split(',');
    profit = profit_array.value.split(',');
    value = capacity.value

    weight = weight.map(Number)
    profit = profit.map(Number)




    if (weight.length > 0 && profit.length > 0) {
        if (weight.length === profit.length) {

            for (let k = 0; k < weight.length; k++) {

                if (isNaN(weight[k]) || isNaN(profit[k]) || isNaN(value)) {
                    alert(' Integers are allwoed Only !!');
                    return
                }
            }
            createMaze()
            checked.disabled = false;
        }
        else {
            alert("Enter Correct Input");
        }
    }
    else {

        alert("Enter Correct Input");
    }

}

function run() {

    knapsack();

    checked.disabled = true
    set_btn.disabled = true
    random_btn.disabled = true



}