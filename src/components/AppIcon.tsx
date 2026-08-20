import type { AppEntry } from "@/data/apps";
import { apps } from "@/data/apps";

type Props = {
  app: AppEntry;
};

type ShapeId =
  | "square"
  | "circle"
  | "triangle"
  | "pentagon"
  | "hexagon"
  | "diamond";

const SHAPES: ShapeId[] = [
  "square",
  "circle",
  "triangle",
  "pentagon",
  "hexagon",
  "diamond",
];

function seededShuffle<T>(items: T[], seed: number): T[] {
  const list = [...items];
  let state = seed >>> 0;
  for (let i = list.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  return list;
}

/** Even mix of the 6 shapes, shuffled so neighbors rarely match. */
const SHAPE_BY_SLUG: ReadonlyMap<string, ShapeId> = (() => {
  const order = seededShuffle(
    apps.map((app) => app.slug),
    0x9e3779b9,
  );
  const map = new Map<string, ShapeId>();
  order.forEach((slug, i) => {
    map.set(slug, SHAPES[i % SHAPES.length]);
  });
  return map;
})();

function shapeFor(slug: string): ShapeId {
  return SHAPE_BY_SLUG.get(slug) ?? SHAPES[0];
}

function Shape({ id }: { id: ShapeId }) {
  switch (id) {
    case "square":
      return <rect x="6" y="6" width="20" height="20" />;
    case "circle":
      return <circle cx="16" cy="16" r="10" />;
    case "triangle":
      return <polygon points="16,4 28,26 4,26" />;
    case "pentagon":
      return <polygon points="16,3 29,13 24,28 8,28 3,13" />;
    case "hexagon":
      return <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" />;
    case "diamond":
      return <polygon points="16,4 28,16 16,28 4,16" />;
  }
}

export function AppIcon({ app }: Props) {
  const shape = shapeFor(app.slug);

  return (
    <span className="app-row__icon app-row__icon--shape" aria-hidden>
      <svg
        className="app-icon__shape"
        viewBox="0 0 32 32"
        width={22}
        height={22}
      >
        <Shape id={shape} />
      </svg>
    </span>
  );
}
