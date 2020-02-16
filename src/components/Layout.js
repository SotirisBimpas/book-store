import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const { content } = styles;
  return (
    <>
      <Header />
      <div className={content}>
        {children}
      </div>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
