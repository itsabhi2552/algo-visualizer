const svgns =  "http://www.w3.org/2000/svg";

let x_axis_arr = [];
let value_arr = [];
let count = -1;
let indexing = 0;
let labelPrev = [];
let labelValue = [];
let labelNext = [];

let objects=0;
let trAdd = 0;
let text = [];
let text_x = 53;
let text_y = 22;

let headValue=0;
let verticleLine = 0;

let nextAddress = [];
let prevAddress = [];
let textA_x = 88;
let textA_y = 22;

let barLineNext = [];
let barLinePrev = [];

let rectPrev = [];
let rectProfit = [];
let rectAddress = [];
let rect_ry = 10;
let rect_width = 35;
let rect_height = 35;
let rect_fill = "orange";

let rectGroup=[];
let group = []
let groupX = temp = 74;
let groupY = 250;
let groupGap = 120;

let index = [];
let indexX = 52;
let indexY = 50;
let indexCount = 0;

let position = 0;
let flag = false;
let flagMiddle = false;


function targetRect(){
    objects = document.createElementNS(svgns, "rect")
    objects.setAttribute("ry", rect_ry.toString());
    objects.setAttribute("width", rect_width.toString());
    objects.setAttribute("height", rect_height.toString());
    objects.setAttribute("x", "10");
    objects.setAttribute("y", "150");
    objects.setAttribute("stroke","black");
    objects.setAttribute("fill",rect_fill);
    document.getElementById("bar-container").appendChild(objects);

    let head = document.createElementNS(svgns,"text");
    head.setAttribute("x","28");
    head.setAttribute("y","145");
    head.setAttribute("stroke","#808080");
    head.setAttribute("text-anchor","middle");
    head.setAttribute("font-size","10");
    head.innerHTML = "Head";
    document.getElementById("bar-container").appendChild(head);

    headValue = document.createElementNS(svgns,"text");
    headValue.setAttribute("x","28");
    headValue.setAttribute("y","173");
    headValue.setAttribute("stroke","#808080");
    headValue.setAttribute("text-anchor","middle");
    headValue.setAttribute("font-size","15");
    headValue.innerHTML = "X";
    document.getElementById("bar-container").appendChild(headValue);

    // let verticleLine = document.createElementNS(svgns, "line");
    // verticleLine.setAttribute("x1","55");
    // verticleLine.setAttribute("y1","270");
    // verticleLine.setAttribute("x2","30");
    // verticleLine.setAttribute("y2","184");
    // verticleLine.setAttribute("stroke","black");
    // verticleLine.setAttribute("stroke-width","5");
    // document.getElementById("bar-container").appendChild(verticleLine);

}



function createRects(i){
    barLineNext[i] = document.createElementNS(svgns, "line");
    barLineNext[i].setAttribute("x1","-16");
    barLineNext[i].setAttribute("y1","13");
    barLineNext[i].setAttribute("x2","0");
    barLineNext[i].setAttribute("y2","13");
    barLineNext[i].setAttribute("stroke","green");
    barLineNext[i].setAttribute("stroke-width","3");
    rectGroup[i].appendChild(barLineNext[i]);

    barLinePrev[i] = document.createElementNS(svgns, "line");
    barLinePrev[i].setAttribute("x1","-16");
    barLinePrev[i].setAttribute("y1","23");
    barLinePrev[i].setAttribute("x2","0");
    barLinePrev[i].setAttribute("y2","23");
    barLinePrev[i].setAttribute("stroke","red");
    barLinePrev[i].setAttribute("stroke-width","3");
    rectGroup[i].appendChild(barLinePrev[i]);

    rectPrev[i] = document.createElementNS(svgns, "rect");
    rectPrev[i].setAttribute("ry", rect_ry.toString());
    rectPrev[i].setAttribute("height",rect_height.toString());
    rectPrev[i].setAttribute("width",rect_width.toString());
    rectPrev[i].setAttribute("stroke","black");
    rectPrev[i].setAttribute("fill",rect_fill);
    rectGroup[i].appendChild(rectPrev[i]);

    rectProfit[i] = document.createElementNS(svgns, "rect");
    rectProfit[i].setAttribute("ry", rect_ry.toString());
    rectProfit[i].setAttribute("height",rect_height.toString());
    rectProfit[i].setAttribute("width",rect_width.toString());
    rectProfit[i].setAttribute("stroke","black");
    rectProfit[i].setAttribute("x","35");
    rectProfit[i].setAttribute("fill",rect_fill);
    rectGroup[i].appendChild(rectProfit[i]);

    rectAddress[i] = document.createElementNS(svgns, "rect");
    rectAddress[i].setAttribute("ry", rect_ry.toString());
    rectAddress[i].setAttribute("height",rect_height.toString());
    rectAddress[i].setAttribute("x","70");
    rectAddress[i].setAttribute("width",rect_width.toString());
    rectAddress[i].setAttribute("stroke","black");
    rectAddress[i].setAttribute("fill",rect_fill);
    rectGroup[i].appendChild(rectAddress[i]);
}

function createTextValue(i){
    text[i] = document.createElementNS(svgns,"text");
    text[i].setAttribute("x",text_x.toString());
    text[i].setAttribute("y",text_y.toString());
    text[i].setAttribute("stroke","red");
    text[i].setAttribute("text-anchor","middle");
    text[i].innerHTML = value_arr[i];
    group[i].appendChild(text[i]);
}
function createTextAddress(i){
    nextAddress[i] = document.createElementNS(svgns,"text");
    nextAddress[i].setAttribute("x",textA_x.toString());
    nextAddress[i].setAttribute("y",textA_y.toString());
    nextAddress[i].setAttribute("stroke","black");
    nextAddress[i].setAttribute("font-size","12");
    nextAddress[i].setAttribute("text-anchor","middle");
    if (i>0) nextAddress[i-1].innerHTML = (i+1)*100;
    group[i].appendChild(nextAddress[i]);

    prevAddress[i] = document.createElementNS(svgns,"text");
    prevAddress[i].setAttribute("x","18");
    prevAddress[i].setAttribute("y",textA_y.toString());
    prevAddress[i].setAttribute("stroke","black");
    prevAddress[i].setAttribute("font-size","12");
    prevAddress[i].setAttribute("text-anchor","middle");
    if (i>=0) prevAddress[i].innerHTML = (i)*100;
    group[i].appendChild(prevAddress[i]);

    if (i==0){
        verticleLine = document.createElementNS(svgns, "line");
        verticleLine.setAttribute("x1","59");
        verticleLine.setAttribute("y1","275");
        verticleLine.setAttribute("x2","30");
        verticleLine.setAttribute("y2","184");
        verticleLine.setAttribute("stroke","black");
        verticleLine.setAttribute("stroke-width","5");
        document.getElementById("bar-container").appendChild(verticleLine);

        trAdd = document.createElementNS(svgns,"text");
        trAdd.setAttribute("x","35");
        trAdd.setAttribute("y","180");
        trAdd.setAttribute("stroke","black");
        trAdd.setAttribute("text-anchor","middle");
        headValue.innerHTML = "100";
        document.getElementById("bar-container").appendChild(trAdd);
    }
}

function createIndex(i){
    index[i] = document.createElementNS(svgns,"text");
    index[i].setAttribute("x",indexX.toString());
    index[i].setAttribute("y",indexY.toString());
    index[i].setAttribute("stroke","black");
    index[i].setAttribute("text-anchor","middle");
    index[i].setAttribute("font-size", "15");
    index[i].innerHTML = (i+1)*100;
    group[i].appendChild(index[i]);
}

function createLabel(i){
    labelPrev[i] = document.createElementNS(svgns,"text");
    labelValue[i] = document.createElementNS(svgns,"text");
    labelNext[i] = document.createElementNS(svgns,"text");

    labelPrev[i].setAttribute("x","18");
    labelPrev[i].setAttribute("y","-5");
    labelPrev[i].setAttribute("stroke","#808080");
    labelPrev[i].setAttribute("text-anchor", "middle");
    labelPrev[i].setAttribute("font-size", "10");
    labelPrev[i].innerHTML = "Prev";
    group[i].appendChild(labelPrev[i]);

    labelValue[i].setAttribute("x","55");
    labelValue[i].setAttribute("y","-5");
    labelValue[i].setAttribute("stroke","#808080");
    labelValue[i].setAttribute("text-anchor", "middle");
    labelValue[i].setAttribute("font-size", "10");
    labelValue[i].innerHTML = "Data";
    group[i].appendChild(labelValue[i]);

    labelNext[i].setAttribute("x","90");
    labelNext[i].setAttribute("y","-5");
    labelNext[i].setAttribute("stroke","#808080");
    labelNext[i].setAttribute("text-anchor", "middle");
    labelNext[i].setAttribute("font-size", "10");
    labelNext[i].innerHTML = "Next";
    group[i].appendChild(labelNext[i]);
}



async function createRectGroup(i){
    rectGroup[i] = document.createElementNS(svgns,"g");
    // createRectPrev(i);
    // createRectValue(i);
    // createRectNext(i);
    createRects(i);
    // nodeLine(i);
    group[i].appendChild(rectGroup[i]);
}

async function createGroup(i){
    group[i] = document.createElementNS(svgns,"g");
    // group[i].setAttribute("transform","translate("+groupX+","+150+")");
    // document.getElementById("bar-container").appendChild(group[i]);
    // await sleep(200);
    if (flagMiddle == true){
        group[i].setAttribute("transform","translate("+groupX+","+150+")");
        document.getElementById("bar-container").appendChild(group[i]);
        await sleep(200);
        group[i].setAttribute("transform","translate("+(74+(groupGap*position))+","+groupY+")");
        flagMiddle = false;
    }else if (flag == true){
        group[i].setAttribute("transform","translate("+74+","+150+")");
        document.getElementById("bar-container").appendChild(group[i]);
        await sleep(200);
        group[0].setAttribute("transform","translate("+74+","+groupY+")");
        flag = false;
    }
    else{
        group[i].setAttribute("transform","translate("+groupX+","+150+")");
        document.getElementById("bar-container").appendChild(group[i]);
        await sleep(200);
        group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
    }    
    x_axis_arr[i] = groupX;
    groupX += groupGap;
}

async function insert(){
    insertinend()
    count+=1;
    let input = document.getElementById('user-arr').value;
    input = parseInt(input);
    value_arr[count] = input;
    createGroup(count);
    createRectGroup(count);
    createIndex(count);
    createTextValue(count);
    createTextAddress(count);
    createLabel(count);
}
async function insertStart(){
    insertinstart()
    flag = true;
    // groupX += groupGap;
    temp2 = 74;
    for(i = 0; i<group.length; i+=1 ){
        let x = i+1;
        temp2 += groupGap;
        index[i].innerHTML=(x+1)*100;
        group[i].setAttribute("transform","translate("+temp2+","+groupY+")"); 
    }
    count+=1;
    let input = document.getElementById('user-arr').value;
    input = parseInt(input);
    value_arr.unshift(input);


    group.unshift(0);
    rectGroup.unshift(0);
    index.unshift(0);
    text.unshift(0);
    nextAddress.unshift(0);
    prevAddress.unshift(0);
    labelPrev.unshift(0);
    labelValue.unshift(0);
    labelNext.unshift(0);

    createGroup(0);
    createRectGroup(0);
    createIndex(0);
    createTextValue(0);
    createTextAddress(0);
    createLabel(0);
    for (i=0; i<group.length;i+=1){
        if (i>0) nextAddress[i-1].innerHTML = (i+1)*100;
        if (i>=0) prevAddress[i].innerHTML = (i)*100;
    }
}

async function insertMiddle(){
    insertinmiddle()
    flagMiddle = true;
    // groupX += groupGap;
    // trAdd.innerHTML = "";
    position = document.getElementById('position').value;
    if (position == ""){
        alert("Enter any index to insert value");
        return;
    }
    position = parseInt(position);
    let input = document.getElementById('user-arr').value;
    input = parseInt(input);
    temp2 = 74+(groupGap*position);
    for(i = position; i<group.length; i+=1 ){
        let x = i+1;
        temp2 += groupGap;
        index[i].innerHTML=(x+1)*100;
        group[i].setAttribute("transform","translate("+temp2+","+groupY+")"); 
    }
    count+=1;
    value_arr.splice(position, 0, input);


    group.splice(position, 0, 0);
    rectGroup.splice(position, 0, 0);
    index.splice(position, 0, 0);
    text.splice(position, 0, 0);
    nextAddress.splice(position, 0, 0);
    prevAddress.splice(position, 0, 0);
    labelPrev.splice(position, 0, 0);
    labelValue.splice(position, 0, 0);
    labelNext.splice(position, 0, 0);

    createGroup(position);
    createRectGroup(position);
    createIndex(position);
    createTextValue(position);
    createTextAddress(position);
    createLabel(position);
    for (i=1; i<group.length-1;i+=1){
        nextAddress[i].innerHTML = (i+2)*100;
        prevAddress[i].innerHTML = (i)*100;
    }  
}


async function clearElements(){
    while(count!=-1){
        document.getElementById("bar-container").removeChild(group[count]);  
        group.pop();
        value_arr.pop();
        count-=1;
    }
    document.getElementById("bar-container").removeChild(verticleLine);  
    // trAdd.innerHTML = "";
    headValue.innerHTML = "";
    groupX=74;
}

async function remove(){
    deletioninend()
    if (count==0){
        headValue.innerHTML = "X";
        document.getElementById("bar-container").removeChild(verticleLine); 
    }
    if (count!= -1){
        document.getElementById("bar-container").removeChild(group[count]);
        value_arr.pop();
        group.pop();
        index.pop();
        text.pop();
        rectAddress.pop();
        rectProfit.pop();
        rectPrev.pop();
        nextAddress.pop();
        prevAddress.pop();
        rectGroup.pop();
        barLinePrev.pop();
        barLineNext.pop();
        groupX -= groupGap;
        count-=1;
    }   
} 

async function deleteStart(){
    deletioninstart()
    if (count==0){
        headValue.innerHTML = "X";
        document.getElementById("bar-container").removeChild(verticleLine); 
    }

    if(count>=0){
        groupX -= groupGap;
        count-=1;
        // rectValue[0].setAttribute("fill","red");
        // rectAddress[0].setAttribute("fill","red");
        group[0].setAttribute("transform","translate("+30+","+350+")");
        await sleep(500);
        document.getElementById("bar-container").removeChild(group[0]);
        value_arr.shift();
        group.shift();
        index.shift();
        text.shift();
        rectAddress.shift();
        rectProfit.shift();
        rectPrev.shift();
        nextAddress.shift();
        prevAddress.shift();
        rectGroup.shift();
        barLineNext.shift();
        barLinePrev.shift();
        for (i=0; i<group.length;i+=1){
            if (i>0) nextAddress[i-1].innerHTML = (i+1)*100;
            if (i>=0) prevAddress[i].innerHTML = (i)*100;
        }
        for(i = 0; i<group.length; i+=1 ){
            index[i].innerHTML=(i+1)*100;
            group[i].setAttribute("transform","translate("+temp+","+groupY+")");
            temp += groupGap;
        }
        temp = 74;
    }
} 
async function deleteMiddle(){

    deletioninmiddle()
    position = document.getElementById('position').value;
    if (position == ""){
        alert("Insert any index to delete");
        return;
    }
    position = parseInt(position);

    if (count==0){
        headValue.innerHTML = "X";
        document.getElementById("bar-container").removeChild(verticleLine); 
    }

    if(count>=0){
        groupX -= groupGap;
        count-=1;
        let temp2 = (74+groupGap*position);
        // rectValue[position].setAttribute("fill","red");
        // rectAddress[position].setAttribute("fill","red");
        group[position].setAttribute("transform","translate("+(74+(groupGap*position))+","+350+")");
        await sleep(500);
        document.getElementById("bar-container").removeChild(group[position]);
        value_arr.splice(position,1);
        group.splice(position,1);
        index.splice(position,1);
        text.splice(position,1);
        rectAddress.splice(position,1);
        rectProfit.splice(position,1);
        nextAddress.splice(position,1);
        prevAddress.splice(position,1);
        for (i=position; i<group.length;i+=1){
            if (i>0) nextAddress[i-1].innerHTML = (i+1)*100;
            if (i>=0) prevAddress[i].innerHTML = (i)*100;
        }
        for(i = position; i<group.length; i+=1 ){
            index[i].innerHTML=(i+1)*100;
            group[i].setAttribute("transform","translate("+temp2+","+groupY+")");
            temp2 += groupGap;
        }
        // temp = (74+groupGap*position);
    }
} 


function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function insertinstart() {
    document.getElementById("l0").innerText = "";
    document.getElementById("l1").innerText = "SET NEW_NODE = PTR";
    document.getElementById("l2").innerText = "SET ptr = ptr -> NEXT";
    document.getElementById("l3").innerText = "SET NEW_NODE -> DATA = VAL";
    document.getElementById("l4").innerText = " SET NEW_NODE -> PREV = NULL";
    document.getElementById("l5").innerText = "SET NEW_NODE -> NEXT = START";
    document.getElementById("l6").innerText = "SET head -> PREV = NEW_NODE";
    document.getElementById("l7").innerText = "SET head = NEW_NODE";
  }
  function insertinend() {
    document.getElementById("l0").innerText = "SET NEW_NODE = PTR";
    document.getElementById("l1").innerText = "SET PTR = PTR - > NEXT";
    document.getElementById("l2").innerText = "SET NEW_NODE - > DATA = VAL";
    document.getElementById("l3").innerText = "SET NEW_NODE - > NEXT = NULL";
    document.getElementById("l4").innerText = "SET TEMP = START";
    document.getElementById("l5").innerText = "SET TEMP -> NEXT = NEW_NODE";
    document.getElementById("l6").innerText = "SET NEW_NODE -> PREV = TEMP";
    document.getElementById("l7").innerText = "EXIT";
}
  function insertinmiddle() {
    document.getElementById("l0").innerText = "SET NEW_NODE = PTR";
    document.getElementById("l1").innerText = "SET PTR = PTR -> NEXT";
    document.getElementById("l2").innerText = "SET NEW_NODE -> DATA = VAL";
    document.getElementById("l3").innerText = "SET TEMP = START";
    document.getElementById("l4").innerText = "SET TEMP = TEMP -> NEXT";
    document.getElementById("l5").innerText = "SET NEW_NODE -> NEXT = TEMP -> NEXT";
    document.getElementById("l6").innerText = " SET NEW_NODE -> PREV = TEMP";
    document.getElementById("l7").innerText = "SET TEMP -> NEXT = NEW_NODE";
  }

  function deletioninstart() {
    document.getElementById("l1").innerText = "SET PTR = HEAD";
    document.getElementById("l2").innerText = "SET HEAD = HEAD -> NEXT";
    document.getElementById("l3").innerText = "SET HEAD → PREV = NULL";
    document.getElementById("l3").innerText = "FREE PTR";
    document.getElementById("l5").innerText = "EXIT";
    document.getElementById("l6").innerText = "";
    document.getElementById("l7").innerText = "";
  }
  function deletioninend() {
    document.getElementById("l0").innerText = "SET PTR = HEAD";
    document.getElementById("l1").innerText = "SET PREPTR = PTR";
    document.getElementById("l2").innerText = "SET PTR = PTR -> NEXT";
    document.getElementById("l3").innerText = "SET TEMP ->PREV-> NEXT = NULL";
    document.getElementById("l4").innerText = "FREE PTR";
    document.getElementById("l5").innerText = "EXIT";
    document.getElementById("l6").innerText = "";
    document.getElementById("l7").innerText = "";
}

function deletioninmiddle() {
    document.getElementById("l0").innerText = "SET TEMP = HEAD";
    document.getElementById("l1").innerText = "SET TEMP = TEMP -> NEXT";
    document.getElementById("l2").innerText = "SET PTR = TEMP -> NEXT";
    document.getElementById("l3").innerText = "SET TEMP -> NEXT = PTR -> NEXT";
    document.getElementById("l4").innerText = "SET PTR -> NEXT -> PREV = TEMP";
    document.getElementById("l5").innerText = "FREE PTR";
    document.getElementById("l6").innerText = "";
    document.getElementById("l7").innerText = "";
  }




// function nodeLine(i){
//     barLine[i] = document.createElementNS(svgns, "line");
//     barLine[i].setAttribute("x1","-40");
//     barLine[i].setAttribute("y1","30");
//     barLine[i].setAttribute("x2","0");
//     barLine[i].setAttribute("y2","30");
//     barLine[i].setAttribute("stroke","black");
//     barLine[i].setAttribute("stroke-width","5");
//     rectGroup[i].appendChild(barLine[i]);
// }
// function createRectValue(i){
//     rectValue[i] = document.createElementNS(svgns, "rect");
//     rectValue[i].setAttribute("ry", rect_ry.toString());
//     rectValue[i].setAttribute("height",rect_height.toString());
//     rectValue[i].setAttribute("width",rect_width.toString());
//     rectValue[i].setAttribute("stroke","black");
//     rectValue[i].setAttribute("x","60");
//     rectValue[i].setAttribute("fill",rect_fill);
//     rectGroup[i].appendChild(rectValue[i]);
// }
// function createRectPrev(i){
//     rectPrev[i] = document.createElementNS(svgns, "rect");
//     rectPrev[i].setAttribute("ry", rect_ry.toString());
//     rectPrev[i].setAttribute("height",rect_height.toString());
//     rectPrev[i].setAttribute("width",rect_width.toString());
//     rectPrev[i].setAttribute("stroke","black");
//     rectPrev[i].setAttribute("fill","red");
//     rectGroup[i].appendChild(rectPrev[i]);
// }
// function createRectNext(i){
//     rectAddress[i] = document.createElementNS(svgns, "rect");
//     rectAddress[i].setAttribute("ry", rect_ry.toString());
//     rectAddress[i].setAttribute("height",rect_height.toString());
//     rectAddress[i].setAttribute("x","120");
//     rectAddress[i].setAttribute("width",rect_width.toString());
//     rectAddress[i].setAttribute("stroke","black");
//     rectAddress[i].setAttribute("fill","green");
//     rectGroup[i].appendChild(rectAddress[i]);
// }











