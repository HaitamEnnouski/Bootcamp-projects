function isTriangle(a,b,c){
    if (a <= 0 || b <= 0 || c <= 0) {
        return false;
    }
    return (a + b > c) && (a + c > b) && (b + c > a);
}

console.log(isTriangle(1, 2, 3)); // false
console.log(isTriangle(3, 4, 5)); // true
console.log(isTriangle(5, 12, 13)); // true