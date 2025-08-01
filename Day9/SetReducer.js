function setReducer(arr) {
    // Base case: if only one element, return it
    if (arr.length === 1) return arr[0];

    // Step 1: Compress the array based on consecutive duplicates
    const result = [];
    let count = 1;

    for (let i = 1; i <= arr.length; i++) {
        if (arr[i] === arr[i - 1]) {
        count++;
        } else {
        result.push(count);
        count = 1;
        }
    }

    // Step 2: Recursively reduce again
    return setReducer(result);
}
