import path from "path";
import { dayOneSolution } from "./day-one-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = dayOneSolution(file);
    console.log("Solution part one:", solutionPartOne);
};

main();
