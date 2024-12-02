import path from "path";
import {
    dayOneSolutionPartOne,
    dayOneSolutionPartTwo,
} from "./day-one-solution";
import { readFileByLine } from "../../helpers/read-file"


const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = dayOneSolutionPartOne(file);
    const solutionPartTwo = dayOneSolutionPartTwo(file);
    console.log("Solution part one:", solutionPartOne);
    console.log("Solution part two:", solutionPartTwo);
};

main();
