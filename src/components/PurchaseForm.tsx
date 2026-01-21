import { useState, useEffect } from 'react'
import './PurchaseForm.css'

type PurchaseData = {
  amount: number
  currency: string
  fiatAmount: number
  transactionId: string
  timestamp: Date
}

type PurchaseFormProps = {
  onPurchaseComplete: (data: PurchaseData) => void
  isProcessing?: boolean
}

const QUICK_AMOUNTS = [67, 100, 1000]
const USDC_TO_USD_RATE = 0.9998 // Approximate rate

function PurchaseForm({ onPurchaseComplete, isProcessing: externalProcessing }: PurchaseFormProps) {
  const [amount, setAmount] = useState(100)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const processing = externalProcessing || isProcessing

  const fiatAmount = amount * USDC_TO_USD_RATE

  const handleAmountChange = (newAmount: number) => {
    if (!processing) {
      setAmount(newAmount)
    }
  }

  const handleBuy = async () => {
    setIsProcessing(true)
    
    // Simulate API call to process purchase
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate a mock transaction ID
    const transactionId = `0x${Math.random().toString(16).substr(2, 64)}`
    
    const purchaseData: PurchaseData = {
      amount,
      currency: 'USDC',
      fiatAmount: fiatAmount,
      transactionId,
      timestamp: new Date()
    }
    
    onPurchaseComplete(purchaseData)
  }

  return (
    <div className="purchase-form-inline">
      <div className="purchase-card">
        <div className="card-header">Enter an amount</div>
        
        <div className="amount-display">
          <div className="crypto-amount">{amount} USDC</div>
          <div className="fiat-amount">
            ${fiatAmount.toFixed(2)}
            <span className="exchange-icon">⇅</span>
          </div>
        </div>

        <div className="currency-selector">
          <button className="currency-button">
            <div className="currency-logo">$</div>
            <span>USDC</span>
          </button>
        </div>

        <div className="quick-amounts">
          {QUICK_AMOUNTS.map((quickAmount) => (
            <button
              key={quickAmount}
              className={`quick-amount-btn ${amount === quickAmount ? 'active' : ''}`}
              onClick={() => handleAmountChange(quickAmount)}
              disabled={processing}
            >
              ${quickAmount}
            </button>
          ))}
        </div>

        <button
          className="buy-button"
          onClick={handleBuy}
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Buy'}
        </button>
      </div>

      {/* Instructional Text */}
      <div className="instruction-text">
        I've provided a form above for you to buy USDC on the Solana blockchain. 
        Please review the details and proceed with the form to complete your purchase. 
        If you want a different amount or need help, let me know!
      </div>
    </div>
  )
}

export default PurchaseForm
