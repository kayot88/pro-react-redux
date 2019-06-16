import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';
import './item-details.css';

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};
export { Record };

export default class ItemDetails extends Component {
  swapiService = new SwapiService();
  state = {
    item: null,
    image: null,
    rendError: false
  };

  componentDidMount() {
    this.updateItem();
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }
  componentDidCatch() {
    this.setState({
      rendError: true
    });
  }
  updateItem = async () => {
    const { itemId, getData, getImageUrl } = this.props;
    if (itemId) {
      getData(itemId).then(item => {
        this.setState({ item, image: getImageUrl(item) });
      });
    }
    return;
  };

  render() {
    const { item, image } = this.state;
    console.log(item);
    if (this.state.rendError) {
      return <ErrorIndicator />;
    } else {
      if (!item) {
        return <Spinner />;
      }
      const {name} = item;
      return (
        <div className="item-details card">
          <img className="item-image" src={image} />
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              {React.Children.map(this.props.children, (child, idx) => {
                return React.cloneElement(child, { item });
              })}
              <ErrorButton />
            </ul>
          </div>
        </div>
      );
    }
  }
}
