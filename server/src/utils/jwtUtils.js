import jwt from "jsonwebtoken";

const jwtSign = (payload) =>{
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
}
  

const jwtVerifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return false;
  }
};

export { jwtSign, jwtVerifyToken };
