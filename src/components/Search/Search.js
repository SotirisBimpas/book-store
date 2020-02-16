import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
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
      <div className={bookList}>
        {state.loading && <p>loading...</p>}
        {state.error && <p>Error...</p>}
        {showAllBooks && state.books.map((b, i) => (
          <Book
            index={i}
            key={b.isbn}
            book={b}
            animate
          />
        ))}
        {state.filteredBooks && state.filteredBooks.map(b => (
          <Book key={b.isbn} book={b} />
        ))}
        <div className={btnAddProduct}>
          <Link to="/add-product">+</Link>
        </div>
      </div>
    </>
  );
}
