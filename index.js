var express = require('express');
var path = require("path");
const app = express();
app.use(express.static("public"));
app.listen(8081, ()=>{
    console.log('Server started at 8081');
})
const url = 'mongodb://localhost:27017/'
var MongoClient = require('mongodb').MongoClient;


app.get('/msg',async(req,res)=>{
    MongoClient.connect(url,async(err,db)=>{
    if(err){
        console.log('Failed');
        res.send({sent:false});
    }
    else{
        db = db.db('mini');
        console.log('Connected successfully');
        email = req.query.email;
        roll = req.query.roll;
        msg = req.query.msg;
        var result = await db.collection("data").findOne({ email });
        if (result == null) {
            var myObj = {
                email,
                arr: [{
                    roll,
                    msg
                }]
            };
            db.collection("data").insertOne(myObj);
            res.json({sent:true});
        }else {
            var msgArr = result.arr;
            msgArr.push({ roll, msg });
            var myObj = {
                email,
                arr: msgArr
            };
            db.collection("data").updateOne({ email }, { $set: myObj });
            res.json({sent:true});
        }

      
    }
})
   
});


app.get('/login',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err)
            res.send({sent:false});
        else{
            db = db.db('mini');
            e = req.query.email;
            p = req.query.pass;
            db.collection("users").findOne({email: e},(err,data)=>{
                if(data==null)
                    res.send({sent:"no"});
                else if(data.pass!=p)
                    res.send({sent: false})
                else
                    res.send({sent: true})
            })
        }
    })
})


app.get('/adlogin',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
        if(err)
            res.send({sent:false});
        else{
            db = db.db('mini');
            e = req.query.email;
            p = req.query.pass;
            db.collection("admin").findOne({email: e},(err,data)=>{
                if(data==null)
                    res.send({sent:"no"});
                else if(data.pass!=p)
                    res.send({sent: false})
                else
                    res.send({sent: true})
            })
        }
    })
})


app.get('/signup',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
    if(err){
        console.log('Failed');
        res.send({sent:false});
    }
    else{
        db = db.db('mini');
        console.log('Connected successfully');
        e = req.query.email;
        p = req.query.pass;
        n = req.query.name;
        const obj = {name: n,email: e, pass: p};
        
        db.collection("users").findOne({"email": e},async(err,data)=>{
            if(data!=null)
            {
                res.json({sent:"exists"});
            }
            else{
                db.collection('users').insertOne(obj,(err)=>{
                    if(err)
                        res.send({sent:false});
                    else
                        res.send({sent: true});
                })
            }
        });
    }
})
   
});

app.get('/view', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db = db.db("mini");
        e = req.query.email
        db.collection("data").findOne({email:e}, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    })
});

app.get('/faljson',(req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db = db.db("mini");
        n = req.query.name
        e = req.query.email
        p = req.query.pass
        db.collection("users").find({},{ projection:{_id:0,pass:0}}).toArray((err,result)=>{
            res.json(result);
        })
    })

})



app.get('/quicklinks.html/quick',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
    if(err){
        console.log('Failed');
        res.send({sent:false});
    }
    else{
        db = db.db('mini');
        console.log('Connected successfully');
        f = req.query.pdf;
        db.collection('links').insertOne({pdf:f},(err)=>{
            if(err)
                res.send({sent:false});
            else
                res.send({sent: true});
        })
    }
})
});

app.get('/quicklinks.html/fdp',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
    if(err){
        console.log('Failed');
        res.send({sent:false});
    }
    else{
        db = db.db('mini');
        console.log('Connected successfully');
        fd = req.query.fdp;
        db.collection('fdp').insertOne({fdp:fd},(err)=>{
            if(err)
                res.send({sent:false});
            else
                res.send({sent: true});
        })
    }
})
});

app.get('/quicklinks.html/semi',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
    if(err){
        console.log('Failed');
        res.send({sent:false});
    }
    else{
        db = db.db('mini');
        console.log('Connected successfully');
        semi = req.query.semi;
        db.collection('seminars').insertOne({semi:semi},(err)=>{
            if(err)
                res.send({sent:false});
            else
                res.send({sent: true});
        })
    }
})
});

app.get('/quicklinks.html/worksh',(req,res)=>{
    MongoClient.connect(url,(err,db)=>{
    if(err){
        console.log('Failed');
        res.send({sent:false});
    }
    else{
        db = db.db('mini');
        console.log('Connected successfully');
        works = req.query.worksh;
        db.collection('workshops').insertOne({worksh:works},(err)=>{
            if(err)
                res.send({sent:false});
            else
                res.send({sent: true});
        })
    }
})
});


app.get('/latest', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db = db.db("mini");
        db.collection("links").findOne({},{sort:{_id:-1}},(err,data)=>{
            res.json(data);
        });
    })
});

app.get('/latestfdp', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db = db.db("mini");
        db.collection("fdp").findOne({},{sort:{_id:-1}},(err,data)=>{
            res.json(data);
        });
    })
});

app.get('/latestsemi', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db = db.db("mini");
        db.collection("seminars").findOne({},{sort:{_id:-1}},(err,data)=>{
            res.json(data);
        });
    })
});

app.get('/latestworksh', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db = db.db("mini");
        db.collection("workshops").findOne({},{sort:{_id:-1}},(err,data)=>{
            res.json(data);
        });
    })
});
app.get("/removeQuery",(req,res)=>{
    var email = req.query.email;
    var id = req.query.id;
    MongoClient.connect(url,async(err,db)=>{
        if(err){
            console.log('Failed');
            res.send({delete:false});
        }
        else{
            db = db.db('mini');
            console.log('Connected successfully');
            var result = await db.collection("data").findOne({ email });
                var msgArr = result.arr;
                msgArr.splice(id,1);
                var myObj = {
                    email,
                    arr: msgArr
                };
                db.collection("data").updateOne({ email }, { $set: myObj });
                res.send({delete:true});
        }
    })
})

//Favicon
app.get("/favicon.ico",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","logo2.png"));
})