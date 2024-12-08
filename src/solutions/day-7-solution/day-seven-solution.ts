const validCalculation = (
    target: number,
    total: number,
    currentIndex: number,
    values: number[],
): number | -1 => {
    if (target === total) {
        return total;
    }

    if (currentIndex >= values.length) {
        return -1;
    }

    const added = total + values[currentIndex];
    const multiplied = total * values[currentIndex];

    if (
        validCalculation(target, added, currentIndex + 1, values) !== -1 ||
        validCalculation(target, multiplied, currentIndex + 1, values) !== -1
    ) {
        return target;
    }

    return -1;
};

export const daySevenSolutionPartOne = (fileLines: string[]) => {
    const fileFormatted = fileLines.map((line) => {
        const [targetString, valuesString] = line.split(": ");

        const target = parseInt(targetString);
        const values = valuesString.split(" ").map((value) => parseInt(value));

        return { target, values };
    });

    const validCalculations = fileFormatted
        .map((line) => {
            return validCalculation(
                line.target,
                line.values[0],
                1,
                line.values,
            );
        })
        .filter((result) => result !== -1);

    const total = validCalculations.reduce((acc, result) => acc + result, 0);

    return total;
};
