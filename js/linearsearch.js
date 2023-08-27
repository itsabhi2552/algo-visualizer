const svgns =  "http://www.w3.org/2000/svg";
// let array = [];
// let bars = [];
let x_axis_arr = [];
let value_arr = [];

let target = document.getElementById("target");
let x = 0;
let tr=0,tt=0,tg=0;
let flag = true;
let userArray;
let setSpeed = document.getElementById("speed");
let timeValue = document.getElementById("timeValue");
let guide = document.getElementById("guide");

// let label = [];
let labe = 0;

let text = [];
let text_x = 30;
let text_y = 35;

let index = [];
let index_x = 30;
let index_y = 80;

let rect = []
let rect_ry = 10;
let rect_width = 60;
let rect_height = 60;
let rect_fill = "orange";

let group_arr = []
let group_x = 30;
let group_y = 260;
let group_gap = 65;

function targetRect(){
  tr = document.createElementNS(svgns, "rect")
  tr.setAttribute("ry", rect_ry.toString());
  tr.setAttribute("width", rect_width.toString());
  tr.setAttribute("height", rect_height.toString());
  tr.setAttribute("x", "360");
  tr.setAttribute("y", "120");
  tr.setAttribute("stroke","black");
  tr.setAttribute("fill",rect_fill);
  document.getElementById("bar-container").appendChild(tr);
}
function targetText(){
  tt = document.createElementNS(svgns,"text");
  tt.setAttribute("x", "390");
  tt.setAttribute("y", "155");
  tt.setAttribute("stroke","black");
  tt.setAttribute("text-anchor", "middle");
  // tt.innerHTML = "";
  // tt.innerHTML = i;
  document.getElementById("bar-container").appendChild(tt);
}
function targetGroup(i){
  tg = document.createElementNS(svgns, "g");
  tg.setAttribute("transform","translate("+group_x+","+group_y+")");
  document.getElementById("bar-container").appendChild(group_arr[i]);

  x_axis_arr[i] = group_x;
  group_x += group_gap;

}


function createRect(i){
  rect[i] = document.createElementNS(svgns, "rect");
  rect[i].setAttribute("ry", rect_ry.toString());
  rect[i].setAttribute("width", rect_width.toString());
  rect[i].setAttribute("height", rect_height.toString());
  rect[i].setAttribute("stroke","black");
  rect[i].setAttribute("fill",rect_fill);
  group_arr[i].appendChild(rect[i]);
}
function createIndex(i){
  index[i] = document.createElementNS(svgns,"text");
  index[i].setAttribute("x", index_x.toString());
  index[i].setAttribute("y", index_y.toString());
  index[i].setAttribute("stroke","black");
  index[i].setAttribute("text-anchor", "middle");
  index[i].innerHTML=[i];
  group_arr[i].appendChild(index[i]);
}
function createText(i){
  text[i] = document.createElementNS(svgns,"text");
  text[i].setAttribute("x",text_x.toString());
  text[i].setAttribute("y",text_y.toString());
  text[i].setAttribute("stroke","black");
  text[i].setAttribute("text-anchor", "middle");
  text[i].innerHTML = value_arr[i];
  group_arr[i].appendChild(text[i]);
}

function clearContainer() {
  for(let i = value_arr.length - 1; i >= 0; i--) {
      document.getElementById("bar-container").removeChild(group_arr[i]);
      value_arr.pop();
      group_arr.pop();
      rect.pop();
      text.pop();
      index.pop();
  }
}

function label(){
  labe = document.createElementNS(svgns,"text");
  labe.setAttribute("x","390");
  labe.setAttribute("y","112");
  labe.setAttribute("stroke","black");
  labe.setAttribute("text-anchor", "middle");
  labe.innerHTML = "Target";
  document.getElementById("bar-container").appendChild(labe);
  
  // if(i==0){
  //   label[i].innerHTML = "Start";
  //   group_arr[i].appendChild(label[i]);
  // }
  // if(i==value_arr.length-1){
  //   label[i].innerHTML = "End";
  //   group_arr[i].appendChild(label[i]);
  // }
  // if(value_arr[i]==x){
  //   console.log(num);
  //   label[i].innerHTML = "Found";
  //   group_arr[i].appendChild(label[i]);
  // }
}

function createGroup(i){
  group_arr[i] = document.createElementNS(svgns, "g");
  group_arr[i].setAttribute("transform","translate("+group_x+","+group_y+")");
  document.getElementById("bar-container").appendChild(group_arr[i]);

  x_axis_arr[i] = group_x;
  group_x += group_gap;

}

function random_array() {
    for(let i = 0; i < 12; i++) {
        value_arr[i] = Math.floor(Math.random() * 100) + 1;
    }
    generate_array(value_arr);
    // userRect();
}

function user_array(){
  console.log("Working");
  let userInput = document.getElementById('user-arr').value;
  if (userInput==""){
    alert("Enter some values to create an array");
    return;
  }
  let splittedValues = userInput.split(',');
  value_arr = splittedValues.map(Number);
  generate_array(value_arr)
}


function generate_array() {
    for(let i = 0; i < value_arr.length; i++) {
        createGroup(i);
        createRect(i);
        createText(i);
        createIndex(i);
        // createlabel(i);
    }
    targetRect();
    label();
    // targetText();
    group_x = 30;
    guide.innerText="Linear Search";

}

function sleep(ms){
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let speed = setSpeed.value*1000;
setSpeed.addEventListener("input", function(){
  let x = 1000-(setSpeed.value*1000);
  timeValue.innerHTML = setSpeed.value;
  speed = x;
});



function clearall(){
  for(let i = value_arr.length - 1; i >= 0; i--) {
    rect[i].setAttribute("fill",rect_fill);
  }
  tt.innerHTML = "";
  tr.setAttribute("fill","orange");
}

async function linearSearch() {
  clearall();
  disableButton();
  l = group_x;
  let num = parseInt(target.value);
  if (target.value==""){
    alert("Input a number to seaarch");
    enableButton();
    return;
  }
  targetText();
  tt.innerHTML = num;
  x = num;
  highlight_line("1");
  await sleep(speed);
  unhighlight_line("1")
  for (let i in value_arr) {
    group_arr[i].setAttribute("transform","translate("+(l)+","+200+")");
    l+=group_gap;
    m=l;
    guide.innerText="Comparing "+value_arr[i]+" with "+ num;
    highlight_line("2");
    await sleep(100);
    unhighlight_line("2")
    highlight_line("3");
    await sleep(speed);
    unhighlight_line("3")
    if (value_arr[i] === num){
      m-=group_gap;
      group_arr[i].setAttribute("transform","translate("+(m)+","+group_y+")");
      guide.innerText=value_arr[i]+" and "+ num+" are equal search complete \n found at index ["+i+"]";
      rect[i].setAttribute("fill", "green");
      tr.setAttribute("fill", "green");
      highlight_line("4");
      await sleep(speed);
      unhighlight_line("4")
      enableButton();
      return i; 
    }else{
      m-=group_gap;
      group_arr[i].setAttribute("transform","translate("+(m)+","+group_y+")");
      guide.innerText=value_arr[i]+" and "+ num+" are not equal";
      rect[i].setAttribute("fill", "red");
      tr.setAttribute("fill", "red");
      await sleep(speed)
      tr.setAttribute("fill", "orange");
      rect[i].setAttribute("fill", "orange");
    }
    await sleep(speed) ;
  }
  enableButton();
  guide.innerText="Value not found in the Array";
  highlight_line("6");
  await sleep(speed);
  unhighlight_line("6")
  return -1;
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

function disableButton(){
  document.getElementById("btnCreate").disabled=true;
  document.getElementById("btnRandom").disabled=true;
  document.getElementById("btnSearch").disabled=true;
}
function enableButton(){
  document.getElementById("btnCreate").disabled=false;
  document.getElementById("btnRandom").disabled=false;
  document.getElementById("btnSearch").disabled=false;
  target.disabled=false;
}




























// async function linearSearch() {
//   let num = parseInt(target.value);
//   x = num;
//   highlight_line("1");
//   await sleep(speed);
//   unhighlight_line("1")
//   for (let i in value_arr) {
//     guide.innerText="Comparing "+value_arr[i]+"with "+ num;
//     highlight_line("2");
//     await sleep(100);
//     unhighlight_line("2")
//     highlight_line("3");
//     await sleep(speed);
//     unhighlight_line("3")
//     if (value_arr[i] === num){
//       guide.innerText=value_arr[i]+" and "+ num+" are equal search complete \n found at index ["+i+"]";
//       rect[i].setAttribute("fill", "green");
//       highlight_line("4");
//       await sleep(speed);
//       unhighlight_line("4")
//       createlabel(i);
//       return i; 
//     }else{
//       guide.innerText=value_arr[i]+" and "+ num+" are not equal";
//       rect[i].setAttribute("fill", "red");
//       await sleep(speed)
//       rect[i].setAttribute("fill", "orange");
//     }
//     await sleep(speed) ;
//   }
//   guide.innerText="Value not found in the Array";
//   highlight_line("6");
//   await sleep(speed);
//   unhighlight_line("6")
//   return -1;
// }



// const svgns =  "http://www.w3.org/2000/svg";
// // let array = [];
// // let bars = [];
// let x_axis_arr = [];
// let value_arr = [];

// let target = document.getElementById("target");
// let x = 0;
// let tr=0,y=0;
// let userArray;
// let setSpeed = document.getElementById("speed");
// let guide = document.getElementById("guide");

// let label = [];

// let text = [];
// let text_x = 30;
// let text_y = 35;

// let index = [];
// let index_x = 30;
// let index_y = 80;

// let rect = []
// let rect_ry = 10;
// let rect_width = 60;
// let rect_height = 60;
// let rect_fill = "orange";

// let group_arr = []
// let group_x = 30;
// let group_y = 300;
// let group_gap = 65;

// // function userRect(){
// //   x = document.createElementNS(svgns, "rect")
// //   x.setAttribute("ry", rect_ry.toString());
// //   x.setAttribute("width", rect_width.toString());
// //   x.setAttribute("height", "-20");
// //   x.setAttribute("stroke","black");
// //   x.setAttribute("fill",rect_fill);
// // }

// ////////////////////////////////////////////////////////////////////////
// function targetRect(){
//   tr = document.createElementNS(svgns, "rect");
//   tr.setAttribute("ry", rect_ry.toString());
//   tr.setAttribute("x","360");
//   tr.setAttribute("y","120");
//   tr.setAttribute("width", rect_width.toString());
//   tr.setAttribute("height", rect_height.toString());
//   tr.setAttribute("stroke","black");
//   tr.setAttribute("fill",rect_fill);
//   document.getElementById("bar-container").appendChild(tr);
// }
// function targetText(v){
//   y=0;
//   y = document.createElementNS(svgns,"text");
//   y.setAttribute("x","390");
//   y.setAttribute("y","155");
//   y.setAttribute("stroke","black");
//   y.setAttribute("text-anchor", "middle");
//   y.innerHTML = v;
//   document.getElementById("bar-container").appendChild(y);
// }
// ///////////////////////////////////////////////////////////////////////////


// function createRect(i){
//   rect[i] = document.createElementNS(svgns, "rect");
//   rect[i].setAttribute("ry", rect_ry.toString());
//   rect[i].setAttribute("width", rect_width.toString());
//   rect[i].setAttribute("height", rect_height.toString());
//   rect[i].setAttribute("stroke","black");
//   rect[i].setAttribute("fill",rect_fill);
//   group_arr[i].appendChild(rect[i]);
// }
// function createIndex(i){
//   index[i] = document.createElementNS(svgns,"text");
//   index[i].setAttribute("x", index_x.toString());
//   index[i].setAttribute("y", index_y.toString());
//   index[i].setAttribute("stroke","black");
//   index[i].setAttribute("text-anchor", "middle");
//   index[i].innerHTML=[i];
//   group_arr[i].appendChild(index[i]);
// }
// function createText(i){
//   text[i] = document.createElementNS(svgns,"text");
//   text[i].setAttribute("x",text_x.toString());
//   text[i].setAttribute("y",text_y.toString());
//   text[i].setAttribute("stroke","black");
//   text[i].setAttribute("text-anchor", "middle");
//   text[i].innerHTML = value_arr[i];
//   group_arr[i].appendChild(text[i]);
// }

// function clearContainer() {
//   for(let i = value_arr.length - 1; i >= 0; i--) {
//       document.getElementById("bar-container").removeChild(group_arr[i]);
//       value_arr.pop();
//       group_arr.pop();
//       // rect.pop();
//       // text.pop();
//       // index.pop();
//   }
// }

// function createlabel(i){
//   label[i] = document.createElementNS(svgns,"text");
//   label[i].setAttribute("x",text_x.toString());
//   label[i].setAttribute("y","-10");
//   label[i].setAttribute("stroke","black");
//   label[i].setAttribute("text-anchor", "middle");
  
//   if(i==0){
//     label[i].innerHTML = "Start";
//     group_arr[i].appendChild(label[i]);
//   }
//   if(i==value_arr.length-1){
//     label[i].innerHTML = "End";
//     group_arr[i].appendChild(label[i]);
//   }
//   if(value_arr[i]==x){
//     console.log(num);
//     label[i].innerHTML = "Found";
//     group_arr[i].appendChild(label[i]);
//   }
// }

// function createGroup(i){
//   group_arr[i] = document.createElementNS(svgns, "g");
//   group_arr[i].setAttribute("transform","translate("+group_x+","+group_y+")");
//   document.getElementById("bar-container").appendChild(group_arr[i]);

//   x_axis_arr[i] = group_x;
//   group_x += group_gap;

// }

// function random_array() {
//     for(let i = 0; i < 12; i++) {
//         value_arr[i] = Math.floor(Math.random() * 100) + 1;
//     }
//     generate_array(value_arr);
//     // userRect();
// }

// function user_array(){
//   console.log("Working");
//   let userInput = document.getElementById('user-arr').value;
//   let splittedValues = userInput.split(',');
//   value_arr = splittedValues.map(Number);
//   generate_array(value_arr)
// }


// function generate_array() {
//     for(let i = 0; i < value_arr.length; i++) {
//         createGroup(i);
//         createRect(i);
//         createText(i);
//         createIndex(i);
//         createlabel(i);
//     }
//     targetRect();
//     group_x = 30;
//     guide.innerText="Linear Search";

// }

// function sleep(ms){
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// let speed = 500;
// setSpeed.addEventListener("input", function(){
//   let x = setSpeed.value;
//   speed = x;
// });

// // group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+150+")");
// //     await sleep(500);
// //     group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+groupY+")");

// async function linearSearch() {
//   l = group_x;
//   let num = parseInt(target.value);
//   targetText(num);
//   x = num;
//   highlight_line("1");
//   await sleep(speed);
//   unhighlight_line("1")
//   for (let i in value_arr) {
//     group_arr[i].setAttribute("transform","translate("+(l)+","+200+")");
//     l+=group_gap;
//     m=l;
//     guide.innerText="Comparing "+value_arr[i]+"with "+ num;
//     highlight_line("2");
//     await sleep(100);
//     unhighlight_line("2")
//     highlight_line("3");
//     await sleep(speed);
//     unhighlight_line("3")
//     if (value_arr[i] === num){
//       tr.setAttribute("fill", "green");
//       m-=group_gap;
//       group_arr[i].setAttribute("transform","translate("+(m)+","+group_y+")");
//       guide.innerText=value_arr[i]+" and "+ num+" are equal search complete \n found at index ["+i+"]";
//       rect[i].setAttribute("fill", "green");
//       highlight_line("4");
//       await sleep(speed);
//       unhighlight_line("4")
//       createlabel(i);
//       return i; 
//     }else{
//       m-=group_gap;
//       group_arr[i].setAttribute("transform","translate("+(m)+","+group_y+")");
//       guide.innerText=value_arr[i]+" and "+ num+" are not equal";
//       rect[i].setAttribute("fill", "red");
//       tr.setAttribute("fill", "red");
//       await sleep(speed)
//       tr.setAttribute("fill", "orange");
//       rect[i].setAttribute("fill", "orange");
//     }
//     await sleep(speed) ;
//   }
//   guide.innerText="Value not found in the Array";
//   highlight_line("6");
//   await sleep(speed);
//   unhighlight_line("6")
//   return -1;
// }

// function highlight_line(line) {
//   var code_line = document.getElementById("l" + line);
//   code_line.style.backgroundColor = "green";
//   code_line.style.border = "2px solid var(--black)";
//   code_line.style.borderRadius = "15px";
// }

// function unhighlight_line(line) {
//   var code_line = document.getElementById("l" + line);
//   code_line.style.backgroundColor = "";
//   code_line.style.border = "";
//   code_line.style.borderRadius = "";
// }
