function sum(numbers){
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}
console.log("sum:", sum([1, 2, 3, 4, 5])); // Output: 15

function countEven(numbers){
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            count++;
        }
    }
    return count;
}
console.log("countEven:", countEven([1, 2, 3, 4, 5])); // Output: 2

function double(numbers){
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = numbers[i]*2
    }
    return numbers
}

console.log("double:", double([1, 2, 3, 4, 5])); // Output: [2, 4, 6, 8, 10]

// function sockMerchant(socks) {
//     let pairs = 0;
//     socks.sort();

//     for (let i = 0; i < socks.length - 1; i++) {
//         if (socks[i] === socks[i + 1]) {
//             pairs++;
//             i++;
//         }
//     }

//     return pairs;
// }
function sockMerchant(socks) {
    let pairs = 0;
    let sockCount = {};

    for (let i = 0; i < socks.length; i++) {
        let color = socks[i];
        sockCount[color] = (sockCount[color] || 0) + 1;
    }

    for (let color in sockCount) {
        pairs += parseInt(sockCount[color] / 2);
    }
    return pairs;
}
console.log("sockMerchant:", sockMerchant([10, 20, 20, 10, 10, 30, 50, 10, 20])); // Output: 3
