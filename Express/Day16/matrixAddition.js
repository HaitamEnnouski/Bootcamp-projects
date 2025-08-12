function matrixAddition(a, b){
    results = [];
    for (let i = 0; i < a.length; i++) {
        let row = [];
        for (let j = 0; j < a[i].length; j++) {
            row.push(a[i][j] + b[i][j]);
        }
        results.push(row);
    }
    return results;
}
console.log(matrixAddition([[1,2],[3,4]], [[5,6],[7,8]])); // [[6,8],[10,12]]