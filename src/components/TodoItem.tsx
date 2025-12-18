import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="todo-card group animate-fade-in flex items-center gap-4">
      <button
        onClick={() => onToggle(id)}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
          completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/40 hover:border-primary/60"
        )}
        aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {completed && (
          <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
        )}
      </button>
      
      <span
        className={cn(
          "flex-1 text-base transition-all duration-300",
          completed && "text-muted-foreground line-through"
        )}
      >
        {text}
      </span>
      
      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
        aria-label="Delete todo"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
