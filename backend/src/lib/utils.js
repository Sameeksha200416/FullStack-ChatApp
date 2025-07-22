import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,//prevent XSS attack cross-site scripting attacks
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
        secure: process.env.NODE_ENV === "production" // Only secure in production
    });
    return token;
};