import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY;

const jwtGenerator = (user_id) => {
  const payload = {
    id: user_id,
  };

  return jwt.sign(payload, secret, { expiresIn: '1m' });
};

export default jwtGenerator;
