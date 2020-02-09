import React from 'react';
// Import Route to enable advanced routing
import { Route } from 'react-router-dom';
// Import createStructuredSelector
import { createStructuredSelector } from 'reselect';
// Import connect to enable passing in mapDispatchToProps
import { connect } from 'react-redux';

// Import fetchCollectionsStartAsync action to allow passing snapshot to props
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// Import selectIsCollectionFetching to pull in isFetching property
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';

// Import WithSpinner HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';

// Import CollectionOverview
import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
// Import CollectionPage
import CollectionPage from '../collection/collection.component';

// After creating and importing our WithSpinner HOC,
// we want to wrap both the CollectionsOverview
// and CollectionPage components with our HOC to
// enable them to have access to the isLoading prop
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// This needs to be a class based component, as we want
// to pull the shop data from firebase and store it as
// the component's state.
// As the ShopPage is rendered with the route in App.js,
// match is one of its props that ShopPage will have access
// to. match holds the path that is being rendered, so if
// we destructure it from our props, then pass match.path
// into the Route path as a string inerpolated expression,
// it will ensure the /shop route (exact match) takes us to
// the CollectionOverview component.
// In the second route, we pass `${match.path}/:collectionId`
// into the path. This gets the match.path, which is /shop
// and adds the string value of the relevant collectionId
// to the url (hats, jackets, etc.) and then renders the
// CollectionPage component
class ShopPage extends React.Component {
    componentDidMount() {
        // We need to destructure fetchCollectionsStartAsync
        // from our props
        const { fetchCollectionsStartAsync } = this.props;
        // We then call it the moment our component mounts,
        // which then pulls in the data from the reducer
        fetchCollectionsStartAsync();
    };

    render() {
        // Instead of pulling in the loading state
        // (what we did initially), we now need to
        // destructure the isCollectionFetching from
        // our props, and set that as the isLoading
        // state instead
        const { match, isCollectionFetching } = this.props;

        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={ `${match.path}` }
                    render={props =>(
                        <CollectionsOverviewWithSpinner
                            isLoading={ isCollectionFetching }
                            { ...props }
                        />
                    )}
                />
                <Route
                    path={ `${match.path}/:collectionId` }
                    render={props => (
                        <CollectionPageWithSpinner
                            isLoading={ isCollectionFetching }
                            { ...props }
                        />
                    )}
                />
            </div>
        )
    }
};

// The mapStateToProps sets our isCollectionFetching
// state to the selectIsCollectionFetching selector
// This allows us to set our isFetching state within
// the component, to then make our spinner work
const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching
});

// The mapDispatchToProps uses a dispatch function which
// dispatched the fetchCollectionStartAsync method
// as the fetchCollectionStartAsync value 
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () =>
        dispatch(fetchCollectionsStartAsync())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShopPage);
