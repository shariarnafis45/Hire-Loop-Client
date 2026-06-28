import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { admin } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.MONGO_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        defaultValue: "seeker",
      },
      plan: {
        defaultValue: "seeker_free",
      },
    },
  },
  plugins: [admin()],
});
