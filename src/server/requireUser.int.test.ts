// vitest-environment node

import {describe, expect, it, vi} from "vitest";
import {auth} from "./auth";
import {requireUser} from "./requireUser";

describe("requiresUser", () => {
    it("throws if not authenticated", async () => {
        vi.spyOn(auth.api, "getSession").mockResolvedValue(null as any);
        await expect(requireUser({} as any)).rejects.toThrow("Unauthorized");
    });

    it("returns userId if session exists", async () => {
        vi.spyOn(auth.api, "getSession").mockResolvedValue({user: {id: "user-123"}} as any);

        const userId = await requireUser(new Headers());
        expect(userId).toBe("user-123");
    });
});
