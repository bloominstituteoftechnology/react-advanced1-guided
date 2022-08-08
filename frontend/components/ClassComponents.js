import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './QuoteForm'

const initialState = {
  quotes: [{ author: 'Gabe', text: 'Do not troll Gabe', id: 'xyz' }],
  error: 'No error, everything is cool!',
  textInput: '',
  authorInput: '',
}
const URL = 'http://localhost:9000/api/quotes'

export default class ClassComponents extends React.Component {

  constructor() {
    
  }

  render() {
    return (
      <div>foobar</div>
    )
  }
}

function Foo() {
  const [state, setState] = useState(initialState)

  const onError = err => {
    const errorFromAPI = err.response.data.message
    setState({ ...state, error: errorFromAPI })
  }

  useEffect(() => {
    axios.get(URL)
      .then(res => {
        setState({ ...state, quotes: res.data.quotes })
      })
      .catch(onError)
  }, [])

  const onChange = (id, value) => {
    setState({ ...state, [id]: value })
  }

  const onSubmit = () => {
    const payloadToSend = { author: state.authorInput, text: state.textInput }
    axios.post(URL, payloadToSend)
      .then(res => {
        setState({ ...state, quotes: state.quotes.concat(res.data.new_quote) })
      })
      .catch(onError)
  }

  const onDelete = id => event => { // eslint-disable-line
    axios.delete(`${URL}/${id}`)
      .then(res => { // eslint-disable-line
        setState({
          ...state,
          quotes: state.quotes.filter(qo => {
            return qo.id !== id
          })
        })
      })
      .catch(onError)
  }

  return (
    <div>
      <div id="error">Error: {state.error}</div>
      <div>Quotes:</div>
      <ul>
        {
          state.quotes.map(qo => (
            <li key={qo.id}>
              {qo.text} ({qo.author}) <button onClick={onDelete(qo.id)}>del</button>
            </li>
          ))
        }
      </ul>
      <Form
        onSubmit={onSubmit}
        onChange={onChange}
        textInput={state.textInput}
        authorInput={state.authorInput}
      />
    </div>
  )
}
