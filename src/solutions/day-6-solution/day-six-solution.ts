type Point = { x: number; y: number };
type ValidMapItems = UnvisitedLocation | ImpassableLocation | VisitedLocation;

type ImpassableLocation = "#";
type UnvisitedLocation = ".";
type VisitedLocation = "X";

enum GuardOrientations {
    UP = "^",
    DOWN = "V",
    LEFT = "<",
    RIGHT = ">",
}

enum GuardOrientationsMap {
    "^" = GuardOrientations.UP,
    "V" = GuardOrientations.DOWN,
    "<" = GuardOrientations.LEFT,
    ">" = GuardOrientations.RIGHT,
}

class Map {
    private _map: ValidMapItems[][];

    public readonly guardInitialPosition: Point;
    public readonly guardInitialOrientation: GuardOrientations;

    constructor(map: string[]) {
        this._map = map.map((mapLine) =>
            mapLine.split(""),
        ) as ValidMapItems[][];

        const guard = this._getGuardInitialPosition();

        this.guardInitialPosition = guard.point;
        this.guardInitialOrientation = guard.orientation;

        // Mark the guard's initial position as visited
        this._map[this.guardInitialPosition.y][this.guardInitialPosition.x] =
            "X";
    }

    private _getGuardInitialPosition() {
        const getGuard = () => {
            for (let y = 0; y < this._map.length; y++) {
                const line = this._map[y];
                for (let x = 0; x < line.length; x++) {
                    if (line[x] in GuardOrientationsMap) {
                        // I hate this
                        const orientation = GuardOrientationsMap[
                            line[x] as keyof typeof GuardOrientationsMap
                        ] as unknown as GuardOrientations;
                        return {
                            point: { x, y },
                            orientation,
                        };
                    }
                }
            }
        };

        const guard = getGuard();

        if (!guard) {
            throw new Error("No guard found");
        }

        return guard;
    }

    isPositionObstructed(position: Point): boolean {
        return this._map?.[position.y]?.[position.x] === "#";
    }

    setPositionVisited(position: Point) {
        this._map[position.y][position.x] = "X";
    }

    isPositionOutOfBounds(position: Point): boolean {
        return (
            position.x < 0 ||
            position.y < 0 ||
            position.x >= this._map[0].length ||
            position.y >= this._map.length
        );
    }

    countVisitedLocations() {
        const flatMap = this._map.join();

        const ocurrancesOfVisited = (flatMap.match(/X/g) || []).length;

        return ocurrancesOfVisited;
    }
}

class Guard {
    position: Point;
    orientation: GuardOrientations;

    constructor(position: Point, orientation: GuardOrientations) {
        this.position = position;
        this.orientation = orientation;
    }

    move(map: Map) {
        const newPosition = { ...this.position };

        switch (this.orientation) {
            case GuardOrientations.UP:
                newPosition.y--;
                break;
            case GuardOrientations.DOWN:
                newPosition.y++;
                break;
            case GuardOrientations.LEFT:
                newPosition.x--;
                break;
            case GuardOrientations.RIGHT:
                newPosition.x++;
                break;
        }

        if (map.isPositionObstructed(newPosition)) {
            this.rotate();
            return;
        }

        this.position = newPosition;
    }

    rotate() {
        switch (this.orientation) {
            case GuardOrientations.UP:
                this.orientation = GuardOrientations.RIGHT;
                break;
            case GuardOrientations.DOWN:
                this.orientation = GuardOrientations.LEFT;
                break;
            case GuardOrientations.LEFT:
                this.orientation = GuardOrientations.UP;
                break;
            case GuardOrientations.RIGHT:
                this.orientation = GuardOrientations.DOWN;
                break;
        }
    }
}

export const daySixSolutionPartOne = (fileLines: string[]) => {
    const map = new Map(fileLines);

    const guard = new Guard(
        map.guardInitialPosition,
        map.guardInitialOrientation,
    );

    while (true) {
        guard.move(map);

        if (map.isPositionOutOfBounds(guard.position)) {
            break;
        }

        map.setPositionVisited(guard.position);
    }

    return map.countVisitedLocations();
};
