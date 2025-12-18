import { cn } from "@/lib/utils";

export type FilterType = "all" | "active" | "completed";

interface FilterTabsProps {
  current: FilterType;
  onChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterTabs = ({ current, onChange, counts }: FilterTabsProps) => {
  const tabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-xl">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "filter-tab relative",
            current === key ? "filter-tab-active" : "filter-tab-inactive"
          )}
        >
          {label}
          <span className={cn(
            "ml-1.5 text-xs",
            current === key ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
};
