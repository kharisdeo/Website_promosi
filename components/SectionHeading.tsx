import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, description, action, align = "left" }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === "center" ? "section-heading-center" : ""}`}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      <div className="section-heading-side">
        {description && <p>{description}</p>}
        {action && <Link href={action.href} className="text-link">{action.label} <ArrowUpRight size={16} /></Link>}
      </div>
    </div>
  );
}
