import { describe, it, expect } from "vitest"
import { RandomPraiseGenerator } from "./praise.generator"

describe("RandomPraiseGenerator", () => {

    it("returns a string", () => {
        const generator = new RandomPraiseGenerator()
        const result = generator.generate()

        expect(typeof result).toBe("string")
        expect(result.length).toBeGreaterThan(0)
    })

    it("returns one of the predefined messages", () => {
        const generator = new RandomPraiseGenerator()

        const result = generator.generate()

        const possibleMessages = (generator as any).messages
        expect(possibleMessages).toContain(result)
    })
});
