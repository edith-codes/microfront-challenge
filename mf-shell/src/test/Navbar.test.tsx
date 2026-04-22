import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

test("muestra el enlace con el texto correcto", () => {
  render(<Navbar />);

  const link = screen.getByRole("link", { name: /Personajes/i });

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/");
});
