// Import connect to give us access to the selectors and state
import { connect } from 'react-redux';
// Import compose to allow us to curry our connect and components
import { compose } from 'redux';
// Import createStructuredSelector to allow mapStateToProps
import { createStructuredSelector } from 'reselect';
// Import relevant selectors that we need
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
// Import WithSpinner HOC
import WithSpinner from '../../components/with-spinner/with-spinner.component';
// Import CollectionsPage component
import CollectionPage from './collection.component';

// The mapStateToProps sets our isLoading state
// to the selectIsCollectionsLoaded selector
// This allows us to set pass it into our WithSpinner
// HOC component, to then make our spinner work
// The prop needs to have the same name as the prop
// that the HOC is expecting (isLoading in this case)
// As we want to invert the value of the loading state,
// we can actually pass in a function that passes in
// the state to the selector - this memoizes the selector
const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

// We could write the below as
// connect(mapStateToProps)(WithSpinner(CollectionsPage))
// However, this can get confusing if we have more and
// more HOCs that we are wrapping our components with
// To avoid that, we can use compose to pass in the
// relevant HOCs, and then we pass in the component
// that we ultimately want to wrap - in this case, we
// pass in connect and WithSpinner to the compose and
// then we pass CollectionPage into the whole thing
const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;
