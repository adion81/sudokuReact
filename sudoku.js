// output of what a board should look like
// used to test quickly all possiblities
var board = [[1,2,0,[],[],6,7,8,9],
            [4,5,6,7,8,9,1,2,3],
            [7,8,9,1,2,3,4,5,6],
            [2,3,4,5,6,7,8,9,1],
            [5,6,7,8,0,1,2,3,4],
            [8,9,1,0,3,4,5,6,7],
            [3,4,5,6,7,8,9,1,2],
            [6,7,8,9,1,2,3,4,5],
            [9,1,2,3,4,5,6,7,8]];

// test easy puzzle
var easy_puzzle = [[1,2,0,0,0,6,7,8,9],
                    [4,5,6,7,8,9,1,2,3],
                    [7,8,9,1,2,3,4,5,6],
                    [2,3,4,5,6,7,8,9,1],
                    [5,6,7,8,0,1,2,3,4],
                    [8,9,1,0,3,4,5,6,7],
                    [3,4,5,6,7,8,9,1,2],
                    [6,7,8,9,1,2,3,4,5],
                    [9,1,2,3,4,5,6,7,8]];

// test hard puzzle
var hard_puzzle = [[1,2,0,0,0,6,7,8,9],
                    [4,5,6,7,8,9,1,2,3],
                    [7,8,9,1,2,3,4,5,6],
                    [2,3,4,5,6,7,8,9,1],
                    [5,6,7,8,0,1,2,3,4],
                    [8,9,1,0,3,4,5,6,7],
                    [3,4,5,6,7,8,9,1,2],
                    [6,7,8,9,1,2,3,4,5],
                    [9,1,2,3,4,5,6,7,8]];             

// will solve a board once its created or inputed
function bruteSolver(board){
    // solver code goes in here.
    board = fillPosibilities(board);
}

function fillPosibilities(board){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j] == 0 || board[i][j] == []){
                board[i][j] = Array(board.length).fill().map((x,i)=>i+1);
            }
        }
    }
    removeDupes(board);
    console.table(board);
}

function buildPuzzle(board){
    // needs to be solver(board)
    // want to make sure there is just one solution.
    while(verifyBoard(board)){
        let x = Math.floor(Math.random()*9);
        let y = Math.floor(Math.random()*9);
        board[x][y] = 0;
        board[(board.length - 1) - x][(board.length - 1) - y] = 0;
    }
    console.table(board);
}

function verifyBoard(board){
    for(let i = 0; i < board.length; i++){
        // console.log("one row accross is: ", board[i].length == new Set(board[i]).size);
        // console.log("one row down is: ", board[i].length == new Set(board.map(x => x[i])).size);
        let size = Math.sqrt(board.length);
        let testArr = [];
        // console.log(Math.floor(i/size%size)*size);
        // console.log((i%size)*size);
        for(let j = Math.floor(i/size%size)*size; j < (Math.floor(i/size%size)*size) + 3; j++){
            for(let k = Math.floor(i/size%size)*size; k < (Math.floor(i/size%size)*size) + 3; k++){
                testArr.push(board[j][k]);
            }
        }
        // console.log("Square ", i, " is ", testArr.length == new Set(testArr).size);
        if(!(board[i].length == new Set(board[i]).size) || !(board.map(x => x[i]).length == new Set(board.map(x => x[i])).size) || !(testArr.length == new Set(testArr).size)){
            // NOT UNIQUE!!!
            return false;
        }
        // thinking (i%3*3) and Math.floor(i/3%3) should give top left corner of new square
        // put another for loop going 3 and move from there and add to a new array to be checked for uniquness.

    }
    // IS UNIQUE!
    return true;

    // for( let i = 0; i < board[x].length; i++){
    //     if(Array.isArray(board[x][i])){
    //         if(board[x][i].includes(board[x][y])){
    //             board[x][i].splice(board[x][i].indexOf(board[x][y]), 1);
    //         }
    //     }
    // }
    // for(let i = 0; i < board.length; i++){
    //     if(Array.isArray(board[i][y])){
    //         if(board[i][y].includes(board[x][y])){
    //             board[i][y].splice(board[i][y].indexOf(board[x][y]), 1);
    //         }
    //     }
    // }
    // for(let i = Math.floor(x / size) * size; i < Math.floor(x / size) * size + size; i++){
    //     for(let j = Math.floor(y / size) * size; j < Math.floor(y / size) * size + size; j++){
    //         if(Array.isArray(board[i][j])){
    //             if(board[i][j].includes(board[x][y])){
    //                 board[i][j].splice(board[i][j].indexOf(board[x][y]), 1);
    //             }
    //         } else if(!board[i][j]){
    //             // possibly delete this else if

    //         }
    //     }
    // }
}

//function to generate a new board.
// works for different size boards. tested with 9x9 and 25x25
// as long as the board has a solid square root should work no issue.
function fillBoard(size = 9, board = new Array(size)){
    // if the board passed in check if it is populated, if its empty it is filled with arrays of arrays of the given size.
    if(!Array.isArray(board[size-1])){
        for( let i = 0; i < size; i++){
            board[i] = new Array(size);
            for(let j = 0; j< size; j++){
                // makes each "board[i][j]" an array [1,2,3,4,5,6,7,8,9]
                // this would allow it to make boards of different sizes and not hard coded
                board[i][j] = Array(size).fill().map((x,i)=>i+1);
            }
        }
    }
    board = lookForSingles(board);
    // this count will to be try x number of times before backtracking a whole nother row
    // I believe it should be reset everytime we finish a row
    // almost positively wrong be wrong...
    // maybe switch to an array: index 0 the row we are swapping, if(count[0] < i)
    let count = [0,0];
    // loops though the array to find the next array of possibilities
    for( let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if(Array.isArray(board[i][j]) && board[i][j].length){
                // selects a random number from the array of arrays
                board[i][j] = board[i][j][Math.floor(Math.random() * board[i][j].length)];
                // sends to remove dupes to remove the selected number from other possible positions
                board = removeDupes(board, i, j, Math.sqrt(size));
                // relook for singles though the board
                board = lookForSingles(board);
            } else if(!Array.isArray(board[i][j])){
                board = removeDupes(board, i, j, Math.sqrt(size));
                board = lookForSingles(board);
            // if it finds an array but has no length, means there are no possible numbers.
            } else if(Array.isArray(board[i][j]) && !board[i][j].length){
                count[1]++;
                count[0] = i;
                // console.log("no possibilities", count, "row: ", i);
                // after 10 tries reset a previously completed row. works!
                for(let k = i - Math.floor(count[1]/10); k < board.length; k++){
                    if(count[1] > 9){
                        count[0] = k;
                        count[1] = 0;
                        i = k;
                    }
                    for(let l = 0; l < board[k].length; l++){
                        board[k][l] = Array(size).fill().map((x,y)=>y+1);
                    }
                }
                j = -1;
                i = 0;
            }
            // need to rething this count reset.
            if(count[0] < i && count[1] > 0){
                // console.log("reset count");
                count[1] = 0;
            }
        }
    }
    // logs "finished" board
    // console.log("DONE!");
    if(verifyBoard(board)){
        console.table(board);
        return board;
    } else {
        fillBoard();
    }
}

// Looks for spots where only on possible number available on the board
function lookForSingles(board){
    for( let i = 0; i < board.length; i++){
        for(let j = 0; j< board[i].length; j++){
            if(Array.isArray(board[i][j]) && board[i][j].length == 1){
                board[i][j] = board[i][j][0];
                board = removeDupes(board, i, j, Math.sqrt(board.length));
            } else if(!board[i][j]){
                // possibly delete this else if.
            }
        }
    }
    return board;
}

// looks through rows and columns and 3x3 squares and removes the number given.
function removeDupes(board, x, y, size){
    for( let i = 0; i < board[x].length; i++){
        if(Array.isArray(board[x][i])){
            if(board[x][i].includes(board[x][y])){
                board[x][i].splice(board[x][i].indexOf(board[x][y]), 1);
            }
        }
    }
    for(let i = 0; i < board.length; i++){
        if(Array.isArray(board[i][y])){
            if(board[i][y].includes(board[x][y])){
                board[i][y].splice(board[i][y].indexOf(board[x][y]), 1);
            }
        }
    }
    for(let i = Math.floor(x / size) * size; i < Math.floor(x / size) * size + size; i++){
        for(let j = Math.floor(y / size) * size; j < Math.floor(y / size) * size + size; j++){
            if(Array.isArray(board[i][j])){
                if(board[i][j].includes(board[x][y])){
                    board[i][j].splice(board[i][j].indexOf(board[x][y]), 1);
                }
            } else if(!board[i][j]){
                // possibly delete this else if

            }
        }
    }
    return board;
}
// console.log("should be false ")
// console.log(verifyBoard(board));
// fillBoard();
// buildPuzzle(fillBoard());
fillPosibilities(board);