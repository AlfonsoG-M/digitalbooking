import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
    cleanup();
})

/* describe("return a string", () => {
    const value = "hello";
    it("function return a string", () => {
        const result = value;
        expect(typeof result).toBe('string');
    })
}) */