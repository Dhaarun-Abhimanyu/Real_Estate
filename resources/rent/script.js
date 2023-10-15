// Example data (replace with data from your Excel file)
const properties = [
    { name: 'Property 1', price: 4500000, landSize: 1000, location: 'Coimbatore' },
    { name: 'Property 2', price: 3900000, landSize: 800, location: 'Chennai' },
    { name: 'Property 3', price: 4500000, landSize: 1200, location: 'Bengaluru' },
    { name: 'Property 4', price: 7800000, landSize: 2000, location: 'Coimbatore' },
    { name: 'Property 5', price: 4200000, landSize: 1100, location: 'Bengaluru' },
    { name: 'Property 6', price: 6900000, landSize: 1700, location: 'New Delhi' },
    { name: 'Property 7', price: 8500000, landSize: 2500, location: 'Coimbatore' },
    { name: 'Property 8', price: 4200000, landSize: 900, location: 'New Delhi' },
    { name: 'Property 9', price: 7600000, landSize: 2200, location: 'Hyderabad' }
    // Add more property data
];

const applyFiltersButton = document.getElementById('apply-filters');
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
const propertyList = document.getElementById('property-list');

const locationInput = document.getElementById('location-filter');
locationInput.addEventListener('change', function () {
    applyFilters();
});

applyFiltersButton.addEventListener('click', function () {
    applyFilters();
});

function applyFilters() {
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Number.POSITIVE_INFINITY;
    const selectedLocation = locationInput.value;

    const filteredProperties = properties.filter(property => {
        return (
            property.price >= minPrice &&
            property.price <= maxPrice &&
            (selectedLocation === 'All' || property.location === selectedLocation)
        );
    });

    displayProperties(filteredProperties);
}

function displayProperties(properties) {
    propertyList.innerHTML = '';

    properties.forEach(property => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${property.name}</td>
            <td>${property.price}</td>
            <td>${property.landSize}</td>
            <td><a href="https://maps.app.goo.gl/nU1XZS1VR9JvVdX5A?q=${property.coordinates}" target="_blank">${property.location}</a></td>
        `;
        propertyList.appendChild(row);
    });
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const selectedLocation = locationInput.value;

    const filteredProperties = properties.filter(property => {
        const priceString = property.price.toString();
        const landSizeString = property.landSize.toString();

        const matchesSearchTerm = (
            priceString.includes(searchTerm) ||
            landSizeString.includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm)
        );

        const matchesLocation = selectedLocation === 'All' || property.location === selectedLocation;

        return matchesSearchTerm && matchesLocation;
    });

    displayProperties(filteredProperties);
});

// Populate the location filter select element
const locationFilter = document.getElementById('location-filter');
const uniqueLocations = ['All'].concat([...new Set(properties.map(p => p.location))]);
uniqueLocations.forEach(location => {
    const option = document.createElement('option');
    option.value = location;
    option.text = location;
    locationFilter.appendChild(option);
});

// Initial display of all properties
displayProperties(properties);
