import { betterAuth } from "better-auth";
import { memory } from "better-auth/adapters";

export const auth = betterAuth({
  database: memory(),
  secret: process.env.BETTER_AUTH_SECRET || "demo-secret-key",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/api/auth",

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
