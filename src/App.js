import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Layout from './components/Layout';
import Search from './components/Search';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <Provider>
      <Router>
        <div className="App">
          <Layout>
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/product" component={Product} />
              <Route path="/add-product" component={AddProduct} />
            </Switch>  
          </Layout>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
