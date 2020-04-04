import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getBaskets} from "../../actions/basketActions";

const BasketCreator = props => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log({name});

    fetch(
      'http://avengers1.web.illinois.edu/cpi_api/basket',
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            Name: name,
            Items: []
          }
        )
      })
      .then(res => res.json())
      .then(data => {
        dispatch(getBaskets());
      });
  }, []);

  return (
    <div>
      <h3>Create new Basket:</h3>
      <form onSubmit={handleSubmit}>
        <label>Basket Name: </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
};

export default BasketCreator;