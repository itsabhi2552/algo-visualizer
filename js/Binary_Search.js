// Global Variables

const svgns = "http://www.w3.org/2000/svg";
var target; // Target Variable
var array = []; // User Array
var rect = [];
var text = [];
var index = [];
var y_axis = 270;//180
var x_axis = 30;
var height = 60;
var width = 60;
var text_yaxis = 305;//215
var ms = 500;
var start, middle, end;
start = document.createElementNS(svgns, "text");
middle = document.createElementNS(svgns, "text");
end = document.createElementNS(svgns, "text");

let setSpeed = document.getElementById("speed");
let timeValue = document.getElementById("timeValue");

var start_cordinates,middle_cordinates,end_cordinates;
start_cordinates = 64;
end_cordinates = 65;
var flag=0;
var low,mid,high;
var clear_changes = 0;



  
  let speed = setSpeed.value*1000;
  setSpeed.addEventListener("input", function(){
    let x = 1000-(setSpeed.value*1000);
    timeValue.innerHTML = setSpeed.value;
    ms = x;
  });


function undo_changes(){
    middle.innerHTML = "";
    end.innerHTML = "";
    start.innerHTML= "";
    
    not_found.innerHTML = "";
    for(let i=0; i< array.length; i++){
        rect[i].setAttribute("fill", "orange");
    }
    

}



// Clears canvas
function reload(){
    location.reload();

}

function clear_canvas() {
    let svg = document.getElementById('canvas')
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);

    }

    for(let i=1;i<=8;i++){
        code_snippet_reset(i)
    }

 
    while (array.length > 0) {
        array.pop();
        text.pop();
        rect.pop();
        index.pop();
    }

    y_axis = 270;
    x_axis = 30;
    height = 60;
    width = 60;

    document.getElementById("code_guide").innerHTML = "<u>Binary Search</u>";
    middle.innerHTML = "";


}

// Wait

function wait() {
    return new Promise(resolve => {
        setTimeout(() => { resolve("") }, ms);
    })
}

//Getting Target Value

function get_target_value() {

    flag = 0;
    code_snippet_reset(4)
    var createbtn = document.getElementById('createbtn');
    var generatebtn = document.getElementById('generatebtn');
    var searchbtn = document.getElementById('searchbtn');
   
    if(document.getElementById("user_input").value == '' || isNaN(document.getElementById("user_input").value)){
        alert('Please Enter correct Input  !!')
        return
        
    }
    createbtn.disabled = true;
    generatebtn.disabled = true;
    searchbtn.disabled = true;


    target = parseInt(document.getElementById("user_input").value);
    if(clear_changes == 1){
        undo_changes();
        clear_changes = 1;
        Binary_Search(target);


        
    }
    else{
        clear_changes = Binary_Search(target);

        Promise.resolve(1)
        .then((result) => {
        clear_changes = result;
  });
    }
}





function random() {
    for (let i = 0; i <= 11; i++) {
        let temp = (Math.floor(Math.random() * 100) + 1);
        array[i] = temp;
    }


    array.sort(function (a, b) { return a - b });
    document.getElementById("user_array").value = array.toString();
    generate();

}

//getting user input as array

function get_array() {
    var temp = document.getElementById("user_array").value.split(',');



    temp = temp.map(Number)

    if(temp.length>0){
        for (let k = 0; k < temp.length; k++) {

            if (isNaN(temp[k])) {
                alert(' Integers are allwoed Only !!');
                return
            }
        }
    }

    array = temp;
    
    
    generate();
}


function  generate() {

    for (let i = 0; i < array.length; i++) {
        rect[i] = document.createElementNS(svgns, "rect");
        rect[i].setAttribute("x", x_axis.toString());
        rect[i].setAttribute("y", y_axis.toString());
        rect[i].setAttribute("height", height.toString());
        rect[i].setAttribute("width", width.toString());
        rect[i].setAttribute("fill", "orange");
        rect[i].setAttribute("stroke", "black");
        rect[i].setAttribute("ry", "10");

        document.getElementById("canvas").appendChild(rect[i]);


        text[i] = document.createElementNS(svgns, "text");
        text[i].setAttribute("x", (x_axis + 30).toString());
        text[i].setAttribute("y", text_yaxis.toString());
        text[i].setAttribute("text-anchor", "middle");
        text[i].setAttribute("stroke", "black");
        text[i].setAttribute("fill", "black");
        text[i].innerHTML = array[i];
        document.getElementById("canvas").appendChild(text[i]);

        index[i] = document.createElementNS(svgns, "text");
        index[i].setAttribute("x", (x_axis + 30).toString());
        index[i].setAttribute("y", (text_yaxis + 45).toString());
        index[i].setAttribute("text-anchor", "middle");
        index[i].setAttribute("stroke", "black");
        index[i].setAttribute("fill", "black");
        index[i].innerHTML = i;
        document.getElementById("canvas").appendChild(index[i]);


        x_axis = x_axis + 65;



    }

}

function allign_start(x, ind, c) {
    start.setAttribute("x", (x).toString());
    start.setAttribute("y", (255).toString());//165
    start.setAttribute("text-anchor", "middle");
    start.setAttribute("stroke", "black");
    start.setAttribute("fill", "black");
    start.innerHTML = "Start";
    document.getElementById("canvas").appendChild(start);
    rect[ind].setAttribute("fill", c);



}

function allign_middle(x, ind, c) {
    middle.setAttribute("x", (x).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "black");
    middle.setAttribute("fill", "black");
    middle.innerHTML = "Middle";
    document.getElementById("canvas").appendChild(middle);
    rect[ind].setAttribute("fill", c);


}

function allign_end(x, ind, c) {
    end.setAttribute("x", x.toString());
    end.setAttribute("y", (255).toString());//165
    end.setAttribute("text-anchor", "middle");
    end.setAttribute("stroke", "black");
    end.setAttribute("fill", "black");
    end.innerHTML = "End";
    document.getElementById("canvas").appendChild(end);
    rect[ind].setAttribute("fill", c);

}

async function found_msg(x, ind, low, high){
   


    start.setAttribute("x", (((ind+1) * 65)-5).toString());
    start.setAttribute("y", (190).toString());//255
    start.setAttribute("text-anchor", "middle");
    start.setAttribute("stroke", "black");
    start.setAttribute("fill", "black");
    start.innerHTML = "Start";
    document.getElementById("canvas").appendChild(start);


    middle.setAttribute("x", (((ind+1) * 65)-5).toString());
    middle.setAttribute("y", (210).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "black");
    middle.setAttribute("fill", "black");
    middle.innerHTML = "Middle";
    document.getElementById("canvas").appendChild(middle);

    end.setAttribute("x", (((ind+1) * 65)-5).toString());
    end.setAttribute("y", (230).toString());//165
    end.setAttribute("text-anchor", "middle");
    end.setAttribute("stroke", "black");
    end.setAttribute("fill", "black");
    end.innerHTML = "End";
    document.getElementById("canvas").appendChild(end);

    await wait();

    document.getElementById("canvas").removeChild(start);
    document.getElementById("canvas").removeChild(end);



    middle.setAttribute("x", (x).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "green");
    middle.setAttribute("fill", "green");
    middle.innerHTML = "Found";
    document.getElementById("canvas").appendChild(middle);
    rect[ind].setAttribute("fill", "green");



}

function allign_overlapping_start(mid){

    start.setAttribute("x", (start_cordinates*(mid+1)+2).toString());
    start.setAttribute("y", (230).toString());//255
    start.setAttribute("text-anchor", "middle");
    start.setAttribute("stroke", "black");
    start.setAttribute("fill", "black");
    start.innerHTML = "Start";
    document.getElementById("canvas").appendChild(start);

    middle.setAttribute("x", (((mid+1) * 65)-5).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "black");
    middle.setAttribute("fill", "black");
    middle.innerHTML = "Middle";
    document.getElementById("canvas").appendChild(middle);

    



}

function allign_overlapping_end(mid){
    end.setAttribute("x", (((mid+1) * 65)-5).toString());
    end.setAttribute("y", (230).toString());//165
    end.setAttribute("text-anchor", "middle");
    end.setAttribute("stroke", "black");
    end.setAttribute("fill", "black");
    end.innerHTML = "End";
    document.getElementById("canvas").appendChild(end);

    middle.setAttribute("x", (mid).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "black");
    middle.setAttribute("fill", "black");
    middle.innerHTML = "Middle";
    document.getElementById("canvas").appendChild(middle);





}


function found_start(mid){
    start.setAttribute("x", (start_cordinates*(mid+1)+2).toString());
    start.setAttribute("y", (230).toString());//255
    start.setAttribute("text-anchor", "middle");
    start.setAttribute("stroke", "black");
    start.setAttribute("fill", "black");
    start.innerHTML = "Start";
    document.getElementById("canvas").appendChild(start);

    middle.setAttribute("x", (mid).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "green");
    middle.setAttribute("fill", "green");
    middle.innerHTML = "Found";
    document.getElementById("canvas").appendChild(middle);
    rect[mid].setAttribute("fill", "green");

}

function found_end(){
    end.setAttribute("x", (((mid+1) * 65)-5).toString());
    end.setAttribute("y", (230).toString());//165
    end.setAttribute("text-anchor", "middle");
    end.setAttribute("stroke", "black");
    end.setAttribute("fill", "black");
    end.innerHTML = "End";
    document.getElementById("canvas").appendChild(end);

    middle.setAttribute("x", (((mid+1) * 65)-5).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "green");
    middle.setAttribute("fill", "green");
    middle.innerHTML = "Found";
    document.getElementById("canvas").appendChild(middle);
    rect[mid].setAttribute("fill", "green");

}

function found(mid){
    middle.setAttribute("x", (((mid+1) * 65)-5).toString());
    middle.setAttribute("y", (255).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "green");
    middle.setAttribute("fill", "green");
    middle.innerHTML = "Found";
    document.getElementById("canvas").appendChild(middle);
    rect[mid].setAttribute("fill", "green");

}

async function mock(ind){
    start.setAttribute("x", (((ind+1) * 65)-5).toString());
    start.setAttribute("y", (220).toString());//255
    start.setAttribute("text-anchor", "middle");
    start.setAttribute("stroke", "black");
    start.setAttribute("fill", "black");
    start.innerHTML = "Start";
    document.getElementById("canvas").appendChild(start);


    middle.setAttribute("x", (((ind+1) * 65)-5).toString());
    middle.setAttribute("y", (240).toString());//165
    middle.setAttribute("text-anchor", "middle");
    middle.setAttribute("stroke", "black");
    middle.setAttribute("fill", "black");
    middle.innerHTML = "Middle";
    document.getElementById("canvas").appendChild(middle);

    end.setAttribute("x", (end_cordinates*(ind+1)-5).toString());
    end.setAttribute("y", (260).toString());//165
    end.setAttribute("text-anchor", "middle");
    end.setAttribute("stroke", "black");
    end.setAttribute("fill", "black");
    end.innerHTML = "End";
    document.getElementById("canvas").appendChild(end);

    await wait();


}
function not_found(mid){

    middle.innerHTML = "";
    end.innerHTML = "";
    start.innerHTML= "";
    code_snippet_reset(6);
    code_snippet_reset(8);
    document.getElementById("pre"+1).style.backgroundColor= "red";
    document.getElementById("pre"+1).style.borderRadius = "25px";
    document.getElementById("pre"+1).style.border = "2px solid var(--black)";
    message(9,0,0,0);



    for(let i=0; i< array.length; i++){
        rect[i].setAttribute("fill", "red");
    }
    var not_found = document.createElementNS(svgns, "text");
    not_found.setAttribute("x","380");
    not_found.setAttribute("y","190");
    not_found.setAttribute("tect-anchor","middle");
    not_found.setAttribute("stroke","black");
    not_found.setAttribute("fill","red");


    document.getElementById("canvas").appendChild(not_found);
}

function low_high_allignment(ind){

    start.setAttribute("x", (((ind+1) * 65)-5).toString());
    start.setAttribute("y", (235).toString());//255
    start.setAttribute("text-anchor", "middle");
    start.setAttribute("stroke", "black");
    start.setAttribute("fill", "black");
    start.innerHTML = "Start";
    document.getElementById("canvas").appendChild(start);

    end.setAttribute("x", (end_cordinates*(ind+1)-5).toString());
    end.setAttribute("y", (260).toString());//165
    end.setAttribute("text-anchor", "middle");
    end.setAttribute("stroke", "black");
    end.setAttribute("fill", "black");
    end.innerHTML = "End";
    document.getElementById("canvas").appendChild(end);


}


function code_snippet_set(i){
    document.getElementById("pre"+i).style.backgroundColor= "var(--orange)";
    document.getElementById("pre"+i).style.borderRadius = "25px";
    document.getElementById("pre"+i).style.border = "2px solid var(--black)";
}
function code_snippet_reset(i){
    document.getElementById("pre"+i).style.backgroundColor= "transparent";
    document.getElementById("pre"+i).style.borderRadius = "0s";
    document.getElementById("pre"+i).style.border = "0";
}


function message(i,low,mid,high){
    switch(i){
        case 1:document.getElementById("code_guide").innerHTML = "Checkin if "+low+"<"+high+" is true or not";
                break;
        case 2:document.getElementById("code_guide").innerHTML = "Calculating middle which is "+mid;
                break;
        
        case 3:document.getElementById("code_guide").innerHTML = "Checking "+array[mid]+" is equal to "+target+" or not";
                break;

        case 4:document.getElementById("code_guide").innerHTML= "Element "+array[mid]+" is found";
                break; 

        case 5:document.getElementById("code_guide").innerHTML="Checking "+target+" is greater than "+array[mid]+" or not";
                break;

        case 6:document.getElementById("code_guide").innerHTML="Initializing 'low' with "+(mid+1);
                break;
        case 7:document.getElementById("code_guide").innerHTML="Target ("+target+") is less than "+array[mid]+" so else will be executed";
                break;

        case 8:document.getElementById("code_guide").innerHTML="Initializing 'high' with "+(mid-1);
                break;
        
        case 9:document.getElementById("code_guide").innerHTML="Not Found";
                break;

 
    }
}


async function Binary_Search(target) {

    var start_cordinates,middle_cordinates,end_cordinates;
    start_cordinates = 64;
    end_cordinates = 65;
    low = 0;
    high = array.length-1;

    while(low<high){
        message(1,low,mid,high);

        code_snippet_reset(6);
        code_snippet_reset(8);


        allign_start(start_cordinates*(low+1)+2,low , "grey" );//for start
        allign_end(end_cordinates*(high+1)-5, high , "grey");//for end

        code_snippet_set(1);
        await wait();

        mid = Math.floor((low+high)/2);
        middle_cordinates = ((mid+1) * 65)-5;


        message(2,low,mid,high);
        code_snippet_reset(1);
        code_snippet_set(2);



        if(low == mid & mid == high){
            mock(mid);

        }

        else if(low == mid){
            allign_overlapping_start(mid);
        }
        else if(end == mid){
            allign_overlapping_end(mid);

        }
        else{
            allign_middle(middle_cordinates, mid, "#007791");//for middle
        }

        
        await wait();


        code_snippet_reset(2);
        message(3,low,mid,high);
        code_snippet_set(3);
        await wait();
        
        if(target === array[mid]){
            

            allign_start(start_cordinates*(low+1),low , "orange" );
            allign_end(end_cordinates*(high+1), high , "orange");

            


            document.getElementById("canvas").removeChild(start);
            document.getElementById("canvas").removeChild(end);

            document.getElementById("canvas").removeChild(middle);


            if(low == mid & mid == high){
            found_msg(middle_cordinates, mid, low, high);
            }
            else if(start == mid){
                found_start(mid);
            }
            else if(mid == end){
                found_end(mid);
            }
            else{
                found(mid);

            }

           

            flag =1;

            code_snippet_reset(3);
            message(4,low,mid,high);
            code_snippet_set(4);

            break;
            
        }

       

        else if(target > array[mid]){
            
            code_snippet_reset(3);
            code_snippet_reset(2);
            code_snippet_set(5);
            message(5,low,mid,high);
            await wait();



            allign_middle(middle_cordinates,mid , "orange" );
            document.getElementById("canvas").removeChild(middle);
            allign_start(64*(low+1)+2,low , "orange" );
            document.getElementById("canvas").removeChild(start);

            low = mid+1;
            allign_start(64*(low+1)+2,low , "grey" );  


            if(high<=array.length-1){
            allign_end(end_cordinates*(high+1)-5, high , "grey");
            }

            code_snippet_reset(5);
            code_snippet_set(6);

            if(low == high){
            low_high_allignment(low);
            }
            message(6,low,mid,high);
            await wait();




        }

        else{
            code_snippet_reset(3);
            code_snippet_reset(2);
            code_snippet_set(7);
            message(7,low,mid,high);
            await wait();


            allign_middle(middle_cordinates,mid , "orange" );
            document.getElementById("canvas").removeChild(middle);
            allign_end(end_cordinates,high , "orange" );
            document.getElementById("canvas").removeChild(end);
            high = mid - 1 ;
 
            if(high>=0){
            allign_end(end_cordinates*(high+1)-5, high , "grey");
            }

            code_snippet_reset(7);
            code_snippet_set(8);

            if(low == high){
                low_high_allignment(low);
            }

            message(8,low,mid,high);

            await wait();

        }

    }

    mid = Math.floor((low+high)/2);
    if(low == high & array[mid]==target & flag==0){

        code_snippet_reset(6);
        code_snippet_reset(8);
        
        code_snippet_reset(2);
        code_snippet_set(3);

        found_msg(((mid+1) * 65)-5, mid, low, high);

        message(4,low,mid,high)

        code_snippet_reset(3);
        code_snippet_set(4);

    }
    else if(flag==0){

        not_found();
    }
    else if(flag){
        found_msg(((mid+1) * 65)-5,mid,low,high)

        message(4,low,mid,high)
        
    }


    var createbtn = document.getElementById('createbtn');
    var generatebtn = document.getElementById('generatebtn');
    var searchbtn = document.getElementById('searchbtn');

    createbtn.disabled = false;
    generatebtn.disabled = false;
    searchbtn.disabled = false;


   
}

