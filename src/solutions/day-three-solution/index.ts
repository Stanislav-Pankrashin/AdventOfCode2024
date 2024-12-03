import path from "path";
import { dayThreeSolution } from "./day-three-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = dayThreeSolution(file);
    console.log("Solution part one:", solutionPartOne);
};

main();
