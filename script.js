'use strict'

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Show loading
function loading() {
	loader.hidden = false
	quoteContainer.hidden = true
}

// Hide loading
function complete() {
	quoteContainer.hidden = false
	loader.hidden = true
}

// Show new quote
function showRandomQuote() {
	loading()
	if (apiQuotes.length) {
		const randomIndex = Math.floor(Math.random() * apiQuotes.length)
		const randomQuote = apiQuotes[randomIndex]
		const { text, author } = randomQuote

		if (!author) {
			quoteText.textContent = 'Unknown'
		} else {
			authorText.textContent = author
		}

		if (text.length > 100) {
			quoteText.classList.add('long-quote')
		} else {
			quoteText.classList.remove('long-quote')
		}
		quoteText.textContent = text
		complete()
	}
}

// Get Quotes from API
async function getQuotes() {
	const apiURL = 'https://type.fit/api/quotes'
	try {
		loading()
		const res = await fetch(apiURL)
		apiQuotes = await res.json()
		showRandomQuote()
	} catch (err) {
		console.log(err.message)
	} finally {
		complete()
	}
}

// Tweet Quote
function tweetCode() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
	open(twitterUrl, '_blank')
}

// Event Listeners
twitterBtn.addEventListener('click', tweetCode)
newQuoteBtn.addEventListener('click', showRandomQuote)

// On load
getQuotes()