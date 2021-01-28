import React, { Component } from "react";
import s from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addContact({ name: this.state.name, number: this.state.number });
    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <label className={s.label}>
            Name
            <input
              className={s.input}
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
          </label>
          <label className={s.label}>
            Number
            <input
              className={s.input}
              name="number"
              type="tel"
              value={this.state.number}
              onChange={this.handleChange}
            ></input>
          </label>
          <button className={s.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
