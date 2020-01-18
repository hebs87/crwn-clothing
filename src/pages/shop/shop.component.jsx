import React from 'react';
// Import Route to enable advanced routing
import { Route } from 'react-router-dom';
// Import CollectionOverview
import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
// Import CollectionPage
import CollectionPage from '../collection/collection.component';
// Import convertCollectionSnapshotToMap and firestore to enable
// pulling data from the firestore database
import {
    firestore,
    convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';

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
    // We want to set the value of unsubscribeFromSnapshot
    // to null so that the data is unmounted when the
    // component unmounts
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        // We want to call the firestore.collection and pass
        // in the name of our collection. This gets the
        // 'collections' collection from firebase and stores
        // it in the collectionRef const
        const collectionRef = firestore.collection('collections');
        // Now we want to get the data from it, so we need to
        // use the onSnapshot method. This ensures that when
        // the component runs for the first time or updates,
        // we get the snapshot of whatever data is running
        // at that time.
        // We want to write an async function, so we get the
        // snapshot as the prop and then pass it into the
        // convertCollectionSnapshotToMap function
        collectionRef.onSnapshot(async snapshot => {
            convertCollectionSnapshotToMap(snapshot);
        });
    };

    render() {
        const { match } = this.props;       
        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={ `${match.path}` }
                    component={ CollectionsOverview }
                />
                <Route
                    path={ `${match.path}/:collectionId` }
                    component={ CollectionPage }
                />
            </div>
        )
    }
};

export default ShopPage;
