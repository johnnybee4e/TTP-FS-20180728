import React from 'react';

const GifCard = props => {
  const { images, url } = props.props;
  return (
    <div className="single-gif-container">
      <img
        src={
          images.fixed_height_downsampled.url ||
          images.fixed_height_downsampled.gif_url
        }
        alt={props.props.title}
      />
      <p className="gif-copy-url">Copy URL:</p>{' '}
      <a href={`${url}`} className="gif-url">
        {url}
      </a>
    </div>
  );
};

export default GifCard;
