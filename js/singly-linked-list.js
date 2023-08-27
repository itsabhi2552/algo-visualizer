const svgns =  "http://www.w3.org/2000/svg";

let x_axis_arr = [];
let value_arr = [];
let count = -1;
let indexing = 0;
let label = [];
let labelAdd = [];

let tr=0;
let trAdd = 0;
let text = [];
let text_x = 30;
let text_y = 35;

let textAddress = [];
let textA_x = 90;
let textA_y = 35;

let barLine = [];

let rectValue = [];
let rectAddress = [];
let rect_ry = 10;
let rect_width = 60;
let rect_height = 60;
let rect_fill = "orange";

let rectGroup=[];
let group = []
let groupX = temp =100;
let groupY = 240;
let groupGap = 150;

let index = [];
let indexX = 30;
let indexY = 80;
let indexCount = 0;

let position = 0;
let flag = false;
let flagMiddle = false;


function targetRect(){
    pByw = document.createElementNS(svgns, "rect")
    pByw.setAttribute("ry", rect_ry.toString());
    pByw.setAttribute("width", rect_width.toString());
    pByw.setAttribute("height", rect_height.toString());
    pByw.setAttribute("x", "10");
    pByw.setAttribute("y", "240");
    pByw.setAttribute("stroke","black");
    pByw.setAttribute("fill",rect_fill);
    // tr.innerHTML = "100";
    document.getElementById("bar-container").appendChild(pByw);

    let start = document.createElementNS(svgns,"text");
    start.setAttribute("x","40");
    start.setAttribute("y","237");
    start.setAttribute("stroke","#808080");
    start.setAttribute("text-anchor","middle");
    start.innerHTML = "Start";
    document.getElementById("bar-container").appendChild(start);

}

function nodeLine(i){
    barLine[i] = document.createElementNS(svgns, "line");
    barLine[i].setAttribute("x1","-40");
    barLine[i].setAttribute("y1","30");
    barLine[i].setAttribute("x2","0");
    barLine[i].setAttribute("y2","30");
    barLine[i].setAttribute("stroke","black");
    barLine[i].setAttribute("stroke-width","5");
    rectGroup[i].appendChild(barLine[i]);
}
function createRectValue(i){
    rectValue[i] = document.createElementNS(svgns, "rect");
    rectValue[i].setAttribute("ry", rect_ry.toString());
    rectValue[i].setAttribute("height",rect_height.toString());
    rectValue[i].setAttribute("width",rect_width.toString());
    rectValue[i].setAttribute("stroke","black");
    rectValue[i].setAttribute("fill",rect_fill);
    rectGroup[i].appendChild(rectValue[i]);
}
function createRectAddress(i){
    rectAddress[i] = document.createElementNS(svgns, "rect");
    rectAddress[i].setAttribute("ry", rect_ry.toString());
    rectAddress[i].setAttribute("height",rect_height.toString());
    rectAddress[i].setAttribute("x","60");
    rectAddress[i].setAttribute("width",rect_width.toString());
    rectAddress[i].setAttribute("stroke","black");
    rectAddress[i].setAttribute("fill",rect_fill);
    rectGroup[i].appendChild(rectAddress[i]);
}
function createTextValue(i){
    text[i] = document.createElementNS(svgns,"text");
    text[i].setAttribute("x",text_x.toString());
    text[i].setAttribute("y",text_y.toString());
    text[i].setAttribute("stroke","black");
    text[i].setAttribute("text-anchor","middle");
    text[i].innerHTML = value_arr[i];
    group[i].appendChild(text[i]);
}
function createTextAddress(i){
    textAddress[i] = document.createElementNS(svgns,"text");
    textAddress[i].setAttribute("x",textA_x.toString());
    textAddress[i].setAttribute("y",textA_y.toString());
    textAddress[i].setAttribute("stroke","black");
    textAddress[i].setAttribute("text-anchor","middle");
    if (i==0){
        trAdd = document.createElementNS(svgns,"text");
        trAdd.setAttribute("x","40");
        trAdd.setAttribute("y","275");
        trAdd.setAttribute("stroke","black");
        trAdd.setAttribute("text-anchor","middle");
        trAdd.innerHTML = "100";
        document.getElementById("bar-container").appendChild(trAdd);

    }
    if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
    group[i].appendChild(textAddress[i]);
}

function createIndex(i){
    index[i] = document.createElementNS(svgns,"text");
    index[i].setAttribute("x",indexX.toString());
    index[i].setAttribute("y",indexY.toString());
    index[i].setAttribute("stroke","black");
    index[i].setAttribute("text-anchor","middle");
    index[i].innerHTML = (i+1)*100;
    group[i].appendChild(index[i]);
}

function createLabel(i){
    label[i] = document.createElementNS(svgns,"text");
    labelAdd[i] = document.createElementNS(svgns,"text");

    label[i].setAttribute("x","30");
    label[i].setAttribute("y","-5");
    label[i].setAttribute("stroke","#808080");
    label[i].setAttribute("text-anchor", "middle");
    label[i].innerHTML = "Data";
    group[i].appendChild(label[i]);

    labelAdd[i].setAttribute("x","90");
    labelAdd[i].setAttribute("y","-5");
    labelAdd[i].setAttribute("stroke","#808080");
    labelAdd[i].setAttribute("text-anchor", "middle");
    labelAdd[i].innerHTML = "Next";
    group[i].appendChild(labelAdd[i]);
}

async function clearElements(){
    while(count!=-1){
        document.getElementById("bar-container").removeChild(group[count]);  
        group.pop();
        value_arr.pop();
        count-=1;
    }
    trAdd.innerHTML = "";
    groupX=100;
}

async function createRectGroup(i){
    rectGroup[i] = document.createElementNS(svgns,"g");
    createRectValue(i);
    createRectAddress(i);
    nodeLine(i);
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
        group[i].setAttribute("transform","translate("+(100+(groupGap*position))+","+groupY+")");
        flagMiddle = false;
    }else if (flag == true){
        group[i].setAttribute("transform","translate("+100+","+150+")");
        document.getElementById("bar-container").appendChild(group[i]);
        await sleep(200);
        group[0].setAttribute("transform","translate("+100+","+groupY+")");
        flag = false;
    }else{
        group[i].setAttribute("transform","translate("+groupX+","+150+")");
        document.getElementById("bar-container").appendChild(group[i]);
        await sleep(200);
        group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
    }    
    x_axis_arr[i] = groupX;
    groupX += groupGap;
}

document.addEventListener("keypress", function(e){
    if (e.key === "Enter"){
      insert();
    }
}, false);
document.addEventListener("keypress", function(e){
    if (e.key === "d"){
      remove();
    }
}, false);

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
    trAdd.innerHTML = "";
    temp2 = 100;
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
    textAddress.unshift(0);
    label.unshift(0);

    createGroup(0);
    createRectGroup(0);
    createIndex(0);
    createTextValue(0);
    createTextAddress(0);
    createLabel(0);
    for (i=0; i<group.length-1;i+=1){
        textAddress[i].innerHTML = (i+2)*100;
    }  
}

async function insertMiddle(){
    insertinmiddle()
    flagMiddle = true;
    groupX += groupGap;
    // trAdd.innerHTML = "";
    position = document.getElementById('position').value;
    position = parseInt(position);
    let input = document.getElementById('user-arr').value;
    input = parseInt(input);
    temp2 = 100+(groupGap*position);
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
    textAddress.splice(position, 0, 0);
    label.splice(position, 0, 0);

    createGroup(position);
    createRectGroup(position);
    createIndex(position);
    createTextValue(position);
    createTextAddress(position);
    createLabel(position);
    for (i=1; i<group.length;i+=1){
        textAddress[i].innerHTML = (i+2)*100;
    }  
}

async function remove(){
    deletioninend()
    if (count==0){
        trAdd.innerHTML = "";
    }
    if (count!= -1){
        document.getElementById("bar-container").removeChild(group[count]);
        group.pop();
        value_arr.pop();
        rectValue.pop();
        textAddress.pop();
        groupX -= groupGap;
        count-=1;
    }
    
} 

async function deleteStart(){
    deletioninstart()

    if (count==0){
        trAdd.innerHTML = "";
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
        rectGroup.shift();
        group.shift();
        index.shift();
        text.shift();
        rectAddress.shift();
        rectValue.shift();
        textAddress.shift();
        for (i=0; i<group.length;i+=1){
            if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
        }
        for(i = 0; i<group.length; i+=1 ){
            index[i].innerHTML=(i+1)*100;
            group[i].setAttribute("transform","translate("+temp+","+groupY+")");
            temp += groupGap;
        }
        temp = 100;
    }
} 
async function deleteMiddle(){
    deletioninmiddle()

    position = document.getElementById('position').value;
    position = parseInt(position);

    if (count==0){
        trAdd.innerHTML = "";
    }

    if(count>=0){
        groupX -= groupGap;
        count-=1;
        let temp2 = (100+groupGap*position);
        // rectValue[position].setAttribute("fill","red");
        // rectAddress[position].setAttribute("fill","red");
        group[position].setAttribute("transform","translate("+(100+(groupGap*position))+","+350+")");
        await sleep(500);
        document.getElementById("bar-container").removeChild(group[position]);
        value_arr.splice(position,1);
        group.splice(position,1);
        index.splice(position,1);
        text.splice(position,1);
        rectAddress.splice(position,1);
        rectValue.splice(position,1);
        textAddress.splice(position,1);
        for (i=position; i<group.length;i+=1){
            if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
        }
        for(i = position; i<group.length; i+=1 ){
            index[i].innerHTML=(i+1)*100;
            group[i].setAttribute("transform","translate("+temp2+","+groupY+")");
            temp2 += groupGap;
        }
        temp = (100+groupGap*position);
    }
} 

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function insertinstart() {
    document.getElementById("l0").innerText = "";
    document.getElementById("l1").innerText = "SET NEW_NODE = PTR";
    document.getElementById("l2").innerText = "SET NEW_NODE → DATA = VAL";
    document.getElementById("l3").innerText = "SET NEW_NODE → DATA = VAL";
    document.getElementById("l4").innerText = "SET NEW_NODE → NEXT = HEAD";
    document.getElementById("l5").innerText = "SET HEAD = NEW_NODE";
    document.getElementById("l6").innerText = "EXIT";
  }
  function insertinend() {
    document.getElementById("l0").innerText = "SET NEW_NODE = PTR";
    document.getElementById("l1").innerText = "SET PTR = PTR - > NEXT";
    document.getElementById("l2").innerText = "SET NEW_NODE - > DATA = VAL";
    document.getElementById("l3").innerText = "SET NEW_NODE - > NEXT = NULL";
    document.getElementById("l4").innerText = "SET PTR = HEAD";
    document.getElementById("l5").innerText = "SET PTR = PTR - > NEXT";
    document.getElementById("l6").innerText = "SET PTR - > NEXT = NEW_NODE";
    document.getElementById("l7").innerText = "EXIT";
}
  function insertinmiddle() {
    document.getElementById("l0").innerText = "SET NEW_NODE = PTR";
    document.getElementById("l1").innerText = "NEW_NODE → DATA = VAL";
    document.getElementById("l2").innerText = "SET TEMP = HEAD";
    document.getElementById("l3").innerText = "TEMP = TEMP → NEXT";
    document.getElementById("l4").innerText = "PTR → NEXT = TEMP → NEXT";
    document.getElementById("l5").innerText = "TEMP → NEXT = PTR";
    document.getElementById("l6").innerText = "SET PTR = NEW_NODE";
    document.getElementById("l7").innerText = "EXIT";
  }

  function deletioninstart() {
    document.getElementById("l0").innerText = "";
    document.getElementById("l1").innerText = "SET PTR = HEAD";
    document.getElementById("l2").innerText = "SET HEAD = HEAD -> NEXT";
    document.getElementById("l3").innerText = "FREE PTR";
    document.getElementById("l4").innerText = "EXIT";
    document.getElementById("l5").innerText = "";
    document.getElementById("l6").innerText = "";
    document.getElementById("l7").innerText = "";
  }
  function deletioninend() {
    document.getElementById("l0").innerText = "SET PTR = HEAD";
    document.getElementById("l1").innerText = "SET PREPTR = PTR";
    document.getElementById("l2").innerText = "SET PTR = PTR -> NEXT";
    document.getElementById("l3").innerText = "SET PREPTR -> NEXT = NULL";
    document.getElementById("l4").innerText = "FREE PTR";
    document.getElementById("l5").innerText = "EXIT";
    document.getElementById("l6").innerText = "";
    document.getElementById("l7").innerText = "";
}

function deletioninmiddle() {
    document.getElementById("l0").innerText = "SET TEMP = HEAD";
    document.getElementById("l1").innerText = "TEMP1 = TEMP";
    document.getElementById("l2").innerText = "TEMP = TEMP → NEXT";
    document.getElementById("l3").innerText = "TEMP1 → NEXT = TEMP → NEXT";
    document.getElementById("l4").innerText = "FREE TEMP";
    document.getElementById("l5").innerText = "EXIT";
    document.getElementById("l6").innerText = "";
    document.getElementById("l7").innerText = "";
  }


























// const svgns =  "http://www.w3.org/2000/svg";

// let x_axis_arr = [];
// let value_arr = [];
// let count = -1;
// let indexing = 0;
// let label = [];
// let labelAdd = [];

// let tr=0;
// let trAdd = 0;
// let text = [];
// let text_x = 30;
// let text_y = 35;

// let textAddress = [];
// let textA_x = 90;
// let textA_y = 35;

// let barLine = [];

// let rectValue = [];
// let rectAddress = [];
// let rect_ry = 10;
// let rect_width = 60;
// let rect_height = 60;
// let rect_fill = "orange";

// let rectGroup=[];
// let group = []
// let groupX = temp =100;
// let groupY = 240;
// let groupGap = 150;

// let index = [];
// let indexX = 30;
// let indexY = 80;
// let indexCount = 0;
// let flag = false;


// function targetRect(){
//     tr = document.createElementNS(svgns, "rect")
//     tr.setAttribute("ry", rect_ry.toString());
//     tr.setAttribute("width", rect_width.toString());
//     tr.setAttribute("height", rect_height.toString());
//     tr.setAttribute("x", "10");
//     tr.setAttribute("y", "240");
//     tr.setAttribute("stroke","black");
//     tr.setAttribute("fill",rect_fill);
//     // tr.innerHTML = "100";
//     document.getElementById("bar-container").appendChild(tr);

//     let start = document.createElementNS(svgns,"text");
//     start.setAttribute("x","40");
//     start.setAttribute("y","237");
//     start.setAttribute("stroke","#808080");
//     start.setAttribute("text-anchor","middle");
//     start.innerHTML = "Start";
//     document.getElementById("bar-container").appendChild(start);

// }

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
//     rectValue[i].setAttribute("fill",rect_fill);
//     rectGroup[i].appendChild(rectValue[i]);
// }
// function createRectAddress(i){
//     rectAddress[i] = document.createElementNS(svgns, "rect");
//     rectAddress[i].setAttribute("ry", rect_ry.toString());
//     rectAddress[i].setAttribute("height",rect_height.toString());
//     rectAddress[i].setAttribute("x","60");
//     rectAddress[i].setAttribute("width",rect_width.toString());
//     rectAddress[i].setAttribute("stroke","black");
//     rectAddress[i].setAttribute("fill",rect_fill);
//     rectGroup[i].appendChild(rectAddress[i]);
// }
// function createTextValue(i){
//     text[i] = document.createElementNS(svgns,"text");
//     text[i].setAttribute("x",text_x.toString());
//     text[i].setAttribute("y",text_y.toString());
//     text[i].setAttribute("stroke","black");
//     text[i].setAttribute("text-anchor","middle");
//     text[i].innerHTML = value_arr[i];
//     group[i].appendChild(text[i]);
// }
// function createTextAddress(i){
//     textAddress[i] = document.createElementNS(svgns,"text");
//     textAddress[i].setAttribute("x",textA_x.toString());
//     textAddress[i].setAttribute("y",textA_y.toString());
//     textAddress[i].setAttribute("stroke","black");
//     textAddress[i].setAttribute("text-anchor","middle");
//     if (i==0){
//         trAdd = document.createElementNS(svgns,"text");
//         trAdd.setAttribute("x","40");
//         trAdd.setAttribute("y","275");
//         trAdd.setAttribute("stroke","black");
//         trAdd.setAttribute("text-anchor","middle");
//         trAdd.innerHTML = "100";
//         document.getElementById("bar-container").appendChild(trAdd);

//     }
//     if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
//     group[i].appendChild(textAddress[i]);
// }

// function createIndex(i){
//     index[i] = document.createElementNS(svgns,"text");
//     index[i].setAttribute("x",indexX.toString());
//     index[i].setAttribute("y",indexY.toString());
//     index[i].setAttribute("stroke","black");
//     index[i].setAttribute("text-anchor","middle");
//     index[i].innerHTML = (i+1)*100;
//     group[i].appendChild(index[i]);
// }

// function createLabel(i){
//     label[i] = document.createElementNS(svgns,"text");
//     labelAdd[i] = document.createElementNS(svgns,"text");

//     label[i].setAttribute("x","30");
//     label[i].setAttribute("y","-5");
//     label[i].setAttribute("stroke","#808080");
//     label[i].setAttribute("text-anchor", "middle");
//     label[i].innerHTML = "Data";
//     group[i].appendChild(label[i]);

//     labelAdd[i].setAttribute("x","90");
//     labelAdd[i].setAttribute("y","-5");
//     labelAdd[i].setAttribute("stroke","#808080");
//     labelAdd[i].setAttribute("text-anchor", "middle");
//     labelAdd[i].innerHTML = "Add.";
//     group[i].appendChild(labelAdd[i]);
// }

// async function clearElements(){
//     while(count!=-1){
//         document.getElementById("bar-container").removeChild(group[count]);  
//         group.pop();
//         value_arr.pop();
//         count-=1;
//     }
//     trAdd.innerHTML = "";
//     groupX=100;
// }

// async function createRectGroup(i){
//     rectGroup[i] = document.createElementNS(svgns,"g");
//     createRectValue(i);
//     createRectAddress(i);
//     nodeLine(i);
//     group[i].appendChild(rectGroup[i]);
// }

// async function createGroup(i){
//     group[i] = document.createElementNS(svgns,"g");
//     group[i].setAttribute("transform","translate("+groupX+","+150+")");
//     document.getElementById("bar-container").appendChild(group[i]);
//     await sleep(200);
//     if (flag == true){
//         group[0].setAttribute("transform","translate("+100+","+groupY+")");
//         flag = false;
//     }else{
//         group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
//     }    
//     x_axis_arr[i] = groupX;
//     groupX += groupGap;
// }

// document.addEventListener("keypress", function(e){
//     if (e.key === "Enter"){
//       insert();
//     }
// }, false);
// document.addEventListener("keypress", function(e){
//     if (e.key === "d"){
//       remove();
//     }
// }, false);

// async function insert(){
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     input = parseInt(input);
//     value_arr[count] = input;
//     createGroup(count);
//     createRectGroup(count);
//     createIndex(count);
//     createTextValue(count);
//     createTextAddress(count);
//     createLabel(count);
// }
// async function insertStart(){
//     flag = true;
//     groupX += groupGap;
//     temp2 = 100;
//     for(i = 0; i<group.length; i+=1 ){
//         let x = i+1;
//         temp2 += groupGap;
//         index[i].innerHTML=(x+1)*100;
//         group[i].setAttribute("transform","translate("+temp2+","+groupY+")"); 
//     }
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     input = parseInt(input);
//     value_arr.unshift(input);


//     group.unshift(0);
//     rectGroup.unshift(0);
//     index.unshift(0);
//     text.unshift(0);
//     textAddress.unshift(0);
//     label.unshift(0);

//     createGroup(0);
//     createRectGroup(0);
//     createIndex(0);
//     createTextValue(0);
//     createTextAddress(0);
//     createLabel(0);
//     // for (i=0; i<group.length;i+=1){
//     //     if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
//     // }
    
// }

// async function remove(){
//     if (count==0){
//         trAdd.innerHTML = "";
//     }
//     if (count!= -1){
//         document.getElementById("bar-container").removeChild(group[count]);
//         group.pop();
//         value_arr.pop();
//         groupX -= groupGap;
//         count-=1;
//     }
    
// } 

// async function deleteStart(){

//     if (count==0){
//         trAdd.innerHTML = "";
//     }

//     if(count>=0){
//         groupX -= groupGap;
//         count-=1;
//         rectValue[0].setAttribute("fill","red");
//         rectAddress[0].setAttribute("fill","red");
//         group[0].setAttribute("transform","translate("+30+","+350+")");
//         await sleep(500);
//         document.getElementById("bar-container").removeChild(group[0]);
//         value_arr.shift();
//         group.shift();
//         index.shift();
//         text.shift();
//         rectAddress.shift();
//         rectValue.shift();
//         textAddress.shift();
//         for (i=0; i<group.length;i+=1){
//             if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
//         }
//         for(i = 0; i<group.length; i+=1 ){
//             index[i].innerHTML=(i+1)*100;
//             group[i].setAttribute("transform","translate("+temp+","+groupY+")");
//             temp += groupGap;
//         }
//         temp = 100;
//     }
// } 

// function sleep(ms){
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }











// const svgns =  "http://www.w3.org/2000/svg";

// let x_axis_arr = [];
// let value_arr = [];
// let count = -1;
// let indexing = 0;
// let label = [];
// let labelAdd = [];

// let tr=0;
// let trAdd = 0;
// let text = [];
// let text_x = 30;
// let text_y = 35;

// let textAddress = [];
// let textA_x = 90;
// let textA_y = 35;

// let barLine = [];

// let rectValue = [];
// let rectAddress = [];
// let rect_ry = 10;
// let rect_width = 60;
// let rect_height = 60;
// let rect_fill = "orange";

// let rectGroup=[];
// let group = []
// let groupX = temp =100;
// let groupY = 240;
// let groupGap = 150;

// let index = [];
// let indexX = 30;
// let indexY = 80;
// let indexCount = 0;

// let flag = false;
// let flagMiddle = false;


// function targetRect(){
//     tr = document.createElementNS(svgns, "rect")
//     tr.setAttribute("ry", rect_ry.toString());
//     tr.setAttribute("width", rect_width.toString());
//     tr.setAttribute("height", rect_height.toString());
//     tr.setAttribute("x", "10");
//     tr.setAttribute("y", "240");
//     tr.setAttribute("stroke","black");
//     tr.setAttribute("fill",rect_fill);
//     // tr.innerHTML = "100";
//     document.getElementById("bar-container").appendChild(tr);

//     let start = document.createElementNS(svgns,"text");
//     start.setAttribute("x","40");
//     start.setAttribute("y","237");
//     start.setAttribute("stroke","#808080");
//     start.setAttribute("text-anchor","middle");
//     start.innerHTML = "Start";
//     document.getElementById("bar-container").appendChild(start);

// }

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
//     rectValue[i].setAttribute("fill",rect_fill);
//     rectGroup[i].appendChild(rectValue[i]);
// }
// function createRectAddress(i){
//     rectAddress[i] = document.createElementNS(svgns, "rect");
//     rectAddress[i].setAttribute("ry", rect_ry.toString());
//     rectAddress[i].setAttribute("height",rect_height.toString());
//     rectAddress[i].setAttribute("x","60");
//     rectAddress[i].setAttribute("width",rect_width.toString());
//     rectAddress[i].setAttribute("stroke","black");
//     rectAddress[i].setAttribute("fill",rect_fill);
//     rectGroup[i].appendChild(rectAddress[i]);
// }
// function createTextValue(i){
//     text[i] = document.createElementNS(svgns,"text");
//     text[i].setAttribute("x",text_x.toString());
//     text[i].setAttribute("y",text_y.toString());
//     text[i].setAttribute("stroke","black");
//     text[i].setAttribute("text-anchor","middle");
//     text[i].innerHTML = value_arr[i];
//     group[i].appendChild(text[i]);
// }
// function createTextAddress(i){
//     textAddress[i] = document.createElementNS(svgns,"text");
//     textAddress[i].setAttribute("x",textA_x.toString());
//     textAddress[i].setAttribute("y",textA_y.toString());
//     textAddress[i].setAttribute("stroke","black");
//     textAddress[i].setAttribute("text-anchor","middle");
//     if (i==0){
//         trAdd = document.createElementNS(svgns,"text");
//         trAdd.setAttribute("x","40");
//         trAdd.setAttribute("y","275");
//         trAdd.setAttribute("stroke","black");
//         trAdd.setAttribute("text-anchor","middle");
//         trAdd.innerHTML = "100";
//         document.getElementById("bar-container").appendChild(trAdd);

//     }
//     if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
//     group[i].appendChild(textAddress[i]);
// }

// function createIndex(i){
//     index[i] = document.createElementNS(svgns,"text");
//     index[i].setAttribute("x",indexX.toString());
//     index[i].setAttribute("y",indexY.toString());
//     index[i].setAttribute("stroke","black");
//     index[i].setAttribute("text-anchor","middle");
//     index[i].innerHTML = (i+1)*100;
//     group[i].appendChild(index[i]);
// }

// function createLabel(i){
//     label[i] = document.createElementNS(svgns,"text");
//     labelAdd[i] = document.createElementNS(svgns,"text");

//     label[i].setAttribute("x","30");
//     label[i].setAttribute("y","-5");
//     label[i].setAttribute("stroke","#808080");
//     label[i].setAttribute("text-anchor", "middle");
//     label[i].innerHTML = "Data";
//     group[i].appendChild(label[i]);

//     labelAdd[i].setAttribute("x","90");
//     labelAdd[i].setAttribute("y","-5");
//     labelAdd[i].setAttribute("stroke","#808080");
//     labelAdd[i].setAttribute("text-anchor", "middle");
//     labelAdd[i].innerHTML = "Add.";
//     group[i].appendChild(labelAdd[i]);
// }

// async function clearElements(){
//     while(count!=-1){
//         document.getElementById("bar-container").removeChild(group[count]);  
//         group.pop();
//         value_arr.pop();
//         count-=1;
//     }
//     trAdd.innerHTML = "";
//     groupX=100;
// }

// async function createRectGroup(i){
//     rectGroup[i] = document.createElementNS(svgns,"g");
//     createRectValue(i);
//     createRectAddress(i);
//     nodeLine(i);
//     group[i].appendChild(rectGroup[i]);
// }

// async function createGroup(i){
//     group[i] = document.createElementNS(svgns,"g");
//     // group[i].setAttribute("transform","translate("+groupX+","+150+")");
//     // document.getElementById("bar-container").appendChild(group[i]);
//     // await sleep(200);
//     if (flagMiddle == true){
//         group[i].setAttribute("transform","translate("+(100+groupGap)+","+150+")");
//         document.getElementById("bar-container").appendChild(group[i]);
//         await sleep(200);
//         group[0].setAttribute("transform","translate("+100+","+groupY+")");
//         flagMiddle = false;
//     }else if (flag == true){
//         group[i].setAttribute("transform","translate("+100+","+150+")");
//         document.getElementById("bar-container").appendChild(group[i]);
//         await sleep(200);
//         group[0].setAttribute("transform","translate("+100+","+groupY+")");
//         flag = false;
//     }else{
//         group[i].setAttribute("transform","translate("+groupX+","+150+")");
//         document.getElementById("bar-container").appendChild(group[i]);
//         await sleep(200);
//         group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
//     }    
//     x_axis_arr[i] = groupX;
//     groupX += groupGap;
// }

// document.addEventListener("keypress", function(e){
//     if (e.key === "Enter"){
//       insert();
//     }
// }, false);
// document.addEventListener("keypress", function(e){
//     if (e.key === "d"){
//       remove();
//     }
// }, false);

// async function insert(){
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     input = parseInt(input);
//     value_arr[count] = input;
//     createGroup(count);
//     createRectGroup(count);
//     createIndex(count);
//     createTextValue(count);
//     createTextAddress(count);
//     createLabel(count);
// }
// async function insertStart(){
//     flag = true;
//     // groupX += groupGap;
//     trAdd.innerHTML = "";
//     temp2 = 100;
//     for(i = 0; i<group.length; i+=1 ){
//         let x = i+1;
//         temp2 += groupGap;
//         index[i].innerHTML=(x+1)*100;
//         group[i].setAttribute("transform","translate("+temp2+","+groupY+")"); 
//     }
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     input = parseInt(input);
//     value_arr.unshift(input);


//     group.unshift(0);
//     rectGroup.unshift(0);
//     index.unshift(0);
//     text.unshift(0);
//     textAddress.unshift(0);
//     label.unshift(0);

//     createGroup(0);
//     createRectGroup(0);
//     createIndex(0);
//     createTextValue(0);
//     createTextAddress(0);
//     createLabel(0);
//     for (i=0; i<group.length;i+=1){
//         textAddress[i].innerHTML = (i+2)*100;
//     }  
// }

// async function insertMiddle(){
//     flagMiddle = true;
//     // groupX += groupGap;
//     trAdd.innerHTML = "";
//     temp2 = 100+(group*1);
//     for(i = 2; i<group.length; i+=1 ){
//         let x = i+1;
//         temp2 += groupGap;
//         index[i].innerHTML=(x+1)*100;
//         group[i].setAttribute("transform","translate("+temp2+","+groupY+")"); 
//     }
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     input = parseInt(input);
//     value_arr.splice(1, 0, input);


//     group.splice(1, 0, 0);
//     rectGroup.splice(1, 0, 0);
//     index.splice(1, 0, 0);
//     text.splice(1, 0, 0);
//     textAddress.splice(1, 0, 0);
//     label.splice(1, 0, 0);

//     createGroup(1);
//     createRectGroup(1);
//     createIndex(1);
//     createTextValue(1);
//     createTextAddress(1);
//     createLabel(1);
//     // for (i=0; i<group.length;i+=1){
//     //     textAddress[i].innerHTML = (i+2)*100;
//     // }  
// }

// async function remove(){
//     if (count==0){
//         trAdd.innerHTML = "";
//     }
//     if (count!= -1){
//         document.getElementById("bar-container").removeChild(group[count]);
//         group.pop();
//         value_arr.pop();
//         groupX -= groupGap;
//         count-=1;
//     }
    
// } 

// async function deleteStart(){

//     if (count==0){
//         trAdd.innerHTML = "";
//     }

//     if(count>=0){
//         groupX -= groupGap;
//         count-=1;
//         rectValue[0].setAttribute("fill","red");
//         rectAddress[0].setAttribute("fill","red");
//         group[0].setAttribute("transform","translate("+30+","+350+")");
//         await sleep(500);
//         document.getElementById("bar-container").removeChild(group[0]);
//         value_arr.shift();
//         group.shift();
//         index.shift();
//         text.shift();
//         rectAddress.shift();
//         rectValue.shift();
//         textAddress.shift();
//         for (i=0; i<group.length;i+=1){
//             if (i>0) textAddress[i-1].innerHTML = (i+1)*100;
//         }
//         for(i = 0; i<group.length; i+=1 ){
//             index[i].innerHTML=(i+1)*100;
//             group[i].setAttribute("transform","translate("+temp+","+groupY+")");
//             temp += groupGap;
//         }
//         temp = 100;
//     }
// } 

// function sleep(ms){
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

