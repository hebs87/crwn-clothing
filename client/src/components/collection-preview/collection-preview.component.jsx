import React from 'react';
import { withRouter } from 'react-router-dom';
// Import CollectionItem
import CollectionItem from '../collection-item/collection-item.component'
// Import styled components
import {
    CollectionPreviewContainer,
    TitleContainer,
    PreviewContainer
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, history, match, routeName }) => (
    <CollectionPreviewContainer>
        <TitleContainer
            onClick={() => history.push(`${match.path}/${routeName}`)}
            className='title'>
            { title.toUpperCase() }
        </TitleContainer>
        <PreviewContainer>
            {items
                // Filter this to show first 4 items
                .filter((item, idx) => idx < 4)
                // Map over the 4 items and display the props
                // We pass the whole item into the map,
                // set its ID as the key and then pass the
                // whole item into the props
                // This allows us to pass the item into
                // the redux dispatch function in the
                // collection-item file, which allows us to
                // pass the whole item into the cart
                .map((item) => (
                <CollectionItem key={item.id} item={item} />
            ))}
        </PreviewContainer>
    </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
