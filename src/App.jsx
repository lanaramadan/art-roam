import './App.css';
import { useState } from 'react'


const App = () => {
  const baseMuseumApiUrl = "https://api.artic.edu/api/v1/artworks?fields=artist_title,title,image_id,date_start,date_end,place_of_origin,medium_display,main_reference_number/search?q=monet?";
  const baseImageApiUrl = "https://www.artic.edu/iiif/2/"

  const [image, setImage] = useState("");
  const [museumJsonData, setMuseumJsonData] = useState(null);
  const [imageLink, setImageLink] = useState(null);

  const getImage = () => {
    let query = `${baseMuseumApiUrl}`;

    const callMuseumAPI = async (query) => {
      // calls the museum API
      const response = await fetch(query);
      const retreivedJson = await response.json();
      setMuseumJsonData(retreivedJson)
      
      // gets the image link
      const imageLink = `${baseImageApiUrl}/${museumJsonData.data[3].image_id}/full/843,/0/default.jpg`
      setImage(imageLink);
    }

    callMuseumAPI(query)
  };


  return (
    <div className="App">
      <img src= {image} />
      <button type="button" className="button submit" onClick={() => getImage()}>
        Click me!
      </button>
    </div>
  )
}

export default App