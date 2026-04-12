import React, { createContext, useState, useContext } from 'react'

const ImageContext = createContext()


export default function ImageProvider({ children }) {
  const [images, setImages] = useState([])

  return (
    <ImageContext.Provider>imageContext</ImageContext.Provider>
  )
}
