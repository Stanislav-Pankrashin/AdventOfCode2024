import path from "path";
import { readFileByLine } from "../../../helpers/read-file";
import { daySevenSolutionPartOne } from "../day-seven-solution";

describe("Day Seven Solution", () => {
    it("should sum the correct calculations", () => {
        const file = readFileByLine(path.resolve(__dirname, "test-input.txt"));

        const result = daySevenSolutionPartOne(file);

        expect(result).toBe(3749);
    });
});
