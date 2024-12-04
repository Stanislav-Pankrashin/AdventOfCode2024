type LettersMatrix = string[][];
type LetterCoOrdinate = { letter: string; x: number; y: number };

enum XmasMap {
    X = "M",
    M = "A",
    A = "S",
    S = "DONE",
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    DONE = "DONE",
}

type XmasOrDone = "X" | "M" | "A" | "S" | "DONE";

const findAdjacentLetters = (
    lettersMatrix: LettersMatrix,
    coOrdinate: LetterCoOrdinate,
): LetterCoOrdinate[] => {
    const lineAbove = coOrdinate.y - 1 >= 0 ? coOrdinate.y - 1 : -1;
    const lineBelow =
        coOrdinate.y + 1 <= lettersMatrix.length - 1 ? coOrdinate.y + 1 : -1;

    const leftLetter = coOrdinate.x - 1 >= 0 ? coOrdinate.x - 1 : -1;
    const rightLetter =
        coOrdinate.x + 1 <= lettersMatrix[0].length - 1 ? coOrdinate.x + 1 : -1;

    const adjacentLetters: LetterCoOrdinate[] = [];

    adjacentLetters.push({
        letter: "",
        x: leftLetter,
        y: lineAbove,
    });
    adjacentLetters.push({
        letter: "",
        x: rightLetter,
        y: lineAbove,
    });
    adjacentLetters.push({
        letter: "",
        x: coOrdinate.x,
        y: lineAbove,
    });
    adjacentLetters.push({
        letter: "",
        x: leftLetter,
        y: lineBelow,
    });
    adjacentLetters.push({
        letter: "",
        x: coOrdinate.x,
        y: lineBelow,
    });
    adjacentLetters.push({
        letter: "",
        x: rightLetter,
        y: lineBelow,
    });
    adjacentLetters.push({
        letter: "",
        x: leftLetter,
        y: coOrdinate.y,
    });
    adjacentLetters.push({
        letter: "",
        x: rightLetter,
        y: coOrdinate.y,
    });

    const adjacentProcessed: LetterCoOrdinate[] = adjacentLetters
        .filter((coOrd) => coOrd.x !== -1 && coOrd.y !== -1)
        .map((coOrd) => ({
            letter: lettersMatrix[coOrd.y][coOrd.x],
            x: coOrd.x,
            y: coOrd.y,
        }));

    return adjacentProcessed;
};

const findXmas = (
    lettersMatrix: LettersMatrix,
    coOrdinate: LetterCoOrdinate,
    target: XmasOrDone,
): boolean => {
    if (target === "DONE") return true;

    const adjacentLetters = findAdjacentLetters(lettersMatrix, coOrdinate);

    const adjacentLetter: LetterCoOrdinate | null =
        adjacentLetters.filter((letter) => letter.letter === target)?.[0] ??
        null;

    if (adjacentLetter === null) return false;

    return findXmas(lettersMatrix, adjacentLetter, XmasMap[target]);
};

export const dayFourSolutionPartOne = (fileLines: string[]) => {
    const lettersMatrix: LettersMatrix = fileLines.map((line) =>
        line.split(""),
    );

    let total = 0;

    for (let y = 0; y < lettersMatrix.length; y++) {
        const line = lettersMatrix[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] !== "X") {
                continue;
            }

            const coOrdinate: LetterCoOrdinate = {
                letter: line[x],
                x,
                y,
            };
            console.log(coOrdinate);

            const result = findXmas(lettersMatrix, coOrdinate, "M");
            console.log(result);

            if (result) total++;
        }
    }

    return total;
};
