if (process.env.NODE_DEV !== "production") {
    require("dotenv").config;
}  // DEVELOPMENT CONFIG

// **  MODULOK betöltése ami kellene a backend-hez ** //
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); //libary
const passport = require("passport"); //libary
const flash = require("express-flash");
const methodOverride = require('method-override')
const session = require("express-session");
const initializePassport = require("./passport-config");
//credit To:https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

// lowdb  adatbazis inicializálása
const dbFile = 'apiwars.db.json'  // ebbe tároljuk az adatokat
let low = require('lowdb'), 
  FileSync = require('lowdb/adapters/FileSync'),
  adapter = new FileSync(dbFile),
  db = low(adapter);
  db.defaults({
    users :[],
    count: 0,
    votes :[]
  }).write()


 let users = db.get('users').value();
 // console.log('users=',users);
 //users= [];

 // login-hoz passwport module leirasa
initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    /*  genid: function(req) {
        return genuuid(); // use UUIDs for session IDs
      }, */
    secret: process.env.SESSION_SECRET || '<mysecret>',
    saveUninitialized: false,
    resave: false,
    maxAge: 3600000, // 1 hour (in milliseconds)
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
app.use(express.json());

//CORS middleware
app.use(function(req, res, next) {
  console.log('request:', req.url,req.body, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept, x-token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  if(req.method === 'OPTIONS') {
      res.end();
  }
  else {
      next();
  }
});


// ******  backend EXPRESS ROUTES ****** //

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

// *** LOGIN check *** //
app.post( "/login", checkNotAuthenticated,  passport.authenticate("local", {
        successRedirect: "",
        failureRedirect: "", 
        failureFlash: true
    }), 
    (req, res) => {
          if (req.isAuthenticated())
            rspmsg={"message":'yes it is ok','token' : req.body.email,'email':req.body.email};
          else
            rspmsg={"message":'please try again'};

          console.log('rspmsg=',rspmsg)
          res.set('Content-Type', 'application/json')
          res.json(rspmsg)
    }
);

// ***   VOTESTATISTICS  ***** //
app.get("/votestats", checkNotAuthenticated, (req, res) => {
    //hany vote-unk van eddig ?
    let voteStats = db.get('votes')
    .sortBy('planet')    
    .value()
    
    const groupByMake = (voteStats = []) => {
      let result = [];
      result = voteStats.reduce((r, a) => {
         r[a.planet] = r[a.planet] || [];
         r[a.planet].push(a);
         return r;
      }, Object.create(null));
      return result;
    };

    let planetGroup=groupByMake(voteStats)
    console.log(planetGroup,Object.keys(planetGroup).length);
    voteStats =[]
    for( key of Object.keys(planetGroup)){
        console.log( key, planetGroup[key].length);
        voteStats.push({"name":key, "votes" : planetGroup[key].length})
    }
    if(Object.keys(planetGroup).length ===0)
        res.json([{'name': "No votes registered.", votes:'0'}])
    else
      res.json(voteStats)  //res.json({'Tatoine':'5','Mercur':3,'Earth':16});
});

// ***   RGISTRATION  - REGISTER  just IF EMAIL DOES NOT EXIST  **** //
app.post("/register", checkNotAuthenticated,async (req, res) => {
 
  console.log("register(POST) received: req.body=",req.body); 
  // a kapot adatokat a req.body -ba kapjuk meg es userd objectbe tesszem
  let userd = { email    : req.body.email,
                name     : req.body.name,
                password : req.body.password
              }

 // adatbazisba rákeresek hogy adja vissza a regisztrálni kivánt email-t.
  const existingUser = db
    .get('users')
    .find({email: userd.email})
    .value()

  //ki iratom a tlálat adatokat a rgisztrálni kivant adatokkal csak összehasonlitásnak 
  console.log('existingUser=',existingUser,'userd=',userd,req.body);
  let respmsg={'message':'','id':null}

  // ha nincs találat az adatbázisban aregisztrálni kivánt email-re akkor minden ok és regisztrálom
  if (typeof(existingUser) === 'undefined'){
    let hashedPassword = "";
    try {
      //a belépési jelszót MINDIG titkosítjuk !!!!! GDPR és hackelési szabály, jó sok pényedbe fog kerülni ha NEM csinálod!!!
      hashedPassword = await bcrypt.hash(req.body.password, 10);

      //a tömbhöz adjuk - MOSTMAR eenek nincs értelme mert adatbázist használunk
      users.push({ 
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
  
    } catch {
      console.log("hashing password error");
      //res.redirect("/register");
      userd.id=existingUser['id']
      res.end("server hashing pw error")
      return
    }

    // adjuk hozzá aregisztrálni kapot adatokat az adatabázisba
    console.log('add user userd=',userd);
    userd.id = db.get('count').value()+1;
    userd.password = hashedPassword;

   // db.get('users').push(userd).write(); // hozzá adjuk az uj adatot
    db.update('count', n => n + 1).write(); // növeljük a recCount-ot
    console.log("db.get('count')=",db.get('count').value());
    
    message=">Registration successful."
  }
  else{
    // létezik már az email mert typeof(existingUser) != ' undefined' eyert nem registrálhatjuk mert már létezik az email cim.
      message = "Username already exists, please choose another one!"
      userID = existingUser['id']
  }

  respmsg={'message':`${message}`,'id' : `${ userd.id}`}
  console.log('respmsg=',respmsg,(users));
  res.set('Content-Type', 'application/json')
  res.send(respmsg);
  
});

// *****  save VOTE for PLANET  *****     user.email,planet.name
app.post("/vote", checkNotAuthenticated,async (req, res) => {
  console.log("vote(POST) req.body",req.body);
  let vote ={ email : req.body.email,
              datetime :  Date.now().toString(),  // mikor rögzitettük a vote-ot. pl-ha majd vote of the day, vote of the month, voth of the year,stb---
              //vote  : req.body.vote ez mindig 1-nek számit nincs értelme letárolni
              planet: req.body.planet
            }
// kesobb vissza juldjuk ho
 let voteForPlanet = db
    .get('votes')
    .find({planet: vote.planet})
    .value()

    //hany voteunk van eddig ?
  voteForPlanet = db.get('votes')
    .filter({planet: vote.planet})
    .sortBy('datetime')
    .size()    
    .value()


console.log('voteForPlanet=',voteForPlanet,'vote=',vote,'reqVote=',req.body);
let respmsg={'message':'','id':null}


  db.get('votes').push(vote).write(); // hozzá adjuk az uj VOTE adatot
 // db.update('voteCount', n => n + 1).write(); // növeljük a recCount-ot
// console.log("db.get('count')=",db.get('voteCount').value());
  
  message="Vote registration was successful."

  respmsg={'message':'`${message}`','voteNo' : `${voteForPlanet+1}`}
  console.log('respmsg=',respmsg,(vote));
  res.set('Content-Type', 'application/json')
  res.send(respmsg);
  
});

// ** 
app.delete('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    console.log('checkAuthenticated');
  if (req.isAuthenticated()) {
    console.log('YES, is Authenticated');
    return next();
  }

  res.redirect("/login");
}
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
const PORT = 8080
app.listen(PORT,()=> console.log(`backend server listening on  ${PORT}`));
