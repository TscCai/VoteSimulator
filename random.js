 // Return an integer array with random order
function randomArray(start, end){
    var arr = new Array(end - start + 1);
    var val = start;
    for (var i = 0; i < arr.length; i++){
        arr[i] = val++;
    }


    for (var i = 0; i < arr.length; i++){
        var idx_tail = arr.length - i - 1;
        for (var j = 0; j < idx_tail; j++){
            var chs = randomInteger(0, idx_tail);
            var tmp = arr[idx_tail];
            arr[idx_tail] = arr[chs];
            arr[chs] = tmp;
        }
    }
    return arr;
}

// cda 是累计频率分布
function randomInteger(start, end, cda){
    if (cda == undefined){
        return Math.round(Math.random() * (end-start) +start);
    }
    else {
        var flag = Math.random();
        for(var i = 0; i < cda.length; i++){
            
            if(cda[i] < flag && i+1 < cda.length){
                if(cda[i+1] >= flag){
                    return start+i+1;
                }
            }
            else if(i+1 > cda.length || cda[0] >= flag){
                return start + i;
            }
        }
        
    }
}