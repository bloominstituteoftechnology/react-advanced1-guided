import React from 'react'

export default class QuoteForm extends React.Component {
  const onSubmit = evt => {
    evt.preventDefault()
    props.onSubmit()
  }

  const onChange = evt => {
    const { value, id } = evt.target
    props.onChange(id, value)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        id="textInput"
        placeholder="type text"
        value={props.textInput}
        onChange={onChange}
      />
      <input
        type="text"
        id="authorInput"
        placeholder="type author"
        value={props.authorInput}
        onChange={onChange}
      />
      <input type="submit" />
    </form>
  )
}
