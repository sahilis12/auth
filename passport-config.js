const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport,getUserByEmail,getUserByID){
    //function to auth users
    const authUser = async(email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null,false,{message:"no user found "})
        }
        try {
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message:"password incorrect"})
            }
        } catch (error) {
            console.log(e);
           return done(e) 
        }
    } 

    passport.use(new localStrategy({usernameField : 'email'},authUser));
    passport.serializeUser((user, done) => done(null,user.id))
    passport.deserializeUser((id, done) => {
        return done(null,getUserByID(id))
    })
}

module.exports = initialize