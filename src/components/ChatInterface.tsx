import { useState, useRef, useEffect } from 'react'
import PurchaseForm from './PurchaseForm'
import SuccessMessage from './SuccessMessage'
import './ChatInterface.css'

type PurchaseData = {
  amount: number
  currency: string
  fiatAmount: number
  transactionId: string
  timestamp: Date
}

type Message = {
  id: string
  type: 'form' | 'success'
  purchaseData?: PurchaseData
}

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'form' }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handlePurchaseComplete = (data: PurchaseData) => {
    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), type: 'success', purchaseData: data }
      ])
      setIsProcessing(false)
    }, 2000)
  }

  return (
    <div className="chat-interface-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-time">9:41</div>
        <div className="status-center">
          <span className="status-logo">●</span>
          <span className="status-icon">◻</span>
          <span className="status-app-name">MoonPay IQ</span>
        </div>
        <div className="status-icons">
          <span className="signal-icon">📶</span>
          <span className="wifi-icon">📶</span>
          <span className="battery-icon">🔋</span>
          <span className="menu-icon">⋯</span>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="chat-message-wrapper">
            {message.type === 'form' ? (
              <div className="message-bubble assistant-message">
                <div className="message-content">
                  <PurchaseForm 
                    onPurchaseComplete={handlePurchaseComplete}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            ) : (
              <div className="message-bubble assistant-message">
                <div className="message-content">
                  <SuccessMessage purchaseData={message.purchaseData!} />
                </div>
              </div>
            )}
          </div>
        ))}
        {isProcessing && (
          <div className="chat-message-wrapper">
            <div className="message-bubble assistant-message">
              <div className="processing-indicator">
                <span className="processing-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
                Processing your purchase
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <button className="wallet-button">
          <span className="wallet-icon">💼</span>
          <span>
            ${messages
              .filter(m => m.type === 'success' && m.purchaseData)
              .reduce((sum, m) => sum + (m.purchaseData?.fiatAmount || 0), 0)
              .toFixed(2)}
          </span>
        </button>
        <button className="action-button">
          <span className="arrow-icon">↑</span>
        </button>
      </div>

      {/* Home Indicator */}
      <div className="home-indicator"></div>
    </div>
  )
}

export default ChatInterface
