import React from 'react'

import { NAV_LINKS } from '../constants'

const NavigationDots = ({ active }) => {
  return (
    <div className='app__navigation'>
        {NAV_LINKS.map((item, index) => (
            <a
                key={item + index}
                href={`#${item}`} 
                className="app__navigation-dot"
                style={active === item ? { backgroundColor: '#313BAC'} : {} }
            />
        ))}
    </div>
  )
}

export default NavigationDots