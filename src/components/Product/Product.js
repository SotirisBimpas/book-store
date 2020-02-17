import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { Carousel } from 'primereact/carousel';
import Context from '../../context';
import UserRating from '../UserRating';
import styles from './Product.module.css';

export default function Product() {
  const { state: { isbn13 } } = useLocation();
  const { state: { books } } = useContext(Context);
  const [state, setState] = useState(null);

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
        pathname: `/product/:${isbn13.replace(/ /g, '-')}`,
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
                <img src={`/img/${state.title}.jpg`} alt="sss" className={productImage} />
              </div>
              <div className={productAuthor}>
                <Icon name="user" circular size="big" />
                <p>{state.author}</p>
              </div>
              <UserRating book={state} />
            </div>
            <div className={productInfo}>
              <h2 className={productTitle}>{state.title}</h2>
              <p className="title">{state.description}</p>
              <Button className={productButton}>Favorite</Button>
              <Button className={productButton}>share</Button>
              <p>Category: {state.category}</p>
              <p>Year: {state.year}</p>
              <p>Number of pages: {state.pages}</p>
              <p>Publisher: {state.publisher}</p>
              <p>ISBN-10: {state.isbn10}</p>
              <p>ISBN-13: {state.isbn13}</p>
              <Button className={productButton}>BUY</Button>
            </div>
            <div className={otherProductsContainer}>
              <p>Other Books you may like</p>
              <Carousel
                value={books}
                itemTemplate={renderRelatedBookTemplate}
                numVisible={4}
                numScroll={4}
              />
            </div>
          </div>
        )
      }
    </>
  );
}
