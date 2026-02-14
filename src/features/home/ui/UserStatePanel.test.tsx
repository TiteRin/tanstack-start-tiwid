import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import UserStatePanel from "./UserStatePanel";


describe("UserStatePanel", () => {

    const props = {
        praise: "Great job!",
        countTotalTasks: 15,
        countDoneTasksToday: 3
    }

    it("displays praise message", () => {
        render(<UserStatePanel  {...props} />)
        expect(screen.getByText("Great job!")).toBeInTheDocument();
    });

    it("displays daily summary", () => {
        render(<UserStatePanel  {...props} />)
        expect(screen.getByText("You’ve done 3 tasks today!")).toBeInTheDocument();
    });

    it("displays total tasks count", () => {
        render(<UserStatePanel  {...props} />)
        expect(screen.getByText("Total tasks in your forever Done List: 15")).toBeInTheDocument();
    });
})