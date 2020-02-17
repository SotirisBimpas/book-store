import React from 'react';
import { Carousel } from 'primereact/carousel';
import Proptypes from 'prop-types';

export default function RelatedProducts({ books, template }) {
  const responsiveOptions = [
    {
      breakpoint: '925px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  return (
    <Carousel
      value={books}
      itemTemplate={template}
      numVisible={4}
      numScroll={4}
      responsiveOptions={responsiveOptions}
    />
  );
}

RelatedProducts.propTypes = {
  books: Proptypes.array.isRequired,
  template: Proptypes.func.isRequired,
};
