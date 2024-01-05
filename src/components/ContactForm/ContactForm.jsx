import React, { Component } from 'react';
import { BtnStyled, FormStyled, InputStyled } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value.trim(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.name, this.state.number);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <FormStyled onSubmit={this.handleSubmit}>
        <InputStyled
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
          required
          placeholder="Enter contact name"
        />
        <InputStyled
          type="tel"
          name="number"
          onChange={this.handleChange}
          value={this.state.number}
          required
          placeholder="Enter contact number"
        />
        <BtnStyled type="submit">Add contact</BtnStyled>
      </FormStyled>
    );
  }
}
