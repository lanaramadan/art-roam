import React from "react";
import { useState, useEffect } from 'react';

const Image = ({ viewedImages, setViewedImages, bannedCharacteristics, setBannedCharacteristics}) => {
    const baseMuseumApiUrl = "https://api.artic.edu/api/v1/artworks?fields=artist_title,title,image_id,place_of_origin,medium_display,main_reference_number/search?q=monet";
    const baseImageApiUrl = "https://www.artic.edu/iiif/2/"
  
    const [image, setImage] = useState("");
    const [museumJsonData, setMuseumJsonData] = useState(null);
    const [currentImageData, setCurrentImageData] = useState(null);

    const getImageData = async (query) => {
        // calls the museum API + changes what the current image is

        const response = await fetch(query);
        const retreivedJson = await response.json();
        setMuseumJsonData(retreivedJson)

        setCurrentImageData(museumJsonData.data[5])
    }

    const setImageData = () => {
        if (currentImageData) {
            // gets + sets the image link
            const imageLink = `${baseImageApiUrl}${currentImageData.image_id}/full/843,/0/default.jpg`
            setImage(imageLink);

            // add to viewed images
            setViewedImages((viewedImages) => [...viewedImages, [imageLink, currentImageData]]);
        }
    }


    const displayImage = () => {
        // function to call functions that get and display new image
        let query = `${baseMuseumApiUrl}`;
  
        getImageData(query)
        // setImageData()
    };
    useEffect(() => {setImageData();}, [currentImageData]);


    const banCharacteristic = (type, characteristic) => {
        // function to display banned characteristics
        if (!bannedCharacteristics.some(item => item[0] === type && item[1] === characteristic)) {
            setBannedCharacteristics((bannedCharacteristics) => [...bannedCharacteristics, [type, characteristic]])
        }
    };


    return (
        <div>
            <div className="art-description">
                {currentImageData ? 
                    (<>
                    <h2 className='art-title'>{currentImageData.title}</h2>
                    <div className='characteristics'>
                        {/* artist button */}
                        <button type="button" className="button characteristic" onClick={() => banCharacteristic("artist", currentImageData.artist_title)}>
                        Artist: {currentImageData.artist_title}
                        </button>

                        {/* origin button */}
                        <button type="button" className="button characteristic" onClick={() => banCharacteristic("place_of_origin", currentImageData.place_of_origin)}>
                        Country: {currentImageData.place_of_origin}
                        </button>

                        {/* medium button */}
                        <button type="button" className="button characteristic" onClick={() => banCharacteristic("medium_display", currentImageData.medium_display)}>
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

                {/* new button */}
                <button type="button" className="button generate" onClick={() => displayImage()}>
                    🔀 New Art!
                </button>
            </div>

        </div>
    )
}



export default Image;