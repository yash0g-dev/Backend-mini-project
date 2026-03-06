//! Request Inside Data-> We Can Read, And Also We Can Modify Data , And Send Response
const jwt=require('jsonwebtoken')
const authArtist=async (req,res,next) => {
// const token = req.cookies.Tokens;
    const token = req.headers.authorization?.split(" ")[1]; 
  if (!token) {
    return res.status(401).send("Invalid Token Artist In  Backend");;
  }
  try{
    const decode = jwt.verify(token, process.env.JWT_Secrt);
    if (decode.Role !== "artist") {
    return res.send("Access Denied");
  }
  req.user=decode;
  next()//Transfer The Data From next row we used in routes
  }catch(err){
    console.log(err);
    res.status(401).json({
    message:"unauthorized"
    })
    
  }

    
};
const authUser=async (req,res,next) => {
// const token = req.cookies.Tokens;
const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent in the Authorization
  if (!token) {
    return res.status(401).send("Invalid Token In Backend");
  }
  
  try{
    const decode = jwt.verify(token, process.env.JWT_Secrt);
    if (decode.Role !== "user") {
    return res.send("Access Denied");
  }
  req.user=decode;
  next()//Transfer The Data From next row we used in routes
  }catch(err){
    console.log(err);
    res.status(401).json({
    message:"Unauthorized"
    })
    
  }

    
};
module.exports={authArtist,authUser};