import React, { createContext, useContext, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Palette } from 'lucide-react'

// Extend window for speech recognition support
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

interface AccessibilityContextType {
  highContrast: boolean
  toggleHighContrast: () => void
  voiceCommandsEnabled: boolean
  toggleVoiceCommands: () => void
  announceMessage: (message: string) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [highContrast, setHighContrast] = useState(false)
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition()
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = false
      recognitionInstance.lang = 'en-US'

      recognitionInstance.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase()
        handleVoiceCommand(command)
      }

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        announceMessage('Voice command error occurred')
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const handleVoiceCommand = (command: string) => {
    if (command.includes('go to dashboard') || command.includes('open dashboard')) {
      window.location.href = '/'
      announceMessage('Navigating to dashboard')
    } else if (command.includes('go to crisis') || command.includes('open crisis room')) {
      window.location.href = '/crisis'
      announceMessage('Navigating to crisis room')
    } else if (command.includes('go to analytics') || command.includes('open analytics')) {
      window.location.href = '/analytics'
      announceMessage('Navigating to analytics')
    } else if (command.includes('go to automation') || command.includes('open automation')) {
      window.location.href = '/automation'
      announceMessage('Navigating to automation')
    } else if (command.includes('high contrast')) {
      toggleHighContrast()
    } else if (command.includes('help')) {
      announceMessage('Available commands: go to dashboard, go to crisis room, go to analytics, go to automation, toggle high contrast')
    }
  }

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev
      document.body.classList.toggle('high-contrast', newValue)
      announceMessage(newValue ? 'High contrast mode enabled' : 'High contrast mode disabled')
      return newValue
    })
  }

  const toggleVoiceCommands = () => {
    if (!recognition) {
      announceMessage('Voice commands not supported in this browser')
      return
    }

    setVoiceCommandsEnabled(prev => {
      const newValue = !prev
      if (newValue) {
        recognition.start()
        announceMessage('Voice commands enabled. Say "help" for available commands')
      } else {
        recognition.stop()
        announceMessage('Voice commands disabled')
      }
      return newValue
    })
  }

  const announceMessage = (message: string) => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        voiceCommandsEnabled,
        toggleVoiceCommands,
        announceMessage,
      }}
    >
      {children}
      <AccessibilityToolbar />
    </AccessibilityContext.Provider>
  )
}

function AccessibilityToolbar() {
  const {
    highContrast,
    toggleHighContrast,
    voiceCommandsEnabled,
    toggleVoiceCommands
  } = useAccessibility()

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2"
      role="toolbar"
      aria-label="Accessibility tools"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={toggleHighContrast}
        aria-label={`${highContrast ? 'Disable' : 'Enable'} high contrast mode`}
        aria-pressed={highContrast}
      >
        <Palette className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only">
          {highContrast ? 'Disable' : 'Enable'} high contrast mode
        </span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleVoiceCommands}
        aria-label={`${voiceCommandsEnabled ? 'Disable' : 'Enable'} voice commands`}
        aria-pressed={voiceCommandsEnabled}
      >
        {voiceCommandsEnabled ? (
          <Mic className="w-4 h-4" aria-hidden="true" />
        ) : (
          <MicOff className="w-4 h-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {voiceCommandsEnabled ? 'Disable' : 'Enable'} voice commands
        </span>
      </Button>
    </div>
  )
}
