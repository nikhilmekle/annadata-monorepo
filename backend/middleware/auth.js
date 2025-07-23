// auth.js
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. Login again." });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = token_decode.id; // ✅ Attach userId here
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Token Error" });
  }
};

export default authMiddleware;
