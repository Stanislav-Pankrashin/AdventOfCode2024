const getTotalOfCalculation = (
    target: number,
    total: number,
    values: number[],
    allowConcatenation: boolean = false,
    currentIndex: number = 1,
): number | -1 => {
    if (target === total && currentIndex === values.length) {
        return total;
    }

    if (currentIndex >= values.length) {
        return -1;
    }

    const added = total + values[currentIndex];
    const multiplied = total * values[currentIndex];
    const concatenated = parseInt(`${total}${values[currentIndex]}`);

    const addedResult = getTotalOfCalculation(
        target,
        added,
        values,
        allowConcatenation,
        currentIndex + 1,
    );

    const multipliedResult = getTotalOfCalculation(
        target,
        multiplied,
        values,
        allowConcatenation,
        currentIndex + 1,
    );

    const concatenatedResult = allowConcatenation
        ? getTotalOfCalculation(
              target,
              concatenated,
              values,
              allowConcatenation,
              currentIndex + 1,
          )
        : -1;

    if (
        addedResult !== -1 ||
        multipliedResult !== -1 ||
        concatenatedResult !== -1
    ) {
        return target;
    }

    return -1;
};

const getValidTotal = (fileLines: string[], allowConcatenation = false) => {
    const fileFormatted = fileLines.map((line) => {
        const [targetString, valuesString] = line.split(": ");

        const target = parseInt(targetString);
        const values = valuesString.split(" ").map((value) => parseInt(value));

        return { target, values };
    });

    const validCalculations = fileFormatted
        .map((line) => {
            return getTotalOfCalculation(
                line.target,
                line.values[0],
                line.values,
                allowConcatenation,
            );
        })
        .filter((result) => result !== -1);

    const total = validCalculations.reduce((acc, result) => acc + result, 0);

    return total;
};

export const daySevenSolutionPartOne = (fileLines: string[]) => {
    return getValidTotal(fileLines);
};

export const daySevenSolutionPartTwo = (fileLines: string[]) => {
    return getValidTotal(fileLines, true);
};
