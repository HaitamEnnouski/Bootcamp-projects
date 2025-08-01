function isIsogram(str) {
    let chars = str.toLowerCase().split(""); // handle case-insensitive
    let charscount = {};

    for (let i = 0; i < chars.length; i++) {
        if (charscount[chars[i]] === undefined) {
            charscount[chars[i]] = 1;
        }else {
            return false; // found a duplicate
        }
    }
    return true; // no duplicates
}
