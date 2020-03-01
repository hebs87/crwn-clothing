// Import connect to give us access to the selectors and state
import { connect } from 'react-redux';
// Import compose to allow us to curry our connect and components
import { compose } from 'redux';
// Import createStructuredSelector to allow mapStateToProps
import { createStructuredSelector } from 'reselect';
// Import relevant selectors that we need
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
// Import WithSpinner HOC
import WithSpinner from '../with-spinner/with-spinner.component';
// Import CollectionsOverview component
import CollectionsOverview from './collection-overview.component';

// The mapStateToProps sets our isLoading state
// to the selectIsCollectionFetching selector
// This allows us to set pass it into our WithSpinner
// HOC component, to then make our spinner work
// The prop needs to have the same name as the prop
// that the HOC is expecting (isLoading in this case)
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// We could write the below as
// connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// However, this can get confusing if we have more and
// more HOCs that we are wrapping our components with
// To avoid that, we can use compose to pass in the
// relevant HOCs, and then we pass in the component
// that we ultimately want to wrap - in this case, we
// pass in connect and WithSpinner to the compose and
// then we pass CollectionOverview into the whole thing
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
