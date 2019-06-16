import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ErrorButton from '../error-button';
import ErrorBoundry from '../errorBoundry';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../peoplePage';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ItemDetails, { Record } from '../item-details/item-details';
import './app.css';

export default class App extends Component {
  state = {
    randomPlanet: true,
    hasError: false
  };

  swapiService = new SwapiService();

  toggleRandomPlanet = state => {
    this.setState(state => {
      return {
        randomPlanet: !state.randomPlanet
      };
    });
  };
  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }
  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const planet = this.state.randomPlanet ? <RandomPlanet /> : null;
    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
      getAllPlanets
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId={1} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="birthYear" label="Birth Year" />
      </ItemDetails>
    );
    
    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );
    return (
      <ErrorBoundry>
        <div>
          <Header />
          <ItemList getData={getAllPeople} onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </ItemList>
          <ItemList getData={getAllPlanets} onItemSelected={() => {}}>
            {({ name }) => <span>{name}</span>}
          </ItemList>
          {/* <ItemList
            onItemSelected={this.onPersonClick}
            getData={this.swapiService.getAllPlanets}
            itemData={item => (
              <span>
                {item.name}
                <button>{item.diameter}</button>
              </span>
            )}
          />
          <ItemList
            onItemSelected={this.onPersonClick}
            getData={this.swapiService.getAllStarships}
            itemData={item => {
              return item.name;
            }}
          /> */}
          {/* <Row left={personDetails} right={starshipDetails} /> */}
        </div>
      </ErrorBoundry>

      // {planet}
      // <button
      //   className="toggle-planet btn btn-warning btn-lg"
      //   onClick={this.toggleRandomPlanet}
      // >
      // Toggle random planet
      // </button>
      // <ErrorButton />
      // <PeoplePage />

      // <div className="row">
      //   <div className="col-md-6">
      // <ItemList
      //   onItemSelected={this.onPersonClick}
      //   getData={this.swapiService.getAllPlanets}
      //   itemData={item => (
      //     <span>
      //       {item.name}
      //       <button>{item.diameter}</button>
      //     </span>
      //   )}
      // />
      //   </div>
      //   <div className="col-md-6">
      //     <PersonDetails personId={this.state.personId} />
      //   </div>
      // </div>

      // <div className="row">
      //   <div className="col-md-6">
      // <ItemList
      //   onItemSelected={this.onPersonClick}
      //   getData={this.swapiService.getAllStarships}
      //   itemData={item => {
      //     return item.name;
      //   }}
      // />
      //   </div>
      //   <div className="col-md-6">
      //     <PersonDetails personId={this.state.personId} />
      //     {/* <ErrorButton /> */}
      //   </div>
      // </div>
    );
  }
}
