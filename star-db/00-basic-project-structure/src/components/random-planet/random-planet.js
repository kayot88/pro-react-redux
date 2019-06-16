import React, { Component } from 'react';
import './random-planet.css';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';

export default class Randomplanet extends Component {
  swapiService = new SwapiService();
  state = { planet: {}, loading: true, errorInd: false };

  ErrorApi = error => {
    this.setState({ errorInd: true });
  };
  componentDidMount(){
    console.log('componentDidMount');
    this.updatePlanet();
    // setInterval(() => {
    //   this.updatePlanet()
    // }, 10000);
  }
  componentWillMount(){
    console.log('componentWillMount');
  }

  onPlanetLoaded = planet => {
    this.setState({ planet, loading: false });
  };

  updatePlanet = () => {
    console.log('update');
    const id = Math.floor(Math.random() * 18) + 2;
    // const id = 12000;
    return this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.ErrorApi);
  };

  render() {
    console.log('render');
    const { planet, loading, errorInd } = this.state;
    const spinner = loading ? <Spinner /> : null;
    const planetView = loading ? null : <PlanetView planet={planet} />;
    return (
      <div className="random-planet jumbotron rounded">
        {errorInd ? (
          <ErrorIndicator />
        ) : (
          <React.Fragment>
            {spinner}
            {planetView}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const PlanetView = ({ planet }) => {
  const { population, rotationPeriod, diameter, name, id } = planet;
  return (
    <React.Fragment>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
      />
      <div className="">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span className="">{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span className="">{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span className="">{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
