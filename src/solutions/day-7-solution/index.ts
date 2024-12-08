import path from "path";
import {
    daySevenSolutionPartOne,
    daySevenSolutionPartTwo,
} from "./day-seven-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = daySevenSolutionPartOne(file);
    const solutionPartTwo = daySevenSolutionPartTwo(file);
    console.log("Solution part seven part one:", solutionPartOne);
    console.log("Solution part seven part two:", solutionPartTwo);
};

main();
