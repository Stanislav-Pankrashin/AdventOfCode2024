import path from "path";
import {
    daySixSolutionPartOne,
    daySixSolutionPartTwo,
} from "./day-six-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = daySixSolutionPartOne(file);
    const solutionPartTwo = daySixSolutionPartTwo(file);
    console.log("Solution part six part one:", solutionPartOne);
    console.log("Solution part six part two:", solutionPartTwo);
};

main();
