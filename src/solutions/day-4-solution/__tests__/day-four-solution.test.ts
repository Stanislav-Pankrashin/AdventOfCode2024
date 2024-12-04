import path from "path";
import { readFileByLine } from "../../../helpers/read-file";
import {
    dayFourSolutionPartOne,
    dayFourSolutionPartTwo,
} from "../day-four-solution";

describe("Day Four Solution", () => {
    it("should count the correct number of xmas", () => {
        const file = readFileByLine(path.resolve(__dirname, "test-input.txt"));

        const result = dayFourSolutionPartOne(file);

        expect(result).toBe(18);
    });

    it("should count the correct number of x-mas", () => {
        const file = readFileByLine(path.resolve(__dirname, "test-input.txt"));

        const result = dayFourSolutionPartTwo(file);

        expect(result).toBe(9);
    });
});
