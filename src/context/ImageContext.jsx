import { createContext, useState, useContext } from 'react'

const ImageContext = createContext()

export default function ImageProvider({ children }) {
  const [images, setImages] = useState([])

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>

  )

}

export function useImages() {
  return useContext(ImageContext)
}
