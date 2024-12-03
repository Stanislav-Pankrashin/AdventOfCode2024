import fs from "fs";

export const readFileByLine = (filePath: string): string[] => {
    return fs.readFileSync(filePath).toString().split("\n").filter(Boolean);
};

export const readFile = (filePath: string): string => {
    return fs.readFileSync(filePath).toString();
};
