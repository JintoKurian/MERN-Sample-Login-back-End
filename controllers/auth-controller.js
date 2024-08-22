
const users = require('../Models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

        

exports.loginUser = async (req,res)=>{
    console.log('Inside Login Controller function');
    const {email,password} = req.body
    // console.log(email,password);

    try{
      const existingUser = await users.findOne({email});
    //   console.log(existingUser);
      
      const verification = await bcrypt.compare(password, existingUser.password);
      console.log(verification);

      if(verification){
        const token = jwt.sign({userId: existingUser._id}, "secretKeyJinto" );
        const {password, ...others} = existingUser._doc

        res.status(200).json({others,token});
        console.log(others,token);
        
      }else{
        res.status(406).json("Wrong Password");
        
      }
      
    }catch(err){
        res.status(400).json("User doesnot exists");
    }
}


exports.registerUser = async (req,res)=>{
    const {username,email,password} = req.body
    // console.log(username,email,password);

    try{
        const userExists = await users.findOne({email:email});
        
        if(userExists){
            res.status(401).json("User Already exists from controller")
        }else{
            console.log("User doesnot exists");

            const hashedpassword = await bcrypt.hash(password, 10);
            // console.log("This is the hashed password "+hashedpassword);
            req.body.password = hashedpassword
            const newUser = new users(req.body)
            await newUser.save();

            res.status(200).json(newUser);
            console.log(newUser);

        }
           
        
    }catch(err){
        res.status(401).json("Catch Block error "+ err);
    }
}












// exports.register = async (req,res)=>{
//     console.log("Inside register controller function");
//     res.status(200).json("Register request recieved")
//     const {username,email,password} = req.body
//     // console.log(`${username}, ${email}, ${password},`)
//     try{
//     const existingUser = await users.findOne({email:email})
//     if(existingUser){
//         res.status(401).json("User already exists....please login!!!")
//     }else{
//         const salt = await bcrypt.genSalt(10);
//         hashedpassword = await bcrypt.hash(password, salt);
//         req.body.password = hashedpassword
//         const newUser = new users({
//             username,email,password,github:"",linkedin:"",profile:""
//         })
//         await newUser.save()
//     }
// }
// catch (err){
//     res.status(401).json(`Registe API Failed , Error,:${err}`)
// }

// }



        
        

   

        







//     }catch(err){
//         res.status(401).json(err)
//     }
// }