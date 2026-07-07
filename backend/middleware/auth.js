// auth.js - Middleware that protects routes by checking for a valid JWT
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Expect header format: "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // grab the part after "Bearer "

  try {
    // Verify the token using our secret - throws an error if invalid/expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user id from the token payload onto the request object
    // so later controllers know which user is making the request
    req.userId = decoded.id;

    next(); // move on to the actual route handler
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

module.exports = protect;
