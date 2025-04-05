# Animal Keeper 🐩

> _What could be more fun than having a pet? Making your own!_

This is a project which allows you keep animals. They have stats which decay over time and they need to kept happy.

## Technical notes

This is an SPA which stores data in `localStorage`. This keeps the app fast, and for a simple game is enough.

You could instead design it with a backend and authentication, database, etc if you want to let users load their pets from anywhere and enforce decay and boost rules on the server.

Currently, decay is only run inside the view animal page, rather than any time an animal is loaded or at the root of the whole app. 
Depending on evolving requirements you could make adjustments here. If still wanting to use minimal libraries you could sync up `localStorage`
with `useSyncExternalStore` and provide a hook which could be used anywhere. 

I used minimal libraries as recommended by the spec, but in a real application I'd likely use some kind of state manager such as Zustand or Redux, 
or TanStack Query if adding a server implementation. I'd also consider a framework such as TanStack Start (though this is still new), Remix (now React Router 7) 
or Next.js (or many more).

## Development setup

1. Clone the project
2. Run `bun install`

## Technologies used
- React
- Vite
- TypeScript
- Tailwind for CSS
- Vitest and React Testing Library for unit tests
- Prettier
- ES Lint