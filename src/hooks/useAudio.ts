
import { useState } from 'react'

export const useAudio = () => {
  const [soundClick, setSoundClick] = useState<boolean>(false)

  const handleAudio = () => {
    const audio = new Audio('/sounds/button_click.mp3')

    if (soundClick) {
      audio.pause()
      setSoundClick(false)
    } else {
      audio.play()
    }
  }

  return { handleAudio }
}
