import React, { Component } from 'react';

import './error-button.css';

export default class ErrorButton extends Component {

  state = {
    rendError: false
  };

  render() {
    if (this.state.rendError) {
      this.foo.bar = 0;
    }

    return (
      <button
        className="error-button btn btn-danger btn-lg"
        onClick={() => this.setState({rendError: true})}>
        Throw Error
      </button>
    );
  }
}
