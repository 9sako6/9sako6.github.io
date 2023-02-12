"use client";

import { useTheme } from "next-themes";
import { SunIcon } from "@/components/icons/SunIcon";
import { MoonIcon } from "@/components/icons/MoonIcon";
import { useEffect, useState } from "react";

export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === "dark" ? (
        <div
          className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <SunIcon />
        </div>
      ) : (
        <div
          className="hover:text-teal-600 dark:hover:text-teal-400 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <MoonIcon />
        </div>
      )}
    </div>
  );
};
