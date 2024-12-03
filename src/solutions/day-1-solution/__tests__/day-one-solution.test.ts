import path from "path";
import {
    dayOneSolutionPartOne,
    dayOneSolutionPartTwo,
} from "../day-one-solution";
import { readFileByLine } from "../../../helpers/read-file";

describe("Day One Solution", () => {
    it("Should return the correct distance", () => {
        const input = readFileByLine(path.resolve(__dirname, "test-input.txt"));
        const result = dayOneSolutionPartOne(input);

        expect(result).toBe(11);
    });

    it("Should return the correct similarity", () => {
        const input = readFileByLine(path.resolve(__dirname, "test-input.txt"));
        const result = dayOneSolutionPartTwo(input);

        expect(result).toBe(31);
    });
});
