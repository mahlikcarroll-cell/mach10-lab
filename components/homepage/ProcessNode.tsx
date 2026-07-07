type ProcessNodeProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  isActive: boolean;
  onActivate: (id: string) => void;
  onDeactivate: () => void;
};

export default function ProcessNode({
  id,
  index,
  title,
  description,
  isActive,
  onActivate,
  onDeactivate,
}: ProcessNodeProps) {
  return (
    <article
      className={`mach10-homepage-process__node mach10-homepage-process__node--${id} ${
        isActive ? "mach10-homepage-process__node--active" : ""
      }`}
      tabIndex={0}
      onMouseEnter={() => onActivate(id)}
      onMouseLeave={onDeactivate}
      onFocus={() => onActivate(id)}
      onBlur={onDeactivate}
    >
      <span className="mach10-homepage-process__node-index">{index}</span>
      <h3 className="mach10-homepage-process__node-title">{title}</h3>
      <p className="mach10-homepage-process__node-copy">{description}</p>
    </article>
  );
}
