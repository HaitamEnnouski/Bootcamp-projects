function narcissistic(value) {
    var numberString = value.toString();
    var resault = 0
    for(var i = 0; i < numberString.length ; i++){
        resault += parseInt(Math.pow(numberString[i],numberString.length));
    }
    if (resault === value) {
        return true
    }else{
        return false;
    }
}
console.log(narcissistic(153)); // true
console.log(narcissistic(123)); // false
