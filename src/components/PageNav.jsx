import React from 'react'
import { Link } from "react-router-dom"
import Logo from './Logo'
import styles from './PageNav.module.css'

const PageNav = () => {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li><Link to='/product'>Product</Link></li>
                <li><Link to='/pricing'>Pricing</Link></li>
                <li><Link to='/login' className={styles.ctaLink} >Login</Link></li>
            </ul>
        </nav>
    )
}

export default PageNav