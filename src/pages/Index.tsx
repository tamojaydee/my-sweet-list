import { useState, useMemo } from "react";
import { TodoItem } from "@/components/TodoItem";
import { TodoInput } from "@/components/TodoInput";
import { FilterTabs, FilterType } from "@/components/FilterTabs";
import { useTodos } from "@/hooks/useTodos";
import { CheckCircle2 } from "lucide-react";

const Index = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-16 pb-8 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">
            Today's Tasks
          </h1>
          <p className="text-muted-foreground text-lg">
            {counts.active === 0 && counts.all > 0
              ? "All done! Time to celebrate 🎉"
              : counts.active === 1
              ? "1 task remaining"
              : `${counts.active} tasks remaining`}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-16">
        <div className="max-w-xl mx-auto space-y-6">
          {/* Input */}
          <TodoInput onAdd={addTodo} />

          {/* Filters */}
          {todos.length > 0 && (
            <div className="flex items-center justify-between">
              <FilterTabs current={filter} onChange={setFilter} counts={counts} />
              {counts.completed > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors duration-200"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredTodos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {filter === "all"
                  ? "No tasks yet. Add one above!"
                  : filter === "active"
                  ? "No active tasks"
                  : "No completed tasks"}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
