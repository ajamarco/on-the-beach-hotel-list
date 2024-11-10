import { render, screen, within } from "@testing-library/react";
import Hotels from "./Hotels";

// Mock HotelCard component
jest.mock("./HotelCard", () => ({ hotel, id, flight, bookingDetails }) => (
  <div data-testid="hotel-card">
    <div>{hotel.name}</div>
    <div>{id}</div>
    <div>{flight}</div>
    <div>{bookingDetails}</div>
  </div>
));

const mockHotels = [
  {
    resort: { id: 1, name: "Hotel One" },
    flightDetails: "Flight One",
    bookingDetails: "Booking One",
  },
  {
    resort: { id: 2, name: "Hotel Two" },
    flightDetails: "Flight Two",
    bookingDetails: "Booking Two",
  },
];

describe("Hotels Component", () => {
  test("renders correct number of HotelCard components", () => {
    render(<Hotels hotels={mockHotels} />);
    const hotelCards = screen.getAllByTestId("hotel-card");
    expect(hotelCards).toHaveLength(mockHotels.length);
  });

  test("passes correct props to each HotelCard", () => {
    render(<Hotels hotels={mockHotels} />);
    mockHotels.forEach((hotel, index) => {
      const hotelCard = screen.getAllByTestId("hotel-card")[index];
      expect(
        within(hotelCard).getByText(hotel.resort.name)
      ).toBeInTheDocument();
      expect(within(hotelCard).getByText(hotel.resort.id)).toBeInTheDocument();
      expect(
        within(hotelCard).getByText(hotel.flightDetails)
      ).toBeInTheDocument();
      expect(
        within(hotelCard).getByText(hotel.bookingDetails)
      ).toBeInTheDocument();
    });
  });
});
