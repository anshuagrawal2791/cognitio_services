'use strict';
const register = require('./services/register.js');
const register_cr = require('./services/register_cr.js');
const register_manager = require('./services/register_manager.js');
const login = require('./services/login.js');
const login_cr = require('./services/login_cr.js');
const login_manager = require('./services/login_manager.js');
const add_school = require('./services/add_school.js');
const check_user = require('./services/check_user.js');
const upload_ga = require('./services/upload_ga.js');
const get_ques_complete= require('./services/get_ques_complete_test.js');
const result_complete=require('./services/result_complete.js');
const get_ques_sectional = require('./services/get_ques_sectional.js');
const get_scores = require('./services/get_scores');
const leaderboard = require('./services/leaderboard.js');
const bookmarked = require('./services/bookmarked.js');
const get_schools = require('./services/getschools.js');


module.exports = (app)=> {        
    //app.use(passport.initialize());
    //app.use(passport.session());


    app.get('/',(req, res)=>{       
		res.json({"result":"cognitio"});    
    });

    app.post('/register',(req,res)=>{
    	register.register(req,res,(found)=>{
    		res.json(found);
    	});
    });
app.post('/register_cr',(req,res)=>{
    	register_cr.register(req,res,(found)=>{
    		res.json(found);
    	});
    });
app.post('/register_manager',(req,res)=>{
    	register_manager.register(req,res,(found)=>{
    		res.json(found);
    	});
    });

    app.post('/login',(req,res)=>{
        login.login(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/login_cr',(req,res)=>{
        login_cr.login(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/login_manager',(req,res)=>{
        login_manager.login(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/check_user',(req,res)=>{
        check_user.check(req,res,(found)=>{
            res.json(found);
        })
    });
    app.post('/upload_ga',(req,res)=>{
        upload_ga.upload(req,res,(found)=>{
            res.json(found);
        })
    });

    app.post('/get_ques_complete',(req,res)=>{
        get_ques_complete.get(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/result_complete',(req,res)=>{
        result_complete.get(req,res,(found)=>{
            res.json(found);
        })
    });
    app.post('/get_ques_sectional',(req,res)=>{
        get_ques_sectional.get(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/get_scores',(req,res)=>{
        get_scores.get(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/leaderboard',(req,res)=>{
        leaderboard.get(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/get_bookmarked',(req,res)=>{
        bookmarked.get(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/remove_bookmarked',(req,res)=>{
        bookmarked.remove(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/add_bookmarked',(req,res)=>{
        bookmarked.add(req,res,(found)=>{
            res.json(found);
        });
    });
    app.post('/getQues_bookmarked',(req,res)=>{
        bookmarked.getQues(req,res,(found)=>{
            res.json(found);
        });
    });
 app.post('/add_school',(req,res)=>{
        add_school.add(req,res,(found)=>{
            res.json(found);
        });
    });
app.post('/get_schools',(req,res)=>{
        get_schools.get(req,res,(found)=>{
            res.json(found);
        });
    });
app.post('/get_school_by_id',(req,res)=>{
        get_schools.getById(req,res,(found)=>{
            res.json(found);
        });
    });

}