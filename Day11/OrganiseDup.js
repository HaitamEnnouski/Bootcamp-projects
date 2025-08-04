// OrganiseDup.js
function group(arr) {
    let grouped = {};
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (grouped[item] === undefined) {
            grouped[item] = 1;
        } else {
            grouped[item]++;
        }
    }
    // Create arrays with the number repeated according to its count
    for (let key of Object.keys(grouped)) {
        let subArr = [];
        for (let i = 0; i < grouped[key]; i++) {
            subArr.push(Number(key));
        }
        result.push(subArr);
    }
    return result;
}
console.log(group([1, 2, 2, 3, 3, 3]));