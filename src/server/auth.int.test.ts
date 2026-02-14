// @vitest-environment node

import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/server/prisma.server";
import { auth } from "@/server/auth";

describe("Auth Integration", () => {

    beforeEach(async () => {
        await prisma.session.deleteMany();
        await prisma.user.deleteMany();
    })

    it("creates a user via better-auth", async () => {

        await auth.api.signUpEmail({
            body: {
                email: "test@auth.test",
                password: "password123",
                name: "Test"
            }
        });

        const user = await prisma.user.findUnique({
            where: { email: "test@auth.test" }
        });

        expect(user).not.toBeNull();
    });
});
