
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
const { Strategy } = require("passport");
const bcrypt = require('bcrypt')

const LocalStrategy = require('passport-local').Strategy

 function initialize(passport, getUserByEmail,getUserById){
    console.log('in passport authenticate');
    const authenticateUser = async (email, password, done)=> {    //make sure the user is corretc
       
        console.log('in passport auth user');
        const user = getUserByEmail(email)
        if(user == null){
            return done(null,false, {message:'No users with that email'})  //null == no error on the server      //false==there is no user
        }
        try{
            console.log('password,user.password',password,user.password);
            if (await bcrypt.compare(password, user.password)) {             //if its true user=jelszo is ok match
                console.log('in passport auth user is OK');
                 return done(null, user)         //felhasznalo ok
             } else {
                 return done(null, false,{ message: 'Password incorrect' })
             }
        }catch(err){
            return done(err)
        }
    }


passport.use( new LocalStrategy({ usernameField:'email' }, authenticateUser))
passport.serializeUser((user,done) => done(null, user.id) )
passport.deserializeUser((id,done) => { done(null, getUserById(id)) })
}

module.exports = initialize