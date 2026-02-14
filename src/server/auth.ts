import { betterAuth } from "better-auth";
import {prismaAdapter} from "@better-auth/prisma-adapter";
import { prisma } from "@/server/prisma.server.ts"


export const auth = betterAuth({
    baseURL: process.env.APP_URL || "http://localhost:3000",
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "sqlite"
    }),
    emailAndPassword: {
        enabled: true
    },
    session: {
        expiresIn: 60 * 60 * 24 * 30
    },
    trustedOrigins: [process.env.APP_URL || "http://localhost:3000"]
});