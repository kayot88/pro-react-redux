import React, { Component } from 'react';
import ItemList from '../item-list';
import PersonDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button';
import Row from '../row';

class ErrorBoundry extends Component {
  state = {
    rendError: false
  };
  componentDidCatch() {
    this.setState({
      rendError: true
    });
  }
  render() {
    if (this.state.rendError) {
      return <ErrorIndicator />;
    }
    return this.props.children;
  }
}

export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    personId: 7,
    rendError: false
  };
  onPersonClick = id => {
    this.setState({
      personId: id
    });
  };

  render() {
    if (this.state.rendError) {
      return <ErrorIndicator />;
    }
    const itemList = (
      <ItemList
        onItemSelected={this.onPersonClick}
        getData={this.swapiService.getAllPeople}
        itemData={item => {
          return `${item.name} gender:${item.gender}`;
        }}
      />
    );
    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.personId} />
      </ErrorBoundry>
    );
    return (
      
        <div>
          <Row left={itemList} right={personDetails} />
          <ErrorButton />
        </div>
      
    );
  }
}
