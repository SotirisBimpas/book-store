import React, { useEffect, useCallback, useReducer } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const initialState = {
    loading: false,
    error: false,
    books: null,
    filteredBooks: null,
  };

  const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case 'LOADING':
        return { loading: true, error: false, books: null };
      case 'ERROR':
        return { loading: false, error: true, books: null };
      case 'SET_BOOKS': {
        // manipulates book objects in order to have the same schema
        // with newly added books form add produc page
        const processedBookData = [...payload].map(book => (
          {
            author: [...book.author.split(',')],
            description: book.description,
            isbn10: book.isbn.length === 10 ? book.isbn : '',
            isbn13: book.isbn.length === 13 ? book.isbn : '',
            pages: book.pages,
            publisher: book.publisher,
            rating: 0,
            categories: [...book.author.split(',')],
            subtitle: book.subtitle,
            title: book.title,
            website: book.website,
            year: book.published.split('-')[0],
          }
        ));
        return { loading: false, error: false, books: processedBookData };
      }
      case 'UPDATE_BOOK_LIST':
        return { ...state, filteredBooks: payload };
      case 'ADD_BOOK':
        return { ...state, books: [...state.books, payload] };
      case 'UPDATE_BOOK':
        return { ...state, books: payload };
      default:
        return { ...state };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //  gets books data and sets all the proper app states while retrieving them
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
          console.log(err);
          dispatch({ type: 'ERROR', payload: {} });
        });
    },
    []
  );

  const updateBooklist = useCallback(
    (filteredBooks) => {
      dispatch({ type: 'UPDATE_BOOK_LIST', payload: filteredBooks });
    },
    []
  );
  const addBook = (addedBook) => dispatch({ type: 'ADD_BOOK', payload: addedBook });
  const updateBook = (updatedBookList) => dispatch({ type: 'UPDATE_BOOK', payload: updatedBookList });
  const actions = { updateBooklist, addBook, updateBook };

  return (
    <Context.Provider value={{ state, actions }}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
