const svgns = "http://www.w3.org/2000/svg";

var N = 4;
// var col = 0;

var array = [];
var group = [];
var queen = [];
var board = [];

var group_x = 200;
var group_y = 150;

var text_x = 15;
var text_y = 40;

var ms = 1000;

const speed = document.getElementById('speed-bar');
speed.oninput = function (event) {
    ms = 1000 - event.target.value;
}


function wait() {
    return new Promise(resolve => {
        setTimeout(() => { resolve("") }, ms);
    })
}

function clearCanvas() {
    return;
}

function createBoard(N) {
    clearCanvas();
    //N = parseInt(document.getElementById("userInput").value);

    for (var i = 0; i < N; i++) {
        array[i] = [];
        board[i] = [];
        group[i] = [];
        queen[i] = [];

        group_x = 200;
        for (var j = 0; j < N; j++) {
            board[i][j] = 0;

            group[i][j] = document.createElementNS(svgns, "g");
            group[i][j].setAttribute("transform", "translate(" + group_x + ", " + group_y + ")");
            document.getElementById("canvas").appendChild(group[i][j]);
            group_x += 60;

            array[i][j] = document.createElementNS(svgns, "rect");
            array[i][j].setAttribute("width", "60");
            array[i][j].setAttribute("height", "60");
            array[i][j].setAttribute("stroke", "black");
            array[i][j].setAttribute("fill", "#FED8B1");
            group[i][j].appendChild(array[i][j]);

            queen[i][j] = document.createElementNS(svgns, "text");
            queen[i][j].setAttribute("x", text_x.toString());
            queen[i][j].setAttribute("y", text_y.toString());
            queen[i][j].setAttribute("font-size", "2em")
            queen[i][j].setAttribute("stroke", "Black");
            queen[i][j].innerHTML = "Q";
            queen[i][j].setAttribute("visibility", "hidden");
            group[i][j].appendChild(queen[i][j]);

        }
        group_y += 60;
    }
}

// function isSafe(row, col){

//     for(let i=col;i>=0;i--)
//         if(board[row][i]) return false;

//     for(let i=row, j=col;i>=0 && j>=0 ;i--, j--)
//         if(board[i][j]) return false;

//     for(let i=row, j=col;i>=0 && j<=N-1 ;i--, j++)
//         if(board[i][j]) return false;

//     return true;
// }


// function nQueen(col){
//     if(col==N){
//         alert("solution found");
//         return true;
//     }
//     for(var i=0;i<N;i++){
//         if(isSafe(i,col)){
//             board[i][col]=1;
//             queen[i][col].setAttribute("visibility","visible");
//             if(nQueen(col+1)) return true;
//             board[i][col]=0;
//             queen[i][col].setAttribute("visibility","hidden");
//         }
//     }
//     return false;
// }

// function solution(){
//     document.getElementsByClassName("code-guide").innerHTML = "Start works";
//     if(!nQueen(0)){
//         document.getElementsByClassName("code-guide").innerHTML = "Solution Doesn't Exists ";
//     }
// } 

async function condition(n){
    highlight_line(n);
    await wait();
    unhighlight_line(n);
    await wait();
    await wait();
}

function setGuid(str) {
    document.getElementById("guid").innerText = str;
}

function highlight_line(line) {
    var code_line = document.getElementById("line" + line).style.backgroundColor = "orange";
}

function unhighlight_line(line) {
    var code_line = document.getElementById("line" + line).style.backgroundColor = "";
}

function glowBoard(row, col) {
    //Column Blocks
    for (var i = row + 1; i < N; i++) {
        array[i][col].setAttribute("fill", "RED");
    }

    // for(var i=col+1;i<N;i++){
    //     array[row][i].setAttribute("fill", "RED");   
    // }

    // Right Diagonal
    for (var i = row + 1, j = col + 1; i < N && j < N; i++, j++) {
        array[i][j].setAttribute("fill", "RED");
    }
    //left Diagonal
    for (var i = row + 1, j = col - 1; i < N && j >= 0; i++, j--) {
        array[i][j].setAttribute("fill", "RED");
    }
}

function removeGlow(row, col) {
    //Column Blocks
    for (var i = row + 1; i < N; i++) {
        array[i][col].setAttribute("fill", "#FED8B1");
    }

    // for(var i=col+1;i<N;i++){
    //     array[row][i].setAttribute("fill", "#FED8B1");   
    // }

    // Right Diagonal
    for (var i = row + 1, j = col + 1; i < N && j < N; i++, j++) {
        array[i][j].setAttribute("fill", "#FED8B1");
    }
    //left Diagonal
    for (var i = row + 1, j = col - 1; i < N && j >= 0; i++, j--) {
        array[i][j].setAttribute("fill", "#FED8B1");
    }
}

function clearGlow() {
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            array[i][j].setAttribute("fill", "#FED8B1");
        }
    }
}

function clearQueen() {
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            queen[i][j].setAttribute("visibility", "hidden");
        }
    }
}

async function setQueen(row, col) {
    queen[row][col].setAttribute("visibility", "visible");
    await wait();
    glowBoard(row, col);
}

async function removeQueen(row, col) {
    queen[row][col].setAttribute("visibility", "hidden");
    await wait();
    removeGlow(row, col);
}

async function conditions() {
    highlight_line(3);
    await wait();
    unhighlight_line(3);
    await wait();
    highlight_line(5);
    await wait();
    unhighlight_line(5);
    highlight_line(8);
    await wait();
    unhighlight_line(8);
}


async function placingAt(row ,col, str,n){
    queen[row][col].setAttribute("visibility","visible");
    condition(n);
    setGuid("Killed by Previious Queen at "+str);
    await wait();
    queen[row][col].setAttribute("visibility","hidden");
}


async function visualization() {
    setGuid("Started Visualization");
    setGuid("Placing Queen at (0,0)");
    setQueen(0, 0);
    setGuid("Next Row ");
    await wait();

    setGuid("Placing Queen At (1,0)");
    await wait();
    placingAt(1,0,"Below the Queen",3);
    await wait();
    setGuid("Removing Queen form (1,0)");
    await wait();
    setGuid("Placing Queen At (1,1)");
    await wait();
    placingAt(1,1,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (1,1)");
    await wait();
    setGuid("Placing Queen at (1,2)");
    await wait();

    setQueen(1, 2);
    await wait();
    setGuid("Placing Queen At (2,0)");
    await wait();
    placingAt(2,0,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (2,0)");
    await wait();

    setGuid("Placing Queen At (2,1)");
    await wait();
    placingAt(2,1,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (2,1)");
    await wait();

    setGuid("Placing Queen At (2,2)");
    await wait();
    placingAt(2,2,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (2,2)");
    await wait();

    setGuid("Placing Queen At (2,3)");
    await wait();
    placingAt(2,3,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (2,3)");
    await wait();

    setGuid("No Possible position availabe in Next Row");
    highlight_line(3);
    await wait();
    unhighlight_line(3);
    highlight_line(4);
    await wait();
    unhighlight_line(4);
    setGuid("Backtracking");
    await wait();
    setGuid("Removing Queen From Position (1,2)");
    removeQueen(1, 2);
    setQueen(0, 0);
    await wait();
    setGuid("Placing next queen in Row 2 at (1,3)");
    await wait();
    setQueen(1, 3);
    conditions();
    await wait();

    setGuid("Placing Queen At (2,0)");
    await wait();
    placingAt(2,0,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (2,0)");
    await wait();

    setGuid("Placing new in next row");
    await wait();
    setGuid("Checking Conditions");
    conditions();
    setQueen(2, 1);
    await wait();

    setGuid("Placing Queen At (3,0)");
    await wait();
    placingAt(3,0,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (3,0)");
    await wait();

    setGuid("Placing Queen At (3,1)");
    await wait();
    placingAt(3,1,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (3,1)");
    await wait();

    setGuid("Placing Queen At (3,2)");
    await wait();
    placingAt(3,2,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (3,2)");
    await wait();

    setGuid("Placing Queen At (3,3)");
    await wait();
    placingAt(3,3,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (3,3)");    

    setGuid("No Possible Position Available in next Row");
    await wait();
    setGuid("BackTracking");
    await wait();
    setGuid("Removing Queen From Position (2,1)");
    removeQueen(2, 1);
    array[3][3].setAttribute("fill","#FED8B1");
    await wait();
    conditions();
    setGuid("No Possible Position Available in next Row"); 
    await wait();
    setGuid("BackTracking");
    await wait();  
    removeQueen(1,3);
    setQueen(0, 0);
    setGuid("Removing Queen From Positon (1,3)");
    await wait();
    conditions();
    setGuid("No more Possible Position Available");
    await wait();
    setGuid("Removing Queen At Position (0,0)");
    removeQueen(0, 0);

    visualization2();

}

async function visualization2(){
    setGuid("Starting Second Iteraation In Column 2");
    await wait();
    setGuid("Placing Queen at (0,1)");
    highlight_line(1);
    await wait();
    unhighlight_line(1);
    setQueen(0,1);
    await wait();



    setGuid("Placing Queen At (1,0)");
    await wait();
    placingAt(1,0,"Diagonally",5);
    await wait();
    setGuid("Removing Queen form (1,0)");
    await wait();
    setGuid("Placing Queen At (1,1)");
    await wait();
    placingAt(1,1,"Downwards",3);
    await wait();
    setGuid("Removing Queen form (1,1)");
    await wait();
    setGuid("Placing Queen At (1,3)");
    await wait();
    placingAt(1,2,"Diagonaaly",8);
    await wait();
    setGuid("Removing Queen form (1,3)");
    await wait();
    setGuid("Placing Queen at (1,3)");
    await wait();
    setQueen(1,3);
    await wait();
    conditions();


    setGuid("Placing Next Queen in next row ");
    await wait();
    setGuid("Placing Queen at (2,0)");
    await wait();
    setQueen(2,0);
    await wait();
    conditions();


    setGuid("Placing Next in Another Row");
    setGuid("Placing Queen At (3,0)");
    await wait();
    placingAt(3,0,"Below the Queen",3);
    await wait();
    setGuid("Removing Queen form (3,0)"); 
    await wait();
    setGuid("Placing Queen At (3,1)");
    await wait();
    placingAt(3,1,"Below the Queen",3);
    await wait();
    setGuid("Removing Queen form (3,1)"); 
    await wait();
    setGuid("Placing Queen at (3,2)");
    await wait();
    setQueen(3,2);
    await wait();
    conditions();
    setGuid("ALL QUEENS ARE PLACED");
    clearGlow();

}