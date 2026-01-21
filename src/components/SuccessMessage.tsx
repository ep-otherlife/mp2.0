import { useEffect, useState } from 'react'
import './SuccessMessage.css'

type PurchaseData = {
  amount: number
  currency: string
  fiatAmount: number
  transactionId: string
  timestamp: Date
}

type SuccessMessageProps = {
  purchaseData: PurchaseData
}

function SuccessMessage({ purchaseData }: SuccessMessageProps) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
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
    <div className={`success-message-container ${showAnimation ? 'animate' : ''}`}>
      {/* Chat Message Text */}
      <div className="chat-message-text">
        <p>
          ✅ <strong>Great news!</strong> Your purchase of <strong>{purchaseData.amount} {purchaseData.currency}</strong> has been confirmed and is now processing on the Solana blockchain. 
          Your USDC will appear in your wallet within a few minutes.
        </p>
        <p style={{ marginTop: '12px', marginBottom: '0' }}>
          Here are your purchase details:
        </p>
      </div>

      {/* Success Header */}
      <div className="success-header">
        <div className="success-icon-small">
          <svg viewBox="0 0 24 24" className="checkmark-svg-small">
            <circle className="checkmark-circle-small" cx="12" cy="12" r="10" fill="none" />
            <path className="checkmark-check-small" fill="none" d="M6 12l4 4 8-8" />
          </svg>
        </div>
        <div className="success-title-section">
          <h2 className="success-title-small">Order Confirmed!</h2>
          <p className="success-subtitle-small">Your purchase has been successfully processed</p>
        </div>
      </div>

      {/* Purchase Details */}
      <div className="success-details">
        <div className="detail-item">
          <span className="detail-label">Amount</span>
          <span className="detail-value">{purchaseData.amount} {purchaseData.currency}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Total Paid</span>
          <span className="detail-value">${purchaseData.fiatAmount.toFixed(2)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Network</span>
          <span className="detail-value">Solana</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Transaction ID</span>
          <span className="detail-value transaction-id" title={purchaseData.transactionId}>
            {truncateAddress(purchaseData.transactionId)}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date & Time</span>
          <span className="detail-value">{formatDate(purchaseData.timestamp)}</span>
        </div>
      </div>

      {/* Status Badge */}
      <div className="success-status">
        <div className="status-badge-small">
          <span className="status-dot-small"></span>
          <span>Processing on Solana blockchain</span>
        </div>
        <p className="status-text-small">
          Your USDC will appear in your wallet within a few minutes. 
          You can track the transaction on Solana Explorer using the transaction ID above.
        </p>
      </div>
    </div>
  )
}

export default SuccessMessage
