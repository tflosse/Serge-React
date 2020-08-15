import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import './Layout.css'


export default function Layout(props) {

    return (
        <div className="Layout">  
            <Nav />
            <div className="Main-Container">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
