export const protectRoute = async(req,res,next)=>{
    const {user} = req.session

    if(!user) return res.status(404).send("Unauthorized User")

    req.user = user
    next()
}