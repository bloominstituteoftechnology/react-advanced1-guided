import React from 'react'
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
  constructor(props) {
    super(props)
    this.state = initialState
  }

  // state = initialState // you can do this instead of the constructor thing

  onError = err => {
    const errorFromAPI = err.response.data.message
    this.setState({ ...this.state, error: errorFromAPI })
  }

  componentDidMount() {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, quotes: res.data.quotes })
      })
      .catch(this.onError)
  }

  onDelete = id => evt => {
    axios.delete(`${URL}/${id}`)
      .then(res => { // eslint-disable-line
        this.setState({
          ...this.state,
          quotes: this.state.quotes.filter(qo => {
            return qo.id !== id
          })
        })
      })
      .catch(this.onError)
  }

  onSubmit = () => {
    const payloadToSend = { author: this.state.authorInput, text: this.state.textInput }
    axios.post(URL, payloadToSend)
      .then(res => {
        this.setState({ ...this.state, quotes: this.state.quotes.concat(res.data.new_quote) })
      })
      .catch(this.onError)
  }

  onChange = (id, value) => {
    this.setState({ ...this.state, [id]: value })
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div>Quotes:</div>
        <ul>
          {
            this.state.quotes.map(qo => (
              <li key={qo.id}>
                {qo.text} ({qo.author}) <button onClick={this.onDelete(qo.id)}>del</button>
              </li>
            ))
          }
        </ul>
        <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          textInput={this.state.textInput}
          authorInput={this.state.authorInput}
        />
      </div>
    )
  }
}
