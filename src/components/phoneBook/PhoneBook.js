import React, { Component } from "react";
import ContactForm from "./contactForm/ContactForm";
import { v4 as uuidv4 } from "uuid";
import ContactList from "./contactList/ContactList";
import ContactFilter from "./contactFilter/ContactFilter";
import { CSSTransition } from "react-transition-group";
import s from "./PhoneBook.module.css";
import Notification from "./notification/Notofication";
import Insert from "./insert/Insert";

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

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    if (contacts.find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      this.setState({ newContact: contact.name, showAlert: true });
      setTimeout(
        () => this.setState({ newContact: null, showAlert: false }),
        2500
      );
      return;
    }
    if (!name.length || !number.length) {
      this.setState({ showInsert: true });
      setTimeout(() => this.setState({ showInsert: false }), 2500);
      return;
    }
    this.setState((prevState) => {
      return {
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
    const { newContact, showAlert, showInsert } = this.state;
    return (
      <div>
        <CSSTransition in={true} appear={true} timeout={500} classNames={s}>
          <h1 className={s.title}>Phonebook</h1>
        </CSSTransition>
        <ContactForm addContact={this.addContact} />
        {this.state.contacts.length > 0 && (
          <ContactFilter
            filter={this.state.filter}
            onHandleFilter={this.onHandleFilter}
          />
        )}
        <ContactList
          contacts={this.getFiltredContacts()}
          deleteContact={this.deleteContact}
        />
        <CSSTransition
          in={showInsert}
          appear={true}
          timeout={250}
          classNames={s}
          unmountOnExit
        >
          <Insert />
        </CSSTransition>

        <CSSTransition
          in={showAlert}
          appear={true}
          timeout={250}
          classNames={s}
          unmountOnExit
        >
          <Notification name={newContact} />
        </CSSTransition>
      </div>
    );
  }
}

export default PhoneBook;
