import React, { createContext, useState, useContext } from 'react'

const imageContext = createContext()

export default function ImageProvider({ children }) {
  const [images, setImages] = useState([])

  return (
    <div>imageContext</div>
  )
}
