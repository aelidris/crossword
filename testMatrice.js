function crosswordSolver(puzzle, words) {
    let emptyPuzzle2D = puzzle.split('\n').map(row => row.split(''));
    let filledPuzzle2D = emptyPuzzle2D.map(row => [...row]);
    let wordPositions = [];
    
    // Find word positions
    for (let i = 0; i < emptyPuzzle2D.length; i++) {
        for (let j = 0; j < emptyPuzzle2D[i].length; j++) {
            if (emptyPuzzle2D[i][j] === '1' || emptyPuzzle2D[i][j] === '2') {
                // Check horizontal word
                if (j === 0 || emptyPuzzle2D[i][j-1] === '.') {
                    let length = 0;
                    while (j + length < emptyPuzzle2D[i].length && emptyPuzzle2D[i][j+length] !== '.') {
                        length++;
                    }
                    if (length > 1) {
                        wordPositions.push({row: i, col: j, length, direction: 'horizontal'});
                    }
                }
                // Check vertical word
                if (i === 0 || emptyPuzzle2D[i-1][j] === '.') {
                    let length = 0;
                    while (i + length < emptyPuzzle2D.length && emptyPuzzle2D[i+length][j] !== '.') {
                        length++;
                    }
                    if (length > 1) {
                        wordPositions.push({row: i, col: j, length, direction: 'vertical'});
                    }
                }
            }
        }
    }

    // Sort word positions by length (descending)
    wordPositions.sort((a, b) => b.length - a.length);

    // Sort words by length (descending)
    words.sort((a, b) => b.length - a.length);

    if (wordPositions.length !== words.length) {
        console.log("Error");
        return;
    }

    function canPlaceWord(word, row, col, direction) {
        if (direction === 'horizontal') {
            for (let i = 0; i < word.length; i++) {
                if (filledPuzzle2D[row][col+i] !== '0' && filledPuzzle2D[row][col+i] !== '1' && 
                    filledPuzzle2D[row][col+i] !== '2' && filledPuzzle2D[row][col+i] !== word[i]) {
                    return false;
                }
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                if (filledPuzzle2D[row+i][col] !== '0' && filledPuzzle2D[row+i][col] !== '1' && 
                    filledPuzzle2D[row+i][col] !== '2' && filledPuzzle2D[row+i][col] !== word[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    function placeWord(word, row, col, direction) {
        if (direction === 'horizontal') {
            for (let i = 0; i < word.length; i++) {
                filledPuzzle2D[row][col+i] = word[i];
            }
        } else {
            for (let i = 0; i < word.length; i++) {
                filledPuzzle2D[row+i][col] = word[i];
            }
        }
    }

    function solve(index) {
        if (index === wordPositions.length) {
            return true; // All words placed successfully
        }

        const position = wordPositions[index];
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (word.length === position.length && canPlaceWord(word, position.row, position.col, position.direction)) {
                placeWord(word, position.row, position.col, position.direction);
                words.splice(i, 1); // Remove the word from the list

                if (solve(index + 1)) {
                    return true; // Solution found
                }

                // Backtrack
                words.splice(i, 0, word); // Put the word back
                placeWord('0'.repeat(word.length), position.row, position.col, position.direction);
            }
        }

        return false; // No valid word found for this position
    }

    if (solve(0)) {
        console.log(filledPuzzle2D.map(row => row.join('')).join('\n'));
    } else {
        console.log("Error");
    }
}

// Test the function
const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)