const jwt = require('jsonwebtoken');


const middlewareController = {
    verifyToken: (req, res, next) =>{
        const token = req.cookies.accessToken;
         if (!token) {
            // No token found, user is not authenticated
            return res.redirect('/login');
          }
        
          try {
            // Verify the token
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
            // Token is valid, user is authenticated
            req.user = decodedToken;
            return next();
          } catch (err) {
            // Token is invalid, user is not authenticated
            return res.redirect('/login');
          }
    },

    verifyTokenAndAdmin: (req, res, next) =>{
      middlewareController.verifyToken(req, res,()=>{
        if(req.user.admin){
          next();
        }else{
          return res.redirect('/login');
        }
      })
  },


  verifyTokenAndUser: (req, res, next) =>{
    middlewareController.verifyToken(req, res,()=>{
      if(!req.user.admin){
        next();
      }else{
        return res.redirect('/login');
      }
    })
}
}
            
module.exports = middlewareController;
