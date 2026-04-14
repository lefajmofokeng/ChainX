(function () {
  'use strict';

  const NAV_COLUMNS = [
    {
      heading: 'Individuals',
      links: [
        { label: 'Buy & Sell', href: '#' },
        { label: 'xStocks', href: '#' },
        { label: 'Bitcoin & Crypto Wallet', href: '#' },
        { label: 'Staking', href: '#' },
        { label: 'Lending', href: '#' },
        { label: 'Bundles', href: '#' },
        { label: 'Deposits & Withdrawals', href: '#' },
        { label: 'Invest', href: '#' },
        { label: 'Auto-Buy', href: '#' },
        { label: 'VALR Pay', href: '#' },
        { label: 'Referral Program', href: '#' },
      ]
    },
    {
      heading: 'Pro Traders',
      links: [
        { label: 'Spot Trading', href: '#' },
        { label: 'Margin Trading', href: '#' },
        { label: 'Futures Trading', href: '#' },
        { label: 'Trading Competitions', href: '#' },
        { label: 'Markets', href: '#' },
        { label: 'Yield Products', href: '#' },
        { label: 'API', href: '#' },
        { label: 'VALR VIP', href: '#' },
      ]
    },
    {
      heading: 'Institutions',
      links: [
        { label: 'VALR for Business', href: '#' },
        { label: 'VALR Pay for Merchants', href: '#' },
        { label: 'OTC Trading Desk', href: '#' },
        { label: 'Partner with Us', href: '#' },
      ]
    },
    {
      heading: 'Support',
      links: [
        { label: 'Create Account', href: '#' },
        { label: 'FAQs', href: '#' },
        { label: 'API Documentation', href: '#' },
        { label: 'Customer Support', href: '#' },
        { label: 'List on VALR', href: '#' },
        { label: 'Fees', href: '#' },
        { label: 'Beginner\'s Guide', href: '#' },
        { label: 'Compliance', href: '#' },
        { label: 'Law Enforcement Request', href: '#' },
        { label: 'Contact Us', href: '#' },
      ]
    },
    {
      heading: 'Company',
      links: [
        { label: 'Brand and Media Kit', href: '#' },
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Our CEO', href: '#' },
        { label: 'VALR Reviews', href: '#' },
        { label: 'DHL Stormers Partnership', href: '#' },
        { label: 'DHL Stormers Events', href: '#' },
      ]
    }
  ];

  const BOTTOM_LINKS = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Complaints Policy', href: '#' },
    { label: 'FAIS Statutory Disclosure Notice', href: '#' },
    { label: 'Risk Disclosures', href: '#' },
    { label: 'Cookies', href: '#' },
  ];

  const SOCIAL_ICONS = [
    { icon: 'linkedin', href: '#' },
    { icon: 'x', href: '#' },
    { icon: 'facebook', href: '#' },
    { icon: 'instagram', href: '#' },
    { icon: 'youtube', href: '#' },
    { icon: 'medium', href: '#' },
    { icon: 'telegram', href: '#' },
  ];

  const tpl = document.createElement('template');

  tpl.innerHTML = /* html */`
    <style>
      @import url('https://fonts.cdnfonts.com/css/circular-std');

      :host {
        display: block;
        font-family: 'Circular Std', system-ui, sans-serif;
        color: #fff;
      }

      .footer {
        background: #0a0f1f;
        padding: 80px 60px 40px;
      }

      .main-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 40px;
        max-width: 1400px;
        margin: 0 auto;
      }

      .col h3 {
        font-size: 15px;
        font-weight: 600;
        color: #fff;
        margin-bottom: 24px;
        letter-spacing: 0.5px;
      }

      .col a {
        display: block;
        color: #9ca3af;
        font-size: 14.5px;
        line-height: 2.1;
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .col a:hover {
        color: #fff;
      }

      .bottom-section {
        max-width: 1400px;
        margin: 80px auto 0;
        padding-top: 32px;
        border-top: 1px solid rgba(255,255,255,0.08);
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 24px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .brand-logo {
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -1px;
        color: #3b82f6;
      }

      .brand-text {
        font-size: 13px;
        color: #6b7280;
        line-height: 1.5;
      }

      .legal-links {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        font-size: 13px;
        color: #6b7280;
      }

      .legal-links a {
        color: inherit;
        text-decoration: none;
        transition: color 0.2s;
      }

      .legal-links a:hover { color: #fff; }

      .social-icons {
        display: flex;
        gap: 16px;
      }

      .social-icons a {
        color: #6b7280;
        font-size: 20px;
        transition: color 0.2s;
      }

      .social-icons a:hover { color: #fff; }

      .license {
        font-size: 12px;
        color: #4b5563;
        margin-top: 12px;
      }

      /* Mobile */
      @media (max-width: 1024px) {
        .main-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 48px 32px;
        }
      }

      @media (max-width: 640px) {
        .footer { padding: 60px 24px 40px; }
        .main-grid { grid-template-columns: 1fr; }
        .bottom-section { flex-direction: column; align-items: flex-start; text-align: left; }
        .legal-links { justify-content: flex-start; }
      }
    </style>

    <footer class="footer">
      <div class="main-grid">
        ${NAV_COLUMNS.map(col => `
          <div class="col">
            <h3>${col.heading}</h3>
            ${col.links.map(link => `
              <a href="${link.href}">${link.label}</a>
            `).join('')}
          </div>
        `).join('')}
      </div>

      <div class="bottom-section">
        <div>
          <div class="brand">
            <span class="brand-logo">VALR</span>
            <div class="brand-text">
              The only crypto platform you need.<br>
              Over 1000+ affiliate offers, real-time analytics, and seamless API integrations.
            </div>
          </div>
          <div class="license">
            VALR (Pty) Ltd is a licensed financial services provider (FSP #53308)
          </div>
        </div>

        <div class="legal-links">
          ${BOTTOM_LINKS.map(link => `
            <a href="${link.href}">${link.label}</a>
          `).join(' • ')}
        </div>

        <div class="social-icons">
          ${SOCIAL_ICONS.map(social => `
            <a href="${social.href}" aria-label="${social.icon}"> 
              ${social.icon === 'linkedin' ? 'in' : 
                social.icon === 'x' ? '𝕏' : 
                social.icon === 'facebook' ? 'f' : 
                social.icon === 'instagram' ? '📷' : 
                social.icon === 'youtube' ? '▶' : 
                social.icon === 'medium' ? 'M' : '✈'}
            </a>
          `).join('')}
        </div>
      </div>
    </footer>
  `;

  class CronosFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
      this.shadowRoot.appendChild(tpl.content.cloneNode(true));
    }
  }

  if (!customElements.get('cronos-footer')) {
    customElements.define('cronos-footer', CronosFooter);
  }
})();