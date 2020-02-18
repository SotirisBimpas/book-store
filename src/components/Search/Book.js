import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserRating from '../UserRating';
import styles from './Book.module.css';

export default function Book(props) {
  const {
    animate,
    index,
    book,
    book: { title, isbn13 },
  } = props;

  const { push } = useHistory();

  const pathname = `/product/${isbn13}`;

  const handleClick = (e) => {
    if (e.target.className.includes(bookThumb)) push(pathname);
  };

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
      <div
        className={bookThumb}
        style={animation}
        onClick={e => handleClick(e)}
      >
        <Link to={{
          pathname: `/product/${isbn13}`,
          state: book
        }}
        >
          <div className={bookImage}>
            <img src={`/img/${book.title}.jpg`} alt="sss" />
          </div>
          <div className={bookTitle}>{title}</div>
        </Link>
        <div className={bookRating}>
          <UserRating book={book} />
        </div>
      </div>
    </div>
  );
}

Book.propTypes = {
  animate: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  book: PropTypes.object.isRequired,
};
