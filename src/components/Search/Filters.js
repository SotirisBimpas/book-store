import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Rating, Dropdown, Button, Input } from 'semantic-ui-react';
import styles from './Filters.module.css';

export default function Filters({ publisherNames, setFilters, setFiltersAreOpen }) {
  const initialState = {
    from: '',
    to: '',
    rating: 0,
    publisher: null
  };
  const [values, setValues] = useState(initialState);

  // removes duplicated values from publishers array
  const uniquefiedPublisherNames = publisherNames.filter((item, index) => {
    return publisherNames.indexOf(item) === index;
  });

  const {
    filtersContainer,
    filterLabel,
    filter,
    filterInput,
    filterButtons,
  } = styles;

  return (
    <div className={filtersContainer}>
      <p className={filterLabel}>Year</p>
      <div className={filter}>
        <p>from</p>
        <Input
          className={filterInput}
          value={values.from}
          onChange={e => setValues({
            ...values,
            from: e.target.value
          })}
        />
        <p>to</p>
        <input
          className={filterInput}
          value={values.to}
          onChange={e => setValues({
            ...values,
            to: e.target.value
          })}
        />
      </div>
      <p className={filterLabel}>Rating</p>
      <div className={filter}>
        <Rating
          icon="star"
          rating={values.rating}
          maxRating={5}
          onRate={(e, data) => setValues({ ...values, rating: data.rating })}
        />
      </div>
      <p className={filterLabel}>Publisher</p>
      <div className={filter}>
        <Dropdown placeholder={values.publisher || 'Select Publisher'}>
          <Dropdown.Menu>
            {uniquefiedPublisherNames.map(option => (
              <Dropdown.Item
                key={option}
                text={option}
                onClick={(e, data) => setValues({ ...values, publisher: data.text })}
              />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={filterButtons}>
        <Button color="red" onClick={() => setValues(initialState)}>Clear All</Button>
        <Button onClick={() => {
          setFilters(values);
          setFiltersAreOpen(false);
        }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

Filters.propTypes = {
  publisherNames: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  setFiltersAreOpen: PropTypes.func.isRequired,
};
