import AppError from "../utils/AppError.js";
import { jwtVerifyToken } from "../utils/jwtUtils.js";

const verifyToken =  (allowedRoles = []) => {
  return  (req, res, next) => {
    
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError(401, "Unauthorized: No token provided"));
    }

    try {
      //  Verify JWT token
      const decoded = jwtVerifyToken(token, process.env.JWT_SECRET);

      //  Attach decoded user data to request object
      req.user =  decoded; 

      console.log(req.user)

      // 4. Role-based access control (optional use)
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return next(
          new AppError(
            403,
            `Access Denied: You need one of the following roles: ${allowedRoles.join(
              ", "
            )}`
          )
        );
      }

      next(); 
    } catch (error) {
      return next(new AppError(401, "Unauthorized: Invalid or expired token"));
    }
  };
};

export default verifyToken;
