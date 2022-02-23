import React, { useState, useEffect, createRef, useCallback } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

import './Navbar.scss'
import { images, NAV_LINKS } from '../../constants'


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [currentHash, setCurrentHash] = useState(NAV_LINKS[0])

    useEffect(() => {
        if (window.location.hash === '') {
            window.location.hash = currentHash
        } else {
            setCurrentHash(window.location.hash)
        }
    }, [])
    
    const hashChangeHandler = () => {
        setCurrentHash(window.location.hash)
    }

    useEffect(() => {
        window.addEventListener('hashchange', hashChangeHandler)
        return () => {
            window.removeEventListener('hashchange', hashChangeHandler)
        }
    }, [])

    return (
    <nav className="app__navbar">
        <div className="app__navbar-logo">
            <img src={images.logo} alt="logo" />
        </div>
        <ul className="app__navbar-links">
            {NAV_LINKS.map((item, i) => (
                <li key={`link-${item}`} className={`app__flex p-text ${item} ${currentHash === '#'+item ? 'app__navbar-links-active': ''}`}>
                    <div />
                    <a href={`#${item}`}>{item}</a>
                </li>
            ))}
        </ul>
        <div className="app__navbar-menu">
            <HiMenuAlt4 onClick={() => setToggle(true)} />
            {toggle && (
                <motion.div
                whileInView={{ x: [300, 0] }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                >
                    <HiX onClick={() => setToggle(false)} />
                    <ul>
                        {NAV_LINKS.map((item) => (
                            <li key={item}>
                                <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    </nav>
  )
}

export default Navbar