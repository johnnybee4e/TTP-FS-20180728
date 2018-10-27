import React from 'react';

const GifCard = (props) => {
    console.log(props.props)
    return (
        <div>
            <img src={props.props.images.fixed_height_downsampled.url}  alt={props.props.title}/>
            <p>{props.props.title}</p>
        </div>
    )
}

export default GifCard