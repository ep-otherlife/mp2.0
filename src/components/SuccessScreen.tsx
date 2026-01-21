import { useEffect, useState } from 'react'
import './SuccessScreen.css'

type PurchaseData = {
  amount: number
  currency: string
  fiatAmount: number
  transactionId: string
  timestamp: Date
}

type SuccessScreenProps = {
  purchaseData: PurchaseData
  onBack: () => void
}

function SuccessScreen({ purchaseData, onBack }: SuccessScreenProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Trigger animation after mount
    setTimeout(() => setShowAnimation(true), 100)
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  return (
    <div className="success-container">
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

      {/* Success Content */}
      <div className={`success-content ${showAnimation ? 'animate' : ''}`}>
        {/* Success Icon */}
        <div className="success-icon-container">
          <div className="success-checkmark">
            <svg viewBox="0 0 52 52" className="checkmark-svg">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-message">
          <h1 className="success-title">Order Confirmed!</h1>
          <p className="success-subtitle">Your purchase has been successfully processed</p>
        </div>

        {/* Purchase Details Card */}
        <div className="details-card">
          <div className="details-header">Purchase Details</div>
          
          <div className="detail-row">
            <span className="detail-label">Amount</span>
            <span className="detail-value">{purchaseData.amount} {purchaseData.currency}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Total Paid</span>
            <span className="detail-value">${purchaseData.fiatAmount.toFixed(2)}</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Network</span>
            <span className="detail-value">Solana</span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Transaction ID</span>
            <span className="detail-value transaction-id" title={purchaseData.transactionId}>
              {truncateAddress(purchaseData.transactionId)}
            </span>
          </div>

          <div className="detail-row">
            <span className="detail-label">Date & Time</span>
            <span className="detail-value">{formatDate(purchaseData.timestamp)}</span>
          </div>
        </div>

        {/* Status Message */}
        <div className="status-message">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>Processing on Solana blockchain</span>
          </div>
          <p className="status-text">
            Your USDC will appear in your wallet within a few minutes. 
            You can track the transaction on Solana Explorer using the transaction ID above.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="primary-button" onClick={onBack}>
            Make Another Purchase
          </button>
          <button className="secondary-button">
            View Transaction
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <button className="wallet-button">
          <span className="wallet-icon">💼</span>
          <span>${purchaseData.fiatAmount.toFixed(2)}</span>
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

export default SuccessScreen
