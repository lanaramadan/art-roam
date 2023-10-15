import React from "react";
import { useState, useEffect } from 'react';

const Image = ({ viewedImages, setViewedImages, bannedCharacteristics, setBannedCharacteristics}) => {
    const baseApiUrl = "https://iiif.harvardartmuseums.org/manifests/object/"
  
    const [image, setImage] = useState("");
    const [currentImageData, setCurrentImageData] = useState(null);
    const [currentImageDetails, setCurrentImageDetails] = useState({artist: "", title: "", date: "", culture: ""});


    const getImageData = async (query) => {
        try {
            // calls the API + changes what the currentImageData is
            const response = await fetch(query);
        
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
      
            const retreivedJson = await response.json();

            if (retreivedJson.thumbnail["@id"] == "/full/!170,170/0/default.jpg" || !retreivedJson.thumbnail["@id"] || !retreivedJson.thumbnail) {
                throw new Error('Thumbnail data is missing or broken link.');
            }
      
          console.log(retreivedJson);
          setCurrentImageData(retreivedJson);
        }

        catch (error) {
            console.error(`Error fetching or processing data: ${error.message}`);
        }

      };

    const setImageData = () => {
        if (currentImageData) {
            // sets the image link from the new currentImageData
            const newDetails = {
                artist: currentImageData.metadata[4].value[0].split(",")[0],
                title: currentImageData.label,
                date: "Date: " + currentImageData.metadata[0].value,
                culture: "Culture: " + currentImageData.metadata[4].value[0].split(", ")[1]
              };

            const imageLink = currentImageData.thumbnail["@id"]
            setImage(imageLink);
            setCurrentImageDetails(newDetails);

            // add the current image to viewed images
            // setViewedImages((viewedImages) => [...viewedImages, [imageLink, currentImageDetails.title, currentImageDetails.artist]]);
            setViewedImages((viewedImages) => [...viewedImages, {title: currentImageDetails.title, artist: currentImageDetails.artist, imageSrc: imageLink,}]);

        }
    }


    const displayImage = () => {
        // function to call functions that get and display new image
        const randomObjectID = Math.floor(Math.random() * (299999 - 200000 + 1)) + 200000;
        let query = `${baseApiUrl}${randomObjectID}`;
  
        getImageData(query)
    };

    // Use useEffect to call displayImage when the component mounts
    useEffect(() => {
        displayImage();
    }, []);


    // when currentImageData changes, setImageData() is called
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
                    <h2 className='art-title'>{currentImageDetails.title}</h2>
                    <div className='characteristics'>
                        {/* artist button */}
                        <button type="button" className="button characteristic" onClick={() => banCharacteristic("artist", currentImageDetails.artist)}>
                        {currentImageDetails.artist}
                        </button>

                        {/* culture button */}
                        <button type="button" className="button characteristic" onClick={() => banCharacteristic("culture", currentImageDetails.culture)}>
                        {currentImageDetails.culture}
                        </button>

                        {/* medium button */}
                        <button type="button" className="button characteristic" onClick={() => banCharacteristic("date", currentImageDetails.date)}>
                        {currentImageDetails.date}
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