import {OfflineMap} from "offline-map-react";
import {useEffect} from "react";

function Map() {
  const mapInstance = OfflineMap({
    checkpoints: [],
    heatPoints: [...JSON.parse(localStorage.getItem('map-checkpoints')!)].map((c, index) => [Number(c?.position.lat), Number(c?.position.lng), 1])
  })
  
  let events = false

  useEffect(() => {
    if (mapInstance.map && !events) {
      mapInstance.map.on('click', (e: any) => {
        const newCheckpoint = {id: Math.random(), position: (e as any).latlng, text: `teste${Math.random()}`}
        const newCheckpoints = [...JSON.parse(localStorage.getItem('map-checkpoints')!), newCheckpoint]

        mapInstance.setHeatPoints(newCheckpoints.map((c, index) => [Number(c?.position.lat), Number(c?.position.lng), 1]))

        localStorage.setItem('map-checkpoints', JSON.stringify(newCheckpoints))
      })

      events = true
    }
  }, [mapInstance.map])

  useEffect(() => {
    if (mapInstance.userPosition) {
      mapInstance.setHeatPoints([mapInstance.userPosition.lat, mapInstance.userPosition.lng, 1])
    }
  }, [mapInstance.userPosition])

  return (mapInstance.renderMap())
}

export default Map
