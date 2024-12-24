import path from "path";
import { readFileByLine } from "../../../helpers/read-file";
import { dayEightSolutionPartOne } from "../day-eight-solution";

describe("Day Eight Solution", () => {
    it("should sum the correct calculations", () => {
        const file = readFileByLine(path.resolve(__dirname, "test-input.txt"));

        const result = dayEightSolutionPartOne(file);

        expect(result).toBe(14);
    });
});
