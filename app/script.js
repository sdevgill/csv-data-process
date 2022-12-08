// Notes
// The countries flag api was too slow, so I added a npm package to get the flags
// It doesn't work with all flags though, as the country ISO names sometimes differ from the country names in the csv file - so I had to remove the last character from the country name to get the flag to work
// I didn't have the time to fix that, but the implementation is there

// ------------------------------------------------------------------------------------

// Fetch and display the medal data
const fetchMedalsData = async () => {
  fetch('http://localhost:3001/api/medals/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Iterate over countries and medal counts
      for (const country in data) {
        const medals = data[country];

        // Create table row for country
        const row = document.createElement('tr');

        // Add flag cell
        const flagCell = document.createElement('td');
        flagCell.classList.add('fi');
        flagCell.classList.add(`fi-${country.toLowerCase().substring(0, country.length - 1)}`); // Use substring() to remove last char from country name
        row.appendChild(flagCell);

        // Add country name cell
        const countryCell = document.createElement('td');
        countryCell.innerText = country;
        row.appendChild(countryCell);

        // Add gold medal cell
        const goldCell = document.createElement('td');
        goldCell.classList.add('gold');
        goldCell.innerText = medals.Gold;
        row.appendChild(goldCell);

        // Add silver medal cell
        const silverCell = document.createElement('td');
        silverCell.classList.add('silver');
        silverCell.innerText = medals.Silver;
        row.appendChild(silverCell);

        // Add bronze medal cell
        const bronzeCell = document.createElement('td');
        bronzeCell.classList.add('bronze');
        bronzeCell.innerText = medals.Bronze;
        row.appendChild(bronzeCell);

        // Add total medal cell
        const totalCell = document.createElement('td');
        totalCell.classList.add('total');
        totalCell.innerText = medals.Gold + medals.Silver + medals.Bronze;
        row.appendChild(totalCell);

        // Add row to table
        const table = document.getElementById('medals-table');
        table.appendChild(row);
      }
    });
};

// Sort the table rows according to the selected options
const sortMedalsTable = () => {
  // Get the selected options from the "sort-by" and "sort-order" elements
  const sortBy = document.getElementById('sort-by').value;
  const sortOrder = document.getElementById('sort-order').value;

  // Get the table rows
  const table = document.getElementById('medals-table');
  const rows = Array.from(table.querySelectorAll('tr:not(:first-child)'));

  // Sort the rows according to the selected options
  rows.sort((row1, row2) => {
    // Get the values to compare from the appropriate cells in each row
    let value1, value2;
    if (sortBy === 'Total') {
      value1 = Number(row1.querySelector('.total').innerText);
      value2 = Number(row2.querySelector('.total').innerText);
    } else if (sortBy === 'Gold') {
      value1 = Number(row1.querySelector('.gold').innerText);
      value2 = Number(row2.querySelector('.gold').innerText);
    } else if (sortBy === 'Silver') {
      value1 = Number(row1.querySelector('.silver').innerText);
      value2 = Number(row2.querySelector('.silver').innerText);
    } else if (sortBy === 'Bronze') {
      value1 = Number(row1.querySelector('.bronze').innerText);
      value2 = Number(row2.querySelector('.bronze').innerText);
    }

    // Compare the values and return 1 or -1 based on the sort order
    if (value1 < value2) {
      return sortOrder === 'Ascending' ? -1 : 1;
    } else if (value1 > value2) {
      return sortOrder === 'Ascending' ? 1 : -1;
    } else {
      return 0;
    }
  });

  // Re-arrange the rows in the table according to the sorted order
  rows.forEach(row => table.appendChild(row));
};

// Add event listeners to the "sort-by" and "sort-order" elements
const sortBy = document.getElementById('sort-by');
const sortOrder = document.getElementById('sort-order');
sortBy.addEventListener('change', sortMedalsTable);
sortOrder.addEventListener('change', sortMedalsTable);

// Window onload event handler
window.onload = () => {
  fetchMedalsData();
}
