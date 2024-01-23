// Get the parent element
const list = document.querySelector('.card__summary--list');

// Clear the list
list.innerHTML = '';

// Fetch the data from the JSON file
fetch('../data.json')
  .then(response => response.json())
  .then(data => {
    // Calculate the average score
    let totalScore = 0;
    // Loop through the data
    data.forEach(function(item) {
      totalScore += item.score;
      // Create a new list item
      let listItem = document.createElement('li');
      listItem.className = 'card__summary--listItem listItem--' + item.category.toLowerCase();

      // Create the inner HTML
      listItem.innerHTML = `
        <span class="card__summary--listItem-logo-name">
          <img src="${item.icon}" alt="">
          <span class="${item.category.toLowerCase()}">${item.category}</span>
        </span>
        <span class="card__summary--listItem-percentage">
          <span class="my-score">${item.score}</span>
          <span class="off100">/ 100</span>
        </span>
      `;

      // Append the list item to the list
      list.appendChild(listItem);
    });
    const averageScore = Math.round(totalScore / data.length);

    // Determine the rating and percentage based on the average score
    let rating, percentage;
    if (averageScore <= 26) {
      rating = 'Poor';
      percentage = '10%';
    } else if (averageScore <= 52) {
      rating = 'Average';
      percentage = '35%';
    } else if (averageScore <= 78) {
      rating = 'Great';
      percentage = '65%';
    } else {
      rating = 'Excellent';
      percentage = '90%';
    }
    // Display the average score
    document.querySelector('.card__result--myresult').textContent = averageScore;
    // Update the rating and percentage
    document.querySelector('.card__result--reaction').textContent = rating;
    document.querySelector('.card__result--description').textContent = `You scored higher than ${percentage} of the people who have taken these tests.`;
  })
  .catch(error => console.error('Error:', error));
