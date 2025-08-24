function isSolved(board) {
    // Check rows
    for (let row of board) {
        if (row.every(cell => cell === '1')) return 'X';
        if (row.every(cell => cell === '2')) return 'O';
    }
    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board.every(row => row[col] === '1')) return 'X';
        if (board.every(row => row[col] === '2')) return 'O';
    }
    // Check diagonals
    if (board[0][0] === '1' && board[1][1] === '1' && board[2][2] === '1') return 'X';
    if (board[0][2] === '1' && board[1][1] === '1' && board[2][0] === '1') return 'X';
    if (board[0][0] === '2' && board[1][1] === '2' && board[2][2] === '2') return 'O';
    if (board[0][2] === '2' && board[1][1] === '2' && board[2][0] === '2') return 'O';

    return null;            
}

console.log(isSolved([
    ['1', '2', '1'],
    ['2', '1', '2'],
    ['2', '1', '1'] 
])); // Output: 'X'