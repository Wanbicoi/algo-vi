import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function DarkToggle() {
  return (
    <div className="cursor-pointer" onClick={toggleDarkMode}>
      <MoonIcon className="fill-white hidden dark:block h-6 w-6 m-1 hover:fill-indigo-500" />
      <SunIcon className="fill-zinc-600 dark:hidden h-8 w-8 hover:fill-yellow-500 " />
    </div>
  );
}

export function toggleDarkMode() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  } else {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  }
}
