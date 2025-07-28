function digitalRoot(n) {
    var numberString = n.toString();
    var resault = 0
    for(var i = 0; i < numberString.length ; i++){
        resault += parseInt(numberString[i])
    }
    if (numberString.length > 1) {
        return digitalRoot(resault);
    } else {
        return resault;
    } 
}
