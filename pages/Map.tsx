import {OfflineMap} from "offline-map-react";
import {useEffect} from "react";

function Map() {
  const mapInstance = OfflineMap({
    checkpoints: [],
    heatPoints: []
  })

  let events = false

  useEffect(() => {
    if (mapInstance.map && !events) {
      mapInstance.map.on('click', (e: any) => {
        const newCheckpoint = {id: Math.random(), position: (e as any).latlng, text: `teste${Math.random()}`}
        const existsInLocalStorage = localStorage.getItem('map-checkpoints')
        const checkpoints = existsInLocalStorage ? JSON.parse(existsInLocalStorage) : []

        const newCheckpoints = [...checkpoints, newCheckpoint]

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

  return (<div>
    <button onClick={() => mapInstance?.offlineMapControls().saveCurrentMapView()}>Salvar Mapa</button>
    <button onClick={() => mapInstance?.offlineMapControls().deleteCurrentMapView()}>Excluir Mapa</button>

    {mapInstance?.progressSaveMap > 0 && (
      <progress id="file"
                value={Number((mapInstance?.progressSaveMap / mapInstance?.totalLayersToSave) * 100).toFixed(2)}
                max="100">
        {Number((mapInstance?.progressSaveMap / mapInstance?.totalLayersToSave) * 100).toFixed(2)}%
      </progress>
    )}

    {mapInstance.renderMap()}
  </div>)
}

export default Map
