
const clientSchema = require('../models/user');
const jwt = require('jsonwebtoken');


//register
exports.register = (req, res) => {
    const {name, email , password} = req.body
    console.log(req.body)
    const user = new clientSchema({
        name,
        email,
        password
    })

    user.save((err, success) => {
        if(err) {
            console.log(err)
            return res.status(404).json({
                error: "something wrong"
            })
        }
            
        return res.status(200).json({
            message: "register success, now you can go back and login"
        })
    })
};

// pre signup for registration email activation
exports.login_u = (req, res) => {
    const { email, password} = req.body
    console.log(req.body)
    clientSchema.findOne({email}).exec((err, user) => {

        if(err || !user){
            return res.status(400).json({
                error: ' Email does not exist, please signup'
            })
        }
        // authenticate
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: 'Email or password do not match'
            })
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: '8h'});
        const name = user.name
        const { _id } = user;
            // console.log(user)
            console.log(token)
            return res.json({
                token,
                user: { _id , name}
            });
       
    });

  
};
