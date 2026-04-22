import { render, screen } from "@testing-library/react";
import App from "../App";

jest.mock("../services/services", () => ({
  getCharacterById: jest.fn(),
  getEpisodesByUrls: jest.fn(),
}));

import { getCharacterById, getEpisodesByUrls } from "../services/services";
const mockGetCharacterById = getCharacterById as jest.Mock;
const mockGetEpisodesByUrls = getEpisodesByUrls as jest.Mock;

// Mock ambos servicios (Personaje y Episodios)
const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  gender: "Male",
  image: "rick.jpg",
  origin: { name: "Earth" },
  location: { name: "Citadel of Ricks" },
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
};

const mockEpisodes = [
  { id: 1, name: "Pilot", episode: "S01E01", air_date: "December 2, 2013" },
  {
    id: 2,
    name: "Lawnmower Dog",
    episode: "S01E02",
    air_date: "December 9, 2013",
  },
];

beforeEach(() => {
  mockGetCharacterById.mockResolvedValue(mockCharacter);
  mockGetEpisodesByUrls.mockResolvedValue(mockEpisodes);
});

afterEach(() => {
  jest.clearAllMocks();
});

// happy path (por id de personaje)
test("muestra el nombre y estado del personaje", async () => {
  render(<App id="1" />);

  expect(screen.getByText(/cargando personaje/i)).toBeInTheDocument();

  expect(await screen.findByText("Rick Sanchez")).toBeInTheDocument();
  expect(await screen.findByText("Alive")).toBeInTheDocument();
  expect(await screen.findByText("Human")).toBeInTheDocument();
});

test("muestra los episodios donde aparece el personaje", async () => {
  render(<App id="1" />);

  expect(await screen.findByText("Pilot")).toBeInTheDocument();
  expect(await screen.findByText("S01E01")).toBeInTheDocument();
  expect(await screen.findByText("Lawnmower Dog")).toBeInTheDocument();
  expect(await screen.findByText("S01E02")).toBeInTheDocument();
});

// mock de error en peticion
test("muestra error cuando la API falla", async () => {
  mockGetCharacterById.mockRejectedValue(new Error("Error fetching character"));

  render(<App id="1" />);

  expect(
    await screen.findByText(/error fetching character/i),
  ).toBeInTheDocument();
});

// mock error cuando no encuentra el id
test("muestra error cuando no se pasa un id", async () => {
  render(<App id="" />);

  expect(await screen.findByText(/id no encontrado/i)).toBeInTheDocument();
});
