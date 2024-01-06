import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { ContactForm, ContactsList, Filter } from 'components';
import { ContainerStyled, SectionStyled, TitleStyled } from './AppStyled';

const LOCAL_STORAGE_KEY = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (contacts) this.setState({ contacts });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleFilterChange = e => {
    this.setState({ filter: e.target.value.trim().toLowerCase() });
  };

  addContact = (name, number) => {
    const isPresent = this.state.contacts.find(
      contact => contact.name === name
    );

    if (isPresent) {
      alert(`${name} is already in the phonebook`);
      return;
    }

    this.setState(prev => ({
      contacts: [...prev.contacts, { name, id: nanoid(), number }],
    }));
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter);
    });

    return (
      <SectionStyled>
        <ContainerStyled>
          <TitleStyled>Phonebook</TitleStyled>
          <ContactForm onSubmit={this.addContact} />
          <TitleStyled>Contacts</TitleStyled>
          <Filter onChange={this.handleFilterChange} value={filter} />
          <ContactsList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </ContainerStyled>
      </SectionStyled>
    );
  }
}
