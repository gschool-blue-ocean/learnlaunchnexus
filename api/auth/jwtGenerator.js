import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = '123';

const jwtGenerator = (user_id) => {
  const payload = {
    id: user_id,
  };

  return jwt.sign(payload, secret, { expiresIn: 300 });
};

export default jwtGenerator;
