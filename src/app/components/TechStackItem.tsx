import Image from 'next/image';

interface TechStackItemProps {
  name: string;
  logo: string;
  index: number;
}

export default function TechStackItem({ name, logo, index }: TechStackItemProps) {
  return (
    <li className="tech-item" data-anim-index={index}>
      <div className="tech-item-content">
        <div className="tech-logo">
          <Image
            src={logo}
            alt={`${name} logo`}
            width={20}
            height={20}
            className="tech-logo-image"
          />
        </div>
        <span className="tech-name">{name}</span>
      </div>
    </li>
  );
}
