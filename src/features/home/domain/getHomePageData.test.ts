// @vitest-environment node

import {describe, it, expect, vi} from "vitest";
import {getHomePageData} from "@/features/home/domain/getHomePageData.ts";

describe("getHomePageData", () => {
    it("returns structured home page data", async () => {

        const fakeRepository = {
            getUserById: vi.fn().mockResolvedValue({id: "user-1", name: "Alice"}),
            countTotalTasks: vi.fn().mockResolvedValue(15),
            countDoneTasksToday: vi.fn().mockResolvedValue(3)
        };

        const result = await getHomePageData("user-1", fakeRepository);
        expect(result.user.id).toBe("user-1");
        expect(result.user.name).toBe("Alice");
        expect(result.countTotalTasks).toBe(15);
        expect(result.countDoneTasksToday).toBe(3);
    });
})