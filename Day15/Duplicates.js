//Only Duplicates
function onlyDuplicates(str) {
    const charCount = {};

    for (let char of splitchar) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    return str
    .split('') // Split the string into characters
    .filter(char => count[char] > 1) // Filter characters that appear more than once
    .join(''); // Join the filtered characters back into a string

}
console.log(onlyDuplicates("colloquial"));