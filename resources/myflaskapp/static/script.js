const applyFiltersButton = document.getElementById('apply-filters');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const locationInput = document.getElementById('location-filter');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const propertyList = document.getElementById('property-listing');
let propertiesData = JSON.parse(propertyList.getAttribute('data-properties')); // Store the original data

// Function to display properties on the page
function displayProperties(properties) {
    propertyList.innerHTML = '';

    properties.forEach(property => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${property['TYPE']}</td>
            <td>${property['AREA(SQUARE FEET)']}</td>
            <td>${property['LOCATION']}</td>
            <td>${property['PRICE']}</td>
        `;
        propertyList.appendChild(row);
    });
}

// Apply filters based on user input
function applyFilters() {
    const minPrice = parseFloat(priceMinInput.value);
    const maxPrice = parseFloat(priceMaxInput.value);
    const selectedLocation = locationInput.value.toLowerCase();
    const searchString = searchInput.value.toLowerCase();

    // Apply filters to the original data
    const filteredData = propertiesData.filter(property => {
        const price = parseFloat(property['PRICE']);
        const location = property['LOCATION'].toLowerCase();
        const type = property['TYPE'].toLowerCase();

        const priceFilter =
            (isNaN(minPrice) || price >= minPrice) && (isNaN(maxPrice) || price <= maxPrice);
        const locationFilter = selectedLocation === 'all' || location === selectedLocation;
        const searchFilter = type.includes(searchString);

        return priceFilter && locationFilter && searchFilter;
    });

    // Display the filtered data
    displayProperties(filteredData);
}

// Event listeners
applyFiltersButton.addEventListener('click', applyFilters);
searchButton.addEventListener('click', applyFilters);

// Fetch and display the data when the page loads
window.addEventListener('load', () => {
    displayProperties(propertiesData);
});
