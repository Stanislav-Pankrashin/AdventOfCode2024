type RulesMap = Record<string, string[] | undefined>;

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

        const sortUpdate = (x: string, y: string) => {
            if (x === y) return 0;

            const mustGoBefore = rulesMap[x];
            const mustGoAfter = rulesMap[y];

            if (mustGoBefore !== undefined && mustGoBefore.includes(y)) {
                return -1;
            }
            if (mustGoAfter !== undefined && mustGoAfter.includes(x)) {
                return 1;
            }

            return 0;
        };

        const updateCopy = [...updateList];

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
