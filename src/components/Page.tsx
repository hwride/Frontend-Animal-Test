import { NavLink } from "react-router";
import { ReactNode } from "react";

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="border-b bg-white shadow-sm">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-4xl gap-4 px-4 py-3"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded px-3 py-1.5 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
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
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-100"
              }`
            }
          >
            Add Animal
          </NavLink>
        </nav>
      </header>

      <main role="main" className="mx-auto max-w-4xl flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
}
