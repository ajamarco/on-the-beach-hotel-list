import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import App from "./App";

// Mock the fetch API to fail, triggering the fallback data with the 2-second timeout
global.fetch = jest.fn(() => Promise.reject(new Error("Network Error")));

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading spinner initially", () => {
    render(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders hotels data after fallback loading with timeout", async () => {
    render(<App />);

    // Wait for the fallback hotel data to load, allowing extra time for the delay
    await waitFor(
      () =>
        expect(screen.getByText("Iberostar Grand Salome")).toBeInTheDocument(),
      { timeout: 3000 }
    );

    // Check if all hotel names are displayed from the fallback data
    expect(screen.getByText("Iberostar Grand Salome")).toBeInTheDocument();
    expect(screen.getByText("Aguamarina Golf Hotel")).toBeInTheDocument();
    expect(screen.getByText("Las Piramides Resort")).toBeInTheDocument();
  });

  test("sorts hotels by Name in ascending and descending order", async () => {
    render(<App />);

    // Wait for the fallback data to load, considering the delay
    await waitFor(
      () =>
        expect(screen.getByText("Iberostar Grand Salome")).toBeInTheDocument(),
      { timeout: 3000 }
    );

    // Wait for the sort button to appear
    const sortByNameButton = await waitFor(
      () => screen.getByTestId("sort_by_Name"),
      { timeout: 1000 }
    );
    fireEvent.click(sortByNameButton);

    // Check if the first hotel is Aguamarina Golf Hotel (ascending)
    await waitFor(
      () => {
        const sortedHotelsAsc = screen.getAllByText(/Hotel|Resort/);
        expect(sortedHotelsAsc[0]).toHaveTextContent("Aguamarina Golf Hotel");
      },
      { timeout: 1000 }
    );

    // Click to sort by Name again for descending
    fireEvent.click(sortByNameButton);
    await waitFor(
      () => {
        const sortedHotelsDesc = screen.getAllByText(/Hotel|Resort/);
        expect(sortedHotelsDesc[0]).toHaveTextContent("Las Piramides Resort");
      },
      { timeout: 1000 }
    );
  });

  test("sorts hotels by Price in ascending and descending order", async () => {
    render(<App />);

    // Wait for the fallback data to load, considering the delay
    await waitFor(
      () =>
        expect(screen.getByText("Iberostar Grand Salome")).toBeInTheDocument(),
      { timeout: 3000 }
    );

    // Wait for the sort button to appear
    const sortByPriceButton = await waitFor(
      () => screen.getByTestId("sort_by_Price"),
      { timeout: 1000 }
    );
    fireEvent.click(sortByPriceButton);

    // Check if the first hotel is Aguamarina Golf Hotel (ascending)
    await waitFor(
      () => {
        const sortedHotelsAsc = screen.getAllByText(/Hotel|Resort/);
        expect(sortedHotelsAsc[0]).toHaveTextContent("Las Piramides Resort");
      },
      { timeout: 1000 }
    );
  });
});
