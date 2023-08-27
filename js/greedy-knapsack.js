const svgns =  "http://www.w3.org/2000/svg";

let x_axis_arr = [];
let value_arr = [];
let tr = 0, tt=0;
let indexing = 0;

let objects=0;
let profit = 0;
let weight = 0
let pByw = 0;
let bagWeight = 0;
let totalProfit = 0;

let trAdd = 0;
let text = [];
let text_x = 53;
let text_y = 22;

let headValue=0;
let verticleLine = 0;

let profitArray = [];
let weightArray = [];
let profitByWeightArray = [];
let textA_x = 88;
let textA_y = 22;

let rectWeight = [];
let textWeight = [];
let rectProfit = [];
let textProfit = [];
let rectPW = [];
let textPW = [];
let rectObjects = [];
let rect_ry = 10;
let rect_width = 40;
let rect_height = 40;
let rect_fill = "orange";

// let rectGroup=[];
let group = []
let groupX = temp = 100;
let groupY = 215;
let groupGap = 50;

let index = [];
let indexX = 52;
let indexY = 50;
let indexCount = 0;

let h = rect_height;

function targetRect(){
    tr = document.createElementNS(svgns, "rect")
    tr.setAttribute("ry", rect_ry.toString());
    tr.setAttribute("width", rect_width.toString());
    tr.setAttribute("height", h.toString());
    tr.setAttribute("x", "760");
    tr.setAttribute("y", "245");
    tr.setAttribute("stroke","black");
    tr.setAttribute("fill",rect_fill);
    document.getElementById("bar-container").appendChild(tr);
  }

  function targetText(){
    tt = document.createElementNS(svgns,"text");
    tt.setAttribute("x", "780");
    tt.setAttribute("y", "225");
    tt.setAttribute("stroke","black");
    tt.setAttribute("text-anchor", "middle");
    tt.innerHTML = "Bag Weight";
    // tt.innerHTML = i;
    document.getElementById("bar-container").appendChild(tt);
  }

  function startbar(){
    let line = document.createElementNS(svgns, "line");
    line.setAttribute("x1","720");
    line.setAttribute("y1","240");
    line.setAttribute("x2","840");
    line.setAttribute("y2","240");
    line.setAttribute("stroke","black");
    line.setAttribute("stroke-width","10");
    document.getElementById("bar-container").appendChild(line);
}

function nameRect(i){

    let object = document.createElementNS(svgns, "rect")
    object.setAttribute("ry", rect_ry.toString());
    object.setAttribute("width", "90");
    object.setAttribute("height", rect_height.toString());
    object.setAttribute("x", "10");
    object.setAttribute("y", "220");
    object.setAttribute("stroke","black");
    object.setAttribute("fill","transparent");
    document.getElementById("bar-container").appendChild(object);

    objects = document.createElementNS(svgns, "text")
    objects.setAttribute("x", "20");
    objects.setAttribute("y", "245");
    objects.setAttribute("stroke","black");
    objects.innerHTML = "Objects :";
    document.getElementById("bar-container").appendChild(objects);

    let labelprofit = document.createElementNS(svgns, "rect")
    labelprofit.setAttribute("ry", rect_ry.toString());
    labelprofit.setAttribute("width", "90");
    labelprofit.setAttribute("height", rect_height.toString());
    labelprofit.setAttribute("x", "10");
    labelprofit.setAttribute("y", "280");
    labelprofit.setAttribute("stroke","black");
    labelprofit.setAttribute("fill","transparent");
    document.getElementById("bar-container").appendChild(labelprofit);

    profit = document.createElementNS(svgns, "text")
    profit.setAttribute("x", "20");
    profit.setAttribute("y", "305");
    profit.setAttribute("stroke","black");
    profit.innerHTML = "Profit :";
    document.getElementById("bar-container").appendChild(profit);

    let labelweight = document.createElementNS(svgns, "rect")
    labelweight.setAttribute("ry", rect_ry.toString());
    labelweight.setAttribute("width", "90");
    labelweight.setAttribute("height", rect_height.toString());
    labelweight.setAttribute("x", "10");
    labelweight.setAttribute("y", "340");
    labelweight.setAttribute("stroke","black");
    labelweight.setAttribute("fill","transparent");
    labelweight.innerHTML = "Weight:";
    document.getElementById("bar-container").appendChild(labelweight);
    
    weight = document.createElementNS(svgns, "text")
    weight.setAttribute("x", "20");
    weight.setAttribute("y", "365");
    weight.setAttribute("stroke","black");
    weight.innerHTML = "Weight :";
    document.getElementById("bar-container").appendChild(weight);

    let labelpByw = document.createElementNS(svgns, "rect")
    labelpByw.setAttribute("ry", rect_ry.toString());
    labelpByw.setAttribute("width", "90");
    labelpByw.setAttribute("height", rect_height.toString());
    labelpByw.setAttribute("x", "10");
    labelpByw.setAttribute("y", "400");
    labelpByw.setAttribute("stroke","black");
    labelpByw.setAttribute("fill","transparent");
    document.getElementById("bar-container").appendChild(labelpByw);

    pByw = document.createElementNS(svgns, "text")
    pByw.setAttribute("x", "20");
    pByw.setAttribute("y", "423");
    pByw.setAttribute("stroke","black");
    pByw.setAttribute("fill",rect_fill);
    pByw.innerHTML = "Pro/wei :";
    document.getElementById("bar-container").appendChild(pByw);
}


function createWeightRect(i){
    rectProfit[i] = document.createElementNS(svgns, "rect");
    rectProfit[i].setAttribute("ry", rect_ry.toString());
    rectProfit[i].setAttribute("height",rect_height.toString());
    rectProfit[i].setAttribute("width",rect_width.toString());
    rectProfit[i].setAttribute("stroke","black");
    rectProfit[i].setAttribute("x","35");
    rectProfit[i].setAttribute("y","125");
    rectProfit[i].setAttribute("fill",rect_fill);
    group[i].appendChild(rectProfit[i]);

    textProfit[i] = document.createElementNS(svgns, "text");
    textProfit[i].setAttribute("stroke","black");
    textProfit[i].setAttribute("x","55");
    textProfit[i].setAttribute("y","150");
    textProfit[i].setAttribute("text-anchor", "middle");
    textProfit[i].innerHTML = weightArray[i];
    group[i].appendChild(textProfit[i]);
}
function createProfitRect(i){
    rectWeight[i] = document.createElementNS(svgns, "rect");
    rectWeight[i].setAttribute("ry", rect_ry.toString());
    rectWeight[i].setAttribute("height",rect_height.toString());
    rectWeight[i].setAttribute("width",rect_width.toString());
    rectWeight[i].setAttribute("stroke","black");
    rectWeight[i].setAttribute("x","35");
    rectWeight[i].setAttribute("y","65");
    rectWeight[i].setAttribute("fill",rect_fill);
    group[i].appendChild(rectWeight[i]);

    textWeight[i] = document.createElementNS(svgns, "text");
    textWeight[i].setAttribute("stroke","black");
    textWeight[i].setAttribute("x","50");
    textWeight[i].setAttribute("y","90");
    textWeight[i].innerHTML = profitArray[i];
    group[i].appendChild(textWeight[i]);
}
function createPWRect(i){
    rectPW[i] = document.createElementNS(svgns, "rect");
    rectPW[i].setAttribute("ry", rect_ry.toString());
    rectPW[i].setAttribute("height",rect_height.toString());
    rectPW[i].setAttribute("width",rect_width.toString());
    rectPW[i].setAttribute("stroke","black");
    rectPW[i].setAttribute("x","35");
    rectPW[i].setAttribute("y","185");
    rectPW[i].setAttribute("fill",rect_fill);
    group[i].appendChild(rectPW[i]);

    textPW[i] = document.createElementNS(svgns, "text");
    textPW[i].setAttribute("stroke","black");
    textPW[i].setAttribute("x","55");
    textPW[i].setAttribute("y","210");
    textPW[i].setAttribute("text-anchor","middle");
    textPW[i].innerHTML = profitByWeightArray[i].toFixed(2);
    group[i].appendChild(textPW[i]);
}

function createObjects(i){
    rectObjects[i] = document.createElementNS(svgns, "text");
    rectObjects[i].setAttribute("x","35");
    rectObjects[i].setAttribute("y","30");
    rectObjects[i].setAttribute("stroke","black");
    rectObjects[i].innerHTML="Obj "+(i+1);
    group[i].appendChild(rectObjects[i]);
}


function rectGroup(i){
    group[i] = document.createElementNS(svgns, "g");
    group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
    document.getElementById("bar-container").appendChild(group[i]);
    x_axis_arr[i] = groupX;
    groupX+=groupGap;
}

function getValues(){
    if (profitArray.length>0) clearAll();
    profitArray = document.getElementById('profit-arr').value;
    weightArray = document.getElementById('weight-arr').value;
    bagWeight = document.getElementById('capacity').value;
    bagWeight = parseInt(bagWeight);
    if (profitArray=="" || weightArray==""){
        alert("Enter some values to create an array");
        return;
    }
    profitArray = profitArray.split(',');
    weightArray = weightArray.split(',');
    profitArray = profitArray.map(Number);
    weightArray = weightArray.map(Number);

    for (count=0; count<profitArray.length; count+=1){
        profitByWeightArray[count] = (profitArray[count]/weightArray[count]);
        rectGroup(count);
        createProfitRect(count);
        createWeightRect(count);
        createPWRect(count);
        createObjects(count);
    }
    h = (bagWeight * 10)
    tt.innerHTML = "Bag Weight: "+bagWeight
}

// 10,5,15,7,6,10,3
// 2,3,5,7,1,4,1

async function solveKnapsack(){
    // guidePW.innerText="P/W:";
    let n = profitArray.length;

    while (n != 0){
        if (bagWeight > 0){
            let tempo = findMax();
            changeColor(tempo,"red");
            highlight_line(2)
            await sleep(500);
            unhighlight_line(2)
            if(bagWeight > weightArray[tempo]) {
                highlight_line(3)
                highlight_line(4)
                await sleep(500)
                bagWeight -= weightArray[tempo];
                totalProfit += profitArray[tempo]; 
                guideProfit.textContent+=" + "+ profitArray[tempo];    
            }else{
                //calculate last profit and then break the loop.
                //1.calculation
                highlight_line(6)
                await sleep(500)
                totalProfit+=((bagWeight/weightArray[tempo])*profitArray[tempo])
                guideProfit.textContent+=" + "+ ((bagWeight/weightArray[tempo])*profitArray[tempo]).toFixed(2);
                // guideTotalProfit.textContent+=totalProfit.toFixed(2);
                document.getElementById("bar-container").removeChild(tr);
                tt.innerHTML = "Bag Weight: 0"
                break;
            }
            guideTotalProfit.textContent="Total Profit: "+totalProfit.toFixed(2);
            unhighlight_line(3)
            unhighlight_line(4)
        } 
        n-=1;  
        document.getElementById("bar-container").removeChild(tr);
        h = bagWeight * 10
        targetRect()
        tt.innerHTML = "Bag Weight: "+bagWeight
        
    } 
    unhighlight_line(6)
}

function findMax(){
    let max = 0;
    for (let i=0; i<profitByWeightArray.length; i+=1){
        if ( profitByWeightArray[max] < profitByWeightArray[i] ){
            max = i;
        }
    }
    // guide.innerText="Finding Max element from profit by weight Array: ";
    guidePW.textContent+=" + "+ profitByWeightArray[max].toFixed(2);
    group[max].setAttribute("transform","translate("+x_axis_arr[max]+","+180+")");
    profitByWeightArray[max] = -1;

    return max;
}


function clearAll() {
    for(let i = group.length-1; i >= 0; i--) {
        document.getElementById("bar-container").removeChild(group[i]);  
        rectObjects.pop();
        group.pop();
        profitArray.pop();
        weightArray.pop();
        profitByWeightArray.pop()
    }
    groupX=100;
    bagWeight = 0;
    totalProfit = 0;
    guideProfit.textContent="Profit: "
    guideTotalProfit.textContent="Total Profit: "
    guidePW.textContent="P/W: "
  }

  function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function changeColor(i, color){
    rectProfit[i].setAttribute("fill",color);
    rectWeight[i].setAttribute("fill",color);
    rectPW[i].setAttribute("fill",color);
    rectProfit[i].setAttribute("fill",color);
}

function highlight_line(line) {
    var code_line = document.getElementById("l" + line);
    code_line.style.backgroundColor = "green";
    code_line.style.border = "2px solid var(--black)";
    code_line.style.borderRadius = "15px";
  }
  
  function unhighlight_line(line) {
    var code_line = document.getElementById("l" + line);
    code_line.style.backgroundColor = "";
    code_line.style.border = "";
    code_line.style.borderRadius = "";
  }
































// async function sortArray(){
//     n=group.length;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < (n - i - 1); j++) {
//             if ( profitByWeightArray[j] > profitByWeightArray[j + 1] ) {


//                 let temp = profitByWeightArray[j];
//                 profitByWeightArray[j] = profitByWeightArray[j + 1];
//                 profitByWeightArray[j + 1] = temp;

//                 await sleep(1000);
//                 group[j].setAttribute("transform","translate("+(x_axis_arr[j+1])+","+groupY+")");
//                 await sleep(1000);
//                 group[j+1].setAttribute("transform","translate("+(x_axis_arr[j])+","+groupY+")");
//                 let x = x_axis_arr[j];
//                 x_axis_arr[j] = x_axis_arr[j+1];
//                 x_axis_arr[j+1] = x;
//                 let z = group[j];
//                 group[j] = group[j+1];
//                 group[j+1] = z;
//             }
//         }
//     }
//     alert(profitByWeightArray);
// }