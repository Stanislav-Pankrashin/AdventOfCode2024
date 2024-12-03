import path from "path";
import { readFile } from "../../../helpers/read-file";
import { dayThreeSolution } from "../day-three-solution";

describe("Example Test", () => {
    it("should pass", () => {
        const file = readFile(path.resolve(__dirname, "test-input.txt"));

        const result = dayThreeSolution(file);

        expect(result).toBe(161);
    });
});
