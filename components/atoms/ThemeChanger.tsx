import { useTheme } from "next-themes";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button
        className="p-3 text-sm hover:underline"
        onClick={() => setTheme("light")}
      >
        light
      </button>
      <button
        className="p-3 text-sm hover:underline"
        onClick={() => setTheme("dark")}
      >
        dark
      </button>
    </div>
  );
};
