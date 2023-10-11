import './App.css';
import { useState } from 'react'
import Image from './components/image'
import Gallery from './components/Gallery'
import Banned from './components/Banned'





const App = () => {
  const [viewedImages, setViewedImages] = useState([]);
  const [bannedCharacteristics, setBannedCharacteristics] = useState([]);


  return (
    <div className="App">
    <div className="everything">
      <div className="left-content">
          <h3 className='subtitle'>Your Gallery</h3>
          <div className="gallery">
            <Gallery viewedImages={viewedImages} />
          </div>
      </div>


      <div className="center-content">
        <div className="header">
          <h1 className='title'>Art Roam 🖼️</h1>
          <h2 className='slogan'>Discover Art, One Click at a Time!</h2>
        </div>

        <div className="image-display"><div className="image"><Image viewedImages={viewedImages} setViewedImages={setViewedImages} bannedCharacteristics={bannedCharacteristics} setBannedCharacteristics={setBannedCharacteristics}/></div></div>
      </div>


      <div className="right-content">
          <h3 className='subtitle'>Ban List</h3>
          <div className="banned">
            <Banned bannedCharacteristics={bannedCharacteristics} setBannedCharacteristics={setBannedCharacteristics}/>
          </div>
      </div>
      
    
    </div>  
    </div>
  )
}

export default App