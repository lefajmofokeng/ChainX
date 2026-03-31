class CryptoHeader extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {

    /* ═══════════════════════════════════════════════════════════════
       NAV DATA — single source of truth.
       Edit links HERE only. Desktop + mobile both read from this.
       Each item: { label, href, items: [{ label, href, desc }] }
    ═══════════════════════════════════════════════════════════════ */
    const NAV = [
      {
        label: 'Programs',
        href:  'programs.html',
        items: [
          { label: 'Affiliate Program',  href: 'affiliate.html',  desc: 'Earn commissions promoting crypto products' },
          { label: 'Referral Rewards',   href: 'referral.html',   desc: 'Get paid when friends sign up' },
          { label: 'Partner Network',    href: 'partners.html',   desc: 'Join our network of verified partners' },
          { label: 'Ambassador Program', href: 'ambassador.html', desc: 'Represent us and earn monthly bonuses' },
        ],
      },
      {
        label: 'Top Offers',
        href:  'top-offers.html',
        items: [
          { label: 'Staking Yields',   href: 'staking.html', desc: 'Earn passive income by staking your crypto' },
          { label: 'Yield Farming',    href: 'yield.html',   desc: 'Provide liquidity and earn protocol rewards' },
          { label: 'Savings Accounts', href: 'savings.html', desc: 'High-interest crypto savings, no trading needed' },
          { label: 'Bonus Promotions', href: 'promos.html',  desc: 'Limited-time offers with boosted rates' },
        ],
      },
      {
        label: 'Markets',
        href:  'markets.html',
        items: [
          { label: 'Market Overview',  href: 'markets.html',  desc: 'Live prices, volumes and market caps' },
          { label: 'Trending Coins',   href: 'trending.html', desc: 'What the market is moving on right now' },
          { label: 'DeFi Dashboard',   href: 'defi.html',     desc: 'Top protocols, TVL and yield data' },
          { label: 'NFT Floor Prices', href: 'nft.html',      desc: 'Track top collections in real time' },
        ],
      },
      {
        label: 'Individuals',
        href:  'page.html',
        items: [
          { label: 'Newsletter',       href: 'newsletter.html', desc: 'Weekly alpha, market moves and insights' },
          { label: 'Premium Reports',  href: 'reports.html',    desc: 'In-depth research reports you can sell or use' },
          { label: 'Crypto Courses',   href: 'courses.html',    desc: 'Beginner to advanced crypto education' },
          { label: 'Community Access', href: 'community.html',  desc: 'Private group with signals and discussion' },
        ],
      },
    ];

    /* ── Desktop nav links — NO chevron on desktop ── */
    const desktopLinks = NAV.map(n => `
      <div class="nav-item" data-label="${n.label}">
        <a href="${n.href}" class="nav-link">${n.label}</a>
      </div>
    `).join('');

    /* ── Mobile accordion links — chevron shown here ── */
    const mobileLinks = NAV.map(n => `
      <div class="mob-group">
        <button class="mob-parent" aria-expanded="false">
          <span>${n.label}</span>
          <svg class="mob-chv" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="mob-sub">
          ${n.items.map(i => `
            <a href="${i.href}" class="mob-sub-link">
              <span class="mob-sub-label">${i.label}</span>
              <span class="mob-sub-desc">${i.desc}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `).join('');

    /* ── Megamenu panels — columns of max 5 items ── */
    const megaPanels = NAV.map(n => {
      const cols = [];
      for (let i = 0; i < n.items.length; i += 5) {
        cols.push(n.items.slice(i, i + 5));
      }
      return `
        <div class="mega-panel" data-mega-panel="${n.label}">
          <div class="mega-inner">
            ${cols.map(col => `
              <div class="mega-col">
                ${col.map(item => `
                  <a href="${item.href}" class="mega-item">
                    <span class="mega-item-label">${item.label}</span>
                    <span class="mega-item-desc">${item.desc}</span>
                  </a>
                `).join('')}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    /* ══════════════════════════════════════════════════════════
       SHADOW DOM
    ══════════════════════════════════════════════════════════ */
    this._shadow.innerHTML = `
      <style>
        @font-face { font-family:'Circular Std'; src:url('fonts/CircularStd-Book.woff2') format('woff2'),url('fonts/CircularStd-Book.woff') format('woff'); font-weight:400; font-style:normal; font-display:swap; }
        @font-face { font-family:'Circular Std'; src:url('fonts/CircularStd-Medium.woff2') format('woff2'),url('fonts/CircularStd-Medium.woff') format('woff'); font-weight:500; font-style:normal; font-display:swap; }
        @font-face { font-family:'Circular Std'; src:url('fonts/CircularStd-Bold.woff2') format('woff2'),url('fonts/CircularStd-Bold.woff') format('woff'); font-weight:600; font-style:normal; font-display:swap; }
        @font-face { font-family:'Circular Std'; src:url('fonts/CircularStd-Bold.woff2') format('woff2'),url('fonts/CircularStd-Bold.woff') format('woff'); font-weight:700; font-style:normal; font-display:swap; }
        @font-face { font-family:'Circular Std'; src:url('fonts/CircularStd-Black.woff2') format('woff2'),url('fonts/CircularStd-Black.woff') format('woff'); font-weight:800; font-style:normal; font-display:swap; }
        @font-face { font-family:'Circular Std'; src:url('fonts/CircularStd-Black.woff2') format('woff2'),url('fonts/CircularStd-Black.woff') format('woff'); font-weight:900; font-style:normal; font-display:swap; }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :host {
          --navy2:    #000000;
          --cyan:     #ffffff;
          --cyan-dim: rgba(0,229,255,0.12);
          --white:    #ffffff;
          --white2:   rgba(255,255,255,0.65);
          --white3:   rgba(255,255,255,0.25);
          --border:   rgba(0,229,255,0.12);
          --border2:  rgba(0,229,255,0.22);
          --lime:     #CCFF00;
          --f:        'Circular Std', 'Inter', sans-serif;
          display: block;
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1000;
          overflow: visible;
        }

        /* ── HEADER ── */
        header {
          width: 100%;
          height: 55px;
          padding: 0 3.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--navy2);
          transition: background 0.4s, box-shadow 0.4s;
          position: relative;
          overflow: visible;
        }

        /* ── LEFT ── */
        .left {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative; z-index: 2;
          min-width: 0;
          flex: 1;
          overflow: visible;
        }

        .logo {
          display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-img {
          height: 25px; width: auto; display: block;
        }

        /* ── DESKTOP NAV ── */
        nav {
          display: flex; align-items: center; gap: 0;
          flex-shrink: 0;
          overflow: visible;
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
        }

        .nav-link {
          font-family: var(--f); font-size: 0.88rem; font-weight: 400;
          color: var(--white); text-decoration: none;
          padding: 0.4rem 0.75rem;
          transition: color 0.2s;
          white-space: nowrap;
          display: flex; align-items: center;
          cursor: pointer;
          position: relative; z-index: 2;
        }
        .nav-link:hover  { color: var(--lime); }
        .nav-link.active { color: var(--lime); }

        /* ── MEGAMENU PANEL ── */
        .mega-panel {
          position: fixed;
          top: 55px;
          left: 0;
          width: 100%;
          background: #000000;
          z-index: 9998;
          clip-path: inset(0 0 100% 0);
          transition: clip-path 0.32s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
        }
        .mega-panel.open {
          clip-path: inset(0 0 0% 0);
          pointer-events: auto;
        }

        .mega-inner {
          display: flex;
          flex-direction: row;
          gap: 0;
          padding: 2rem 3rem;
          border-top: 1px solid rgba(204,255,0,0.08);
        }

        .mega-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
          min-width: 220px;
          flex: 0 0 220px;
          padding-right: 1rem;
          border-right: 1px solid rgba(255,255,255,0.05);
          margin-right: 1rem;
        }
        .mega-col:last-child {
          border-right: none;
          margin-right: 0;
        }

        .mega-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s;
        }

        .mega-item-label {
          font-family: var(--f);
          font-size: 1.5rem;
          font-weight: 500;
          color: #ffffff;
          transition: color 0.15s;
          white-space: nowrap;
        }
        .mega-item:hover .mega-item-label { color: var(--lime); }

        .mega-item-desc {
          font-family: var(--f);
          font-size: 0.8rem;
          font-weight: 400;
          color: rgba(255,255,255,0.42);
          line-height: 1.4;
        }

        /* ── OVERLAY ── */
        .mega-overlay {
          position: fixed;
          inset: 55px 0 0 0;
          background: rgba(0,0,0,0.45);
          z-index: 9997;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .mega-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        /* ── RIGHT ── */
        .right {
          display: flex; align-items: center; gap: 0.5rem;
          position: relative; z-index: 2; flex-shrink: 0;
        }

        .btn-login {
          font-family: var(--f); font-size: 0.9rem; font-weight: 500;
          color: #000000; background: #CCFF00; border: none;
          padding: 0.5rem 1rem; border-radius: 60px; cursor: pointer;
          transition: color 0.2s, background 0.2s; white-space: nowrap;
        }
        .btn-login:hover { color: var(--white); background: var(--cyan-dim); }

        .btn-signup {
          font-family: var(--f); font-size: 0.9rem; font-weight: 500;
          color: #000000; background: var(--cyan); border: none;
          padding: 0.5rem 0.8rem; border-radius: 60px; cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-signup:hover  { opacity: 0.88; transform: translateY(-1px); }
        .btn-signup:active { transform: none; }

        /* ── HAMBURGER ── */
        .ham {
          display: none;
          flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer;
          padding: 5px; flex-shrink: 0;
        }
        .ham span {
          display: block; width: 20px; height: 1.5px;
          background: var(--white); border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        /* ── MOBILE MENU ── */
        .mob-menu {
          position: fixed;
          top: 55px; left: 0; right: 0; bottom: 0;
          background: #000000;
          padding: 1.2rem 1.5rem 2rem;
          display: flex; flex-direction: column;
          z-index: 998;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
          overflow-y: auto;
        }
        .mob-menu.open { transform: translateX(0); }

        .mob-group {
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mob-group:last-of-type { border-bottom: none; }

        .mob-parent {
          font-family: var(--f); font-size: 1rem; font-weight: 600;
          color: #ffffff; background: none; border: none; cursor: pointer;
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          padding: 0.9rem 0;
          letter-spacing: -0.03em;
          transition: color 0.2s;
        }
        .mob-parent:hover { color: var(--lime); }
        .mob-parent[aria-expanded="true"] { color: var(--lime); }

        .mob-chv {
          transition: transform 0.22s;
          flex-shrink: 0;
          color: rgba(255,255,255,0.4);
        }
        .mob-parent[aria-expanded="true"] .mob-chv {
          transform: rotate(180deg);
          color: var(--lime);
        }

        .mob-sub {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .mob-sub.open {
          max-height: 400px;
          padding-bottom: 0.5rem;
        }

        .mob-sub-link {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 0.55rem 0.2rem 0.55rem 0.8rem;
          text-decoration: none;
          border-radius: 7px;
          transition: background 0.15s;
          margin-bottom: 2px;
        }

        .mob-sub-label {
          font-family: var(--f); font-size: 0.88rem; font-weight: 500;
          color: rgba(255,255,255,0.85);
          transition: color 0.15s;
        }

        .mob-sub-desc {
          font-family: var(--f); font-size: 0.7rem; font-weight: 400;
          color: rgba(255,255,255,0.35);
          line-height: 1.4;
        }

        .mob-actions {
          display: flex; flex-direction: column; gap: 0.8rem; margin-top: 2rem;
        }
        .mob-btn-login {
          font-family: var(--f); font-size: 0.9rem; font-weight: 400;
          color: #000000; background: #ccff00;
          padding: 0.85rem; border-radius: 60px; cursor: pointer; border: none;
        }
        .mob-btn-signup {
          font-family: var(--f); font-size: 0.9rem; font-weight: 400;
          color: #000; background: var(--cyan);
          border: none; padding: 0.85rem;
          border-radius: 60px; cursor: pointer;
        }

        /* ── SEARCH ── */
        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-toggle {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 60px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
          color: rgba(255,255,255,0.6);
        }
        .search-toggle:hover { background: rgba(255,255,255,0.12); color: #fff; border-color: rgba(255,255,255,0.2); }
        .search-toggle svg { display: block; flex-shrink: 0; }

        .search-field-wrap {
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 0;
          overflow: hidden;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          z-index: 10; border-radius: 60px;
        }
        .search-field-wrap.open { width: 260px; }

        .search-input {
          width: 100%;
          padding: 7px 12px 7px 36px;
          background: #0d1b2e;
          border: 1px solid rgba(17,153,250,0.4);
          border-radius: 60px;
          color: #fff;
          font-family: var(--f);
          font-size: 0.82rem;
          outline: none;
          white-space: nowrap;
          transition: border-color 0.2s;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }
        .search-input:focus { border-color: transparent; }

        .search-input-icon {
          position: absolute;
          left: 10px; top: 50%; transform: translateY(-50%);
          pointer-events: none;
          color: rgba(255,255,255,0.35);
          z-index: 11;
          display: none;
        }
        .search-field-wrap.open .search-input-icon { display: block; }

        /* ── BREAKPOINTS ── */
        @media (max-width: 900px) {
          header { padding: 0 1rem; }
          .left { gap: 1rem; }
          .nav-link { padding: 0.4rem 0.5rem; font-size: 0.78rem; }
          .btn-signup { padding: 0.45rem 0.75rem; font-size: 0.75rem; }
          .btn-login  { padding: 0.45rem 0.5rem;  font-size: 0.75rem; }
          .search-field-wrap.open { width: 200px; }
          .mega-inner { padding: 1.5rem 1rem; }
        }
        @media (max-width: 600px) {
          nav { display: none; }
          .btn-login { display: none; }
          .ham { display: flex; }
          .search-field-wrap.open { width: 160px; }
        }
        @media (max-width: 380px) {
          .btn-signup { display: none; }
        }
      </style>

      <header id="hdr">
        <div class="left">
          <a href="index.html" class="logo">
            <img class="logo-img" src="logo.png" alt="Logo" title="Replace src with your logo image path">
          </a>
          <nav>
            ${desktopLinks}
          </nav>
        </div>
        <div class="right">
          <!-- SEARCH -->
          <div class="search-wrap" id="searchWrap">
            <button class="search-toggle" id="searchToggle" aria-label="Search coins">
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </button>
            <div class="search-field-wrap" id="searchFieldWrap">
              <svg class="search-input-icon" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input class="search-input" id="coinSearch" type="text" placeholder="Search coin…" autocomplete="off" spellcheck="false">
            </div>
          </div>

          <button class="btn-login">Log in</button>
          <button class="btn-signup">Sign Up</button>
          <button class="ham" id="ham" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <!-- MEGAMENU OVERLAY -->
      <div class="mega-overlay" id="megaOverlay"></div>

      <!-- MEGAMENU PANELS (one per nav item) -->
      ${megaPanels}

      <!-- MOBILE MENU -->
      <div class="mob-menu" id="mob">
        ${mobileLinks}
        <div class="mob-actions">
          <button class="mob-btn-login">Log in</button>
          <button class="mob-btn-signup">Sign Up</button>
        </div>
      </div>
    `;

    /* ══════════════════════════════════════════════════════════
       MEGAMENU LOGIC
    ══════════════════════════════════════════════════════════ */
    const shadow      = this._shadow;
    const megaOverlay = shadow.getElementById('megaOverlay');
    let activeMega    = null;

    const closeMega = () => {
      if (!activeMega) return;
      shadow.querySelector(`.mega-panel[data-mega-panel="${activeMega}"]`)?.classList.remove('open');
      shadow.querySelector(`.nav-item[data-label="${activeMega}"] .nav-link`)?.classList.remove('active');
      megaOverlay.classList.remove('open');
      activeMega = null;
    };

    shadow.querySelectorAll('.nav-item').forEach(item => {
      const label = item.dataset.label;
      const link  = item.querySelector('.nav-link');
      const panel = shadow.querySelector(`.mega-panel[data-mega-panel="${label}"]`);
      if (!panel || !link) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (activeMega === label) {
          closeMega();
        } else {
          closeMega();
          activeMega = label;
          panel.classList.add('open');
          link.classList.add('active');
          megaOverlay.classList.add('open');
        }
      });
    });

    megaOverlay.addEventListener('click', closeMega);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMega();
    });

    /* ── SCROLL behaviour ── */
    const hdr = shadow.getElementById('hdr');
    window.addEventListener('scroll', () => {
      hdr.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    /* ── HAMBURGER ── */
    const ham    = shadow.getElementById('ham');
    const mob    = shadow.getElementById('mob');
    let mobOpen  = false;

    ham.addEventListener('click', () => {
      mobOpen = !mobOpen;
      mob.classList.toggle('open', mobOpen);
      const s = ham.querySelectorAll('span');
      s[0].style.transform = mobOpen ? 'translateY(6.5px) rotate(45deg)' : '';
      s[1].style.opacity   = mobOpen ? '0' : '';
      s[2].style.transform = mobOpen ? 'translateY(-6.5px) rotate(-45deg)' : '';
    });

    /* ── MOBILE ACCORDION ── */
    shadow.querySelectorAll('.mob-parent').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub    = btn.nextElementSibling;
        const isOpen = sub.classList.contains('open');

        shadow.querySelectorAll('.mob-sub.open').forEach(s => s.classList.remove('open'));
        shadow.querySelectorAll('.mob-parent[aria-expanded="true"]').forEach(b => b.setAttribute('aria-expanded', 'false'));

        if (!isOpen) {
          sub.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    shadow.querySelectorAll('.mob-sub-link').forEach(l => {
      l.addEventListener('click', () => {
        mobOpen = false;
        mob.classList.remove('open');
        ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });

    /* ══════════════════════════════════════════════════════════
       SEARCH LOGIC — dropdown lives in main document to escape shadow DOM
    ══════════════════════════════════════════════════════════ */
    let allCoins = [], searchTimer = null, searchOpen = false;

    const searchToggle    = shadow.getElementById('searchToggle');
    const searchFieldWrap = shadow.getElementById('searchFieldWrap');
    const coinSearch      = shadow.getElementById('coinSearch');

    const dropdown = document.createElement('div');
    dropdown.id = 'cx-search-dropdown';
    dropdown.style.cssText = `
      position: fixed;
      background: #0d1624;
      border-radius: 10px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.7);
      z-index: 99999;
      display: none;
      width: 340px;
      overflow: hidden;
      font-family: 'Circular Std', 'Inter', sans-serif;
    `;
    document.body.appendChild(dropdown);

    if (!document.getElementById('cx-search-styles')) {
      const st = document.createElement('style');
      st.id = 'cx-search-styles';
      st.textContent = `
        #cx-search-dropdown { font-family: 'Circular Std', 'Inter', sans-serif; }
        #cx-search-dropdown .sr-scroll {
          overflow-y: auto; max-height: 320px;
          scrollbar-width: thin;
          scrollbar-color: rgba(17,153,250,0.3) transparent;
        }
        #cx-search-dropdown .sr-scroll::-webkit-scrollbar { width: 4px; }
        #cx-search-dropdown .sr-scroll::-webkit-scrollbar-thumb { background: rgba(17,153,250,0.3); border-radius: 4px; }
        #cx-search-dropdown .sr-item {
          display: flex; align-items: center;
          padding: 10px 14px; cursor: pointer; gap: 10px;
          transition: background 0.12s;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          box-sizing: border-box;
        }
        #cx-search-dropdown .sr-item:last-child { border-bottom: none; }
        #cx-search-dropdown .sr-item:hover { background: rgba(17,153,250,0.1); }
        #cx-search-dropdown .sr-rank { font-size: 0.6rem; font-weight: 600; color: rgba(255,255,255,0.2); width: 20px; flex-shrink: 0; text-align: right; }
        #cx-search-dropdown .sr-icon { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; display: block; }
        #cx-search-dropdown .sr-icon-ph {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          background: rgba(17,153,250,0.18);
          display: none; align-items: center; justify-content: center;
          font-size: 0.52rem; font-weight: 700; color: #1199fa;
        }
        #cx-search-dropdown .sr-names { flex: 1; min-width: 0; }
        #cx-search-dropdown .sr-name { font-size: 0.84rem; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        #cx-search-dropdown .sr-sym { font-size: 0.67rem; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 1px; }
        #cx-search-dropdown .sr-right { text-align: right; flex-shrink: 0; }
        #cx-search-dropdown .sr-price { font-size: 0.82rem; font-weight: 600; color: #fff; }
        #cx-search-dropdown .sr-chg { font-size: 0.67rem; font-weight: 600; margin-top: 2px; }
        #cx-search-dropdown .sr-up { color: #34C759; }
        #cx-search-dropdown .sr-dn { color: #FF3B30; }
        #cx-search-dropdown .sr-msg { padding: 18px 14px; text-align: center; font-size: 0.82rem; color: rgba(255,255,255,0.3); display: flex; align-items: center; justify-content: center; gap: 8px; }
        #cx-search-dropdown .sr-spinner { width: 13px; height: 13px; border: 2px solid rgba(17,153,250,0.2); border-top-color: #1199fa; border-radius: 50%; animation: cx-spin 0.7s linear infinite; flex-shrink: 0; }
        @keyframes cx-spin { to { transform: rotate(360deg); } }
      `;
      document.head.appendChild(st);
    }

    function positionDropdown() {
      const rect  = coinSearch.getBoundingClientRect();
      const dropW = Math.min(340, window.innerWidth - 16);
      let left    = rect.right - dropW;
      if (left < 8) left = 8;
      dropdown.style.width = dropW + 'px';
      dropdown.style.top   = (rect.bottom + 6) + 'px';
      dropdown.style.left  = left + 'px';
    }

    function showDropdown() { positionDropdown(); dropdown.style.display = 'block'; }
    function hideDropdown() { dropdown.style.display = 'none'; }

    function openSearch() {
      searchOpen = true;
      searchFieldWrap.classList.add('open');
      setTimeout(() => coinSearch.focus(), 310);
    }
    function closeSearch() {
      searchOpen = false;
      searchFieldWrap.classList.remove('open');
      hideDropdown();
      coinSearch.value = '';
    }

    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      searchOpen ? closeSearch() : openSearch();
    });

    document.addEventListener('click', (e) => {
      if (e.target.closest('#cx-search-dropdown')) return;
      if (shadow.contains(e.target) && e.target.closest('#searchWrap')) return;
      closeSearch();
    });

    function formatPrice(v) {
      if (v >= 1000) return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 2 });
      if (v >= 1)    return '$' + v.toFixed(2);
      if (v >= 0.01) return '$' + v.toFixed(4);
      return '$' + v.toFixed(6);
    }

    function renderResults(coins) {
      if (!coins.length) {
        dropdown.innerHTML = '<div class="sr-scroll"><div class="sr-msg">No coins found.</div></div>';
      } else {
        const rows = coins.slice(0, 12).map(c => {
          const chg  = c.price_change_percentage_24h || 0;
          const neg  = chg < 0;
          const init = c.symbol.slice(0, 4).toUpperCase();
          return `<div class="sr-item" data-name="${c.name}" data-symbol="${c.symbol}">
            <span class="sr-rank">#${c.market_cap_rank || '—'}</span>
            <img class="sr-icon" src="${c.image}" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span class="sr-icon-ph">${init}</span>
            <div class="sr-names">
              <div class="sr-name">${c.name}</div>
              <div class="sr-sym">${c.symbol}</div>
            </div>
            <div class="sr-right">
              <div class="sr-price">${formatPrice(c.current_price)}</div>
              <div class="sr-chg ${neg ? 'sr-dn' : 'sr-up'}">${neg ? '▼' : '▲'} ${Math.abs(chg).toFixed(2)}%</div>
            </div>
          </div>`;
        }).join('');
        dropdown.innerHTML = `<div class="sr-scroll">${rows}</div>`;
      }
      showDropdown();
      dropdown.querySelectorAll('.sr-item').forEach(item => {
        item.addEventListener('mousedown', (e) => {
          e.preventDefault();
          coinSearch.value = item.dataset.name + ' (' + item.dataset.symbol.toUpperCase() + ')';
          hideDropdown();
        });
      });
    }

    async function loadCoins() {
      try {
        const r = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h');
        if (r.ok) allCoins = await r.json();
      } catch (e) {}
    }

    function doSearch(q) {
      const query = q.trim().toLowerCase();
      if (!query) { hideDropdown(); return; }
      if (allCoins.length) {
        renderResults(allCoins.filter(c =>
          c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query)
        ));
      } else {
        dropdown.innerHTML = '<div class="sr-scroll"><div class="sr-msg"><span class="sr-spinner"></span> Loading…</div></div>';
        showDropdown();
        loadCoins().then(() => renderResults(allCoins.filter(c =>
          c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query)
        )));
      }
    }

    coinSearch.addEventListener('input', () => {
      clearTimeout(searchTimer);
      if (!coinSearch.value.trim()) { hideDropdown(); return; }
      searchTimer = setTimeout(() => doSearch(coinSearch.value), 180);
    });
    coinSearch.addEventListener('focus', () => {
      if (coinSearch.value.trim()) doSearch(coinSearch.value);
    });
    coinSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    window.addEventListener('resize', () => {
      if (dropdown.style.display !== 'none') positionDropdown();
    });
    window.addEventListener('scroll', () => {
      if (dropdown.style.display !== 'none') positionDropdown();
    }, { passive: true });

    'requestIdleCallback' in window ? requestIdleCallback(loadCoins) : setTimeout(loadCoins, 1500);
  }
}

customElements.define('cx-header', CryptoHeader);