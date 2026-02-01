import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,

  NODE_ENV: process.env.NODE_ENV || "development",

  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/express-crud-db",

  ACCESS_TOKEN: {
    secret: process.env.ACESS_TOKEN_SECRET || "",
    lifetime: process.env.ACESS_TOKEN_LIFETIME,
  },

  REFRESH_TOKEN: {
    secret: process.env.REFRESH_TOKEN_SECRET || "",
    lifetime: process.env.REFRESH_TOKEN_LIFETIME,
  },
};
