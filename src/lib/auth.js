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
  plugins: [admin()],
  user: {
    additionalFields: {
      tempRole: {
        type: "string",
        required: false,
      },
      plan: {
        type: "string",
        defaultValue: "seeker_free",
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.tempRole || "seeker",
            },
          };
        },
      },
    },
  },
});
