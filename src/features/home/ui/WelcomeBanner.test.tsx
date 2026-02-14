import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import WelcomeBanner from "./WelcomeBanner";


describe("WelcomeBanner", () => {
    it("displays user name", () => {
        render(<WelcomeBanner name="Alice"/>);
        expect(screen.getByText("Welcome, Alice!")).toBeInTheDocument();
    });
})