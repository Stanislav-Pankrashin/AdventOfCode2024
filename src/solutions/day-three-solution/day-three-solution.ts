/**
 * @param mul a string in the format "mul(x, y)"
 */
const decodeFunction = (mul: string): number => {
    const scrubbed = mul.replace("mul(", "").replace(")", "");
    const [x, y] = scrubbed.split(",").map((n) => parseInt(n));

    return x * y;
};

/**
 * @param corruptedMemory a string that represents the memory
 */
const calculateMulInMemoryString = (corruptedMemory: string): number => {
    const regex = /mul[(](\d|\d\d|\d\d\d)[,](\d|\d\d|\d\d\d)[)]/g;

    const matches = corruptedMemory.match(regex);

    if (matches === null) {
        return 0;
    }

    const result = matches.reduce((acc, match) => {
        return acc + decodeFunction(match);
    }, 0);

    return result;
};

export const dayThreeSolutionPartOne = (file: string) => {
    return calculateMulInMemoryString(file);
};

export const dayThreeSolutionPartTwo = (file: string) => {
    // Split the memory into components
    // First split into segments that start with do()
    // Then split those segments by don't() and only take into account the first part as everything else is disabled
    const memoryComponents = file
        .split("do()")
        .map((memoryFragment) => memoryFragment.split("don't()")[0]);

    const result = memoryComponents.reduce(
        (acc, memoryComponent) =>
            acc + calculateMulInMemoryString(memoryComponent),
        0,
    );

    return result;
};
