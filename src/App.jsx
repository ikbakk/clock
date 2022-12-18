import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timeLeft, seTtimeLeft] = useState(1500)
  const [timingType, setTimingtype] = useState('SESSION')

  const [play, setPlay] = useState(false)

  const timeout = setTimeout(() => {
    if (timeLeft && play) {
      seTtimeLeft(timeLeft - 1)
    }
  }, 1000)

  const handleBreakIncrease = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1)
    }
  }

  const handleBreakDecrease = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1)
    }
  }

  const handleSessionIncrease = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1)
      seTtimeLeft(timeLeft + 60)
    }
  }

  const handleSessionDecrease = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1)
      seTtimeLeft(timeLeft - 60)
    }
  }

  const handleReset = () => {
    clearTimeout(timeout)
    setPlay(false)
    seTtimeLeft(1500)
    setBreakLength(5)
    setSessionLength(25)
    setTimingtype('SESSION')
    const audio = document.getElementById('beep')
    audio.pause()
    audio.currentTime = 0
  }

  const handlePlay = () => {
    clearTimeout(timeout)
    setPlay(!play)
  }

  const resetTimer = () => {
    const audio = document.getElementById('beep')
    if (!timeLeft && timingType === 'SESSION') {
      seTtimeLeft(breakLength * 60)
      setTimingtype('BREAK')
      audio.play()
    }
    if (!timeLeft && timingType === 'BREAK') {
      seTtimeLeft(sessionLength * 60)
      setTimingtype('SESSION')
      audio.pause()
      audio.currentTime = 0
    }
  }

  const clock = () => {
    if (play) {
      timeout
      resetTimer()
    } else {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    clock()
  }, [play, timeLeft, timeout])

  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft - minutes * 60
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
    return `${formattedMinutes}:${formattedSeconds}`
  }

  const title = timingType === 'SESSION' ? 'Session' : 'Break'

  return (
    <div className='bg-black h-screen w-screen flex justify-center items-center'>
      <div className='hero-content outline outline-2 outline white rounded-md flex flex-col space-y-10'>
        <h2 className='text-7xl'>25 + 5 Clock</h2>
        <h1>
          Run test in this app somehow not working, but in
          <a
            className='text-cyan-800'
            href='https://codepen.io/kolor-gurita/pen/PoBYvgZ'>
            {' '}
            Codepen
          </a>{' '}
          it is working
        </h1>
        <div className='space-y-7 outline-white p-2'>
          <div className='flex flex-col space-y-4'>
            <h3 className='text-3xl' id='break-label'>
              Break Length
            </h3>
            <div className='space-x-4 flex flex-row justify-center items-center'>
              <button
                className='btn'
                disabled={play}
                onClick={handleBreakIncrease}
                id='break-increment'>
                +
              </button>
              <div className='text-3xl' id='break-length'>
                {breakLength}
              </div>
              <button
                className='btn'
                disabled={play}
                onClick={handleBreakDecrease}
                id='break-decrement'>
                -
              </button>
            </div>
          </div>
          <div className='flex space-y-3 flex-col justify-center items-center'>
            <h3 className='text-xl' id='session-label'>
              Session Length
            </h3>
            <div className='space-x-4 flex flex-row justify-center items-center'>
              <button
                className='btn'
                disabled={play}
                onClick={handleSessionIncrease}
                id='session-increment'>
                +
              </button>
              <div className='text-3xl' id='session-length'>
                {sessionLength}
              </div>
              <button
                className='btn'
                disabled={play}
                onClick={handleSessionDecrease}
                id='session-decrement'>
                -
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-4 justify-center p-4'>
          <div className='ml-3'>
            <h2 className='text-2xl' id='timer-label'>
              {title}
            </h2>
            <h3 className='text-4xl' id='time-left'>
              {timeFormatter()}
            </h3>
          </div>
          <button className='btn' onClick={handlePlay} id='start_stop'>
            Start/Stop
          </button>
          <button className='btn btn-outline' onClick={handleReset} id='reset'>
            Reset
          </button>
        </div>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      />
    </div>
  )
}

export default App
