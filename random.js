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

// cda ���ۼ�Ƶ�ʷֲ�
function randomInteger(start, end, cdf){
    if (cdf == undefined){
        return Math.round(Math.random() * (end-start) +start);
    }
    else {
        var flag = Math.random();
        for(var i = 0; i < cdf.length; i++){
            
            if(cdf[i] < flag && i+1 < cdf.length){
                if(cdf[i+1] >= flag){
                    return start+i+1;
                }
            }
            else if(i+1 > cdf.length || cdf[0] >= flag){
                return start + i;
            }
        }
        
    }
}