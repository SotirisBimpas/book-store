import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Icon, Loader, Segment, Dimmer
} from 'semantic-ui-react';
import Context from '../../context';
import Filters from './Filters';
import Book from './Book';
import styles from './Search.module.css';

export default function Search() {
  const { state, actions: { updateBooklist } } = useContext(Context);
  const [filtersAreOpen, setFiltersAreOpen] = useState(false);
  const [filters, setFilters] = useState(null);

  // checks and retutns the book mathcing the search query
  // and updates the booklist
  const handleSearchChange = (query) => {
    const filteredBooks = state.books.filter(
      (book) => (
        book.title.includes(query)
        || book.subtitle.includes(query)
        || book.description.includes(query)
        || book.author.includes(query)
      )
    );
    updateBooklist(filteredBooks);
  };

  // checks and retutns the book mathcing the filters
  // and updates the booklist
  useEffect(
    () => {
      if (state.books && filters) {
        let filteredBooks;
        if (filters.rating) {
          filteredBooks = state.books.filter(book => book.rating === filters.rating);
        }
        if (filters.from) {
          filteredBooks = state.books.filter(book => book.year >= filters.from);
        }
        if (filters.to) {
          filteredBooks = state.books.filter(book => book.year <= filters.to);
        }
        if (filters.publisher) {
          filteredBooks = state.books.filter(book => book.publisher === filters.publisher);
        }
        updateBooklist(filteredBooks);
      } else {
        updateBooklist(state.books);
      }
    },
    [filters, state.books, updateBooklist]
  );

  const {
    searchbarContainer,
    searchbar,
    filtersContainer,
    filtersBtn,
    filterIcon,
    bookList,
    btnAddProduct,
    loader,
    errorMessage,
    clearFilters,
    clearFiltersBtn
  } = styles;

  const showAllBooks = !state.filteredBooks && state.books;

  return (
    <>
      <div className={searchbarContainer}>
        <input
          className={searchbar}
          type="text"
          placeholder="Categories, description, author"
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        <Icon name="search" size="large" />
      </div>
      <div className={filtersContainer}>
        <div className={filtersBtn} onClick={() => setFiltersAreOpen(prev => !prev)}>
          <p>Filters</p>
          <Icon name="filter" size="small" className={filterIcon} />
        </div>
        {filters && (
          <div className={clearFiltersBtn} onClick={() => setFilters(null)}>
            <Icon
              color="red"
              name="times"
              className={clearFilters}
            />
            <p>clear filters</p>
          </div>
        )}
      </div>
      {state.loading && (
        <Segment className={loader}>
          <Dimmer active>
            <Loader>loading...</Loader>
          </Dimmer>
        </Segment>
      )}
      {state.error && (
        <Segment className={errorMessage}>
          <Dimmer active>
            <p>Oops! Something went wrong.</p>
            <p>Please reload the page.</p>
          </Dimmer>
        </Segment>
      )}
      <div className={bookList}>
        {filtersAreOpen && state.books && (
          <Filters
            publisherNames={state.books.map(b => b.publisher)}
            filters={filters}
            setFilters={setFilters}
            setFiltersAreOpen={setFiltersAreOpen}
          />
        )}
        {showAllBooks && state.books.map((b, i) => (
          <Book
            index={i}
            key={b.isbn13}
            book={b}
            animate
          />
        ))}
        {state.filteredBooks && state.filteredBooks.map((b, i) => (
          <Book key={b.isbn13} book={b} index={i}/>
        ))}
      </div>
      <div className={btnAddProduct}>
        <Link to="/add-product">+</Link>
      </div>
    </>
  );
}
