import React, {useEffect, lazy, Suspense} from 'react';
// Import Route to enable advanced routing
import {Route} from 'react-router-dom';
// Import connect to enable passing in mapDispatchToProps
import {connect} from 'react-redux';

// Import fetchCollectionsStart action to allow passing snapshot to props
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';
import Spinner from "../../components/spinner/spinner.component";

// Dynamic imports using lazy
const CollectionsOverviewContainer = lazy(() =>
    import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() =>
    import('../collection/collection.container'));

// This was a class component, but we've now converted it
// to a functional component, as we are using the useEffect()
// Hoop to replace the componentDidMount() lifecycle method.
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
// We need to destructure both match and fetchCollectionsStart
// from our props
const ShopPage = ({fetchCollectionsStart, match}) => {
    // We use the useEffect Hook to behave like a
    // componentDidMount() so that our fetchCollectionsStart
    // function is called when the component first renders
    useEffect(() => {
        // We call fetchCollectionsStart the moment our
        // component mounts, which then pulls in the
        // data from the reducer
        fetchCollectionsStart();
        // If we don't pass in the second argument, the Hook
        // will get called twice. This is because it will be
        // dependent on the parent component (App.js). When
        // App.js renders, it checks the user session and
        // then re-renders if a user is logged in, as the
        // currentUser prop value changes (initially the
        // value us null, but then it changes to the value
        // of the user that is logged in). This means that,
        // on the first render, the ShopPage component will
        // also render, and subsequently its useEffect(),
        // then when it re-renders, the cycle repeats itself.
        // This causes a 'second flicker' in the running app.
        // Passing in the second argument ensures we only
        // listen for the fetchCollectionStart prop, so the
        // useEffect() only re-renders if the value of this
        // prop changes
    }, [fetchCollectionsStart]);

    return (
        <div className='shop-page'>
            <Suspense fallback={<Spinner/>}>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionPageContainer}
                />
            </Suspense>
        </div>
    )
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
