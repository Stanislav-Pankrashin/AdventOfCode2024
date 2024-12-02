const evaluateLevels = (levels: number[]): boolean => {
    let trend: "INCREASING" | "DECREASING" | "INITIAL" = "INITIAL";
    const length = levels.length;

    for (let i = 0; i < length - 1; i++) {
        // If the number is the same as the previous number, it is not safe
        if (levels[i + 1] === levels[i]) {
            return false;
        }

        const foundTrend =
            levels[i + 1] > levels[i] ? "INCREASING" : "DECREASING";

        if (trend === "INITIAL") {
            trend = foundTrend;
        } else if (foundTrend !== trend) {
            return false;
        }

        const amountChanged = Math.abs(levels[i + 1] - levels[i]);
        const isSafe = amountChanged >= 1 && amountChanged <= 3;

        if (!isSafe) {
            return false;
        }
    }

    return true;
};

const numberOfSafeReports = (
    fileLines: string[],
    faultTolerance: boolean = false,
) => {
    let totalSafe = 0;

    for (const line of fileLines) {
        const levelsData = line.split(" ").map((level) => parseInt(level));

        const isSafe = evaluateLevels(levelsData);

        if (isSafe) {
            totalSafe++;
            continue;
        }

        // If we accept a fault tolerance, we try every permutation where we remove a single level from the list to see if any work
        if (faultTolerance) {
            for (let i = 0; i < levelsData.length; i++) {
                const levelsDataRemoveLeft = levelsData.slice();
                levelsDataRemoveLeft.splice(i, 1);

                const isSafeRetry = evaluateLevels(levelsDataRemoveLeft);

                if (isSafeRetry) {
                    totalSafe++;
                    break;
                }
            }
        }
    }

    return totalSafe;
};

export const dayTwoSolutionPartOne = (fileLines: string[]): number => {
    return numberOfSafeReports(fileLines);
};

export const dayTwoSolutionPartTwo = (fileLines: string[]): number => {
    return numberOfSafeReports(fileLines, true);
};
