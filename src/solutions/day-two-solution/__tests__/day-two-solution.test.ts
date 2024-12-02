import path from "path";
import {
    dayTwoSolutionPartOne,
    dayTwoSolutionPartTwo,
} from "../day-two-solution";
import { readFileByLine } from "../../../helpers/read-file";

describe("Day One Solution", () => {
    it("Should return the correct number of safe reports", () => {
        const input = readFileByLine(path.resolve(__dirname, "input.txt"))
        const result = dayTwoSolutionPartOne(input);

        expect(result).toBe(2);
    });

    it("Should return the correct number of safe reports by removing one single bad level", () => {
        const input = readFileByLine(path.resolve(__dirname, "input.txt"))
        const result = dayTwoSolutionPartTwo(input);

        expect(result).toBe(4);
    });
});
