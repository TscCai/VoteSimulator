// External js dependency: random.js


// type: String array
// from: Integer, reffer to voter index
var Ballot = function(option, from, to){
    this.option = option;
    this.from = from;
    this.to = to;
}

// sent: Array of Ballot, the votes this candidate has sent out.
var Voter = function (name){
    this.id = 0;
    this.name = name;
    this.sent = [];
    this.opt_cnt = null;
}
// name: String, the name of candidate.
// recieved: Array of ballot, the votes this candidate has recieved;
var Candidate = function(name, isVIP){
    this.id = 0;
    this.name = name;
    this.isVIP = isVIP;
    this.recieved = [];
}

var VoteSimulator = function (candi, voters, options, voteArrange){
    this.candidates = null;
    this.voters = null;
    this.options = options;
    this.voteArrange = voteArrange;
    this.initialized = false;
    //Cumulative Distribution Function, for VIP
    this.CDF = null;

    var i_vip = [];
    var i_com = [];
    // owner = this;
    
    this.init = function(){
        // Init candidates
        this.candidates = new Array(candi.length);
        for(var i = 0; i < this.candidates.length; i++){
            this.candidates[i] = candi[i];
            this.candidates[i].id = i;
            if (this.candidates[i].isVIP){
                i_vip.push(i);
            }
            else{
                i_com.push(i);
            }
        }

        this.voters = new Array(voters.length);
        for(var i = 0; i < this.voters.length; i++){
            this.voters[i] = new Voter(voters[i]);
            this.voters[i].id = i;
            this.voters[i].opt_cnt = new Array(this.voteArrange.length);
            for(var j = 0; j < this.voters[i].opt_cnt.length; j++){
                this.voters[i].opt_cnt[j] = 0;
            }
        }
        // CDF, voteArrange check
        if(true){
            console.log("INFO: Vote Simulator has been initialized.");
            this.initialized = true;

            console.log(this.candidates);
            console.log(this.voters);
            console.log(this.options);
            console.log("Vote Arrangement: " + this.voteArrange);
        }
        else{
            console.log("ERROR: Vote Simulator is failed to initialize.");
        }
        
    }

    this.performVote = function(){
      
        if(this.initialized){
            var vlen = this.voters.length;
            var clen = this.candidates.length;
            for(var vi = 0; vi < vlen; vi++){
                var voter = this.voters[vi];
                voter.sent = new Array();
                
                // vote VIP
                for(var j = 0; j < i_vip.length; j++){
                    var ballot;
                    var opt = randomInteger(0, this.options.length - 1, this.CDF);
                    if(voter.opt_cnt[opt] >= this.voteArrange[opt]){
                        // choose other option if former option stack is full
                       throw("WARN: Unimplement code");
                    }
                    
                    ballot = new Ballot(this.options[opt], voter.id, i_vip[j]);
                    voter.sent.push(ballot);
                    this.candidates[i_vip[j]].recieved.push(ballot);
                    voter.opt_cnt[opt]++;

                }

                // vote the others
                var rnd_can_arr = randomArray(0, i_com.length - 1);
                var opt_arr = getOptionArray(voter.opt_cnt, i_com.length, this.voteArrange, this.options);
                for(j = 0; j < rnd_can_arr.length; j++){
                    var ballot = new Ballot(opt_arr[j], voter.id, i_com[rnd_can_arr[j]]);
                    console.log("Here comes the ballot from: " + ballot.from + ", to: " + ballot.to + ", opt: " + ballot.option);
                    voter.sent.push(ballot);
                    this.candidates[i_com[rnd_can_arr[j]]].recieved.push(ballot);
                }
                sortByProperty(voter.sent, "to")
                
            }

            // sort the voters[i].sent array
            
            console.log("Vote simulation finish!");
        }


        return this;
    }
    
    sortByProperty = function(arr, prop, order){
        for(var i = 0; i < arr.length; i++){
            for(j = 1; j < arr.length-i; j++){
                if(arr[j-1][prop] > arr[j][prop]){
                    var tmp = arr[j];
                    arr[j]=arr[j-1];
                    arr[j-1]=tmp;
                }
            }
        }
    }

    var getOptionArray = function(cnt, total, va, options){
        var tmp = null;
        var result = [];
        if(cnt.length != va.length){
            throw("Voted cnt doesn't match the vote arrangement.");
        }
        else{
            tmp = new Array(cnt.length);
            for(var i = 0; i < cnt.length; i++){
                tmp[i] = va[i] - cnt[i];
            }
            for(var i = 0; i < tmp.length; i++){
                for(var j = 0; j < tmp[i]; j++){
                    result.push(options[i]);
                }
            }
        }

        return result;
    }

    
}