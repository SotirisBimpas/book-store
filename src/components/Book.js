import React from 'react';
import { Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import styles from './Book.module.css';

export default function Book(props) {
  const {
    animate,
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

  const animation = {
    animation: !animate && 'none',
    animationDelay: `${index * 50}ms`,
  }

	return (
		<div className={bookThumbContainer}>
      <div className={bookThumb} style={animation} >
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
  animate: PropTypes.bool.isRequired,
  handleRating: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  book: PropTypes.object.isRequired,
};
