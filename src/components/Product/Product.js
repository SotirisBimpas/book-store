import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import Context from '../../context';
import UserRating from '../UserRating';
import RelatedProducts from './RelatedProducts';
import styles from './Product.module.css';

export default function Product() {
  const { isbn13 } = useParams();
  const { state: { books } } = useContext(Context);
  const [state, setState] = useState(null);

  // loads the book data matching the url params
  useEffect(
    () => {
      if (books && books.length > 0) {
        const book = books.find(b => b.isbn13 === isbn13);
        setState(book);
      }
    },
    [books, state, isbn13]
  );

  const {
    productContainer,
    productBasicInfo,
    productImageContainer,
    productImage,
    productAuthor,
    productInfo,
    productTitle,
    productButton,
    otherProductsContainer,
    relatedProduct,
    relatedProductImage,
  } = styles;

  const renderRelatedBookTemplate = (book) => (
    <div className={relatedProduct}>
      <Link to={{
        pathname: `/product/${book.isbn13}`,
        state: book
      }}
      >
        <div className={relatedProductImage}>
          <img src={`/img/${book.title}.jpg`} alt="sss" className={productImage} />
        </div>
        <p>{book.title}</p>
      </Link>
    </div>
  );

  return (
    <>
      {
        state && (
          <div className={productContainer}>
            <div className={productBasicInfo}>
              <div className={productImageContainer}>
                <img src={`/img/${state.title}.jpg`} alt={state.title} className={productImage} />
              </div>
              <div className={productAuthor}>
                <Icon name="user" size="big" />
                <p>{state.author.join(', ')}</p>
              </div>
              <UserRating book={state} />
            </div>
            <div className={productInfo}>
              <h2 className={productTitle}>{state.title}</h2>
              <p className="title">{state.description}</p>
              <Button className={productButton}>Favorite</Button>
              <Button className={productButton}>share</Button>
              <p>Category: {state.categories.join(', ')}</p>
              <p>Year: {state.year}</p>
              <p>Number of pages: {state.pages}</p>
              <p>Publisher: {state.publisher}</p>
              <p>ISBN-10: {state.isbn10}</p>
              <p>ISBN-13: {state.isbn13}</p>
              <Button className={productButton}>BUY</Button>
            </div>
            <div className={otherProductsContainer}>
              <p>Other Books you may like</p>
              <RelatedProducts books={books} template={renderRelatedBookTemplate} />
            </div>
          </div>
        )
      }
    </>
  );
}
