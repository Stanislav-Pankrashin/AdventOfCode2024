import path from "path";
import { readFile } from "../../../helpers/read-file";
import { daySixSolutionPartOne } from "../day-six-solution";

describe("Day Six Solution", () => {
    it("should count the correct number of spaces visited", () => {
        const file = readFile(path.resolve(__dirname, "test-input.txt"));

        const result = daySixSolutionPartOne(file);

        expect(result).toBe(41);
    });
});
