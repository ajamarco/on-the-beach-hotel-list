import { render, screen, fireEvent } from "@testing-library/react";
import HotelCard from "./HotelCard";

const mockHotel = {
  name: "Hotel One",
  countryName: "Country One",
  starRating: 5,
  image: { url: "image-url" },
  overview: "This is a great hotel.",
};

const mockFlight = {
  departureDate: "2023-12-25T00:00:00Z",
  departureAirport: "Airport One",
};

const mockBookingDetails = {
  party: { adults: 2, children: 2, infants: 1 },
  price: { amount: 1000, currency: "GBP" },
  lengthOfStay: 7,
};

describe("HotelCard Component", () => {
  test("renders hotel details correctly", () => {
    render(
      <HotelCard
        hotel={mockHotel}
        flight={mockFlight}
        bookingDetails={mockBookingDetails}
      />
    );

    expect(screen.getByText(mockHotel.name)).toBeInTheDocument();
    expect(screen.getByText(mockHotel.countryName)).toBeInTheDocument();

    //check the text where we have the number of adults, children, and infants. We should have '2 adults , 2 children and 1 infant'
    expect(
      screen.getByText("2 adults, 2 children and 1 infant")
    ).toBeInTheDocument();
    expect(screen.getByText("25th December 2023")).toBeInTheDocument();

    //check if we have the text '7 days' anywhere in the document, but use a regex to match '* 7 days *'
    expect(screen.getByText(/7 days/i)).toBeInTheDocument();
    expect(screen.getByText("Airport One")).toBeInTheDocument();
    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
  });

  test("renders star rating correctly", () => {
    render(
      <HotelCard
        hotel={mockHotel}
        flight={mockFlight}
        bookingDetails={mockBookingDetails}
      />
    );

    //check the <p> tag with testId "star-icon". Inside this tag, check how many <svg> tags are rendered. The number of <svg> tags should be equal to the star rating of the hotel.
    const starIcons = screen.getByTestId("star-icon");
    expect(starIcons.querySelectorAll("svg")).toHaveLength(
      mockHotel.starRating
    );
  });

  test("toggles hotel overview visibility", () => {
    render(
      <HotelCard
        hotel={mockHotel}
        flight={mockFlight}
        bookingDetails={mockBookingDetails}
      />
    );

    //save the toggleButton var. The button has the data-testid of 'showOverview'. Click the button and check if the hotel overview is displayed. Click the button again and check if the hotel overview is not displayed.
    const toggleButton = screen.getByTestId("showOverview");
    fireEvent.click(toggleButton);
    expect(screen.getByText(mockHotel.overview)).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(screen.queryByText(mockHotel.overview)).not.toBeInTheDocument();
  });

  test("renders 'Book Now' button and price", () => {
    render(
      <HotelCard
        hotel={mockHotel}
        flight={mockFlight}
        bookingDetails={mockBookingDetails}
      />
    );
    expect(
      screen.getByRole("button", { name: /book now/i })
    ).toBeInTheDocument();
    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
  });
});
