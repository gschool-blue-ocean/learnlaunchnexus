import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// secret in .env used for both the database and the api for token generation1
const secret = process.env.SECRET_KEY;

const jwtGenerator = (user_id) => {
  const payload = {
    id: user_id
  };

  return jwt.sign(payload, secret, { expiresIn: '60m' }); // sets the expiration of the token
};

export default jwtGenerator;
