import path from "path";
import {
    dayFiveSolutionPartOne,
    dayFiveSolutionPartTwo,
} from "./day-five-solution";
import { readFile } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFile(filePath);

    const solutionPartOne = dayFiveSolutionPartOne(file);
    const solutionPartTwo = dayFiveSolutionPartTwo(file);
    console.log("Solution part one:", solutionPartOne);
    console.log("Solution part two:", solutionPartTwo);
};

main();
