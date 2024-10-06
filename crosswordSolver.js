let solutions = [];
function crosswordSolver(emptyPuzzle, words) {
    if (typeof emptyPuzzle !== 'string' || !Array.isArray(words) || emptyPuzzle.length===0) {
        console.log("Error");
        return;
    }
    let sum = 0;
    for (let char of emptyPuzzle ) {
        if (!isNaN(Number(char))) {
            sum += Number(char);
        }
    }
    
    if (words.length !== sum) {
        console.log("Error");
        return;
    }
    
    // Convert the puzzle string into a 2D array (split by new lines)
    let matrix = emptyPuzzle.split('\n');
    
    // Try to solve the puzzle by placing all the words
    solvePuzzle(matrix, words, 0);
    // If we found a solution, return it, otherwise return an error message
    if (solutions.length === 1) {
        console.log(solutions.join('\n').split(',').join('\n'));
        return;
    } else {
        console.log("Error");
        return;
    }
}
function solvePuzzle(matrix, words, index) {
    // Base case: if all words have been placed
    if (index === words.length) {
        if (isValidPuzzle(matrix)) {
            // Save the solved matrix as a solution
            solutions.push(matrix.map(row => row.slice())); // Deep copy the matrix
        }
       
        return ; // End the function
    }
    let currentWord = words[index]; // Get the current word to place
    let rows = matrix.length; // Number of rows in the puzzle
    let cols = matrix[0].length; // Number of columns in the puzzle
    // Try placing the word in every position, both horizontally and vertically
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Try to place the word horizontally
            let tempMatrix = placeWordHorizontally([...matrix], currentWord, row, col);
            if (tempMatrix[0] !== "error") {
                solvePuzzle(tempMatrix, words, index + 1); // Recursively place the next word
            }
            // Try to place the word vertically
            tempMatrix = placeWordVertically([...matrix], currentWord, row, col);
            if (tempMatrix[0] !== "error") {
                solvePuzzle(tempMatrix, words, index + 1); // Recursively place the next word
            }
        }
    }
}
function placeWordHorizontally(matrix, word, row, col) {
    let availableSpace = matrix[0].length - col; // Check how many spaces are left in the row
    if (availableSpace < word.length) {
        matrix[0] = "error"; // Not enough space to place the word
        return matrix;
    }
    // Try to place each letter of the word in the row
    for (let i = 0; i < word.length; i++) { 
        let char = matrix[row][col + i]; // Get the current character in the puzzle
        if (char === '1' || char === '2' || char === '0' || char === word[i]) {
            // If the spot is valid, replace it with the word's letter
            let before = matrix[row].slice(0,col+i) 
            let insert = word [i] 
            let after = matrix[row].slice(col+i+1)
            matrix[row] = before + insert + after 
        } else {
            matrix[0] = "error"; // Conflict, can't place the word here
            return matrix;
        }
    }
    return matrix; // Return the matrix with the word placed
}
function placeWordVertically(matrix, word, row, col) {
    let availableSpace = matrix.length - row; // Check how many rows are left
    if (availableSpace < word.length) {
        matrix[0] = "error"; // Not enough space to place the word
        return matrix;
    }
    // Try to place each letter of the word in the column
    for (let i = 0; i < word.length; i++) {
        let char = matrix[row + i][col]; // Get the current character in the puzzle
        if (char === '1' || char === '2' || char === '0' || char === word[i]) {
            // If the spot is valid, replace it with the word's letter
            let before = matrix[row +i] . slice ( 0 ,col ) 
            let insert = word [i] 
            let after = matrix [row + i ] . slice( col + 1 )
            matrix[row + i] = before + insert + after
        } else {
            matrix[0] = "error"; // Conflict, can't place the word here
            return matrix;
        }
    }
    return matrix; // Return the matrix with the word placed
}
function isValidPuzzle(matrix) {
    // Check if the puzzle is fully filled with no '1', '2', or '0' left
    for (let row of matrix) {
        if (row.includes('1') || row.includes('2') || row.includes('0')) {
            return false; // Puzzle is not complete
        }
    }
    return true; // Puzzle is valid
}
// Example usage:
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']
crosswordSolver(puzzle, words); // Output the solution or "Error"