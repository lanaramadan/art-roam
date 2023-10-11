import React from "react";
import { useState, useEffect } from 'react';


const Gallery = ({ viewedImages }) => {
    return (
        <div className="gallery-container">
            {viewedImages && viewedImages.length > 0 ? (
                viewedImages.map((image, index) => (
                <li>
                    <h4 className="viewed-image-title">{image[1].title} by {image[1].artist_title}</h4>
                    <img
                    className="viewed-image"
                    src={image[0]}
                    />
                </li>
                ))
            ) : (
                <div>
                <h3 className="none-title">You haven't viewed anything yet!</h3>
                </div>
            )}
        </div>
    )
};


export default Gallery;
