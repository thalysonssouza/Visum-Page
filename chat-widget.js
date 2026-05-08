(function () {
  'use strict';

  /* ─────────────────────────────────────────
     LINKS
  ───────────────────────────────────────── */
  const WHATSAPP_URL = 'https://wa.me/+61981993389';
  const CALENDAR_URL = 'https://outlook.office.com/bookwithme/user/79c79516b3b64a62b6460255b3ee847d@trustedsolutions.com.br/meetingtype/dNCfStyqGUiONM2wExeZ9g2?anonymous&ep=mlink';

  /* ─────────────────────────────────────────
     STYLES
  ───────────────────────────────────────── */
  const CSS = `
    #vcw-root {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
      font-family: 'Switzer', 'Inter', sans-serif;
    }

    /* ── Floating button ── */
    #vcw-btn {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #884FFF, #7B2BFC);
      box-shadow: 0 4px 24px rgba(136, 79, 255, 0.45);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s;
      position: relative;
      flex-shrink: 0;
    }

    #vcw-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 32px rgba(136, 79, 255, 0.6);
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

    /* Pulse ring */
    #vcw-btn::before {
      content: '';
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      border: 2px solid rgba(136, 79, 255, 0.4);
      animation: vcw-pulse 2.4s ease-out infinite;
    }

    @keyframes vcw-pulse {
      0%   { transform: scale(1); opacity: 1; }
      70%  { transform: scale(1.3); opacity: 0; }
      100% { transform: scale(1.3); opacity: 0; }
    }

    /* ── Chat window ── */
    #vcw-window {
      width: 340px;
      background: #ffffff;
      border-radius: 20px;
      box-shadow: 0 16px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transform: translateY(16px) scale(0.95);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease;
      max-height: 520px;
    }

    #vcw-root.vcw-open #vcw-window {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    /* Header */
    .vcw-header {
      background: linear-gradient(135deg, #6B2EFF, #884FFF);
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .vcw-header-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: 1.5px solid rgba(255,255,255,0.3);
    }

    .vcw-header-info {
      flex: 1;
    }

    .vcw-header-name {
      color: white;
      font-size: 0.9rem;
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
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 6px #4ade80;
      animation: vcw-blink 2s ease-in-out infinite;
    }

    @keyframes vcw-blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .vcw-header-status span {
      color: rgba(255,255,255,0.8);
      font-size: 0.72rem;
      font-weight: 400;
    }

    /* Messages area */
    .vcw-messages {
      padding: 20px 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex: 1;
      overflow-y: auto;
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
      background: linear-gradient(135deg, #6B2EFF, #884FFF);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .vcw-bubble {
      background: #F4F0FF;
      border-radius: 16px 16px 16px 4px;
      padding: 11px 14px;
      font-size: 0.875rem;
      color: #1a1a2e;
      line-height: 1.5;
      max-width: 240px;
      font-weight: 400;
      animation: vcw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
    }

    @keyframes vcw-pop {
      from { transform: scale(0.85) translateY(8px); opacity: 0; }
      to   { transform: scale(1) translateY(0); opacity: 1; }
    }

    /* User bubble */
    .vcw-bubble-user {
      background: linear-gradient(135deg, #6B2EFF, #884FFF);
      color: white;
      border-radius: 16px 16px 4px 16px;
      align-self: flex-end;
      font-size: 0.875rem;
      padding: 11px 14px;
      line-height: 1.5;
      max-width: 220px;
      font-weight: 400;
      animation: vcw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
    }

    /* Typing dots */
    .vcw-typing {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 14px;
      background: #F4F0FF;
      border-radius: 16px 16px 16px 4px;
      width: fit-content;
      animation: vcw-pop 0.3s cubic-bezier(.34,1.56,.64,1);
    }

    .vcw-typing span {
      width: 6px;
      height: 6px;
      background: #884FFF;
      border-radius: 50%;
      animation: vcw-dot 1.2s ease-in-out infinite;
    }

    .vcw-typing span:nth-child(2) { animation-delay: 0.2s; }
    .vcw-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes vcw-dot {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    /* Options */
    .vcw-options {
      padding: 0 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      animation: vcw-pop 0.35s cubic-bezier(.34,1.56,.64,1);
    }

    .vcw-opt-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 13px 16px;
      border-radius: 12px;
      border: 1.5px solid #E8E0FF;
      background: white;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1a1a2e;
      font-family: inherit;
      transition: all 0.2s ease;
      text-align: left;
      width: 100%;
    }

    .vcw-opt-btn:hover {
      background: #F4F0FF;
      border-color: #884FFF;
      color: #6B2EFF;
      transform: translateX(3px);
    }

    .vcw-opt-btn .vcw-opt-icon {
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    /* Divider */
    .vcw-divider {
      border: none;
      border-top: 1px solid #F0ECF8;
      margin: 0 16px;
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div class="vcw-header-info">
            <div class="vcw-header-name">Inteligência Visum</div>
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
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
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
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
      addMsg('Olá! 👋 Sou a <strong>Inteligência Visum</strong>.<br>Como você prefere continuar?');

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
