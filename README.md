# On The Beach Assessment

Live demo: xxx

This project is part of On The Beach's Frontend developer assessment.

It is a simple project that demonstrates how components can be assembled to form a larger application. The client is expected to render it all.

In the App.js file, I created a fetch call that will try to fetch data from the provided URL, but since the URL wasn't accessible due to some CORS policy, I decided to have a failsafe system in place, where a local file would be used to load the data from in case the URL fetch call fails.

- Components can be found in /src/components.
- Mock data can be found at /hotelData.js.
- CSS files can be found in /src/styles.

### Components

There are 5 components in this project:

- **SortSelection**: the sort menu.
- **SortButton**: an individual Sort button for any of the 3 sorting capabilities.
- **Hotels**: the container for trips.
- **HotelCard**: an individual trip card.
- **Loading**: A reusable Loading spinner component that can be reused if needed.

### Responsiveness

The project also has a simple responsiveness system in place, since this wasn't in the design that was sent to me, so I decided to keep this simple.

### Sorting

By clicking on any of the buttons on the left, the sorting is done by hotel name, price, or star rating (name from A to Z, price from lower to higher, and star rating from higher to lower). If the active sorting is clicked again, it will sort the data the other way around (name from Z to A, price from higher to lower, and star rating from lower to higher).

### Future Implementations

As future implementations of this project, we could have:

- Different types of filters (by location, date, etc.).
- Improved responsiveness.
- Improved compatibility, as I used flex grid to make the layout work. Maybe this won't work on some older browsers.
- Adding additional information on each trip, as well as a Google Maps integration showing the location of the hotel on a map.
