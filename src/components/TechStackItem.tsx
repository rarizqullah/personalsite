interface TechStackItemProps {
  name: string;
  logo?: string; // Make logo optional since we won't use it
  index: number;
}

export default function TechStackItem({ name, index }: TechStackItemProps) {
  return (
    <li className="tech-item" data-anim-index={index}>
      <div className="tech-item-content">
        <span className="tech-name">{name}</span>
      </div>
    </li>
  );
}
