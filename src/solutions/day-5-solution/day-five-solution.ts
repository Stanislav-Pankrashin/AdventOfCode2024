type RulesMap = Record<string, string[] | undefined>;

// The value for a key contains all numbers that must come after the key
// In other words the key must come before any occurances of the values in an update
const processRules = (rules: string): RulesMap => {
    const rulesMap: RulesMap = {};

    rules.split("\n").forEach((rule) => {
        const [numberBefore, numberAfter] = rule.split("|");
        const existingValues = rulesMap?.[numberBefore] ?? [];
        rulesMap[numberBefore] = [...existingValues, numberAfter];
    });

    return rulesMap;
};

const sumCorrectUpdates = (
    updatesString: string,
    rulesMap: RulesMap,
): { correctTotal: number; incorrectTotal: number } => {
    const updatesList = updatesString.split("\n");

    let correctTotal = 0;
    let incorrectTotal = 0;

    for (const update of updatesList) {
        if (update.length === 0) {
            continue;
        }

        const updateList = update.split(",");

        const sortUpdate = (a: string, b: string) => {
            if (a === b) return 0;

            const mustGoBefore = rulesMap[a];
            const mustGoAfter = rulesMap[b];

            if (mustGoBefore !== undefined && mustGoBefore.includes(b)) {
                return -1;
            }
            if (mustGoAfter !== undefined && mustGoAfter.includes(a)) {
                return 1;
            }

            return 0;
        };

        const updateCopy = [...updateList];

        // Sort the copy to see if it is correctly ordered
        updateCopy.sort(sortUpdate);

        if (updateCopy.toString() === updateList.toString()) {
            const indexOfMiddle = Math.ceil((updateList.length - 1) / 2);
            correctTotal += parseInt(updateList[indexOfMiddle]);
        } else {
            const indexOfMiddle = Math.ceil((updateCopy.length - 1) / 2);
            incorrectTotal += parseInt(updateCopy[indexOfMiddle]);
        }
    }

    return { correctTotal, incorrectTotal };
};

export const dayFiveSolutionPartOne = (file: string) => {
    const [rules, updates] = file.split("\n\n");

    const rulesMap = processRules(rules);

    const totals = sumCorrectUpdates(updates, rulesMap);

    return totals.correctTotal;
};

export const dayFiveSolutionPartTwo = (file: string) => {
    const [rules, updates] = file.split("\n\n");

    const rulesMap = processRules(rules);

    const totals = sumCorrectUpdates(updates, rulesMap);

    return totals.incorrectTotal;
};
