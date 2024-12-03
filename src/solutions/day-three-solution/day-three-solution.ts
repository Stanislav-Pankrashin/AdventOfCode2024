/**
 * @param mul a string in the format "mul(x, y)"
 */
const decodeFunction = (mul: string): number => {
    const scrubbed = mul.replace("mul(", "").replace(")", "");
    const [x, y] = scrubbed.split(",").map((n) => parseInt(n));

    return x * y;
};

export const dayThreeSolutionPartOne = (file: string) => {
    const regex = /mul[(](\d|\d\d|\d\d\d)[,](\d|\d\d|\d\d\d)[)]/g;

    const matches = file.match(regex);

    if (matches === null) {
        return 0;
    }

    const result = matches.reduce((acc, match) => {
        return acc + decodeFunction(match);
    }, 0);

    return result;
};

export const dayThreeSolutionPartTwo = (file: string) => {
    return 0;
};
