const UserModel=require('../model/user.model')
const jwt=require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const register=async (req,res) => {
    const {Username,Email,Password,role="user"}=req.body;
const isExist=await UserModel.findOne({
    $or:[
        {Username},{Email} //using postman we can check both username and email is exist or not  
    ]
})
   const existingUser = await UserModel.findOne({
    $or: [
    { Email: req.body.Email },{ Username: req.body.Username }// Having Frontend Then we used to check Username and Email Both
    ]
});

if (existingUser) {
  return res.status(409).json({ message: "User already exists" });
}
if(isExist){
    return res.status(401).json({"Message":"User Alerady Exist"})
}
const  hash=await bcrypt.hash(Password,10) 
const user=await UserModel.create({
    Username,
    Email,
    Password:hash,
    role
})
const token=jwt.sign({
    id:user._id,
    role:user.role,
},process.env.JWT_Secrt)
res.status(201).json({
    message:"Here The User Created Succesfully",
    user:{
        id:user._id,
        Name:user.Username,
        Emai:user.Email,
        role:user.role
    }


})
}
const login= async (req,res) => {

    const {Username,Email,Password}=req.body;
 
    const user=await UserModel.findOne({
        $or:[
            {Username},
            {Email}
        ]
    })
    if(!user){ 
        return res.status(401).json({message:"Invalid Credentials"})
    }
    const ispassvalid=await bcrypt.compare(Password,user.Password)
        if(!ispassvalid){
        return res.status(402).json({message:"Invalid Credentials"})
    }
    const token=  jwt.sign({id:user._id,Role:user.role},process.env.JWT_Secrt)
    // res.cookie("Tokens",token)
    res.cookie("Tokens", token, { httpOnly: true });
    res.status(200).json({
        message:"Here The User Login Succesfully",
        token,
        users:{
            id:user._id,
            Name:user.Username,
            Email:user.Email,
            role:user.role,
            }
    })
    
}

module.exports={register,login}