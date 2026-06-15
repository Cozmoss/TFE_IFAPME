import React, { createContext, useState, useContext } from 'react'


export default function ImageProvider({ children }) {
  const [images, setImages] = useState([])

  return (
    <ImageProvider>imageContext</ImageProvider>
  )
}
