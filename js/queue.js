const svgns =  "http://www.w3.org/2000/svg";

let x_axis_arr = [];
let value_arr = [];
let count = -1;
let front = -1;
let rear = -1;
let indexing = 0;

let text = [];
let text_x = 30;
let text_y = 35;

let rect = [];
let rect_ry = 10;
let rect_width = 60;
let rect_height = 60;
let rect_fill = "orange";

let group = []
let groupX = temp =30;
let groupY = 240;
let groupGap = 65;

let index = [];
let indexX = 30;
let indexY = 80;
let indexCount = 0;

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
function clearElements(){
    for (i=0; i<=rear; i+=1){
        document.getElementById("bar-container").removeChild(group[i]);
        value_arr.pop();
    }
    count=-1; front=-1; rear=-1
    groupX=temp=30;
}

async function createGroup(i){
    group[i] = document.createElementNS(svgns,"g");
    group[i].setAttribute("transform","translate("+groupX+","+150+")");
    document.getElementById("bar-container").appendChild(group[i]);
    await sleep(200);
    group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
    x_axis_arr[i] = groupX;
    groupX += groupGap;
}

async function enqueue(){
    if(value_arr.length<=10){
        let input = document.getElementById('user-arr').value;
        guide.innerText="Element "+input+" is inserted inside queue";
        front-=1;
        rear+=1; 
        input = parseInt(input);
        value_arr[rear] = input;
        createGroup(rear);
        createRect(rear);
        createText(rear);
        createIndex(rear); 
        rect[rear].setAttribute("fill","green");
        highlight_line("2");
        highlight_line("3");
        await sleep(500);
        unhighlight_line("2");
        unhighlight_line("3");
        rect[rear].setAttribute("fill","orange");
        indexing+=1;
    }else{
        alert("Array is full!!!");
    }
}

async function dequeue(){

    if (rear<0){
        alert("Queue is empty!!");
    }else if(rear>=1){

        groupX -= groupGap;
        // indexing-=1;
        front+=1;
        rear-=1;
        count-=1;
        rect[0].setAttribute("fill","red");
        group[0].setAttribute("transform","translate("+30+","+350+")");
        highlight_line("5");
        highlight_line("6");
        await sleep(500);
        unhighlight_line("5");
        unhighlight_line("6");
        document.getElementById("bar-container").removeChild(group[0]);
        guide.innerText="Element "+value_arr[0]+" is deleted from queue";
        value_arr.shift();
        group.shift();
        index.shift();
        text.shift();
        rect.shift();
        // for (i=0; i<value_arr.length;i+=1){
        //     index[i].innerHTML=i;
        // }
        for(i = 0; i<group.length; i+=1 ){
            index[i].innerHTML=i;
            group[i].setAttribute("transform","translate("+temp+","+groupY+")");
            // document.getElementById("bar-container").appendChild(group[i]);
            // x_axis_arr[i] = groupX;
            temp += groupGap;
        }
        temp = 30;
    }else{
        indexCount = 0;
        rear = -1;
        groupX = 30;
        document.getElementById("bar-container").removeChild(group[0]);
        value_arr.shift();
        group.shift();
    }
    
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


// function createGroup(i){
//     group[i] = document.createElementNS(svgns,"g");
//     group[i].setAttribute("transform","translate("+groupX+","+groupY+")");
//     document.getElementById("bar-container").appendChild(group[i]);
//     x_axis_arr[i] = groupX;
//     groupX += groupGap;
// }

// function push(){
//     let input = document.getElementById('user-arr').value;
//     rear+=1; 
//     input = parseInt(input);
//     value_arr[rear] = input;
//     createGroup(rear);
//     createRect(rear);
//     createText(rear);
//     createIndex(rear); 
// }

// function pop(){
//     if (value_arr.length == 0){
//         count = -1;
//         front = -1;
//         rear = -1;

//         text_x = 30;
//         text_y = 35;

//         groupX = 30;
//         groupY = 240;

//         index = [];
//         indexX = 30;
//         indexY = 80;

//     }else{
//         front+=1
//         document.getElementById("bar-container").removeChild(group[0]);
//         // groupX-=groupGap;
//         value_arr.shift();
//         group.shift();
//         // index.shift();
//     }
// }
    
/////////stack type/////////////////////////////////
// async function enqueue(){
//     let input = document.getElementById('user-arr').value;
//     if (count > 10){
//         alert("Queue if full! Overflow")
//     }else{
//         count+=1;
//         guide.innerText="Element "+input+" is pushed inside stack";
//         input = parseInt(input);
//         value_arr[count] = input;
//         createGroup(count);
//         createRect(count);
//         createText(count);
//         text[count].innerHTML = value_arr[count];
//         createIndex(count)
//         // createlabel(count);
//         rect[count].setAttribute("fill","green");
//         await sleep(200);
//         rect[count].setAttribute("fill","orange");
//         // await sleep(500);
//         // peek();
//     } 
// }
// async function dequeue(){
//     if(count!=-1 && front<count){
//         front+=1;
//         text[front].innerHTML = "";
//         rect[front].setAttribute("fill","red");
//         group[front].setAttribute("transform","translate("+temp+","+380+")");
//         await sleep(200);
//         rect[front].setAttribute("fill","transparent");
//         group[front].setAttribute("transform","translate("+temp+","+groupY+")");
//         guide.innerText="Element "+value_arr[count]+" is popped from stack";
//         // document.getElementById("bar-container").removeChild(group[count]);
//         // groupX-=65;
//         // value_arr.pop();
//         // group.pop();
//         // rect.pop();
//         // text.pop();
//         // count-=1;
//         temp+=groupGap;
//     }else if(front>=count-1){
//         alert("All elements got dequeued from enqueue, insert again from start.");
//         clearElements();
//     }
//     else {
//         guide.innerText="queue is Empty";
//     }
// } 


// async function enqueue(){
//     if(value_arr.length<10){
//         let input = document.getElementById('user-arr').value;
//         guide.innerText="Element "+input+" is inserted inside queue";
//         front-=1;
//         rear+=1; 
//         input = parseInt(input);
//         value_arr[rear] = input;
//         createGroup(rear);
//         createRect(rear);
//         createText(rear);
//         createIndex(indexing); 
//         rect[rear].setAttribute("fill","green");
//         await sleep(500);
//         rect[rear].setAttribute("fill","orange");
//         indexing+=1;
//     }else{
//         alert("Array is full!!!");
//     }
// }

// async function dequeue(){
//     if(rear>=1){
//         // groupX += groupGap;
//         // for (i=0; i<value_arr.length;i+=1){
//         //     index.pop();
//         // }
//         // indexing-=1;
//         front+=1;
//         rear-=1;
//         count-=1;
//         rect[0].setAttribute("fill","red");
//         group[0].setAttribute("transform","translate("+temp+","+330+")");
//         await sleep(500);
//         rect[0].setAttribute("fill","transparent");
//         group[0].setAttribute("transform","translate("+temp+","+groupY+")");
//         // document.getElementById("bar-container").removeChild(group[0]);
//         guide.innerText="Element "+value_arr[0]+" is deleted from queue";
//         // value_arr.shift();
//         group.shift();
//         // index.shift();
//         rect.shift();
//         // for(i = 0; i<group.length; i+=1 ){
//         //     group[i].setAttribute("transform","translate("+temp+","+groupY+")");
//         //     // document.getElementById("bar-container").appendChild(group[i]);
//         //     // x_axis_arr[i] = groupX;
//         //     temp += groupGap;
//         // }
//         // temp = 30;
//         temp+=groupGap;
//     }else{
//         indexCount = 0;
//         rear = -1;
//         groupX = 30;
//         document.getElementById("bar-container").removeChild(group[0]);
//         value_arr.shift();
//         group.shift();
//     }
    
// } 







//   function push(){
//     count+=1;
//     let input = document.getElementById('user-arr').value;
//     if (front == -1) front = 0;  
//     rear+=1;  
//     input = parseInt(input);
//     value_arr[rear] = input;
//     createGroup(rear);
//     createRect(rear);
//     createText(rear);
//     createIndex(count)
// }
// function pop(){
//     // if (front >= rear){
//     //     front = -1;
//     //     rear = -1;
//     // }
//     if (front != -1 && front <= rear){
//     front+=1;
//     count-=1;
//     document.getElementById("bar-container").removeChild(group[0]);
//     groupX-=65;
//     value_arr.shift();
//     group.shift();
//     // rear-=1;
//     console.log
//     console.log(rear);    
// }



// function push(){
//     let input = document.getElementById('user-arr').value;
//     front-=1;
//     rear+=1; 
//     input = parseInt(input);
//     value_arr[rear] = input;
//     createGroup(rear);
//     createRect(rear);
//     createText(rear);
//     createIndex(rear); 
// }

// function pop(){
//     if(rear>=1){
//         groupX -= groupGap;
//         front+=1;
//         rear-=1;
//         count-=1;
//         document.getElementById("bar-container").removeChild(group[0]);
//         value_arr.shift();
//         group.shift();
//         index.shift();
//         for(i = 0; i<group.length; i+=1 ){
//             group[i].setAttribute("transform","translate("+temp+","+groupY+")");
//             document.getElementById("bar-container").appendChild(group[i]);
//             // x_axis_arr[i] = groupX;
//             temp += groupGap;
//         }
//         temp = 30;
//     }else{
//         rear = -1;
//         groupX = 30;
//         document.getElementById("bar-container").removeChild(group[0]);
//         value_arr.shift();
//         group.shift();
//     }
    
// } 
