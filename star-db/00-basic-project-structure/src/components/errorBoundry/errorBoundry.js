import React, { Component } from 'react';
import './errorBoundry.css'

export default class ErrorBoundry extends Component {
  state = {
    rendError: false
  };
  componentDidCatch() {
    this.setState({
      rendError: true
    });
  }
  render() {
    return this.props.children
  }
}
