import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Icon, Loader, Segment, Dimmer
} from 'semantic-ui-react';
import Context from '../../context';
import Book from './Book';
import styles from './Search.module.css';

export default function Search() {
  const { state, actions: { searchBooks } } = useContext(Context);

  const handleSearchChange = (query) => {
    const filteredBooks = state.books.filter(
      (book) => (
        book.title.includes(query)
        || book.subtitle.includes(query)
        || book.description.includes(query)
        || book.author.includes(query)
      )
    );
    searchBooks(filteredBooks);
  };

  const {
    searchbarContainer,
    searchbar,
    filters,
    filterIcon,
    bookList,
    btnAddProduct,
    loader,
    errorMessage,
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
      <div className={filters}>
        <p>Filters</p>
        <Icon name="filter" size="small" className={filterIcon} />
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
        {showAllBooks && state.books.map((b, i) => (
          <Book
            index={i}
            key={b.isbn13}
            book={b}
            animate
          />
        ))}
        {state.filteredBooks && state.filteredBooks.map(b => (
          <Book key={b.isbn13} book={b} />
        ))}
        <div className={btnAddProduct}>
          <Link to="/add-product">+</Link>
        </div>
      </div>
    </>
  );
}
