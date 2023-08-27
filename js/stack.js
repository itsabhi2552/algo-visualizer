const svgns =  "http://www.w3.org/2000/svg";

let label=[]

let y_axis_arr = [];
let value_arr = [];
let count = -1;

let text = [];
let text_x = 30;
let text_y = 35;

let rect = [];
let rect_ry = 10;
let rect_width = 60;
let rect_height = 60;
let rect_fill = "orange";

let group = []
let groupX = 350;
let groupY = 435;
let groupGap = 65;

let index = [];
let indexX = -8;
let indexY = 35;

function startbar(){
    let line = document.createElementNS(svgns, "line");
    line.setAttribute("x1","430");
    line.setAttribute("y1","500");
    line.setAttribute("x2","332");
    line.setAttribute("y2","500");
    line.setAttribute("stroke","black");
    line.setAttribute("stroke-width","10");
    document.getElementById("bar-container").appendChild(line);
}

function createRect(i){
    rect[i] = document.createElementNS(svgns, "rect");
    rect[i].setAttribute("ry", rect_ry.toString());
    rect[i].setAttribute("height",rect_height.toString());
    rect[i].setAttribute("width",rect_width.toString());
    rect[i].setAttribute("stroke","black");
    rect[i].setAttribute("fill",rect_fill);
    group[i].appendChild(rect[i]);
}
function createText(i){
    text[i] = document.createElementNS(svgns,"text");
    text[i].setAttribute("x",text_x.toString());
    text[i].setAttribute("y",text_y.toString());
    text[i].setAttribute("stroke","black");
    text[i].setAttribute("text-anchor","middle");
    text[i].innerHTML = value_arr[i];
    group[i].appendChild(text[i]);
}

function createIndex(i){
    index[i] = document.createElementNS(svgns,"text");
    index[i].setAttribute("x",indexX.toString());
    index[i].setAttribute("y",indexY.toString());
    index[i].setAttribute("stroke","black");
    index[i].setAttribute("text-anchor","middle");
    index[i].innerHTML = i;
    group[i].appendChild(index[i]);
}

async function createGroup(i){
    group[i] = document.createElementNS(svgns,"g");
    group[i].setAttribute("transform","translate("+280+","+groupY+")");
    document.getElementById("bar-container").appendChild(group[i]);
    await sleep(200);
    group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
    y_axis_arr[i] = groupY;
    groupY -= groupGap;
}

async function push(){
    count+=1;
    let input = document.getElementById('user-arr').value;
    if (input!=""){
        guide.innerText="Element "+input+" is pushed inside stack";
        input = parseInt(input);
        value_arr[count] = input;
        createGroup(count);
        createRect(count);
        createText(count);
        createIndex(count)
        // createlabel(count);
        rect[count].setAttribute("fill","green");
        highlight_line("2");
        highlight_line("3");
        await sleep(200);
        unhighlight_line("2");
        unhighlight_line("3");
        rect[count].setAttribute("fill","orange");
        // await sleep(500);
        // peek();
    }else{
        alert("Input box is empty");
    }  
}
async function pop(){
    if(count!=-1){
        rect[count].setAttribute("fill","red");
        group[count].setAttribute("transform","translate("+450+","+(groupY+groupGap)+")");
        highlight_line("5");
        highlight_line("6");
        await sleep(200);
        unhighlight_line("5");
        unhighlight_line("6");
        // group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
        guide.innerText="Element "+value_arr[count]+" is popped from stack";
        document.getElementById("bar-container").removeChild(group[count]);
        groupY+=groupGap;
        value_arr.pop();
        group.pop();
        // rect.pop();
        // text.pop();
        count-=1;
    }
    else{
        alert("stack is empty!!");
        guide.innerText="Stack is Empty";
    }
} 
async function peek(){
    rect[count].setAttribute("fill","green");
    group[count].setAttribute("transform","translate("+265+","+(groupY+groupGap)+")");
    await sleep(100);
    group[count].setAttribute("transform","translate("+450+","+(groupY+groupGap)+")");
    await sleep(100);
    group[count].setAttribute("transform","translate("+265+","+(groupY+groupGap)+")");
    await sleep(100);
    group[count].setAttribute("transform","translate("+450+","+(groupY+groupGap)+")");
    await sleep(100);
    group[count].setAttribute("transform","translate("+265+","+(groupY+groupGap)+")");
    await sleep(100);
    group[count].setAttribute("transform","translate("+450+","+(groupY+groupGap)+")");
    group[count].setAttribute("transform","translate("+groupX+","+(groupY+groupGap)+")");

    await sleep(50);

    
    // group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+groupY+")");
    // await sleep(500);
    rect[count].setAttribute("fill","orange");
}

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
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



// async function peek(){
//     rect[count].setAttribute("fill","green");
//     group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+150+")");
//     await sleep(500);
//     group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+groupY+")");
//     // await sleep(500);
//     rect[count].setAttribute("fill","orange");
// }


// let label=[]

// let x_axis_arr = [];
// let value_arr = [];
// let count = -1;

// let text = [];
// let text_x = 30;
// let text_y = 35;

// let rect = [];
// let rect_ry = 10;
// let rect_width = 60;
// let rect_height = 60;
// let rect_fill = "orange";

// let group = []
// let groupX = 30;
// let groupY = 270;
// let groupGap = 65;

// let index = [];
// let indexX = 30;
// let indexY = 80;


// async function push(){
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     if (input!=""){
//         guide.innerText="Element "+input+" is pushed inside stack";
//         input = parseInt(input);
//         value_arr[count] = input;
//         createGroup(count);
//         createRect(count);
//         createText(count);
//         createIndex(count)
//         // createlabel(count);
//         rect[count].setAttribute("fill","green");
//         await sleep(500);
//         rect[count].setAttribute("fill","orange");
//         // await sleep(500);
//         // peek();
//     }else{
//         alert("Input box is empty");
//     }  
// }
// async function pop(){
//     if(count!=-1){
//         rect[count].setAttribute("fill","red");
//         group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+150+")");
//         await sleep(500);
//         // group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
//         guide.innerText="Element "+value_arr[count]+" is popped from stack";
//         document.getElementById("bar-container").removeChild(group[count]);
//         groupX-=65;
//         value_arr.pop();
//         group.pop();
//         // rect.pop();
//         // text.pop();
//         count-=1;
//     }
//     else{
//         guide.innerText="Stack is Empty";
//     }
// }













// async function createGroup(i){
//     group[i] = document.createElementNS(svgns,"g");
//     group[i].setAttribute("transform","translate("+groupX+","+150+")");
//     document.getElementById("bar-container").appendChild(group[i]);
//     await sleep(500);
//     group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
//     x_axis_arr[i] = groupX;
//     groupX += groupGap;
// }

// async function push(){
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     if (input!=""){
//         guide.innerText="Element "+input+" is pushed inside stack";
//         input = parseInt(input);
//         value_arr[count] = input;
//         createGroup(count);
//         createRect(count);
//         createText(count);
//         createIndex(count)
//         // createlabel(count);
//         rect[count].setAttribute("fill","green");
//         await sleep(500);
//         rect[count].setAttribute("fill","orange");
//         // await sleep(500);
//         // peek();
//     }else{
//         alert("Input box is empty");
//     }  
// }
// async function pop(){
//     if(count!=-1){
//         rect[count].setAttribute("fill","red");
//         group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+150+")");
//         await sleep(500);
//         // group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
//         guide.innerText="Element "+value_arr[count]+" is popped from stack";
//         document.getElementById("bar-container").removeChild(group[count]);
//         groupX-=65;
//         value_arr.pop();
//         group.pop();
//         // rect.pop();
//         // text.pop();
//         count-=1;
//     }
//     else{
//         guide.innerText="Stack is Empty";
//     }
// } 
// async function peek(){
//     rect[count].setAttribute("fill","green");
//     group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+150+")");
//     await sleep(500);
//     group[count].setAttribute("transform","translate("+(groupX-groupGap)+","+groupY+")");
//     // await sleep(500);
//     rect[count].setAttribute("fill","orange");
// }

// function sleep(ms){
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }