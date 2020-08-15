import React from 'react';
import './Layout.css'

export default function Footer() {
    return (
        <div>
            <p className="Footer">© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
    )
}
