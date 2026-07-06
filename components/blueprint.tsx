

type BlueprintProps = {
  quadrantId: string;
  nodePosition: {
    x: number;
    y: number;
  };
  dragIntensity: number;
  active: boolean;
};

export default function Blueprint({
  quadrantId,
  nodePosition,
  dragIntensity,
  active,
}: BlueprintProps) {
const intensity = active ? dragIntensity : 0;

let spotlightX = 50;
let spotlightY = 50;

if (quadrantId === "lead-systems") {
  spotlightX = 100 + nodePosition.x / 5;
  spotlightY = 100 + nodePosition.y / 5;
}

if (quadrantId === "websites") {
  spotlightX = nodePosition.x / 5;
  spotlightY = 100 + nodePosition.y / 5;
}

if (quadrantId === "video-motion") {
  spotlightX = 100 + nodePosition.x / 5;
  spotlightY = nodePosition.y / 5;
}

if (quadrantId === "ai-infrastructure") {
  spotlightX = nodePosition.x / 5;
  spotlightY = nodePosition.y / 5;
}

const spotlightSize = 18 + intensity * 28;

  return (
    <div
      className="blueprint"
      style={
        {
          "--spotlight-x": `${spotlightX}%`,
          "--spotlight-y": `${spotlightY}%`,
          "--spotlight-size": `${spotlightSize}%`,
          "--blueprint-intensity": intensity,
          "--blueprint-base-opacity": active ? 0.16 : 0.035,
        } as React.CSSProperties
      }
    >
      <img
        className="blueprint-base"
        src="/blueprint-base.svg"
        alt=""
        aria-hidden="true"
      />

      <img
        className="blueprint-lines"
        src="/blueprint-lines.svg"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}