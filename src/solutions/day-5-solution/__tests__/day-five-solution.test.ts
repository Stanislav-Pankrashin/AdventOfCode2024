import path from "path";
import { readFile } from "../../../helpers/read-file";
import {
    dayFiveSolutionPartOne,
    dayFiveSolutionPartTwo,
} from "../day-five-solution";

describe("Day Five Solution", () => {
    it("should count the correct middle number of correct updates", () => {
        const file = readFile(path.resolve(__dirname, "test-input.txt"));

        const result = dayFiveSolutionPartOne(file);

        expect(result).toBe(143);
    });

    it("should count the correct middle number of incorrect rules after re-ordering", () => {
        const file = readFile(path.resolve(__dirname, "test-input.txt"));

        const result = dayFiveSolutionPartTwo(file);

        expect(result).toBe(123);
    });
});
