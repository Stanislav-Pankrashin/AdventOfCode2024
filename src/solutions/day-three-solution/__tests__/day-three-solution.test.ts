import path from "path";
import { readFile } from "../../../helpers/read-file";
import {
    dayThreeSolutionPartOne,
    dayThreeSolutionPartTwo,
} from "../day-three-solution";

describe("Day Three Solution", () => {
    it("should calculate the values in corrupted memory", () => {
        const file = readFile(
            path.resolve(__dirname, "test-input-part-one.txt"),
        );

        const result = dayThreeSolutionPartOne(file);

        expect(result).toBe(161);
    });
    it("should calculate the values in corrupted memory with do and dont statements", () => {
        const file = readFile(
            path.resolve(__dirname, "test-input-part-two.txt"),
        );

        const result = dayThreeSolutionPartTwo(file);

        expect(result).toBe(48);
    });
});
