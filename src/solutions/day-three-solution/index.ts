import path from "path";
import {
    dayThreeSolutionPartOne,
    dayThreeSolutionPartTwo,
} from "./day-three-solution";
import { readFile } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFile(filePath);

    const solutionPartOne = dayThreeSolutionPartOne(file);
    const solutionPartTwo = dayThreeSolutionPartTwo(file);
    console.log("Solution part one:", solutionPartOne);
    console.log("Solution part two:", solutionPartTwo);
};

main();
