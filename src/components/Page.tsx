import { NavLink } from "react-router";
import { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col text-gray-900">
      <header className="">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-4xl gap-4 px-8 py-4"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded px-3 py-1.5 ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-green-700 hover:bg-green-100"
              }`
            }
          >
            All Animals
          </NavLink>

          <NavLink
            to="/add-animal"
            className={({ isActive }) =>
              `rounded px-3 py-1.5 ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-green-700 hover:bg-green-100"
              }`
            }
          >
            Add Animal
          </NavLink>
        </nav>
      </header>

      <main
        role="main"
        className="mx-auto w-full max-w-4xl flex-1 px-8 py-4 sm:w-lg"
      >
        {children}
      </main>
    </div>
  );
}
