type Point = { x: number; y: number };
type ValidMapItems =
    | UnvisitedLocation
    | ImpassableLocation
    | VisitedLocation
    | GuardLocation;

type ImpassableLocation = "#";
type UnvisitedLocation = ".";
type VisitedLocation = "X";
type GuardLocation = keyof typeof GuardOrientationsMap;

enum GuardOrientations {
    UP,
    DOWN,
    LEFT,
    RIGHT,
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
            ".";
    }

    private _getGuardInitialPosition() {
        const getGuard = () => {
            for (let y = 0; y < this._map.length; y++) {
                const line = this._map[y];
                for (let x = 0; x < line.length; x++) {
                    if (line[x] in GuardOrientationsMap) {
                        const guard = line[
                            x
                        ] as unknown as GuardOrientationsMap;

                        const orientation: GuardOrientations =
                            GuardOrientationsMap[
                                guard
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

    setPositionVisited(position: Point): boolean {
        if (this._map?.[position.y]?.[position.x] !== ".") return false;
        this._map[position.y][position.x] = "X";
        return true;
    }

    setPositionObstructed(position: Point) {
        if (!this._map?.[position.y]?.[position.x]) return;
        this._map[position.y][position.x] = "#";
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

    /**
     * Returns a boolean indicating if the guard moved
     * False if the guard rotated
     * @param map
     * @returns
     */
    move(map: Map): boolean {
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
            return false;
        }

        this.position = newPosition;
        return true;
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

class LocationHistory {
    private _locations: Record<
        number,
        Record<number, Set<GuardOrientations> | undefined> | undefined
    > = {};

    addLocation(location: Point, orientation: GuardOrientations) {
        this._locations[location.y] ??= {};
        this._locations[location.y]![location.x] ??= new Set();

        this._locations[location.y]![location.x]!.add(orientation);
    }

    hasLocation(location: Point, orientation: GuardOrientations): boolean {
        return (
            this._locations[location.y]?.[location.x]?.has(orientation) ?? false
        );
    }
}

export const daySixSolutionPartOne = (fileLines: string[]) => {
    const map = new Map(fileLines);

    const guard = new Guard(
        map.guardInitialPosition,
        map.guardInitialOrientation,
    );

    while (true) {
        map.setPositionVisited(guard.position);

        guard.move(map);

        if (map.isPositionOutOfBounds(guard.position)) {
            break;
        }
    }

    return map.countVisitedLocations();
};

export const daySixSolutionPartTwo = (fileLines: string[]) => {
    const mapInitial = new Map(fileLines);

    const guard = new Guard(
        mapInitial.guardInitialPosition,
        mapInitial.guardInitialOrientation,
    );

    // First get list of all unique locations visited
    const visitedLocations: Point[] = [];

    while (true) {
        const moved = guard.move(mapInitial);

        if (moved) {
            const updatedMap = mapInitial.setPositionVisited(guard.position);
            if (updatedMap) visitedLocations.push(guard.position);
        }

        if (mapInitial.isPositionOutOfBounds(guard.position)) {
            break;
        }
    }

    let possibleLoops = 0;

    for (const location of visitedLocations) {
        const map = new Map(fileLines);

        const guardLoop = new Guard(
            map.guardInitialPosition,
            map.guardInitialOrientation,
        );

        map.setPositionObstructed(location);

        const locationHistory = new LocationHistory();

        while (true) {
            if (
                locationHistory.hasLocation(
                    guardLoop.position,
                    guardLoop.orientation,
                )
            ) {
                // We're in a loop!
                possibleLoops++;
                break;
            }

            locationHistory.addLocation(
                guardLoop.position,
                guardLoop.orientation,
            );

            guardLoop.move(map);

            if (map.isPositionOutOfBounds(guardLoop.position)) {
                break;
            }
        }
    }

    return possibleLoops;
};
