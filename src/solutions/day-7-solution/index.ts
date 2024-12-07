import path from "path";
import { daySevenSolutionPartOne } from "./day-seven-solution";
import { readFileByLine } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = daySevenSolutionPartOne(file);
    console.log("Solution part seven part one:", solutionPartOne);
};

main();
