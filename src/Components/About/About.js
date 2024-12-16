import React from 'react'
import Header from '../Header/Header'

const About = () => {
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
       <h1 className='text-success'>About Page</h1>
    </div>
    </>
  )
}

export default About
