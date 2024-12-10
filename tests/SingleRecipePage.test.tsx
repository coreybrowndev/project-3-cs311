import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import SingleRecipePage from "../src/app/recipe/[id]/page";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const { useParams } = jest.requireMock("next/navigation");

describe("SingleRecipePage", () => {
  beforeEach(() => {
    fetchMock.resetMocks();

    useParams.mockReturnValue({ id: "1" });
  });

  it("renders loading state initially", () => {
    render(<SingleRecipePage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays recipe data after fetching", async () => {
    const mockRecipe = {
      recipe: {
        name: "Pasta",
        likes: 10,
        descriptor: ["easy", "delicious"],
        steps: ["Boil water", "Add pasta", "Cook for 10 mins"],
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockRecipe));

    render(<SingleRecipePage />);

    await waitFor(() => expect(screen.getByText("Pasta")).toBeInTheDocument());

    expect(screen.getByText("Tags: easy, delicious")).toBeInTheDocument();
    expect(screen.getByText("Boil water")).toBeInTheDocument();
    expect(screen.getByText("Cook for 10 mins")).toBeInTheDocument();
  });

  it("handles like button click", async () => {
    const mockRecipe = {
      recipe: {
        name: "Pasta",
        likes: 10,
        descriptor: ["easy", "delicious"],
        steps: ["Boil water", "Add pasta", "Cook for 10 mins"],
      },
    };

    const mockLikeResponse = { likes: 11 };

    fetchMock.mockResponses([JSON.stringify(mockRecipe), { status: 200 }], [JSON.stringify(mockLikeResponse), { status: 200 }]);

    render(<SingleRecipePage />);

    await waitFor(() => expect(screen.getByText("Pasta")).toBeInTheDocument());

    const likeButton = screen.getByText("Like (10)");
    fireEvent.click(likeButton);

    await waitFor(() => expect(screen.getByText("Like (11)")).toBeInTheDocument());
  });

  it("handles error when fetching recipe fails", async () => {
    fetchMock.mockReject(new Error("API fail"));

    render(<SingleRecipePage />);

    await waitFor(() => expect(screen.getByText("Recipe not found.")).toBeInTheDocument());
  });
});
