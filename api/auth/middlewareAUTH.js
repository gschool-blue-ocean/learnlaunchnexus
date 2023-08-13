import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export default async (req, res, next) => {

    const token = req.header("token");
    console.log(req.header)

    if (!token) {
      return res.status(403).send("not authorized");
    }

    /*
    This verify method on the jwt module tells us weather the jwt is valid.
Takes two args. First is the jwt given to us in the req.header, the second is our
secret.

    calling this payload because if it is verified it returns a payload we can
use in our routes
    */
    try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log("1", payload);

    /*
    remember, in our jwtGenerator, we set a value of 'user' = to the value of
our user_id. So really this is just giving us back the correct, now authorized
user_id, and we can use that in our routes.
    */
    console.log('verified')
    req.user = payload.user;
    next();
  } catch (err) {
    console.log(token)
    console.error(err.message);
    console.log("2", err.message);
    console.log("there was a problem");
    return res.status(403).json(req.header);
  }
};
