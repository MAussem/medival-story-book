import { Suspense, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Book from '../models/Book'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import HomeInfo from '../components/HomeInfo'

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const adjustBookFromScreenSize = () => {
    let screenScale = null; 
    let screenPosition = [5, 5, -55];
    let bookRotation = [1.1, 4.7, 0];

    if (window.innerWidth <= 768) {
      screenScale = [0.9, 0.9, 0.9];
      
    } else {
      screenScale = [1, 1, 1];
  }
  return [screenScale, screenPosition, bookRotation];
}

const [bookScale, bookPosition, bookRotation] = adjustBookFromScreenSize();
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage}/>}
      </div>
      <Canvas className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={{near: 0.1, far: 1000}}>
        <Suspense fallback={<Loader />}>
          <directionalLight  position={[1,10,1]} intensity={3} />
          <ambientLight intensity={0.5} />
          {/* <pointLight /> */}
          {/* <spotLight /> */}
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000" intensity={1} />
          <Bird />
          <Sky isRotating={isRotating}/>
          <Book 
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={bookPosition}
            rotation={[0.4, 4.7077, 0]}
            scale={bookScale}
          />
        </Suspense>
      </Canvas>

    </section>
  )
}

export default Home