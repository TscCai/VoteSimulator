// External js dependency: random.js


// type: Vote type, see the enum above.
// from: Candidate, Where the Vote come from (link to a candidate)
var Vote = function(option, from){
    this.option = option;
    this.from = from;
    this.to = "";
}

// name: String, the name of candidate.
// sent: Vote, the votes this candidate has sent out.
// recieved: Vote, the votes this candidate has recieved;
var Candidate = function(name){
    this.name = name;
    this.sent = [];
    this.recieved = [];
}

var VoteMachine = function(candi, voters, options, voteArrange){
    this.candidates = null;
    this.voters = null;
    this.options = options;
    this.voteArrange = voteArrange;
    this.initialized = false;
    
    //Cumulative Distribution Array
    this.CDA = null;
    this.init=function(){
        // Init candidates
        this.candidates = new Array(candi.length);
        for(var i = 0; i < this.candidates.length; i++){
            this.candidates[i] = new Candidate(candi[i]);
        }
        this.voters = new Array(voters.length);
        for(var i = 0; i < this.voters.length; i++){
            this.voters[i] = new Candidate(voters[i]);
        }
        initialized = true;
    }
    
    this.performVote = function(){
      
        if(!initialized){
            init();
        }
        // 对每一个投票人，开始投票
        for(var c = 0; c < this.voters.length; c++){
            // TODO: 选人，填选票，投出去，记下来
            var chosen = randomArray(0, this.candidates.length - 1);
            if (this.CDA != null && this.CDA.length > 0){
                
                    
                // 根据累计概率分布，投票，投票次数 = 候选人个数
                var votes = new Array(this.candidates.length);
                for(var i =0; i < votes.length; i++){
                    var opt = this.options[randomInteger(0, this.options.length - 1, this.CDA)];
                    votes[i] = this._fillVote(opt, c, chosen[0]);
                        
                    this.voters[c].sent.push(votes[i]);
                    this.candidates[chosen.shift()].recieved.push(votes[i]);
                }
                
                
            }
            else{
                for(var i = 0; i < this.options.length; i++){
                    var votes = new Array(this.voteArrange[i]);
                    var opt = this.options[i];
                    for(j = 0; j < votes.length; j++){
                        votes[j] = this._fillVote(opt, c, chosen[0]);
                        
                        this.voters[c].sent.push(votes[j]);
                        this.candidates[chosen.shift()].recieved.push(votes[j]);
                    }
                }
             
            }
        }
        return this;
    }
    
    this._fillVote = function(option, from, to){
        var vote = new Vote(option, from);
        vote.to = to;
        return vote;
    }
    
    
}