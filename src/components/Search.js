import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import Book from './Book';
import styles from './Search.module.css';

export default function Search() {
  const initialState = {
    loading: false,
    error: false,
    books: null,
    searchResutls: null,
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
        return { ...state, searchResutls: payload };
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

  const handleSearchChange = (query) => {
    const searchResutls = state.books.filter(
      (book) => {
        return (
          book.title.includes(query)
          || book.subtitle.includes(query)
          || book.description.includes(query)
          || book.author.includes(query)
        )
      }
    );
    dispatch({ type: 'SEARCH_BOOKS', payload: searchResutls });
  }

  const handleRating = (updatedBook) => {
    const updatedBookIndex = state.books.findIndex(b => b.isbn === updatedBook.isbn);
    const updatedBookList = [...state.books]
    updatedBookList.splice(updatedBookIndex, 1, updatedBook);
    dispatch({ type: 'UPDATE_BOOK', payload: updatedBookList })
  }

  const {
    searchbar,
    filters,
    filterIcon,
    bookList,
  } = styles;

  return (
    <>
      <input
        className={searchbar}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <div className={filters}>
        <p>Filters</p>
        <Icon name="filter" size="small" className={filterIcon} />  
      </div>
      <div className={bookList}>
        {state.loading && <p>loading...</p>}
        {state.error && <p>Error...</p>}
        {!state.searchResutls && state.books && state.books.map((b, i) => (
          <Book
            index={i}
            key={b.isbn}
            book={b}
            handleRating={handleRating}
            animate
          />
        ))}
        {state.searchResutls && state.searchResutls.map((b, i) => (
          <Book key={b.isbn} book={b} handleRating={handleRating} />
        ))}
      </div>
    </>
  )
}