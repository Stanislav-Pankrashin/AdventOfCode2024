import path from "path";
import { daySixSolutionPartOne } from "./day-six-solution";
import { readFile } from "../../helpers/read-file";

const main = () => {
    const filePath = path.resolve(__dirname, "input.txt");
    const file = readFile(filePath);

    const solutionPartOne = daySixSolutionPartOne(file);
    console.log("Solution part six:", solutionPartOne);
};

main();
