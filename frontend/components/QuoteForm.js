import React from 'react'

export default class QuoteForm extends React.Component {
  onSubmit = evt => {
    evt.preventDefault()
    props.onSubmit()
  }

  onChange = evt => {
    const { value, id } = evt.target
    props.onChange(id, value)
  }

  render() {
    
  }
}
