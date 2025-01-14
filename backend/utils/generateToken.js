import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId }, process.env.SECRET_KEY, { 
        expiresIn: '15d'
    });
    res.cookie('jwt', token, { 
        httpOnly: true, 
        maxAge: 15 * 24 * 60 * 60 * 1000, //prevent xss attacts (Cross site scripting.),
        sameSite : "strict", // prevent CSRF attacks (Cross site request forgery)
        secure: process.env.NODE_ENV !== "development", //HTTPS in production
    });
};

export const verifyToken = (token) => {
    try {
      return jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  };

export default generateTokenAndSetCookie;