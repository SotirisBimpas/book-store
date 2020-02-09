import React from 'react';
import { Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './Book.module.css';

export default function Book(props) {
  const {
    handleRating,
    index,
    book,
    book: { title, rating },
  } = props;
  const {
    bookThumbContainer,
    bookThumb,
    bookImage,
    bookTitle,
    bookRating,
  } = styles;

	return (
		<div className={bookThumbContainer}>
      <div className={bookThumb} style={{animationDelay: `${index * 50}ms`}} >
        <div className={bookImage}>image</div>
        <div className={bookTitle}>{title}</div>
        <div className={bookRating}>
          <Rating
                icon='star'
                defaultRating={rating}
                maxRating={5}
                onRate={(e, data) => handleRating({...book, rating: data.rating})}
          />
        </div>
          </div>
    </div>
	)
}

Book.propTypes = {
  handleRating: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
};
