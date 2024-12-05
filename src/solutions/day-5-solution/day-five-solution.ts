type RulesMap = Record<string, string[]>;
type UpdateMap = Record<string, number>;

const processRules = (rules: string): RulesMap => {
    const rulesMap: RulesMap = {};

    rules.split("\n").forEach((rule) => {
        const [numberBefore, numberAfter] = rule.split("|");
        const existingValues = rulesMap?.[numberBefore] ?? [];
        rulesMap[numberBefore] = [...existingValues, numberAfter];
    });

    return rulesMap;
};

const processUpdate = (update: string[]): UpdateMap => {
    // Map containing a number and the index it is on
    const updatesMap: UpdateMap = {};

    update.forEach((update, index) => {
        updatesMap[update] = index;
    });

    return updatesMap;
};

const sumCorrectUpdates = (
    updatesString: string,
    rulesMap: RulesMap,
): number => {
    const updatesList = updatesString.split("\n");

    let total = 0;

    for (const update of updatesList) {
        if (update.length === 0) {
            continue;
        }

        const updateList = update.split(",");

        const updateMap = processUpdate(updateList);

        const correctUpdate = updateList.every((updatePage, index) => {
            const numbersMustGoBefore = rulesMap[updatePage];

            if (numbersMustGoBefore === undefined) {
                return true;
            }

            const numberInCorrectPlace = numbersMustGoBefore.every((number) => {
                const numberIndex = updateMap?.[number] ?? Infinity;

                return numberIndex > index;
            });

            return numberInCorrectPlace;
        });

        if (correctUpdate) {
            const indexOfMiddle = Math.ceil((updateList.length - 1) / 2);

            total += parseInt(updateList[indexOfMiddle]);
        }
    }

    return total;
};

export const dayFiveSolutionPartOne = (file: string) => {
    const [rules, updates] = file.split("\n\n");

    const rulesMap = processRules(rules);

    const total = sumCorrectUpdates(updates, rulesMap);

    return total;
};
