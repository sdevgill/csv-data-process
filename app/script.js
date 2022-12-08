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

// Most successful countries chart
const ctx = document.getElementById('goldMedalPerPersonChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['CHN', 'RUS', 'USA', 'GER', 'GBR'],
    datasets: [{
      label: 'Gold Medals per Person',
      data: [56 / 1439323776, 47 / 145934462, 147 / 331002651, 45 / 83783942, 48 / 67886011],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// Window onload event handler
window.onload = () => {
  fetchMedalsData();
}
