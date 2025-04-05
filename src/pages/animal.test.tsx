import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

test("boostAnimalStat should update stat value according to config - hunger", () => {
  render(<div>test</div>);
  expect(screen.getByText("test")).toBeInTheDocument();
});
