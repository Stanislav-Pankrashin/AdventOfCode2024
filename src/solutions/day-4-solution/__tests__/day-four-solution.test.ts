import path from "path";
import { readFileByLine } from "../../../helpers/read-file";
import { dayFourSolutionPartOne } from "../day-four-solution";

describe("Day Four Solution", () => {
    it("should count the correct number of xmas", () => {
        const file = readFileByLine(path.resolve(__dirname, "test-input.txt"));

        const result = dayFourSolutionPartOne(file);

        expect(result).toBe(18);
    });
});
