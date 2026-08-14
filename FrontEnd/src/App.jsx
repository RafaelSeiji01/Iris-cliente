import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Header from './components/Header'



function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Fica visível por 1 segundo, depois inicia a transição suave
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1000);

    // 2. Remove completamente do DOM após o fade-out de 600ms
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);
  

  return (
    <div>
      {showSplash && <SplashScreen isFading={isFading} />}
      <Home />
    </div>
  )
}

export default App
