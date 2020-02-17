import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import styles from './Header.module.css';

export default function Header() {
  const { location: { pathname } } = useHistory();
  const crumbs = pathname.split(':')[0].split('/').filter(c => c !== '');
  const { logo, breadcrumbs } = styles;

  return (
    <header>
      <h1 className={logo}>Bookstore</h1>
      <Breadcrumb className={breadcrumbs}>
        <Breadcrumb.Section>
          <Link to="/">Home</Link>
        </Breadcrumb.Section>
        <Breadcrumb.Divider />
        {crumbs.length > 0 && crumbs.map(
          (path, i) => (
            <Breadcrumb.Section key={path}>
              <Link to={`${[...crumbs].slice(0, i + 1).join('/')}`}>
                {path}
              </Link>
              <Breadcrumb.Divider />
            </Breadcrumb.Section>
          )
        )}
      </Breadcrumb>
    </header>
  );
}
