import { useContext, createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SettingsContext = createContext()

export function SettingsProvider({children}){
  const [isShown, setIsShown] = useState(false)
  const location = useLocation()

  useEffect(_ => {
    if (isShown){
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = 'auto'
    }
  }, [isShown])

  useEffect(_ => {
    setIsShown(false)
  }, [location])

  const toggleSettings = _ => {
    setIsShown(prev => !prev)
  }

  return (
    <SettingsContext.Provider value={{toggleSettings, isShown}}>
      {children}
    </SettingsContext.Provider>
  )
}


export function useSettings(){
  return useContext(SettingsContext)
}
