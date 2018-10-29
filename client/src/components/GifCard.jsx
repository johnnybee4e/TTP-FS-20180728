import React from 'react';

const GifCard = (props) => {
    const { images, url } = props.props;
    return (
        <div>
            <img src={images.fixed_height_downsampled.url}  alt={props.props.title}/>
            <p>Copy URL: {url}</p>
        </div>
    )
}

export default GifCard