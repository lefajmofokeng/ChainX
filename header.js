class CryptoHeader extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
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
          --navy2:    #080d1b;
          --cyan:     #1199fa;
          --cyan-dim: rgba(0,229,255,0.12);
          --white:    #ffffff;
          --white2:   rgba(255,255,255,0.65);
          --white3:   rgba(255,255,255,0.25);
          --border:   rgba(0,229,255,0.12);
          --border2:  rgba(0,229,255,0.22);
          --f:        'Circular Std', 'Inter', sans-serif;
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          /* CRITICAL: prevent any internal content from overflowing */
          overflow: hidden;
        }

        header {
          width: 100%;
          height: 55px;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--navy2);
          transition: background 0.4s, box-shadow 0.4s;
          position: relative;
          /* Ensure it never exceeds its container */
          max-width: 100%;
          overflow: hidden;
        }

        header::after {
          content: '';
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
          transition: width 0.6s; z-index: 1;
        }
        header:hover::after { width: 100%; }

        /* ── LEFT ── */
        .left {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative; z-index: 2;
          min-width: 0;
          flex: 1;
        }

        .logo {
          display: flex; align-items: center;
          text-decoration: none; flex-shrink: 0;
        }
        .logo-img {
          height: 25px;
          width: auto;
          display: block;
          
        }

        nav {
          display: flex; align-items: center; gap: 0;
          flex-shrink: 0;
        }
        .nav-link {
          font-family: var(--f); font-size: 0.88rem; font-weight: 500;
          color: var(--white); text-decoration: none;
          padding: 0.4rem 0.75rem;
          transition: color 0.2s; white-space: nowrap;
        }
        .nav-link:hover { color: var(--white); }

        /* ── RIGHT ── */
        .right {
          display: flex; align-items: center; gap: 0.5rem;
          position: relative; z-index: 2; flex-shrink: 0;
        }

        .btn-login {
          font-family: var(--f); font-size: 0.9rem; font-weight: 400;
          color: #92d1ff; background: #1199fa33; border: none;
          padding: 0.5rem 1rem; border-radius: 60px; cursor: pointer;
          transition: color 0.2s, background 0.2s; white-space: nowrap;
        }
        .btn-login:hover { color: var(--white); background: var(--cyan-dim); }

        .btn-signup {
          font-family: var(--f); font-size: 0.9rem; font-weight: 400;
          color: #f7f9fa; background: var(--cyan); border: none;
          padding: 0.5rem 0.8rem; border-radius: 60px; cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-signup:hover { opacity: 0.88; transform: translateY(-1px); }
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
          background: #080d1b;
          padding: 1.5rem;
          display: flex; flex-direction: column;
          z-index: 998;
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.76,0,0.24,1);
          overflow-y: auto;
        }
        .mob-menu.open { transform: translateX(0); }

        .mob-link {
          font-family: var(--f); font-size: 1rem; font-weight: 600;
          color: var(--white); text-decoration: none; display: block;
          padding: 0.9rem 0;
          letter-spacing: -0.03em;
          transition: color 0.2s, padding-left 0.2s;
        }
        .mob-link:hover { color: var(--cyan); padding-left: 0.4rem; }

        .mob-actions {
          display: flex; flex-direction: column; gap: 0.8rem; margin-top: 2rem;
        }
        .mob-btn-login {
          font-family: var(--f); font-size: 0.9rem; font-weight: 400;
          color: #f7f9fa; background: #1199fa33;
          padding: 0.85rem;
          border-radius: 60px; cursor: pointer; border: none;
        }
        .mob-btn-signup {
          font-family: var(--f); font-size: 0.9rem; font-weight: 400;
          color: #000; background: var(--cyan);
          border: none; padding: 0.85rem;
          border-radius: 60px; cursor: pointer;
        }

        /* ── SEARCH IN HEADER ── */
        .search-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        /* Collapsed: just an icon button */
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

        /* Expanded search field */
        .search-field-wrap {
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 0;
          overflow: hidden;
          transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
          z-index: 10; border-radius:60px;
        }
        .search-field-wrap.open {
          width: 260px;
        }
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

        /* no dropdown styles here — dropdown lives in main document */

        /* ── BREAKPOINTS ── */
        @media (max-width: 900px) {
          header { padding: 0 1rem; }
          .left { gap: 1rem; }
          .nav-link { padding: 0.4rem 0.5rem; font-size: 0.78rem; }
          .btn-signup { padding: 0.45rem 0.75rem; font-size: 0.75rem; }
          .btn-login { padding: 0.45rem 0.5rem; font-size: 0.75rem; }
          .search-field-wrap.open { width: 200px; }
        }
        @media (max-width: 600px) {
          nav { display: none; }
          .btn-login { display: none; }
          .ham { display: flex; }
          .search-field-wrap.open { width: 160px; }
          .search-results { width: 280px; }
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
            <a href="page.html" class="nav-link">Programs</a>
            <a href="page.html" class="nav-link">Top Offers</a>
            <a href="page.html" class="nav-link">Markets</a>
            <a href="page.html" class="nav-link">Individuals</a>
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

      <div class="mob-menu" id="mob">
        <a href="page.html" class="mob-link">Programs</a>
        <a href="page.html" class="mob-link">Top Offers</a>
        <a href="page.html" class="mob-link">Markets</a>
        <a href="page.html" class="mob-link">Individuals</a>
        <div class="mob-actions">
          <button class="mob-btn-login">Log in</button>
          <button class="mob-btn-signup">Sign Up</button>
        </div>
      </div>
    `;

    const hdr = this._shadow.getElementById('hdr');
    window.addEventListener('scroll', () => {
      hdr.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    const ham = this._shadow.getElementById('ham');
    const mob = this._shadow.getElementById('mob');
    let open = false;
    ham.addEventListener('click', () => {
      open = !open;
      mob.classList.toggle('open', open);
      const s = ham.querySelectorAll('span');
      s[0].style.transform = open ? 'translateY(6.5px) rotate(45deg)' : '';
      s[1].style.opacity   = open ? '0' : '';
      s[2].style.transform = open ? 'translateY(-6.5px) rotate(-45deg)' : '';
    });
    this._shadow.querySelectorAll('.mob-link').forEach(l => {
      l.addEventListener('click', () => {
        open = false;
        mob.classList.remove('open');
        ham.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
      });
    });

    /* ── SEARCH LOGIC — dropdown lives in main document to escape overflow:hidden ── */
    let allCoins = [], searchTimer = null, searchOpen = false;
    const searchToggle    = this._shadow.getElementById('searchToggle');
    const searchFieldWrap = this._shadow.getElementById('searchFieldWrap');
    const coinSearch      = this._shadow.getElementById('coinSearch');

    // Create dropdown in main document so it's never clipped by shadow host
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

    // Inject dropdown styles into main document once
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
      const rect = coinSearch.getBoundingClientRect();
      const dropW = Math.min(340, window.innerWidth - 16);
      let left = rect.right - dropW;
      if (left < 8) left = 8;
      dropdown.style.width  = dropW + 'px';
      dropdown.style.top    = (rect.bottom + 6) + 'px';
      dropdown.style.left   = left + 'px';
    }

    function showDropdown() {
      positionDropdown();
      dropdown.style.display = 'block';
    }
    function hideDropdown() {
      dropdown.style.display = 'none';
    }

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
      if (this._shadow.contains(e.target) && e.target.closest('#searchWrap')) return;
      closeSearch();
    });

    function formatPrice(v) {
      if (v >= 1000) return '$' + v.toLocaleString('en-US', {maximumFractionDigits:2});
      if (v >= 1)    return '$' + v.toFixed(2);
      if (v >= 0.01) return '$' + v.toFixed(4);
      return '$' + v.toFixed(6);
    }

    function renderResults(coins) {
      if (!coins.length) {
        dropdown.innerHTML = '<div class="sr-scroll"><div class="sr-msg">No coins found.</div></div>';
      } else {
        const rows = coins.slice(0, 12).map(c => {
          const chg = c.price_change_percentage_24h || 0, neg = chg < 0;
          const init = c.symbol.slice(0,4).toUpperCase();
          return `<div class="sr-item" data-name="${c.name}" data-symbol="${c.symbol}">
            <span class="sr-rank">#${c.market_cap_rank||'—'}</span>
            <img class="sr-icon" src="${c.image}" alt="${c.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span class="sr-icon-ph">${init}</span>
            <div class="sr-names">
              <div class="sr-name">${c.name}</div>
              <div class="sr-sym">${c.symbol}</div>
            </div>
            <div class="sr-right">
              <div class="sr-price">${formatPrice(c.current_price)}</div>
              <div class="sr-chg ${neg?'sr-dn':'sr-up'}">${neg?'▼':'▲'} ${Math.abs(chg).toFixed(2)}%</div>
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
      } catch(e) {}
    }

    function doSearch(q) {
      const query = q.trim().toLowerCase();
      if (!query) { hideDropdown(); return; }
      if (allCoins.length) {
        renderResults(allCoins.filter(c => c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query)));
      } else {
        dropdown.innerHTML = '<div class="sr-scroll"><div class="sr-msg"><span class="sr-spinner"></span> Loading…</div></div>';
        showDropdown();
        loadCoins().then(() => renderResults(allCoins.filter(c => c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query))));
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
    coinSearch.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

    window.addEventListener('resize', () => { if (dropdown.style.display !== 'none') positionDropdown(); });
    window.addEventListener('scroll', () => { if (dropdown.style.display !== 'none') positionDropdown(); }, { passive: true });

    'requestIdleCallback' in window ? requestIdleCallback(loadCoins) : setTimeout(loadCoins, 1500);
  }
}
customElements.define('cx-header', CryptoHeader);