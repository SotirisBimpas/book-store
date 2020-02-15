import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Icon, Rating } from 'semantic-ui-react';
import { Carousel } from 'primereact/carousel';
import Context from '../context';
import styles from './Product.module.css';

export default function Product() {
	const { state: { isbn } } = useLocation();
	const { state: { books }, actions: { handleRating } } = useContext(Context);
	const [state, setState] = useState(null);

	useEffect(
		() => {
			if (books && books.length > 0) {
				console.log(state)
				const book = books.find(b => b.isbn === isbn)
				setState(book)
			}
		}
	)

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

  const renderRelatedBookTemplate = (book) => {
    return (
      <div className={relatedProduct}>
        <Link to={{
          pathname: `/product/:${isbn.replace(/ /g, '-')}`,
          state: book
        }}>
          <div className={relatedProductImage} />
          <p>{book.title}</p>
        </Link>
      </div>
    )
  }

  const renderRating = (b) => {
    console.log(b.rating)
    return (
			<Rating
        icon="star"
        defaultRating={b.rating}
        maxRating={5}
        size='large'
        onRate={(e, data) => handleRating({...b, rating: data.rating})}
      />
    )
  }

	return <>
		{
			state &&
			<div className={productContainer}>
				<div className={productBasicInfo}>
          <div className={productImageContainer}>
            <img src="/img/" alt="sss" className={productImage} />
          </div>
          <div className={productAuthor} >
            <Icon name="user" circular size="big" />
            <p>{state.author}</p>
          </div>
          {renderRating(state)}
        </div>
				<div className={productInfo}>
          <h2 className={productTitle}>{state.title}</h2>
          <p className="title">{state.description}</p>
          <Button className={productButton}>Favorite</Button>
          <Button className={productButton}>share</Button>
          <p>Category: {state.category}</p>
          <p>Year: {state.published.split('-')[0]}</p>
          <p>Number of pages: {state.pages}</p>
          <p>Publisher: {state.publisher}</p>
          <p>ISBN-10: {state.isbn.length === 10 && state.isbn}</p>
          <p>ISBN-13: {state.isbn.length === 13 && state.isbn}</p>
          <Button className={productButton}>BUY</Button>
        </div>
				<div className={otherProductsContainer}>
          <p>Other Books you may like</p>
          <Carousel value={books} itemTemplate={renderRelatedBookTemplate} numVisible={4} numScroll={4} />
        </div>
			</div>
		}
	</>
}