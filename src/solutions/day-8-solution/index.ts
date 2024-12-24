import path from "path";
import { readFileByLine } from "../../helpers/read-file";
import { daySevenSolutionPartOne } from "../day-7-solution/day-seven-solution";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFileByLine(filePath);

    const solutionPartOne = daySevenSolutionPartOne(file);
    console.log("Solution day eight part one:", solutionPartOne);
};

main();
