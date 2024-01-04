import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { ContactForm, ContactsList, Filter } from 'components';

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
    const leftContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: [...leftContacts] });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleFilterChange} value={filter} />
        <ContactsList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
