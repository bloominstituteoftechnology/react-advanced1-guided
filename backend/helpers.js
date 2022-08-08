const { nanoid } = require("nanoid")

let quotes

const resetQuotes = () => {
  quotes = [
    {
      id: nanoid(5),
      author: 'Dr. Seuss',
      text: "Don't cry because it's over, smile because it happened.",
    },
    {
      id: nanoid(5),
      author: 'Frank Zappa',
      text: "So many books, so little time.",
    },
    {
      id: nanoid(5),
      author: 'Oscar Wilde',
      text: "Be yourself, everyone else is already taken.",
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
