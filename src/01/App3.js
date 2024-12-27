import logo from './logo.svg';
import './App.css';
import { NavermapsProvider } from 'react-naver-maps';
import { Container as MapDiv} from 'react-naver-maps'
import MyMap from './MyMap';
import { use, useState } from 'react';

function App() {
  const [area , setArea] = useState(null) ;
  return (
    <NavermapsProvider
      ncpClientId='t6j7759phf'
    >
      <MapDiv
        style={{
          width: '80%',
          height: '400px',
        }}
      >
        <MyMap area={area} />
      </MapDiv>
      <div>
    <button 
          onClick={(e) => {
            e.preventDefault()
            setArea('busan') ;
          }}
        >
          부산으로 panTo
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault()
            setArea('jeju') ;
          }}
        >
          제주주으로 panTo
        </button>
        </div>
    </NavermapsProvider>
  );
}

export default App;
