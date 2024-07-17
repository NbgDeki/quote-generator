let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('loader');

// Show loader
function showLoader() {
  loader.style.display = 'block';
}

// Hide loader
function hideLoader() {
  loader.style.display = 'none';
}

// Show New Quote
function newQuote(randomNumber) {
  return Math.floor(Math.random() * randomNumber) + 1;
}

// Get quotes from API
async function getQuotes() {
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    showLoader();
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    hideLoader();

    const quote = await apiQuotes[newQuote(apiQuotes.length)];

    return quote;
  } catch (error) {
    console.log(error);
  }
}

async function showQuoteInDOM() {
  const { text, author } = await getQuotes();

  // Quote
  // Make quote text div
  const quoteText = document.createElement('div');
  quoteText.classList.add('quote-text');
  // Make <i></i> tag for font awesome icon
  const iQuote = document.createElement('i');
  iQuote.classList.add('fas', 'fa-quote-left');
  // Make span tag for quote text
  const spanQuote = document.createElement('span');
  spanQuote.id = 'quote';
  spanQuote.appendChild(document.createTextNode(`${text}`));
  // Appending iQuote and spanQuote to quoteText div
  quoteText.appendChild(iQuote);
  quoteText.appendChild(spanQuote);

  // Author
  // Make quote author div
  const quoteAuthor = document.createElement('div');
  quoteAuthor.classList.add('quote-author');
  // Make a span tag for author name
  const spanAuthor = document.createElement('span');
  spanAuthor.id = 'author';
  spanAuthor.appendChild(document.createTextNode(`${author}`));
  // Appending spanAuthor to quoteAuthor div
  quoteAuthor.appendChild(spanAuthor);

  // Buttons
  // Make a button container div
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  // Make twitter button
  const twitterBtn = document.createElement('button');
  twitterBtn.classList.add('twitter-button');
  twitterBtn.id = 'twitter';
  twitterBtn.setAttribute('title', 'Tweet This!');
  // Make twitter icon to append to the button
  const iTwitter = document.createElement('i');
  iTwitter.classList.add('fab', 'fa-twitter');
  // Appending twitter icon to the button
  twitterBtn.appendChild(iTwitter);
  // Make a new quote button
  const newQuoteBtn = document.createElement('button');
  newQuoteBtn.id = 'new-quote';
  newQuoteBtn.appendChild(document.createTextNode('New Quote'));
  // Appending twitterBtn and newQuoteBtn to the buttonContainer
  buttonContainer.appendChild(twitterBtn);
  buttonContainer.appendChild(newQuoteBtn);

  // Appending all elements to quoteContainer div
  quoteContainer.appendChild(quoteText);
  quoteContainer.appendChild(quoteAuthor);
  quoteContainer.appendChild(buttonContainer);

  document.body.appendChild(quoteContainer);
}

// Add tweet
async function addTweet(e) {
  const { text, author } = await getQuotes();

  const twitterUrl = `https://twitter.com/intent/tweet?text=${text} - ${author}`;
  console.log(text);
  window.open(twitterUrl, '_blank');
}

// On Load
document.addEventListener('DOMContentLoaded', showQuoteInDOM);
quoteContainer.addEventListener('click', (e) => {
  if (e.target.id === 'new-quote') {
    while (quoteContainer.firstChild) {
      quoteContainer.removeChild(quoteContainer.firstChild);
    }

    showQuoteInDOM();
  }

  if (e.target.id === 'twitter') {
    addTweet();
  }
});
