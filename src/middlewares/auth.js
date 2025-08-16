 const adminAuth = (req , res, next) => {
 
    console.log("admin is running...");
    const token = "xyz";
    const isAuthorised = token === "xyz";
    if (!isAuthorised) {
      res.status(401).send("This is still unAuthorised");
    } else {
      next();
    }
  
 
};


 const userAuth = (req , res, next) => {
    console.log("User middleware running...");
    const token = "xyz";
    const isAuthorised = token === "xyz";
    if (!isAuthorised) {
      res.status(401).send("This is still unAuthorised");
    } else {
      next();
    }
  
 
};


module.exports = {
    adminAuth,
    userAuth,
}
