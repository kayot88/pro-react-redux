import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import { withData } from '../hoc-helpers';
import './item-list.css';

const ItemList = props => {
  const { data, onItemSelected, children: renderrrLabel } = props;

  const items = data.map(item => {
    const { id } = item;
    const label = renderrrLabel(item);

    return (
      <li
        className="list-group-item"
        key={id}
        onClick={() => onItemSelected(id)}
      >
        {label}
      </li>
    );
  });

  return <ul className="item-list list-group">{items}</ul>;
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
