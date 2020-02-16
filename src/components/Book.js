import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserRating from './UserRating';
import styles from './Book.module.css';

export default function Book(props) {
  const {
    animate,
    index,
    book,
    book: { title, isbn },
  } = props;
  const {
    bookThumbContainer,
    bookThumb,
    bookImage,
    bookTitle,
    bookRating,
  } = styles;

  const animation = {
    animation: !animate && 'none',
    animationDelay: `${index * 50}ms`,
  };

  return (
    <div className={bookThumbContainer}>
      <Link to={{
        pathname: `/product/:${isbn.replace(/ /g, '-')}`,
        state: book
      }}
      >
        <div className={bookThumb} style={animation}>
          <div className={bookImage}>
            <img src={`/img/${book.title}.jpg`} alt="sss" />
          </div>
          <div className={bookTitle}>{title}</div>
          <div className={bookRating}>
            <UserRating book={book} />
          </div>
        </div>
      </Link>
    </div>
  );
}

Book.propTypes = {
  animate: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  book: PropTypes.object.isRequired,
};
