const { nanoid } = require("nanoid")

let quotes

const resetQuotes = () => {
  quotes = [
    {
      id: nanoid(5),
      author: 'Stephanie Kwolek, Chemist',
      text: "All sorts of things can happen when you’re open to new ideas and playing around with things.",
    },
    {
      id: nanoid(5),
      author: 'Rachel Carson, Marine Biologist',
      text: "The more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.",
    },
    {
      id: nanoid(5),
      author: 'Baroness Susan Greenfield, Neuroscientist',
      text: "As always in life, people want a simple answer... and it’s always wrong.",
    },
  ]
}

resetQuotes()

const getAll = async () => {
  return [200, { quotes, message: 'Here are your quotes' }]
}

const getById = async id => {
  const quote = quotes.find(quote => quote.id === id)
  if (!quote) {
    return [404, { message: 'Your quote is not here' }]
  }
  return [200, { quote, message: 'Here is your quote' }]
}

const create = async quote => {
  if (!quote.author || !quote.text || !quote.author.trim() || !quote.text.trim()) {
    return [422, { message: 'The author and text are required' }]
  }
  const newQuote = { id: nanoid(5), author: quote.author.trim(), text: quote.text.trim() }
  quotes.push(newQuote)
  return [201, { new_quote: newQuote, message: 'That is a nice quote' }]
}

const update = async (id, quote) => {
  if (!quote.author || !quote.text || !quote.author.trim() || !quote.text.trim()) {
    return [422, { message: 'The author and text are required' }]
  }
  const quoteFromDb = quotes.find(quote => quote.id === id)
  if (!quoteFromDb) {
    return [404, { message: 'Your quote is not here' }]
  }
  quotes = quotes.map(q => {
    return q.id == id
      ? { id, author: quote.author, text: quote.text }
      : q
  })
  return [200, { updated_quote: quotes.find(quote => quote.id === id), message: 'Nice quote' }]
}

const patch = async id => {
  const quoteFromDb = quotes.find(quote => quote.id === id)
  if (!quoteFromDb) {
    return [404, { message: 'Your quote is not here' }]
  }
  quotes = quotes.map(q => {
    return q.id == id
      ? { ...q, author: q.author.toUpperCase() }
      : q
  })
  return [200, { patched_quote: quotes.find(quote => quote.id === id), message: 'Nice job' }]
}

const remove = async id => {
  const quoteFromDb = quotes.find(quote => quote.id === id)
  if (!quoteFromDb) {
    return [404, { message: 'Your quote is not here' }]
  }
  quotes = quotes.filter(quote => {
    return quote.id != id
  })
  return [200, { message: 'Your quote was deleted successfully' }]
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  patch,
  remove,
  resetQuotes, // only tests use this
}
