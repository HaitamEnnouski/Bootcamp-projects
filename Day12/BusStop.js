var number = function(busStops){
    var total = 0;
    for(var i = 0, total = 0; i < busStops.length; i++){
        total += busStops[i][0]
        total -= busStops[i][1];
    }
    return total;
}
console.log(number([[10,0],[3,5],[5,8]])); // Output: 5