type LettersMatrix = string[][];
type Point = { x: number; y: number };
type LetterPoint = { letter: string; point: Point };
const XMAS = "XMAS";

/**
 * Finds the number of times the word XMAS can be made from the given point
 * Assumes that the given point is an X
 * Checks in horizontal, vertical, and diagonal directions
 * @param lettersMatrix
 * @param coOrdinate
 * @returns
 */
const findXmas = (
    lettersMatrix: LettersMatrix,
    coOrdinate: LetterPoint,
): number => {
    // Generates a list of points based on the given point and increment
    // These points typically will be to check for horizontal, vertical, and diagonal directions from the given point
    const generateList = (
        point: Point,
        increment: { x: number; y: number },
    ): Point[] => {
        const list = [];
        let x = point.x;
        let y = point.y;

        for (let i = 0; i < 3; i++) {
            x += increment.x;
            y += increment.y;
            list.push({
                x: x,
                y: y,
            });
        }

        return list;
    };

    const horizonalForward = generateList(coOrdinate.point, { x: 1, y: 0 });
    const horizontalBackward = generateList(coOrdinate.point, { x: -1, y: 0 });
    const verticalUp = generateList(coOrdinate.point, { x: 0, y: 1 });
    const verticalDown = generateList(coOrdinate.point, { x: 0, y: -1 });
    const diagonalUpLeft = generateList(coOrdinate.point, { x: -1, y: 1 });
    const diagonalUpRight = generateList(coOrdinate.point, { x: 1, y: 1 });
    const diagonalDownLeft = generateList(coOrdinate.point, { x: -1, y: -1 });
    const diagonalDownRight = generateList(coOrdinate.point, { x: 1, y: -1 });

    const allDirections = [
        horizonalForward,
        horizontalBackward,
        verticalUp,
        verticalDown,
        diagonalUpLeft,
        diagonalUpRight,
        diagonalDownLeft,
        diagonalDownRight,
    ];

    const result = allDirections.reduce((acc, direction) => {
        const isValid = direction.every((point) => {
            return (
                point.x >= 0 &&
                point.y >= 0 &&
                point.x < lettersMatrix[0].length &&
                point.y < lettersMatrix.length
            );
        });

        if (!isValid) return acc;

        const letters = direction.reduce(
            (acc, point) => acc.concat(lettersMatrix[point.y][point.x]),
            "X",
        );
        const result = letters === XMAS;

        return result ? acc + 1 : acc;
    }, 0);

    return result;
};

/**
 * Checks to see if the given point is surrounded by the letters MS in a cross pattern
 * The letters can be in any direction
 * e.g:
 * M.S
 * .A.
 * M.S
 * @param lettersMatrix
 * @param coOrdinate
 * @returns
 */
const findCrossmas = (
    lettersMatrix: LettersMatrix,
    coOrdinate: LetterPoint,
): boolean => {
    const { x, y } = coOrdinate.point;

    const leftToRightDiagonal: Point[] = [
        { x: x - 1, y: y + 1 },
        { x: x + 1, y: y - 1 },
    ];
    const rightToLeftDiagonal: Point[] = [
        { x: x + 1, y: y + 1 },
        { x: x - 1, y: y - 1 },
    ];

    const crossCoOrdinatesInvalid = [
        ...leftToRightDiagonal,
        ...rightToLeftDiagonal,
    ].some(
        (point) =>
            point.x < 0 ||
            point.y < 0 ||
            point.x >= lettersMatrix[0].length ||
            point.y >= lettersMatrix.length,
    );

    if (crossCoOrdinatesInvalid) {
        return false;
    }

    const getLetterAtPoint = (point: Point) => lettersMatrix[point.y][point.x];

    const leftToRightLetters = `${getLetterAtPoint(leftToRightDiagonal[0])}${getLetterAtPoint(leftToRightDiagonal[1])}`;
    const rightToLeftLetters = `${getLetterAtPoint(rightToLeftDiagonal[0])}${getLetterAtPoint(rightToLeftDiagonal[1])}`;

    const validAnswers = ["MS", "SM"];

    return (
        validAnswers.includes(leftToRightLetters) &&
        validAnswers.includes(rightToLeftLetters)
    );
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

            const coOrdinate: LetterPoint = {
                letter: line[x],
                point: {
                    x,
                    y,
                },
            };

            const result = findXmas(lettersMatrix, coOrdinate);

            total += result;
        }
    }

    return total;
};

export const dayFourSolutionPartTwo = (fileLines: string[]) => {
    const lettersMatrix: LettersMatrix = fileLines.map((line) =>
        line.split(""),
    );

    let total = 0;

    for (let y = 0; y < lettersMatrix.length; y++) {
        const line = lettersMatrix[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] !== "A") {
                continue;
            }

            const coOrdinate: LetterPoint = {
                letter: line[x],
                point: {
                    x,
                    y,
                },
            };

            const result = findCrossmas(lettersMatrix, coOrdinate);

            if (result) {
                total++;
            }
        }
    }

    return total;
};
