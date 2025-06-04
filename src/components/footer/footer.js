import React from 'react'
import "./footer.css"
import logo from './logo-transparent.png'

function Footer() {
  return (
    <div className='footer'>

        <div className='row footer_row'>
            <div className='col_12 col-12'>
                <h2>Disclaimer: </h2>
                <p>As an Amazon Associate, I earn from qualifying purchases. This means that if you click on a link and make a purchase, I may earn a small commission at no extra cost to you.</p>
                <h1>Don’t miss out <br /><br /> shop the best deals now!</h1>
            </div>
            </div>

            <div className='copyright row text-light' Style="background-color: #2D2727;">
            <div className='col-lg-6 text-center'>
                <img src={logo} alt='' className="mx-auto d-block" width="150px"  />
            </div>

            <div className='col_right_copyright col-lg-6'>
            <p className='text-center p-1'>Hunt Amazon FInds © 2022</p>
            </div>
        </div>

    </div>
  )
}

export default Footer