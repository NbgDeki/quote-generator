const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoader() {
  loader.style.display = 'block';
}
function hideLoader() {
  loader.style.display = 'none';
}

// // show loading
// function loading() {
//   loader.hidden = false;
//   quoteContainer.hidden = true;
// }

// // hide loading
// function complete() {
//   quoteContainer.hidden = false;
//   loader.hidden = true;
// }

// show new quote
function newQuote() {
  // loading();
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const { text, author } = quote;

  // check if author field is blank and replace it with unknown
  if (!author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = author;
  }

  // chek quote length to determine styling
  if (text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = text;
  // complete();
}

// get quotes from API
async function getQuotes() {
  // loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
  try {
    showLoader();
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    hideLoader();

    newQuote();
  } catch (error) {
    console.log(error.message);
  }
}

// tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on load
// getQuotes();
getQuotes();
