import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharactersPage } from "../pages/CharactersPage";

// Mockeamos el servicio completo
jest.mock("../services/CharacterService", () => ({
  getCharacterApi: jest.fn(),
}));

// Importamos el mock para poder configurarlo en cada test
import { getCharacterApi } from "../services/CharacterService";
const mockGetCharacterApi = getCharacterApi as jest.Mock;

// Data falsa reutilizable
const mockCharacters = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "rick.jpg",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "morty.jpg",
  },
];

const defaultProps = {
  filterBy: "name" as const,
  setFilterBy: jest.fn(),
};

// Antes de cada test configuramos la respuesta del mock
beforeEach(() => {
  mockGetCharacterApi.mockResolvedValue({
    results: mockCharacters,
    info: { pages: 5 },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

// --- HAPPY PATH ---
test("muestra los personajes cuando la API responde correctamente", async () => {
  render(<CharactersPage {...defaultProps} />);

  // Primero aparece el loading
  expect(screen.getByText(/cargando personajes/i)).toBeInTheDocument();

  // Luego aparecen los personajes
  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
  expect(await screen.findByText("Morty Smith")).toBeInTheDocument();
});

// --- SAD PATH ---
test("muestra error cuando la API falla", async () => {
  mockGetCharacterApi.mockRejectedValue(new Error("Error fetching characters"));

  render(<CharactersPage {...defaultProps} />);

  expect(
    await screen.findByText(/error fetching characters/i)
  ).toBeInTheDocument();
});

// --- EDGE CASE: sin resultados al filtrar ---
test("muestra mensaje cuando no hay personajes que coincidan con la búsqueda", async () => {
  render(<CharactersPage {...defaultProps} />);

  await screen.findByText("Rick Sanchez");

  const input = screen.getByPlaceholderText(/buscar por name/i);
  await userEvent.type(input, "xyz");

  expect(
    screen.getByText(/no se encontraron personajes/i)
  ).toBeInTheDocument();
});

// --- PAGINACIÓN ---
test("el botón anterior está deshabilitado en la página 1", async () => {
  render(<CharactersPage {...defaultProps} />);

  await screen.findByText("Rick Sanchez");

  const prevButton = screen.getByRole("button", { name: /anterior/i });
  expect(prevButton).toBeDisabled();
});