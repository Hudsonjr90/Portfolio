
import { useState, useEffect } from "react"

export const useResponsiveNavbar = () => {
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1530px)')
        
        const handleMediaChange = (e: MediaQueryListEvent) => {
            if (!e.matches) {
                setShowMenu(false)
            }
        }
        
        mediaQuery.addEventListener('change', handleMediaChange)
        
        return () => mediaQuery.removeEventListener('change', handleMediaChange)
    }, [])

    const handleClickButton = () => {
        setShowMenu(!showMenu)
    }

    const handleLinkClick = () => {
        setShowMenu(false)
    }

    return { handleClickButton, handleLinkClick, showMenu }
}