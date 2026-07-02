type ConnectionLinesProps = {
  dragIntensity: number;
  nodePosition: {
    x: number;
    y: number;
  };
};

export default function ConnectionLines({
  dragIntensity,
  nodePosition,
}: ConnectionLinesProps) {
  const nodeX = 50 + nodePosition.x / 10;
  const nodeY = 50 + nodePosition.y / 10;

  return (
    <svg
      className="connection-lines"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <line
        className="connection-line active"
        x1="50"
        y1="50"
        x2={nodeX}
        y2={nodeY}
        style={
          {
            "--line-intensity": dragIntensity,
          } as React.CSSProperties
        }
      />
    </svg>
  );
}