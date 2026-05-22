(function () {
  'use strict';

  /* ─────────────────────────────────────────
     LINKS
  ───────────────────────────────────────── */
  const WHATSAPP_URL = 'https://wa.me/+11996735363';
  const CALENDAR_URL = 'https://outlook.office.com/book/Visum1@visumhub.ai/?ismsaljsauthenabled=true';

  /* ─────────────────────────────────────────
     STYLES
  ───────────────────────────────────────── */
  const CSS = `
    #vcw-root {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      font-family: 'Switzer', 'Inter', sans-serif;
      pointer-events: none;
    }

    #vcw-btn {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #111827;
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
      position: relative;
      flex-shrink: 0;
      overflow: hidden;
      padding: 0;
      pointer-events: auto;
    }

    #vcw-btn:hover {
      transform: scale(1.06);
      box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    }

    #vcw-btn .vcw-btn-icon {
      transition: opacity 0.2s, transform 0.2s;
    }

    #vcw-btn .vcw-btn-close {
      position: absolute;
      opacity: 0;
      transform: rotate(-90deg) scale(0.5);
      transition: opacity 0.2s, transform 0.2s;
    }

    #vcw-root.vcw-open #vcw-btn .vcw-btn-icon {
      opacity: 0;
      transform: scale(0.5);
    }

    #vcw-root.vcw-open #vcw-btn .vcw-btn-close {
      opacity: 1;
      transform: rotate(0deg) scale(1);
    }

    /* ── Chat window ── */
    #vcw-window {
      width: 336px;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.06);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: translateY(12px) scale(0.96);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.28s cubic-bezier(.34,1.56,.64,1), opacity 0.22s ease;
      max-height: 500px;
    }

    #vcw-root.vcw-open #vcw-window {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    /* Header — minimal white */
    .vcw-header {
      background: #ffffff;
      border-bottom: 1px solid #f0f0f0;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 11px;
    }

    .vcw-header-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1.5px solid #e5e7eb;
      overflow: hidden;
    }

    .vcw-header-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .vcw-header-info {
      flex: 1;
    }

    .vcw-header-name {
      color: #111827;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .vcw-header-status {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 2px;
    }

    .vcw-status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #22c55e;
      flex-shrink: 0;
    }

    .vcw-header-status span {
      color: #6b7280;
      font-size: 0.72rem;
      font-weight: 400;
    }

    /* Messages area */
    .vcw-messages {
      padding: 16px 14px 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      overflow-y: auto;
      background: #fafafa;
    }

    /* AI message bubble */
    .vcw-msg-row {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    .vcw-msg-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .vcw-msg-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .vcw-bubble {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 14px 14px 14px 4px;
      padding: 10px 13px;
      font-size: 0.855rem;
      color: #111827;
      line-height: 1.55;
      max-width: 230px;
      font-weight: 400;
      animation: vcw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }

    @keyframes vcw-pop {
      from { transform: scale(0.88) translateY(6px); opacity: 0; }
      to   { transform: scale(1) translateY(0); opacity: 1; }
    }

    /* User bubble */
    .vcw-bubble-user {
      background: #111827;
      color: white;
      border-radius: 14px 14px 4px 14px;
      align-self: flex-end;
      font-size: 0.855rem;
      padding: 10px 13px;
      line-height: 1.55;
      max-width: 210px;
      font-weight: 400;
      animation: vcw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
    }

    /* Typing dots */
    .vcw-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 11px 13px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 14px 14px 14px 4px;
      width: fit-content;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      animation: vcw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
    }

    .vcw-typing span {
      width: 5px;
      height: 5px;
      background: #9ca3af;
      border-radius: 50%;
      animation: vcw-dot 1.2s ease-in-out infinite;
    }

    .vcw-typing span:nth-child(2) { animation-delay: 0.2s; }
    .vcw-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes vcw-dot {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
      30% { transform: translateY(-4px); opacity: 1; }
    }

    /* Options */
    .vcw-options {
      padding: 12px 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 7px;
      background: #ffffff;
      animation: vcw-pop 0.35s cubic-bezier(.34,1.56,.64,1);
    }

    .vcw-opt-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 14px;
      border-radius: 10px;
      border: 1px solid #e5e7eb;
      background: #fafafa;
      cursor: pointer;
      font-size: 0.855rem;
      font-weight: 500;
      color: #111827;
      font-family: inherit;
      transition: all 0.18s ease;
      text-align: left;
      width: 100%;
    }

    .vcw-opt-btn:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
      color: #000000;
      transform: translateX(2px);
    }

    .vcw-opt-btn .vcw-opt-icon {
      font-size: 1rem;
      flex-shrink: 0;
    }

    /* Divider */
    .vcw-divider {
      border: none;
      border-top: 1px solid #f0f0f0;
      margin: 0;
    }
  `;

  /* ─────────────────────────────────────────
     HTML

  ───────────────────────────────────────── */
  const HTML = `
    <div id="vcw-root">
      <!-- Chat window -->
      <div id="vcw-window" role="dialog" aria-label="Chat Visum" aria-modal="true">
        <div class="vcw-header">
          <div class="vcw-header-avatar">
            <img src="assets/ana-visum-avatar.png" alt="Ana" loading="lazy">
          </div>
          <div class="vcw-header-info">
            <div class="vcw-header-name">Ana · Visum</div>
            <div class="vcw-header-status">
              <div class="vcw-status-dot"></div>
              <span>Online agora</span>
            </div>
          </div>
        </div>

        <div class="vcw-messages" id="vcw-messages"></div>
        <hr class="vcw-divider" id="vcw-divider" style="display:none;">
        <div class="vcw-options" id="vcw-options" style="display:none;">
          <button class="vcw-opt-btn" id="vcw-opt-whatsapp">
            <span class="vcw-opt-icon">💬</span>
            Falar no WhatsApp
          </button>
          <button class="vcw-opt-btn" id="vcw-opt-calendar">
            <span class="vcw-opt-icon">📅</span>
            Agendar uma reunião
          </button>
        </div>
      </div>

      <!-- Floating toggle button -->
      <button id="vcw-btn" aria-label="Abrir chat">
        <!-- Chat icon -->
        <svg class="vcw-btn-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <!-- Close icon -->
        <svg class="vcw-btn-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;

  /* ─────────────────────────────────────────
     HELPERS
  ───────────────────────────────────────── */
  function addMsg(html, type = 'ai') {
    const messages = document.getElementById('vcw-messages');
    if (type === 'ai') {
      const row = document.createElement('div');
      row.className = 'vcw-msg-row';
      row.innerHTML = `
        <div class="vcw-msg-avatar">
          <img src="assets/ana-visum-avatar.png" alt="Ana" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div class="vcw-bubble">${html}</div>
      `;
      messages.appendChild(row);
    } else {
      const bubble = document.createElement('div');
      bubble.className = 'vcw-bubble-user';
      bubble.textContent = html;
      messages.appendChild(bubble);
    }
    messages.scrollTop = messages.scrollHeight;
    return messages.lastElementChild;
  }

  function showTyping() {
    const messages = document.getElementById('vcw-messages');
    const row = document.createElement('div');
    row.className = 'vcw-msg-row';
    row.id = 'vcw-typing-row';
    row.innerHTML = `
      <div class="vcw-msg-avatar">
        <img src="assets/ana-visum-avatar.png" alt="Ana" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="vcw-typing"><span></span><span></span><span></span></div>
    `;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('vcw-typing-row');
    if (t) t.remove();
  }

  function clearChat() {
    document.getElementById('vcw-messages').innerHTML = '';
    const opts = document.getElementById('vcw-options');
    const div = document.getElementById('vcw-divider');
    opts.style.display = 'none';
    div.style.display = 'none';
  }

  /* ─────────────────────────────────────────
     CONVERSATION FLOW
  ───────────────────────────────────────── */
  function startConversation() {
    clearChat();

    // Step 1 – typing indicator
    showTyping();

    setTimeout(() => {
      removeTyping();
      addMsg('Olá! 👋 Sou a <strong>Ana</strong>, da equipe Visum.<br>Como posso te ajudar hoje?');

      // Step 2 – show options
      setTimeout(() => {
        const opts = document.getElementById('vcw-options');
        const div = document.getElementById('vcw-divider');
        opts.style.display = 'flex';
        div.style.display = 'block';
      }, 350);
    }, 1100);
  }

  function handleOption(label, url) {
    // Hide options
    document.getElementById('vcw-options').style.display = 'none';
    document.getElementById('vcw-divider').style.display = 'none';

    // User bubble
    addMsg(label, 'user');

    // AI typing
    setTimeout(() => {
      showTyping();
      setTimeout(() => {
        removeTyping();
        addMsg('Perfeito! Redirecionando você agora... 🚀<br>Até logo!');

        // Open link
        setTimeout(() => {
          window.open(url, '_blank');
        }, 500);

        // Auto-close after 2.5s
        setTimeout(() => {
          closeChat();
        }, 2500);
      }, 900);
    }, 300);
  }

  /* ─────────────────────────────────────────
     OPEN / CLOSE
  ───────────────────────────────────────── */
  let isOpen = false;

  function openChat() {
    isOpen = true;
    document.getElementById('vcw-root').classList.add('vcw-open');
    document.getElementById('vcw-btn').setAttribute('aria-label', 'Fechar chat');
    startConversation();
  }

  function closeChat() {
    isOpen = false;
    document.getElementById('vcw-root').classList.remove('vcw-open');
    document.getElementById('vcw-btn').setAttribute('aria-label', 'Abrir chat');
    // Reset chat after transition
    setTimeout(clearChat, 350);
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = CSS;
    document.head.appendChild(styleEl);

    // Inject HTML
    document.body.insertAdjacentHTML('beforeend', HTML);

    // Events
    document.getElementById('vcw-btn').addEventListener('click', () => {
      isOpen ? closeChat() : openChat();
    });

    document.getElementById('vcw-opt-whatsapp').addEventListener('click', () => {
      handleOption('Falar no WhatsApp', WHATSAPP_URL);
    });

    document.getElementById('vcw-opt-calendar').addEventListener('click', () => {
      handleOption('Agendar uma reunião', CALENDAR_URL);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
