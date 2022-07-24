import React from 'react'
import {InfoBox} from '@react-google-maps/api';
function InfoBoxComponent({position}) {
  const onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
  };  
  return (
    <InfoBox onLoad={onLoad} position={position} >
    {(
      <div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
      <div style={{ fontSize: 16, fontColor: `#08233B` }}>
      current
      </div>
      </div>
    )}
    </InfoBox>
  )
}

export default InfoBoxComponent