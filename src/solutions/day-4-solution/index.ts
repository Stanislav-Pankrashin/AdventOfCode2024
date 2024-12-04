import path from "path";
import {
    dayFourSolutionPartOne,
    dayFourSolutionPartTwo,
} from "./day-four-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = dayFourSolutionPartOne(file);
    const solutionPartTwo = dayFourSolutionPartTwo(file);
    console.log("Solution part one:", solutionPartOne);
    console.log("Solution part two:", solutionPartTwo);
};

main();
