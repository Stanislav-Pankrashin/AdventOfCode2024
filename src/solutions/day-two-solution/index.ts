import path from "path";
import {
    dayTwoSolutionPartOne,
    dayTwoSolutionPartTwo,
} from "./day-two-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = dayTwoSolutionPartOne(file);
    const solutionPartTwo = dayTwoSolutionPartTwo(file);
    console.log("Solution part one:", solutionPartOne);
    console.log("Solution part two:", solutionPartTwo);
};

main();
