import React from 'react';
import './App.css';
// Import HomePage Component
import HomePage from './pages/homepage/homepage.component';
// Import ShopPage Component
import ShopPage from './pages/shop/shop.component'
// Import Switch and Route to enable routing
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
        <Switch>
            <Route exact path='/' component={ HomePage } />
            <Route path='/shop' component={ ShopPage } />
        </Switch>
    </div>
  );
}

export default App;
