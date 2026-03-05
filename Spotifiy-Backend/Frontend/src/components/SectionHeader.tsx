import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionHeaderProps {
  title: string;
  linkTo?: string;
  linkLabel?: string;
}

const SectionHeader = ({ title, linkTo, linkLabel = "See all" }: SectionHeaderProps) => (
  <div className="mb-6 flex items-center justify-between">
    <h2 className="font-display text-2xl font-bold text-foreground">{title}</h2>
    {linkTo && (
      <Link
        to={linkTo}
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        {linkLabel}
        <ChevronRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

export default SectionHeader;
