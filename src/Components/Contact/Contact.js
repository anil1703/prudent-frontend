import React from 'react'
import Header from '../Header/Header'

const Contact = () => {
  return (
    <>
    <Header/>
    <div style={{
        height:"80vh",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        justifyContent:"center"
    }}>
        <h1>Get in Touch</h1>
        <h2 className='text-success'>Contact Page</h2>
    </div>
    </>
  )
}

export default Contact
