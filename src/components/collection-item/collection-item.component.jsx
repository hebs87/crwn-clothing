import React from 'react';
// Import connect to enable passing state to component
import { connect } from 'react-redux';
// Import addItem action to allow adding item to cart
import { addItem } from '../../redux/cart/cart.actions';
// Import styled components
import {
    CollectionItemContainer,
    CollectionFooterContainer,
    AddButton,
    BackgroundImage,
    NameContainer,
    PriceContainer
} from './collection-item.styles';

// We pass in our item from the collection-preview,
// and also the addItem action and then explicitely
// return our jsx code so that we can also destructure
// the item's props, which enables us to both pass in
// the individual props to the relevant component
// features, and we can also pass in our whole item
// to our cart when we click the ADD TO CART button
const CollectionItem = ({ item, addItem }) => {
    // We need to destructure
    const { name, price, imageUrl } = item;
    return (
        <CollectionItemContainer>
            <BackgroundImage
                className='image'
                style={{
                    backgroundImage: `url(${ imageUrl })`
                }}
            />
            <CollectionFooterContainer>
                <NameContainer>{ name }</NameContainer>
                <PriceContainer>&pound;{ price }</PriceContainer>
            </CollectionFooterContainer>
            <AddButton
                onClick={() => addItem(item)}
                inverted
            >
                Add to cart
            </AddButton>
        </CollectionItemContainer>
    )
};

const mapDispatchToProps = dispatch => ({
    // Form the value of the addItem action,
    // we have a function that gets the item
    // and then dispatches the addItem action
    // and sets the value of its payload to
    // the item itself
    addItem: item => dispatch(addItem(item))
});

// The first connect() argument is null becaused we
// have no mapStateToProps function
export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);
