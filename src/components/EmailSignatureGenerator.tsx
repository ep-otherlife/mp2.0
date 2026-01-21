import { useState } from 'react'
import './EmailSignatureGenerator.css'

interface SignatureData {
  // Basic Information
  name: string
  title: string
  company: string
  email: string
  
  // Contact Information
  phone: string
  website: string
  address: string
  
  // Social Media
  linkedin: string
  twitter: string
  
  // Optional Fields
  pronouns: string
  ctaLabel: string
  ctaUrl: string
  disclaimer: string
  
  // Images
  logoUrl: string
  headshotUrl: string
}

interface OptionalFields {
  showAddress: boolean
  showPronouns: boolean
  showLinkedIn: boolean
  showTwitter: boolean
  showCTA: boolean
  showDisclaimer: boolean
  showHeadshot: boolean
}

export default function EmailSignatureGenerator() {
  const [data, setData] = useState<SignatureData>({
    // Basic Information
    name: '',
    title: '',
    company: '',
    email: '',
    
    // Contact Information
    phone: '',
    website: '',
    address: '',
    
    // Social Media
    linkedin: '',
    twitter: '',
    
    // Optional Fields
    pronouns: '',
    ctaLabel: '',
    ctaUrl: '',
    disclaimer: '',
    
    // Images
    logoUrl: 'https://via.placeholder.com/150x40/d4a574/ffffff?text=Your+Logo',
    headshotUrl: ''
  })
  
  const [optionalFields, setOptionalFields] = useState<OptionalFields>({
    showAddress: false,
    showPronouns: false,
    showLinkedIn: false,
    showTwitter: false,
    showCTA: false,
    showDisclaimer: false,
    showHeadshot: false
  })
  
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    basic: true,
    contact: true,
    social: false,
    images: false,
    optional: false
  })
  
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleInputChange = (field: keyof SignatureData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const clearField = (field: keyof SignatureData) => {
    setData(prev => ({ ...prev, [field]: '' }))
  }
  
  const toggleOptionalField = (field: keyof OptionalFields) => {
    setOptionalFields(prev => ({ ...prev, [field]: !prev[field] }))
  }
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const escapeHtml = (text: string) => {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, m => map[m])
  }

  const generateSignatureHTML = () => {
    const textColor = isDarkMode ? '#e5e5e5' : '#333333'
    const mutedColor = isDarkMode ? '#a0a0a0' : '#666666'
    const linkColor = isDarkMode ? '#d4a574' : '#b8865c'
    const nameColor = isDarkMode ? '#ffffff' : '#1a1a1a'
    
    const name = escapeHtml(data.name || 'Your Name')
    const title = escapeHtml(data.title)
    const company = escapeHtml(data.company)
    const email = escapeHtml(data.email)
    const phone = escapeHtml(data.phone)
    const website = escapeHtml(data.website)
    const address = escapeHtml(data.address)
    const pronouns = escapeHtml(data.pronouns)
    const ctaLabel = escapeHtml(data.ctaLabel)
    const ctaUrl = escapeHtml(data.ctaUrl)
    const disclaimer = escapeHtml(data.disclaimer)
    
    const linkedinHandle = data.linkedin.replace(/^.*linkedin\.com\/in\//, '').replace(/\/.*$/, '').replace(/^@/, '')
    const linkedinUrl = linkedinHandle ? `https://linkedin.com/in/${linkedinHandle}` : ''
    const twitterHandle = data.twitter.replace(/^@?/, '')
    const twitterUrl = twitterHandle ? `https://twitter.com/${twitterHandle}` : ''
    const websiteUrl = website || '#'
    const logoUrl = data.logoUrl || 'https://via.placeholder.com/150x40/d4a574/ffffff?text=Your+Logo'
    
    const contactItems: string[] = []
    if (data.phone) contactItems.push(`<a href="tel:${phone.replace(/\s/g, '')}" style="color: ${linkColor}; text-decoration: none;">${phone}</a>`)
    if (data.email) contactItems.push(`<a href="mailto:${email}" style="color: ${linkColor}; text-decoration: none;">${email}</a>`)
    if (optionalFields.showLinkedIn && linkedinUrl) contactItems.push(`<a href="${linkedinUrl}" style="color: ${linkColor}; text-decoration: none;">LinkedIn</a>`)
    if (optionalFields.showTwitter && twitterUrl) contactItems.push(`<a href="${twitterUrl}" style="color: ${linkColor}; text-decoration: none;">@${escapeHtml(twitterHandle)}</a>`)
    
    const hasContact = contactItems.length > 0
    const contactSeparator = ' <span style="margin: 0 6px; color: ' + mutedColor + ';">•</span> '
    
    let html = `<!-- Email Signature -->
<table cellpadding="0" cellspacing="0" border="0" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.6; color: ${textColor}; max-width: 600px;">`
    
    // Logo row
    if (logoUrl) {
      html += `
  <tr>
    <td style="padding-bottom: 12px;">
      <a href="${websiteUrl}" style="text-decoration: none;">
        <img src="${logoUrl}" alt="${company || 'Company'} Logo" style="height: 32px; display: block;" />
      </a>
    </td>
  </tr>`
    }
    
    // Name and pronouns
    html += `
  <tr>
    <td style="padding-bottom: 4px;">
      <strong style="color: ${nameColor}; font-size: 14px;">${name}</strong>${optionalFields.showPronouns && pronouns ? ` <span style="color: ${mutedColor}; font-size: 12px;">(${pronouns})</span>` : ''}
    </td>
  </tr>`
    
    // Title and company
    const titleCompany = []
    if (title) titleCompany.push(title)
    if (company) titleCompany.push(company)
    if (titleCompany.length > 0) {
      html += `
  <tr>
    <td style="padding-bottom: 8px; color: ${mutedColor}; font-size: 12px;">
      ${titleCompany.join(' • ')}
    </td>
  </tr>`
    }
    
    // Contact information
    if (hasContact) {
      html += `
  <tr>
    <td style="padding-top: 4px;">
      <span style="color: ${mutedColor}; font-size: 12px;">
        ${contactItems.join(contactSeparator)}
      </span>
    </td>
  </tr>`
    }
    
    // Website
    if (website) {
      html += `
  <tr>
    <td style="padding-top: 2px;">
      <a href="${websiteUrl.startsWith('http') ? websiteUrl : 'https://' + websiteUrl}" style="color: ${linkColor}; text-decoration: none; font-size: 12px;">${website}</a>
    </td>
  </tr>`
    }
    
    // Address
    if (optionalFields.showAddress && address) {
      html += `
  <tr>
    <td style="padding-top: 8px; color: ${mutedColor}; font-size: 11px; line-height: 1.5;">
      ${address}
    </td>
  </tr>`
    }
    
    // CTA
    if (optionalFields.showCTA && ctaLabel && ctaUrl) {
      html += `
  <tr>
    <td style="padding-top: 12px;">
      <a href="${ctaUrl.startsWith('http') ? ctaUrl : 'https://' + ctaUrl}" style="color: ${linkColor}; text-decoration: none; font-weight: 500; font-size: 12px;">${ctaLabel} →</a>
    </td>
  </tr>`
    }
    
    // Disclaimer
    if (optionalFields.showDisclaimer && disclaimer) {
      html += `
  <tr>
    <td style="padding-top: 16px; border-top: 1px solid ${mutedColor}; margin-top: 16px;">
      <p style="color: ${mutedColor}; font-size: 10px; line-height: 1.5; margin: 0;">${disclaimer}</p>
    </td>
  </tr>`
    }
    
    html += `
</table>`
    
    return html
  }

  const renderPreview = () => {
    const textColor = isDarkMode ? '#e5e5e5' : '#333333'
    const mutedColor = isDarkMode ? '#a0a0a0' : '#666666'
    const linkColor = isDarkMode ? '#d4a574' : '#b8865c'
    const nameColor = isDarkMode ? '#ffffff' : '#1a1a1a'
    
    const linkedinHandle = data.linkedin.replace(/^.*linkedin\.com\/in\//, '').replace(/\/.*$/, '').replace(/^@/, '')
    const linkedinUrl = linkedinHandle ? `https://linkedin.com/in/${linkedinHandle}` : ''
    const twitterHandle = data.twitter.replace(/^@?/, '')
    const twitterUrl = twitterHandle ? `https://twitter.com/${twitterHandle}` : ''
    const websiteUrl = data.website || '#'
    const logoUrl = data.logoUrl || 'https://via.placeholder.com/150x40/d4a574/ffffff?text=Your+Logo'
    
    const contactItems: JSX.Element[] = []
    if (data.phone) contactItems.push(<a key="phone" href={`tel:${data.phone.replace(/\s/g, '')}`} style={{ color: linkColor, textDecoration: 'none' }}>{data.phone}</a>)
    if (data.email) contactItems.push(<a key="email" href={`mailto:${data.email}`} style={{ color: linkColor, textDecoration: 'none' }}>{data.email}</a>)
    if (optionalFields.showLinkedIn && linkedinUrl) contactItems.push(<a key="linkedin" href={linkedinUrl} style={{ color: linkColor, textDecoration: 'none' }}>LinkedIn</a>)
    if (optionalFields.showTwitter && twitterUrl) contactItems.push(<a key="twitter" href={twitterUrl} style={{ color: linkColor, textDecoration: 'none' }}>@{twitterHandle}</a>)
    
    const titleCompany = []
    if (data.title) titleCompany.push(data.title)
    if (data.company) titleCompany.push(data.company)

    return (
      <table cellPadding="0" cellSpacing="0" border={0} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", fontSize: '12px', lineHeight: '1.6', color: textColor, maxWidth: '600px', width: '100%' }}>
        <tbody>
          {logoUrl && (
            <tr>
              <td style={{ paddingBottom: '12px' }}>
                <a href={websiteUrl} style={{ textDecoration: 'none' }}>
                  <img src={logoUrl} alt={`${data.company || 'Company'} Logo`} style={{ height: '32px', display: 'block' }} />
                </a>
              </td>
            </tr>
          )}
          <tr>
            <td style={{ paddingBottom: '4px' }}>
              <strong style={{ color: nameColor, fontSize: '14px' }}>
                {data.name || 'Your Name'}
                {optionalFields.showPronouns && data.pronouns && (
                  <span style={{ color: mutedColor, fontSize: '12px' }}> ({data.pronouns})</span>
                )}
              </strong>
            </td>
          </tr>
          {titleCompany.length > 0 && (
            <tr>
              <td style={{ paddingBottom: '8px', color: mutedColor, fontSize: '12px' }}>
                {titleCompany.join(' • ')}
              </td>
            </tr>
          )}
          {contactItems.length > 0 && (
            <tr>
              <td style={{ paddingTop: '4px' }}>
                <span style={{ color: mutedColor, fontSize: '12px' }}>
                  {contactItems.map((item, i) => (
                    <span key={i}>
                      {item}
                      {i < contactItems.length - 1 && <span style={{ margin: '0 6px', color: mutedColor }}>•</span>}
                    </span>
                  ))}
                </span>
              </td>
            </tr>
          )}
          {data.website && (
            <tr>
              <td style={{ paddingTop: '2px' }}>
                <a href={websiteUrl.startsWith('http') ? websiteUrl : 'https://' + websiteUrl} style={{ color: linkColor, textDecoration: 'none', fontSize: '12px' }}>
                  {data.website}
                </a>
              </td>
            </tr>
          )}
          {optionalFields.showAddress && data.address && (
            <tr>
              <td style={{ paddingTop: '8px', color: mutedColor, fontSize: '11px', lineHeight: '1.5' }}>
                {data.address}
              </td>
            </tr>
          )}
          {optionalFields.showCTA && data.ctaLabel && data.ctaUrl && (
            <tr>
              <td style={{ paddingTop: '12px' }}>
                <a href={data.ctaUrl.startsWith('http') ? data.ctaUrl : 'https://' + data.ctaUrl} style={{ color: linkColor, textDecoration: 'none', fontWeight: '500', fontSize: '12px' }}>
                  {data.ctaLabel} →
                </a>
              </td>
            </tr>
          )}
          {optionalFields.showDisclaimer && data.disclaimer && (
            <tr>
              <td style={{ paddingTop: '16px', borderTop: `1px solid ${mutedColor}`, marginTop: '16px' }}>
                <p style={{ color: mutedColor, fontSize: '10px', lineHeight: '1.5', margin: 0 }}>
                  {data.disclaimer}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  const copyToClipboard = async () => {
    const html = generateSignatureHTML()
    await navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="signature-generator">
      <div className="generator-container">
        <h1 className="generator-title">Email Signature Generator</h1>
        <p className="generator-subtitle">Create a professional email signature</p>

        <div className="form-section">
          {/* Basic Information Section */}
          <div className="form-section-group">
            <button
              className="section-header"
              onClick={() => toggleSection('basic')}
            >
              <h3>Basic Information</h3>
              <span className="section-toggle">{expandedSections.basic ? '−' : '+'}</span>
            </button>
            {expandedSections.basic && (
              <div className="section-content">
                <div className="input-group">
                  <label htmlFor="name">Full Name *</label>
                  <div className="input-wrapper">
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={data.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-field"
                    />
                    {data.name && (
                      <button
                        onClick={() => clearField('name')}
                        className="clear-button"
                        aria-label="Clear name"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="title">Job Title</label>
                  <div className="input-wrapper">
                    <input
                      id="title"
                      type="text"
                      placeholder="Senior Developer"
                      value={data.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="input-field"
                    />
                    {data.title && (
                      <button
                        onClick={() => clearField('title')}
                        className="clear-button"
                        aria-label="Clear title"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="company">Company Name</label>
                  <div className="input-wrapper">
                    <input
                      id="company"
                      type="text"
                      placeholder="Acme Inc."
                      value={data.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="input-field"
                    />
                    {data.company && (
                      <button
                        onClick={() => clearField('company')}
                        className="clear-button"
                        aria-label="Clear company"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={data.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-field"
                    />
                    {data.email && (
                      <button
                        onClick={() => clearField('email')}
                        className="clear-button"
                        aria-label="Clear email"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="form-section-group">
            <button
              className="section-header"
              onClick={() => toggleSection('contact')}
            >
              <h3>Contact Information</h3>
              <span className="section-toggle">{expandedSections.contact ? '−' : '+'}</span>
            </button>
            {expandedSections.contact && (
              <div className="section-content">
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-wrapper">
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={data.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-field"
                    />
                    {data.phone && (
                      <button
                        onClick={() => clearField('phone')}
                        className="clear-button"
                        aria-label="Clear phone"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="website">Website URL</label>
                  <div className="input-wrapper">
                    <input
                      id="website"
                      type="url"
                      placeholder="example.com"
                      value={data.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="input-field"
                    />
                    {data.website && (
                      <button
                        onClick={() => clearField('website')}
                        className="clear-button"
                        aria-label="Clear website"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="input-group">
                  <div className="toggle-group">
                    <label htmlFor="showAddress" className="toggle-label">
                      <input
                        id="showAddress"
                        type="checkbox"
                        checked={optionalFields.showAddress}
                        onChange={() => toggleOptionalField('showAddress')}
                        className="toggle-checkbox"
                      />
                      <span>Include Physical Address</span>
                    </label>
                  </div>
                  {optionalFields.showAddress && (
                    <div className="input-wrapper" style={{ marginTop: '8px' }}>
                      <input
                        id="address"
                        type="text"
                        placeholder="123 Main St, City, State 12345"
                        value={data.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="input-field"
                      />
                      {data.address && (
                        <button
                          onClick={() => clearField('address')}
                          className="clear-button"
                          aria-label="Clear address"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Social Media Section */}
          <div className="form-section-group">
            <button
              className="section-header"
              onClick={() => toggleSection('social')}
            >
              <h3>Social Media</h3>
              <span className="section-toggle">{expandedSections.social ? '−' : '+'}</span>
            </button>
            {expandedSections.social && (
              <div className="section-content">
                <div className="input-group">
                  <div className="toggle-group">
                    <label htmlFor="showLinkedIn" className="toggle-label">
                      <input
                        id="showLinkedIn"
                        type="checkbox"
                        checked={optionalFields.showLinkedIn}
                        onChange={() => toggleOptionalField('showLinkedIn')}
                        className="toggle-checkbox"
                      />
                      <span>Include LinkedIn</span>
                    </label>
                  </div>
                  {optionalFields.showLinkedIn && (
                    <div className="input-wrapper" style={{ marginTop: '8px' }}>
                      <input
                        id="linkedin"
                        type="text"
                        placeholder="linkedin.com/in/johndoe or johndoe"
                        value={data.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="input-field"
                      />
                      {data.linkedin && (
                        <button
                          onClick={() => clearField('linkedin')}
                          className="clear-button"
                          aria-label="Clear LinkedIn"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <div className="toggle-group">
                    <label htmlFor="showTwitter" className="toggle-label">
                      <input
                        id="showTwitter"
                        type="checkbox"
                        checked={optionalFields.showTwitter}
                        onChange={() => toggleOptionalField('showTwitter')}
                        className="toggle-checkbox"
                      />
                      <span>Include Twitter/X</span>
                    </label>
                  </div>
                  {optionalFields.showTwitter && (
                    <div className="input-wrapper" style={{ marginTop: '8px' }}>
                      <input
                        id="twitter"
                        type="text"
                        placeholder="johndoe or @johndoe"
                        value={data.twitter}
                        onChange={(e) => handleInputChange('twitter', e.target.value)}
                        className="input-field"
                      />
                      {data.twitter && (
                        <button
                          onClick={() => clearField('twitter')}
                          className="clear-button"
                          aria-label="Clear Twitter"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Images Section */}
          <div className="form-section-group">
            <button
              className="section-header"
              onClick={() => toggleSection('images')}
            >
              <h3>Images</h3>
              <span className="section-toggle">{expandedSections.images ? '−' : '+'}</span>
            </button>
            {expandedSections.images && (
              <div className="section-content">
                <div className="input-group">
                  <label htmlFor="logoUrl">Company Logo URL</label>
                  <div className="input-wrapper">
                    <input
                      id="logoUrl"
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={data.logoUrl}
                      onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                      className="input-field"
                    />
                    {data.logoUrl && (
                      <button
                        onClick={() => clearField('logoUrl')}
                        className="clear-button"
                        aria-label="Clear logo URL"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <small className="input-hint">Host logo on reliable server or CDN</small>
                </div>
              </div>
            )}
          </div>

          {/* Optional Fields Section */}
          <div className="form-section-group">
            <button
              className="section-header"
              onClick={() => toggleSection('optional')}
            >
              <h3>Optional Fields</h3>
              <span className="section-toggle">{expandedSections.optional ? '−' : '+'}</span>
            </button>
            {expandedSections.optional && (
              <div className="section-content">
                <div className="input-group">
                  <div className="toggle-group">
                    <label htmlFor="showPronouns" className="toggle-label">
                      <input
                        id="showPronouns"
                        type="checkbox"
                        checked={optionalFields.showPronouns}
                        onChange={() => toggleOptionalField('showPronouns')}
                        className="toggle-checkbox"
                      />
                      <span>Include Pronouns</span>
                    </label>
                  </div>
                  {optionalFields.showPronouns && (
                    <div className="input-wrapper" style={{ marginTop: '8px' }}>
                      <input
                        id="pronouns"
                        type="text"
                        placeholder="he/him, she/her, they/them"
                        value={data.pronouns}
                        onChange={(e) => handleInputChange('pronouns', e.target.value)}
                        className="input-field"
                      />
                      {data.pronouns && (
                        <button
                          onClick={() => clearField('pronouns')}
                          className="clear-button"
                          aria-label="Clear pronouns"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="input-group">
                  <div className="toggle-group">
                    <label htmlFor="showCTA" className="toggle-label">
                      <input
                        id="showCTA"
                        type="checkbox"
                        checked={optionalFields.showCTA}
                        onChange={() => toggleOptionalField('showCTA')}
                        className="toggle-checkbox"
                      />
                      <span>Include Call-to-Action</span>
                    </label>
                  </div>
                  {optionalFields.showCTA && (
                    <>
                      <div className="input-wrapper" style={{ marginTop: '8px' }}>
                        <input
                          id="ctaLabel"
                          type="text"
                          placeholder="Schedule a call"
                          value={data.ctaLabel}
                          onChange={(e) => handleInputChange('ctaLabel', e.target.value)}
                          className="input-field"
                        />
                        {data.ctaLabel && (
                          <button
                            onClick={() => clearField('ctaLabel')}
                            className="clear-button"
                            aria-label="Clear CTA label"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <div className="input-wrapper" style={{ marginTop: '8px' }}>
                        <input
                          id="ctaUrl"
                          type="url"
                          placeholder="calendly.com/johndoe"
                          value={data.ctaUrl}
                          onChange={(e) => handleInputChange('ctaUrl', e.target.value)}
                          className="input-field"
                        />
                        {data.ctaUrl && (
                          <button
                            onClick={() => clearField('ctaUrl')}
                            className="clear-button"
                            aria-label="Clear CTA URL"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className="input-group">
                  <div className="toggle-group">
                    <label htmlFor="showDisclaimer" className="toggle-label">
                      <input
                        id="showDisclaimer"
                        type="checkbox"
                        checked={optionalFields.showDisclaimer}
                        onChange={() => toggleOptionalField('showDisclaimer')}
                        className="toggle-checkbox"
                      />
                      <span>Include Legal Disclaimer</span>
                    </label>
                  </div>
                  {optionalFields.showDisclaimer && (
                    <div className="input-wrapper" style={{ marginTop: '8px' }}>
                      <textarea
                        id="disclaimer"
                        placeholder="Confidentiality notice or legal disclaimer..."
                        value={data.disclaimer}
                        onChange={(e) => handleInputChange('disclaimer', e.target.value)}
                        className="input-field"
                        rows={3}
                        style={{ resize: 'vertical' }}
                      />
                      {data.disclaimer && (
                        <button
                          onClick={() => clearField('disclaimer')}
                          className="clear-button"
                          style={{ top: '8px' }}
                          aria-label="Clear disclaimer"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="preview-section">
          <div className="preview-header">
            <h2>Preview</h2>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="mode-toggle"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
          <div className={`preview-container ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="signature-preview">
              {renderPreview()}
            </div>
          </div>
        </div>

        <div className="actions-section">
          <button
            onClick={copyToClipboard}
            className="copy-button"
            disabled={!data.name}
          >
            {copied ? '✓ Copied!' : 'Copy HTML'}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="help-button"
          >
            How to import?
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>
            <h2>How to Import Your Signature</h2>
            
            <div className="import-section">
              <h3>Gmail</h3>
              <ol>
                <li>Go to Gmail Settings (gear icon → See all settings)</li>
                <li>Click "General" tab</li>
                <li>Scroll to "Signature" section</li>
                <li>Click "Create new" or edit existing</li>
                <li>Paste the copied HTML in the signature box</li>
                <li>Click "Save changes" at the bottom</li>
              </ol>
            </div>

            <div className="import-section">
              <h3>macOS Mail</h3>
              <ol>
                <li>Open Mail app and go to Mail → Settings</li>
                <li>Click "Signatures" tab</li>
                <li>Select your email account or "All Signatures"</li>
                <li>Click "+" to create a new signature</li>
                <li>Right-click in the signature area → "Paste and Match Style"</li>
                <li>Or paste directly and Mail will format it automatically</li>
              </ol>
            </div>

            <div className="import-section">
              <h3>iOS Mail</h3>
              <ol>
                <li>Open Settings app on your iPhone/iPad</li>
                <li>Go to Mail → Signatures</li>
                <li>Tap "Per Account" or "All Accounts"</li>
                <li>Create or edit a signature</li>
                <li>Paste the copied HTML text</li>
                <li>Go back and the signature will be saved</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
