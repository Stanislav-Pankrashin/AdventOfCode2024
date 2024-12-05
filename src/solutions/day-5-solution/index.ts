import path from "path";
import { dayFiveSolutionPartOne } from "./day-five-solution";
import { readFile } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFile(filePath);

    const solutionPartOne = dayFiveSolutionPartOne(file);
    console.log("Solution part two:", solutionPartOne);
};

main();
