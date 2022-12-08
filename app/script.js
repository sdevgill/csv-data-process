fetch('http://localhost:3001/api/medals/')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Iterate over countries and medal counts
    for (const country in data) {
      const medals = data[country];

      // Create table row for country
      const row = document.createElement('tr');

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
