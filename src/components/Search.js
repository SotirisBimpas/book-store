import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Context from '../context';
import Book from './Book';
import styles from './Search.module.css';

export default function Search() {
  const { state, actions: { searchBooks, updateBook, handleRating }} = useContext(Context);
  
  const handleSearchChange = (query) => {
    const filteredBooks = state.books.filter(
      (book) => {
        return (
          book.title.includes(query)
          || book.subtitle.includes(query)
          || book.description.includes(query)
          || book.author.includes(query)
        )
      }
    );
    searchBooks(filteredBooks);
  }

  const {
    searchbar,
    filters,
    filterIcon,
    bookList,
    btnAddProduct,
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
        {!state.filteredBooks && state.books && state.books.map((b, i) => (
          <Book
            index={i}
            key={b.isbn}
            book={b}
            handleRating={handleRating}
            animate
          />
        ))}
        {state.filteredBooks && state.filteredBooks.map((b, i) => (
          <Book key={b.isbn} book={b} handleRating={handleRating} />
        ))}
        <div className={btnAddProduct}>
          <Link to="/add-product">+</Link>
        </div>
      </div>
    </>
  )
}