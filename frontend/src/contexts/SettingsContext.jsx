import { useContext, createContext, useState, useEffect } from "react";

const SettingsContext = createContext()

export function SettingsProvider({children}){
  const [isShown, setIsShown] = useState(false)

  useEffect(_ => {
    if (isShown){
      document.body.style.overflow = 'hidden'
    }
    else{
      document.body.style.overflow = 'auto'
    }
  }, [isShown])

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
