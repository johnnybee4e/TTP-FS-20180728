import React from 'react';

const GifCard = (props) => {
    return (
        <div>
            <img src={props.props.images.fixed_height_downsampled.url}  alt={props.props.title}/>
            <p>Copy URL: {props.props.url}</p>
        </div>
    )
}

export default GifCard