import * as React from 'react'
import useCounter from '../../modules/use-counter'

const IMAGES = [
  require('./photos/image-1.jpg'),
  require('./photos/image-2.jpg'),
  require('./photos/image-3.jpg'),
  require('./photos/image-4.jpg'),
  require('./photos/image-5.jpg')
]

const PhotoGallery = () => {
  const [counter, $counter] = useCounter(0, { min: 0, max: IMAGES.length - 1 })

  return <div>
    <h1>{counter}</h1>
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: 300,
        justifyContent: 'center',
        overflow: 'hidden',
        width: 500,
        background: 'rgb(240,240,240)'
      }}
    >
      <img src={IMAGES[counter]} style={{ width: 500 }}/>
    </div>
    <button onClick={() => $counter.decrement()} disabled={$counter.isMin()}>Previous</button>
    <button onClick={() => $counter.increment()} disabled={$counter.isMax()}>Next</button>
  </div>
}

export default PhotoGallery