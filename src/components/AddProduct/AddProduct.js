import React, {
  useState, useEffect, useContext, useRef
} from 'react';
import {
  Form, Input, Button, Icon
} from 'semantic-ui-react';
import Context from '../../context';
import styles from './AddProduct.module.css';

export default function AddProduct() {
  const { actions: { addBook } } = useContext(Context);

  const stateSchema = {
    title: {
      value: '',
      error: false,
      success: false,
      instructions: 'Must have 10-120 letters, numbers, spaces or @”#&*!',
      validation: /^[0-9a-zA-Z@” #&*!]{10,120}$/,
      required: true,
    },
    description: {
      value: '',
      error: false,
      success: false,
      instructions: 'max 512 characters and must start with the first letter be uppercase',
      validation: /^[A-Z].{1,512}$/,
      required: true,
    },
    categories: {
      value: '',
      error: false,
      success: false,
      instructions: 'max 4 categories, seperate with ","',
      validation: /^.{1,60}$/,
      required: true,
    },
    author: {
      value: '',
      error: false,
      success: false,
      instructions: 'max 60 characters min 5, seperate authors with ","',
      validation: /^.{5,60}$/,
      required: true,
    },
    publisher: {
      value: '',
      error: false,
      success: false,
      instructions: 'max 60 characters min 5, max 4 categories seperated with ","',
      validation: /^.{5,60}$/,
      required: true,
    },
    year: {
      value: '',
      error: false,
      success: false,
      instructions: '4 digits',
      validation: /^[0-9]{4}$/,
      required: true,
    },
    pages: {
      value: '',
      error: false,
      success: false,
      instructions: 'max 9999',
      validation: /^([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])$/,
      required: true,
    },
    rating: {
      value: '',
      error: false,
      success: false,
      instructions: '0-5',
      validation: /^[0-5]$/,
      required: false,
    },
    isbn10: {
      value: '',
      error: false,
      success: false,
      instructions: '10 digits',
      validation: /^[0-9]{10}$/,
      required: true,
    },
    isbn13: {
      value: '',
      error: false,
      success: false,
      instructions: '13 digits',
      validation: /^[0-9]{13}$/,
      required: true,
    },
    image: {
      value: '',
      error: false,
      success: false,
      instructions: 'invalid file',
      validation: /^(.*\.)(jpg|png|gif)$/,
      required: false,
    },
  };

  const [state, setState] = useState(stateSchema);
  const [successMessageIsOpen, setSuccessMesssageIsOpen] = useState(false);

  const closeSuccessMesssage = () => {
    setSuccessMesssageIsOpen(false);
  };

  const handleSubmit = () => {
    const errors = Object.keys(state).filter(key => {
      const { value, validation, required } = state[key];
      if (required || (!required && value)) return !validation.test(value);
      return false;
    });
    if (errors.length > 0) {
      let ipnutErrors = { ...state };
      errors.forEach(err => {
        ipnutErrors = { ...ipnutErrors, [err]: { ...state[err], error: true } };
      });
      setState(ipnutErrors);
    } else {
      let newBook = {};
      Object.keys(state).forEach(key => {
        newBook = { ...newBook, [key]: state[key].value };
      });
      addBook(newBook);
      setState(stateSchema);
      setSuccessMesssageIsOpen(true);
    }
  };

  const validateValue = (value, key) => {
    let isValid;
    if (key === 'categories') {
      const values = value.split(',');
      const isLengthValid = values.length <= 4;
      const validatedValues = values.map(v => state[key].validation.test(v));
      const isValuesArrayValid = !validatedValues.some(v => !v);
      isValid = isLengthValid && isValuesArrayValid;
    } else if (key === 'author(s)') {
      const values = value.split(',');
      const validatedValues = values.map(v => state[key].validation.test(v));
      const isValuesArrayValid = !validatedValues.some(v => !v);
      isValid = isValuesArrayValid;
    } else {
      isValid = state[key].validation.test(value);
    }
    setState({ ...state, [key]: { ...state[key], error: !isValid, success: isValid } });
  };

  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    const { name } = e.target.files[0];
    setState({ ...state, image: { ...state.image, value: name } });
  };

  useEffect(
    () => {
      const timer = setTimeout(() => closeSuccessMesssage(), 1000);
      return () => clearTimeout(timer);
    },
    [successMessageIsOpen]
  );

  const {
    formContainer,
    errorMessage,
    successMessage,
    successMessageIcon,
    addBookForm,
    addImageBtnContainer,
    addImageBtn,
    submitBtn,
    submitBtnContainer
  } = styles;

  const renderSuccessMessage = () => (
    <div className={successMessage}>
      <p>Book added successfully</p>
      <Icon
        className={successMessageIcon}
        name="check"
        size="huge"
      />
    </div>
  );

  const inputRef = useRef();

  const renderSubmitButton = () => (
    <>
      <Button
        className={addImageBtn}
        onClick={() => inputRef.current.click()}
        color={state.image.error ? 'red' : 'grey'}
      >
        {
          state.image.value
          || (
            <>
              <p>Import image</p>
              <p>.jpg, .png, .gif</p>
            </>
          )
        }
      </Button>
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={e => uploadImage(e)}
      />
    </>
  );

  return (
    <>
      <div className={formContainer}>
        <Form className={addBookForm}>
          {Object.keys(state).filter(k => k !== 'image').map(key => {
            const {
              value, instructions, error, success
            } = state[key];
            return (
              <Form.Field>
                <Input
                  className={`${key}-input`}
                  onChange={e => setState({
                    ...state,
                    [key]: {
                      ...state[key],
                      value: key === 'categories' || key === 'author'
                        ? [e.target.value.split(',')]
                        : e.target.value
                    }
                  })}
                  onBlur={e => validateValue(e.target.value, key)}
                  value={value}
                  placeholder={instructions}
                  label={key}
                  error={error}
                  icon={success && 'check'}
                />
                {value && error && <p className={errorMessage}>{instructions}</p>}
              </Form.Field>
            );
          })}
          <Form.Field className={submitBtnContainer}>
            <Button className={submitBtn} onClick={() => handleSubmit(state)}>Submit</Button>
          </Form.Field>
          <Form.Field className={addImageBtnContainer}>
            {renderSubmitButton()}
          </Form.Field>
        </Form>
        {successMessageIsOpen && renderSuccessMessage()}
      </div>
    </>
  );
}
