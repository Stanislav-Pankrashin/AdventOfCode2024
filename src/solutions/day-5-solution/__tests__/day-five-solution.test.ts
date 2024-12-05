import path from "path";
import { readFile } from "../../../helpers/read-file";
import { dayFiveSolutionPartOne } from "../day-five-solution";

describe("Day Four Solution", () => {
    it("should count the correct middle number of correct rules", () => {
        const file = readFile(path.resolve(__dirname, "test-input.txt"));

        const result = dayFiveSolutionPartOne(file);

        expect(result).toBe(143);
    });
});
