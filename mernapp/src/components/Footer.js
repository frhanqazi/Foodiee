import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-danger text-white d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top mb-0">
      <p
        className="col-md-4 mb-0"
        style={{ textAlign: 'center', margin: 'auto' }}
      >
        You've reached the end of this awesome project !
      </p>
    </footer>
  )
}

export default Footer
