import React from 'react'

export default class QuoteForm extends React.Component { // only in class components
  onSubmit = evt => {
    evt.preventDefault()
    this.props.onSubmit()
  }

  onChange = evt => {
    const { value, id } = evt.target
    this.props.onChange(id, value)
  }

  render() {
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="textInput"
          placeholder="type text"
          value={this.props.textInput}
          onChange={onChange}
        />
        <input
          type="text"
          id="authorInput"
          placeholder="type author"
          value={this.props.authorInput}
          onChange={onChange}
        />
        <input type="submit" />
      </form>
    )
  }
}
