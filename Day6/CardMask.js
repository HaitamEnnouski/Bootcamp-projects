function maskify(input){
    let n = input.length;
    let masked = '';
    if (n <= 4) {
        return input; // No masking needed for short strings
    }else{
        for (let i = 0; i < n - 4; i++) {
            masked += '#'; // Mask all but the last 4 characters
        }
        masked += input.slice(n - 4); // Append the last 4 characters
        return masked;
    }
}

console.log(maskify("1234567890")); // Output: "######7890"