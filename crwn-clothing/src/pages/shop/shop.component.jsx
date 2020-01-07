import React from 'react';
// Import Route to enable advanced routing
import { Route } from 'react-router-dom';
// Import CollectionOverview
import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
// Import CategoryPage
import CategoryPage from '../category/category.component';

// As the ShopPage is rendered with the route in App.js,
// match is one of its props that ShopPage will have access
// to. match holds the path that is being rendered, so if
// we destructure it from our props, then pass match.path
// in to the Route path as a string inerpolated expression,
// it will ensure the /shop route (exact match) takes us to
// the CollectionOverview component.
// In the second route, we pass `${match.path}/:categoryId`
// into the path. This gets the match.path, which is /shop
// and adds the string value of the relevant categoryId
// to the url (hats, jackets, etc.) and then renders the
// CategoryPage component
const ShopPage = ({ match }) => (
    <div className='shop-page'>
        <Route
            exact
            path={ `${match.path}` }
            component={ CollectionsOverview }
        />
        <Route
            path={ `${match.path}/:categoryId` }
            component={ CategoryPage }
        />
    </div>
);

export default ShopPage;
