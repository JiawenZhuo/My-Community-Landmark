
import { useEffect } from 'react';
import './App.css';
import Map from './component/Map/Map';
function App() {

  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log(position);
  //     // Show a map centered at latitude / longitude.
  //   })
  // },[])

  return (
    <div className="App">
        <Map />
        
    </div>
  );
}

export default App;
