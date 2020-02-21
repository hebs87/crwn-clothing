import React from 'react';
// Import Route to enable advanced routing
import { Route } from 'react-router-dom';
// Import connect to enable passing in mapDispatchToProps
import { connect } from 'react-redux';

// Import fetchCollectionsStart action to allow passing snapshot to props
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

// Import CollectionsOverviewContainer
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
// Import CollectionPageContainer
import CollectionPageContainer from '../collection/collection.container';


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
        // We need to destructure fetchCollectionsStart
        // from our props
        const { fetchCollectionsStart } = this.props;
        // We then call it the moment our component mounts,
        // which then pulls in the data from the reducer
        fetchCollectionsStart();
    };

    render() {
        // We destructure the match from our props
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={ `${match.path}` }
                    component={ CollectionsOverviewContainer }
                />
                <Route
                    path={ `${match.path}/:collectionId` }
                    component={ CollectionPageContainer }
                />
            </div>
        )
    }
};

// The mapDispatchToProps uses a dispatch function which
// dispatched the fetchCollectionStartAsync method
// as the fetchCollectionStartAsync value 
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () =>
        dispatch(fetchCollectionsStart())
});

export default connect(
    null,
    mapDispatchToProps
)(ShopPage);
