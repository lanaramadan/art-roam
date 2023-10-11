import React from "react";
import { useState, useEffect } from 'react';

const Image = ({ viewedImages, setViewedImages }) => {
    const baseMuseumApiUrl = "https://api.artic.edu/api/v1/artworks?fields=artist_title,title,image_id,date_start,date_end,place_of_origin,medium_display,main_reference_number/search?q=monet?";
    const baseImageApiUrl = "https://www.artic.edu/iiif/2/"
  
    const [image, setImage] = useState("");
    const [museumJsonData, setMuseumJsonData] = useState(null);
    const [currentImageData, setCurrentImageData] = useState(null);
  
    const getImage = () => {
      let query = `${baseMuseumApiUrl}`;
  
      const callMuseumAPI = async (query) => {
        // calls the museum API
        const response = await fetch(query);
        const retreivedJson = await response.json();
        setMuseumJsonData(retreivedJson)
  
        setCurrentImageData(museumJsonData.data[2])
  
        // gets the image link
        const imageLink = `${baseImageApiUrl}/${currentImageData.image_id}/full/843,/0/default.jpg`
        setImage(imageLink);
        setViewedImages((viewedImages) => [...viewedImages, [imageLink, currentImageData]])
      }
  
      callMuseumAPI(query)
    };



    return (
        <div>
            <div className="art-description">
                {currentImageData ? 
                    (<>
                    <h2 className='art-title'>{currentImageData.title}</h2>
                    <div className='characteristics'>
                        <button type="button" className="button characteristic" onClick={() => getImage()}>
                        Artist: {currentImageData.artist_title}
                        </button>

                        {/* <button type="button" className="button characteristic" onClick={() => getImage()}>
                        Dates: {currentImageData.date_start}-{currentImageData.date_end}
                        </button> */}

                        <button type="button" className="button characteristic" onClick={() => getImage()}>
                        Country: {currentImageData.place_of_origin}
                        </button>

                        <button type="button" className="button characteristic" onClick={() => getImage()}>
                        Medium: {currentImageData.medium_display}
                        </button>
                    </div>
                    </>)
                    : (
                        <div></div>
                      )}

            </div>


            <div className="image-container">
                <div className="frame"><img src={image} className='main-image'/></div>

                <button type="button" className="button generate" onClick={() => getImage()}>
                    🔀 New Art!
                </button>
            </div>

        </div>
    )
}



export default Image;