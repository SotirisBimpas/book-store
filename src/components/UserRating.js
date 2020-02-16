import React, { useContext } from 'react';
import { Rating } from 'semantic-ui-react';
import Contect from '../context';

export default function UserRating({book}) {
  const { state: { books }, actions: { updateBook } } = useContext(Contect);

  const handleRating = (updatedBook) => {
    const updatedBookIndex = books.findIndex(b => b.isbn === updatedBook.isbn);
    const updatedBookList = [...books]
    updatedBookList.splice(updatedBookIndex, 1, updatedBook);
    updateBook(updatedBookList);
  }

  console.log(book)

  return (
  	<Rating
  		icon='star'
      rating={book.rating || 0}
  		maxRating={5}
  		onRate={(e, data) => handleRating({...book, rating: data.rating})}
  	/>
  )
}