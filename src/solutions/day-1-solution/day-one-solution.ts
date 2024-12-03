/**
 * Returns the distance between two vertical arrays
 * @param fileLines Lines to read in, two numbers separated by three spaces
 * E.g ["12   15", "5   7", ...]  
 */
export const dayOneSolutionPartOne = (fileLines: string[]): number => {
    const left: number[] = [];
    const right: number[] = [];

    // Parse the file into two arrays
    for (const line of fileLines) {
        const [leftAdd, rightAdd] = line.split("   ");

        left.push(parseInt(leftAdd));
        right.push(parseInt(rightAdd));
    }

    // Sort the arrays
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // Calculate the total difference between the two arrays
    // Absolute is used here to ensure the difference is always positive
    const total = right.reduce(
        (acc, curr, index) => acc + Math.abs(curr - left[index]),
        0,
    );

    return total;
};

/**
 * Returns the similarity between two vertical arrays
 * @param fileLines Lines to read in, two numbers separated by three spaces
 * E.g ["12   15", "5   7", ...]  
 */
export const dayOneSolutionPartTwo = (fileLines: string[]): number => {
    const rightHashSet: Record<string, number> = {};
    const leftList: number[] = [];

    // Parse the file
    // The right side goes into an object with the value incrementing every time the same key is used
    // The left side goes into a list to be iterated on later
    for (const line of fileLines) {
        const [left, right] = line.split("   ");

        leftList.push(parseInt(left));
        rightHashSet[right] =
            rightHashSet[right] !== undefined ? rightHashSet[right] + 1 : 1;
    }

    // Calculate the similarity between the two arrays
    const result = leftList.reduce(
        (acc, curr) => acc + curr * (rightHashSet[curr] ?? 0),
        0,
    );

    return result;
};
