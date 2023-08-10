import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.secret;

const jwtGenerator = (user_id) => {
  const payload = {
    id: user_id,
  };

  return jwt.sign(payload, secret, { expiresIn: "12hr" });
};

export default jwtGenerator;
