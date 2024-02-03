const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Split the authorization header to get the token part
  const token = authHeader.split(" ")[1];

  //   console.log("tok", token);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "mysecret");

    console.log("js", decoded);

    // Attach the user ID from the token to the request object
    req.body.user_id = decoded.user_id;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = jwtMiddleware;
