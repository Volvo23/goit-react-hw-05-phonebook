import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./contactList/ContactList";
import ContactFilter from "./contactFilter/ContactFilter";

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      this.setState({
        contacts: JSON.parse(persistedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (newContacts) => {
    const contact = {
      id: uuidv4(),
      name: newContacts.name,
      number: newContacts.number,
    };

    this.setState((prevState) => {
      return prevState.contacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContacts.name.toLowerCase()
      )
        ? alert(`${newContacts.name} is already in contacts.`)
        : {
            contacts: [...prevState.contacts, contact],
          };
    });
  };

  deleteContact = (e) => {
    const id = e.target.dataset.id;
    this.setState({
      contacts: [...this.state.contacts.filter((contact) => contact.id !== id)],
    });
  };

  onHandleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  getFiltredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <ContactFilter
          filter={this.state.filter}
          onHandleFilter={this.onHandleFilter}
        />
        <ContactList
          contacts={this.getFiltredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default PhoneBook;
