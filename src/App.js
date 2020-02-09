import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import 'semantic-ui-css/semantic.min.css'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/product" component={Product} />
          <Route path="/add-product" component={AddProduct} />
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
