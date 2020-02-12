import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider(props) {
  const initialState = {
    loading: false,
    error: false,
    books: null,
    filteredBooks: null,
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    switch(type) {
      case 'LOADING':
        return { loading: true, error: false, books: null };
      case 'ERROR':
        return { loading: false, error: true, books: null };
      case 'SET_BOOKS':
        return { loading: false, error: false, books: payload };
      case 'SEARCH_BOOKS':
        return { ...state, filteredBooks: payload };
      case 'ADD_BOOK':
      console.log(payload)
        return { ...state, books: [...state.books, payload]}
      case 'UPDATE_BOOK':
        return { ...state, books: payload}
      default:
        return { ...state };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () => {
      dispatch({ type: 'LOADING', payload: {} });
      axios('https://api.github.com/gists/6396437')
        .then(res => {
          const data = res.data.files['books.json'].content;
          const fixedDataString = data.replace(/'/g, '’').replace(' "You Don’t Know JS" ', ' You Don’t Know JS ');
          const parsedData = JSON.parse(fixedDataString);
          dispatch({ type: 'SET_BOOKS', payload: parsedData.books });
        })
        .catch(err => {
          dispatch({ type: 'ERROR', payload: {} });
        });
    },
    []
  )

  const searchBooks = (filteredBooks) => dispatch({ type: 'SEARCH_BOOKS', payload: filteredBooks }); 
  const addBook = (addedBook) => dispatch({ type: 'ADD_BOOK', payload: addedBook });
  const updateBook = (updatedBookList) => dispatch({ type: 'UPDATE_BOOK', payload: updatedBookList });
  const actions = { searchBooks, addBook, updateBook };

	return (
		<Context.Provider value={{state, actions}}>
			{props.children}
		</Context.Provider>
	)
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}