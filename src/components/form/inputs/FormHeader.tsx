interface FormHeaderProps {
  updating?: boolean;
  editing: boolean;
  name: string;
}

export function FormHeader({ editing, updating, name }: FormHeaderProps) {
  return (
    <h1 className="text-2xl font-bold">
      {editing && updating
        ? "Update " + name
        : updating && !editing
        ? name
        : "Add " + name}
    </h1>
  );
}
