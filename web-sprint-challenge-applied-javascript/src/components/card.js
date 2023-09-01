const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const headlineDiv = document.createElement("div");
  headlineDiv.className = "headline";
  headlineDiv.textContent = article.headline;

  const authorDiv = document.createElement("div");
  authorDiv.className = "author";

  const imgContainerDiv = document.createElement("div");
  imgContainerDiv.className = "img-container";

  const authorImg = document.createElement("img");
  authorImg.src = article.authorPhoto;

  const authorNameSpan = document.createElement("span");
  authorNameSpan.textContent = `By ${article.authorName}`;

  authorDiv.appendChild(imgContainerDiv);
  imgContainerDiv.appendChild(authorImg);
  authorDiv.appendChild(authorNameSpan);

  cardDiv.appendChild(headlineDiv);
  cardDiv.appendChild(authorDiv);

  cardDiv.addEventListener("click", () => {
    console.log(article.headline);
  });

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  try {
    const response = await fetch("http://localhost:5001/api/articles");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const articlesData = await response.json();
    const articles = articlesData.articles || [];

    const cardsContainer = document.querySelector(selector);

    articles.forEach((article) => {
      const cardElement = Card(article);
      cardsContainer.appendChild(cardElement);
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

export { Card, cardAppender }
