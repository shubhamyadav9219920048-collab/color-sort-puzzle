// Canonical state representation for BFS
function getCanonicalState(tubes: number[][]): string {
  // Sort tubes lexicographically to ignore tube position permutations
  return tubes
    .map((t) => t.join(','))
    .sort()
    .join('|');
}

export function isTubeComplete(tube: number[]): boolean {
  if (tube.length === 0) return true;
  if (tube.length < 4) return false;
  return tube.every((color) => color === tube[0]);
}

export function checkWinCondition(tubes: number[][]): boolean {
  return tubes.every((tube) => isTubeComplete(tube));
}

export function canPour(fromTube: number[], toTube: number[]): boolean {
  if (fromTube.length === 0) return false; // Source is empty
  if (toTube.length >= 4) return false; // Destination is full
  if (fromTube === toTube) return false; // Same tube

  // If destination is empty, valid
  if (toTube.length === 0) return true;

  // Otherwise, top colors must match
  const topFromColor = fromTube[fromTube.length - 1];
  const topToColor = toTube[toTube.length - 1];
  return topFromColor === topToColor;
}

export function getPourCount(fromTube: number[], toTube: number[]): number {
  if (!canPour(fromTube, toTube)) return 0;

  const topColor = fromTube[fromTube.length - 1];
  let contiguousCount = 0;
  for (let i = fromTube.length - 1; i >= 0; i--) {
    if (fromTube[i] === topColor) {
      contiguousCount++;
    } else {
      break;
    }
  }

  const availableSpace = 4 - toTube.length;
  return Math.min(contiguousCount, availableSpace);
}

export function executePour(
  tubes: number[][],
  fromIdx: number,
  toIdx: number
): number[][] {
  const count = getPourCount(tubes[fromIdx], tubes[toIdx]);
  if (count <= 0) return tubes;

  const newTubes = tubes.map((t) => [...t]);
  const pouredUnits = newTubes[fromIdx].splice(
    newTubes[fromIdx].length - count,
    count
  );
  newTubes[toIdx].push(...pouredUnits);
  return newTubes;
}

export interface MoveHint {
  fromIndex: number;
  toIndex: number;
}

export function findHint(tubes: number[][]): MoveHint | null {
  const solution = solveLevelBFS(tubes, 25);
  if (solution && solution.length > 0) {
    return solution[0];
  }

  // Fallback: heuristic valid move
  for (let f = 0; f < tubes.length; f++) {
    if (tubes[f].length === 0 || isTubeComplete(tubes[f])) continue;
    for (let t = 0; t < tubes.length; t++) {
      if (f === t) continue;
      if (canPour(tubes[f], tubes[t])) {
        return { fromIndex: f, toIndex: t };
      }
    }
  }
  return null;
}

export function solveLevelBFS(
  initialTubes: number[][],
  maxDepth = 30
): MoveHint[] | null {
  if (checkWinCondition(initialTubes)) return [];

  interface QueueNode {
    tubes: number[][];
    moves: MoveHint[];
  }

  const queue: QueueNode[] = [{ tubes: initialTubes, moves: [] }];
  const visited = new Set<string>();
  visited.add(getCanonicalState(initialTubes));

  let iterations = 0;
  const MAX_ITERATIONS = 4000;

  while (queue.length > 0 && iterations < MAX_ITERATIONS) {
    iterations++;
    const current = queue.shift()!;

    if (current.moves.length >= maxDepth) continue;

    const { tubes, moves } = current;

    for (let f = 0; f < tubes.length; f++) {
      const fromTube = tubes[f];
      if (fromTube.length === 0 || isTubeComplete(fromTube)) continue;

      for (let t = 0; t < tubes.length; t++) {
        if (f === t) continue;
        const toTube = tubes[t];

        if (canPour(fromTube, toTube)) {
          // Avoid redundant moves like pouring an entire tube into an empty tube if it was already uniform
          if (toTube.length === 0) {
            const isUniform = fromTube.every((c) => c === fromTube[0]);
            if (isUniform) continue;
          }

          const nextTubes = executePour(tubes, f, t);

          if (checkWinCondition(nextTubes)) {
            return [...moves, { fromIndex: f, toIndex: t }];
          }

          const canon = getCanonicalState(nextTubes);
          if (!visited.has(canon)) {
            visited.add(canon);
            queue.push({
              tubes: nextTubes,
              moves: [...moves, { fromIndex: f, toIndex: t }],
            });
          }
        }
      }
    }
  }

  return null; // No solution found within limits
}
