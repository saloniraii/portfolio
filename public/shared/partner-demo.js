/* ============================================
   PARTNER DEMO COMPONENT — Saloni Rai Portfolio
   Reusable interactive phone mockup demo

   Usage:
   1. Add <link rel="stylesheet" href="/shared/partner-demo.css">
   2. Add <div id="partnerDemo"></div> where you want it
   3. Add <script src="/shared/partner-demo.js"></script>

   The component self-initializes and renders into #partnerDemo.
   All CSS classes are prefixed with "pd-" to avoid conflicts.
   ============================================ */

(function () {
    'use strict';

    // ═══════════════════════════════════════════════════
    // CONVERSATION DATA
    // ═══════════════════════════════════════════════════

    const CONVERSATIONS = {
        'partner-connect': {
            few: {
                slack: [
                    { type: 'bot', html: '📋 <strong>4 new leads</strong> added to your vendor CRM.', actions: [{ label: 'Browse leads', primary: true }, { label: 'Sync all 4' }, { label: 'Dismiss' }] },
                    { type: 'user', text: 'Browse leads' },
                    { type: 'bot', html: 'Here are your 4 new leads:<ul class="pd-lead-list"><li>☑️ Vertex Technologies — $200K — West</li><li>☑️ Cascade Analytics — $350K — NE</li><li>☑️ BrightPath Education — $85K — SE</li><li>☑️ TechWave Solutions — $95K — West</li></ul>', actions: [{ label: 'Sync all 4', primary: true }] },
                    { type: 'user', text: 'Sync all 4' },
                    { type: 'bot', html: '✅ <strong>4 leads</strong> synced to your CRM. Anything else? I can help write outreach for them.' },
                ],
                whatsapp: [
                    { type: 'user', text: 'Show me my new leads' },
                    { type: 'bot', html: 'You have <strong>4 new leads</strong>:<ul class="pd-lead-list"><li>1. Vertex Technologies — $200K — West</li><li>2. Cascade Analytics — $350K — NE</li><li>3. BrightPath Education — $85K — SE</li><li>4. TechWave Solutions — $95K — West</li></ul>Say "sync all" or tell me which to remove.' },
                    { type: 'user', text: 'sync all' },
                    { type: 'bot', html: '✅ Done, 4 leads synced to your CRM. Anything else?' },
                ],
                sms: [
                    { type: 'user', text: 'Show me my new leads' },
                    { type: 'bot', html: 'You have 4 new leads:<ul class="pd-lead-list"><li>1. Vertex Technologies $200K West</li><li>2. Cascade Analytics $350K NE</li><li>3. BrightPath Education $85K SE</li><li>4. TechWave Solutions $95K West</li></ul>Reply SYNC ALL or tell me which to skip.' },
                    { type: 'user', text: 'SYNC ALL' },
                    { type: 'bot', html: '✅ 4 leads synced. Anything else?' },
                ]
            },
            medium: {
                slack: [
                    { type: 'bot', html: '📋 <strong>15 new leads</strong> added to your vendor CRM.', actions: [{ label: 'Browse leads', primary: true }, { label: 'Sync all 15' }, { label: 'Dismiss' }] },
                    { type: 'user', text: 'Browse leads' },
                    { type: 'bot', html: 'Showing 1–5 of 15:<ul class="pd-lead-list"><li>☑️ Acme Corp — $450K — West</li><li>☑️ Pinnacle Dynamics — $420K — APAC</li><li>☑️ Cascade Analytics — $350K — NE</li><li>☑️ Nexus Partners — $340K — APAC</li><li>☑️ Vertex Technologies — $200K — West</li></ul>', actions: [{ label: 'Next 5' }, { label: 'Sync all 15', primary: true }] },
                    { type: 'user', text: 'Sync all 15' },
                    { type: 'bot', html: '✅ <strong>15 leads</strong> synced to your CRM. Want me to draft outreach?' },
                ],
                whatsapp: [
                    { type: 'user', text: 'Show me new leads' },
                    { type: 'bot', html: 'You have <strong>15 new leads</strong>. Here are the first 5:<ul class="pd-lead-list"><li>1. Acme Corp — $450K</li><li>2. Pinnacle Dynamics — $420K</li><li>3. Cascade Analytics — $350K</li><li>4. Nexus Partners — $340K</li><li>5. Vertex Technologies — $200K</li></ul>Say "next" for more, "sync all" to sync all 15.' },
                    { type: 'user', text: 'sync all' },
                    { type: 'bot', html: '✅ 15 leads synced to your CRM. Anything else?' },
                ],
                sms: [
                    { type: 'user', text: 'New leads?' },
                    { type: 'bot', html: '15 new leads. Top 5:<ul class="pd-lead-list"><li>1. Acme Corp $450K</li><li>2. Pinnacle $420K</li><li>3. Cascade $350K</li><li>4. Nexus $340K</li><li>5. Vertex $200K</li></ul>Reply SYNC ALL or NEXT for more.' },
                    { type: 'user', text: 'SYNC ALL' },
                    { type: 'bot', html: '✅ 15 leads synced.' },
                ]
            },
            many: {
                slack: [
                    { type: 'bot', html: '📋 <strong>92 new leads</strong> added to your vendor CRM.', actions: [{ label: 'Browse leads', primary: true }, { label: 'Sync all 92' }] },
                    { type: 'user', text: 'Show me APAC leads' },
                    { type: 'bot', html: '📍 <strong>APAC region</strong> — 18 leads found. Showing top 5:<ul class="pd-lead-list"><li>☑️ Pinnacle Dynamics — $420K</li><li>☑️ Cascade Analytics — $350K</li><li>☑️ Nexus Partners — $340K</li><li>☑️ Meridian Group — $250K</li><li>☑️ OceanView Tech — $220K</li></ul>', actions: [{ label: 'Only $200K+' }, { label: 'Sync these 5', primary: true }] },
                    { type: 'user', text: 'Only $200K+' },
                    { type: 'bot', html: '📍 APAC × $200K+ — <strong>6 leads</strong>:<ul class="pd-lead-list"><li>☑️ Pinnacle Dynamics — $420K</li><li>☑️ Cascade Analytics — $350K</li><li>☑️ Nexus Partners — $340K</li><li>☑️ Meridian Group — $250K</li><li>☑️ OceanView Tech — $220K</li><li>☑️ Summit Retail — $210K</li></ul>', actions: [{ label: 'Sync these 6', primary: true }] },
                    { type: 'user', text: 'Sync these 6' },
                    { type: 'bot', html: '✅ <strong>6 APAC leads</strong> ($200K+) synced. 86 leads remaining.' },
                ],
                whatsapp: [
                    { type: 'user', text: 'New leads?' },
                    { type: 'bot', html: 'You have <strong>92 new leads</strong>. Try a filter — say a region like "APAC" or a value like "$200K+".' },
                    { type: 'user', text: 'APAC $200K+' },
                    { type: 'bot', html: 'APAC × $200K+ — <strong>6 leads</strong>:<ul class="pd-lead-list"><li>1. Pinnacle Dynamics $420K</li><li>2. Cascade Analytics $350K</li><li>3. Nexus Partners $340K</li><li>4. Meridian Group $250K</li><li>5. OceanView Tech $220K</li><li>6. Summit Retail $210K</li></ul>Say "sync these" to add all 6.' },
                    { type: 'user', text: 'sync these' },
                    { type: 'bot', html: '✅ 6 APAC leads ($200K+) synced. 86 remaining.' },
                ],
                sms: [
                    { type: 'user', text: 'New leads' },
                    { type: 'bot', html: '92 new leads. Say a region or value to filter.' },
                    { type: 'user', text: 'APAC 200K+' },
                    { type: 'bot', html: 'APAC $200K+: 6 leads found. Reply SYNC to add all 6.' },
                    { type: 'user', text: 'SYNC' },
                    { type: 'bot', html: '✅ 6 leads synced. 86 remaining.' },
                ]
            }
        },
        'pricing-quotes': {
            _default: {
                slack: [
                    { type: 'user', text: 'I need a quote for Meridian Logistics' },
                    { type: 'bot', html: 'Sure! Let me pull up Meridian Logistics. <strong>Which product?</strong>', actions: [{ label: 'SmartSolar Pro' }, { label: 'CloudSync Enterprise', primary: true }, { label: 'DataVault 360' }] },
                    { type: 'user', text: 'CloudSync Enterprise' },
                    { type: 'bot', html: 'Got it. <strong>How many licenses?</strong>' },
                    { type: 'user', text: '150 users' },
                    { type: 'bot', html: '💰 Here\'s the pricing breakdown:<ul class="pd-lead-list"><li>CloudSync Enterprise × 150</li><li>List price: $89/user/mo</li><li>Partner tier discount (Gold): –15%</li><li>Volume discount (100+): –8%</li><li><strong>Your price: $69.19/user/mo</strong></li><li><strong>Annual total: $124,542</strong></li></ul>', actions: [{ label: 'Generate quote PDF', primary: true }, { label: 'Adjust terms' }] },
                    { type: 'user', text: 'Generate quote PDF' },
                    { type: 'bot', html: '✅ <strong>Quote #QT-2026-4871</strong> generated and sent to your email. Valid 30 days. Want me to send it to the customer too?' },
                ],
                whatsapp: [
                    { type: 'user', text: 'need a quote for Meridian Logistics, CloudSync Enterprise, 150 users' },
                    { type: 'bot', html: '💰 Pricing for Meridian Logistics:<ul class="pd-lead-list"><li>CloudSync Enterprise × 150</li><li>List: $89/user/mo</li><li>Gold partner: –15%</li><li>Volume (100+): –8%</li><li><strong>$69.19/user/mo</strong></li><li><strong>$124,542/year</strong></li></ul>Say "generate quote" to create the PDF.' },
                    { type: 'user', text: 'generate quote' },
                    { type: 'bot', html: '✅ Quote #QT-2026-4871 generated and emailed to you. Valid 30 days.' },
                ],
                sms: [
                    { type: 'user', text: 'Quote for Meridian, CloudSync Enterprise, 150 users' },
                    { type: 'bot', html: 'CloudSync Enterprise × 150 users:<ul class="pd-lead-list"><li>List: $89/user/mo</li><li>Partner discount: –15%</li><li>Volume discount: –8%</li><li>Your price: $69.19/user/mo</li><li>Annual: $124,542</li></ul>' },
                    { type: 'user', text: 'Generate quote' },
                    { type: 'bot', html: '✅ Quote #QT-2026-4871 sent to your email. Valid 30 days.' },
                ]
            }
        },
        'deal-registration': {
            _default: {
                slack: [
                    { type: 'user', text: 'I want to register a deal' },
                    { type: 'bot', html: 'Let\'s register this deal. <strong>Who\'s the customer?</strong>' },
                    { type: 'user', text: 'Meridian Logistics' },
                    { type: 'bot', html: 'Got it. <strong>Which product</strong> are they interested in?' },
                    { type: 'user', text: 'SmartSolar Pro, ~60 units' },
                    { type: 'bot', html: 'And <strong>when do you expect to close?</strong>' },
                    { type: 'user', text: 'end of next month' },
                    { type: 'bot', html: '✅ <strong>Done!</strong> Deal registered to Meridian Logistics.<ul class="pd-lead-list"><li>Product: SmartSolar Pro × 60</li><li>Close: Aug 2026</li><li>Status: Pending approval</li></ul>You\'ll get a decision within 5 business days.', actions: [{ label: 'Register another', primary: true }] },
                ],
                whatsapp: [
                    { type: 'user', text: 'register a deal' },
                    { type: 'bot', html: 'Let\'s register this deal. Who\'s the customer?' },
                    { type: 'user', text: 'Meridian Logistics' },
                    { type: 'bot', html: 'Got it. Which product are they interested in?' },
                    { type: 'user', text: 'SmartSolar Pro, ~60 units' },
                    { type: 'bot', html: 'When do you expect to close?' },
                    { type: 'user', text: 'end of next month' },
                    { type: 'bot', html: '✅ Deal registered!<ul class="pd-lead-list"><li>Customer: Meridian Logistics</li><li>Product: SmartSolar Pro × 60</li><li>Close: Aug 2026</li></ul>You\'ll hear back within 5 days.' },
                ],
                sms: [
                    { type: 'user', text: 'Register deal' },
                    { type: 'bot', html: 'Let\'s register. Customer name?' },
                    { type: 'user', text: 'Meridian Logistics' },
                    { type: 'bot', html: 'Product?' },
                    { type: 'user', text: 'SmartSolar Pro 60 units' },
                    { type: 'bot', html: 'Expected close date?' },
                    { type: 'user', text: 'End of next month' },
                    { type: 'bot', html: '✅ Registered. Meridian Logistics / SmartSolar Pro × 60 / Aug 2026. Decision in 5 days.' },
                ]
            }
        }
    };

    // ═══════════════════════════════════════════════════
    // JOURNEY METADATA
    // ═══════════════════════════════════════════════════

    const JOURNEYS = {
        'partner-connect': {
            title: 'Browse & Sync Leads',
            description: 'Partners receive new leads from their vendor\'s CRM. The agent presents them in-channel — filterable by region, value, or count — and syncs selections back with one word.',
            hasSubs: true
        },
        'pricing-quotes': {
            title: 'Pricing & Quotes',
            description: 'Tier discounts, volume pricing, and PDF quote generation — all through conversation. No portal login, no spreadsheet lookup, no "let me check with my manager."',
            hasSubs: false
        },
        'deal-registration': {
            title: 'Deal Registration',
            description: 'A 15-field CRM form compressed into natural dialogue. The partner talks, the agent maps each answer to the correct CRM field. Done in under a minute.',
            hasSubs: false
        }
    };

    // ═══════════════════════════════════════════════════
    // ICONS
    // ═══════════════════════════════════════════════════

    const ICONS = {
        slack: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z"/></svg>',
        whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
        sms: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>',
        send: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
        chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>'
    };

    // ═══════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════

    let currentJourney = 'partner-connect';
    let currentChannel = 'slack';
    let currentSub = 'few';
    let animationTimeouts = [];

    // ═══════════════════════════════════════════════════
    // RENDER SKELETON
    // ═══════════════════════════════════════════════════

    function init() {
        const root = document.getElementById('partnerDemo');
        if (!root) return;

        // Build accordion HTML
        let accordionHTML = '';
        const journeyKeys = Object.keys(JOURNEYS);
        journeyKeys.forEach((key, i) => {
            const j = JOURNEYS[key];
            accordionHTML += `
                <div class="pd-accordion-item${i === 0 ? ' active' : ''}" data-journey="${key}">
                    <button class="pd-accordion-trigger">
                        <span class="pd-acc-title">${j.title}</span>
                        <span class="pd-acc-arrow">${ICONS.chevron}</span>
                    </button>
                    <div class="pd-accordion-content">
                        <div class="pd-acc-description">
                            <div class="pd-acc-label">The journey</div>
                            <div class="pd-acc-problem">${j.description}</div>
                        </div>
                    </div>
                </div>`;
        });

        root.innerHTML = `
            <div class="pd-split-layout">
                <div class="pd-accordion-side">${accordionHTML}</div>
                <div class="pd-phone-side">
                    <div class="pd-channel-tabs">
                        <button class="pd-channel-tab active" data-channel="slack">${ICONS.slack} Slack</button>
                        <button class="pd-channel-tab" data-channel="whatsapp">${ICONS.whatsapp} WhatsApp</button>
                        <button class="pd-channel-tab" data-channel="sms">${ICONS.sms} SMS</button>
                    </div>
                    <div class="pd-sub-tabs" id="pdSubTabs">
                        <button class="pd-sub-tab active" data-sub="few">&lt; 5 Leads</button>
                        <button class="pd-sub-tab" data-sub="medium">5–20 Leads</button>
                        <button class="pd-sub-tab" data-sub="many">20+ Leads</button>
                    </div>
                    <div class="pd-phone-frame">
                        <div class="pd-phone-notch"></div>
                        <div class="pd-phone-status-bar" id="pdStatusBar">
                            <span class="pd-time">9:41</span>
                            <span class="pd-icons"><span></span><span></span><span></span></span>
                        </div>
                        <div class="pd-channel-header pd-slack" id="pdChannelHeader">
                            <div class="pd-avatar">AF</div>
                            <div>
                                <div class="pd-name">Agentforce for Partners</div>
                                <div class="pd-status">online</div>
                            </div>
                        </div>
                        <div class="pd-messages-area" id="pdMessagesArea"></div>
                        <div class="pd-input-bar">
                            <input type="text" placeholder="Type a message..." />
                            <button class="pd-send-btn">${ICONS.send}</button>
                        </div>
                        <div class="pd-phone-home"><span></span></div>
                    </div>
                </div>
            </div>
        `;

        bindEvents(root);
        renderMessages();
    }

    // ═══════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════

    function bindEvents(root) {
        // Accordion (journey) tabs
        root.querySelectorAll('.pd-accordion-item').forEach(item => {
            item.querySelector('.pd-accordion-trigger').addEventListener('click', () => {
                const wasActive = item.classList.contains('active');

                root.querySelectorAll('.pd-accordion-item').forEach(i => i.classList.remove('active'));

                if (!wasActive) {
                    item.classList.add('active');
                    currentJourney = item.dataset.journey;

                    // Show/hide sub-tabs
                    const subTabs = document.getElementById('pdSubTabs');
                    subTabs.style.display = JOURNEYS[currentJourney].hasSubs ? 'flex' : 'none';

                    renderMessages();
                }
            });
        });

        // Channel tabs
        root.querySelectorAll('.pd-channel-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                root.querySelectorAll('.pd-channel-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentChannel = tab.dataset.channel;
                renderMessages();
            });
        });

        // Sub tabs
        root.querySelectorAll('.pd-sub-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                root.querySelectorAll('.pd-sub-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentSub = tab.dataset.sub;
                renderMessages();
            });
        });
    }

    // ═══════════════════════════════════════════════════
    // MESSAGES
    // ═══════════════════════════════════════════════════

    function getMessages() {
        const journeyData = CONVERSATIONS[currentJourney];
        if (journeyData._default) {
            return journeyData._default[currentChannel] || [];
        }
        const subData = journeyData[currentSub];
        return subData ? (subData[currentChannel] || []) : [];
    }

    function updateHeader() {
        const names = { slack: 'Agentforce for Partners', whatsapp: 'Partner Cloud', sms: 'Partner Success Agent' };
        const classes = { slack: 'pd-channel-header pd-slack', whatsapp: 'pd-channel-header pd-whatsapp', sms: 'pd-channel-header pd-sms' };
        const avatarText = { slack: 'AF', whatsapp: 'PC', sms: 'PS' };

        const header = document.getElementById('pdChannelHeader');
        header.className = classes[currentChannel];
        header.innerHTML = `
            <div class="pd-avatar">${avatarText[currentChannel]}</div>
            <div>
                <div class="pd-name">${names[currentChannel]}</div>
                <div class="pd-status">online</div>
            </div>
        `;

        const statusBar = document.getElementById('pdStatusBar');
        if (currentChannel === 'slack') {
            statusBar.style.background = '#4a154b';
            statusBar.style.color = '#fff';
        } else if (currentChannel === 'whatsapp') {
            statusBar.style.background = '#075e54';
            statusBar.style.color = '#fff';
        } else {
            statusBar.style.background = '#f5f5f5';
            statusBar.style.color = '#000';
        }
    }

    function clearAnimations() {
        animationTimeouts.forEach(t => clearTimeout(t));
        animationTimeouts = [];
    }

    function renderMessages() {
        clearAnimations();

        const area = document.getElementById('pdMessagesArea');
        area.innerHTML = '';
        area.className = 'pd-messages-area' + (currentChannel === 'whatsapp' ? ' pd-whatsapp-bg' : '');

        updateHeader();

        const messages = getMessages();
        let delay = 300;

        messages.forEach((msg) => {
            const t = setTimeout(() => {
                if (msg.type === 'bot') {
                    const typing = document.createElement('div');
                    typing.className = 'pd-typing-indicator';
                    typing.innerHTML = '<span></span><span></span><span></span>';
                    area.appendChild(typing);
                    area.scrollTop = area.scrollHeight;

                    const t2 = setTimeout(() => {
                        typing.remove();
                        addMessage(area, msg);
                    }, 600);
                    animationTimeouts.push(t2);
                } else {
                    addMessage(area, msg);
                }
            }, delay);
            animationTimeouts.push(t);

            delay += msg.type === 'bot' ? 1200 : 800;
        });
    }

    function addMessage(area, msg) {
        const div = document.createElement('div');
        const channelClass = currentChannel === 'slack' ? 'pd-slack-msg' :
                             currentChannel === 'whatsapp' ? 'pd-whatsapp-msg' : 'pd-sms-msg';
        div.className = `pd-message pd-${msg.type} ${channelClass}`;

        let content = msg.html || msg.text;

        if (msg.actions) {
            content += '<div class="pd-msg-actions">';
            msg.actions.forEach(a => {
                content += `<button class="pd-msg-btn ${a.primary ? 'pd-primary' : ''}">${a.label}</button>`;
            });
            content += '</div>';
        }

        div.innerHTML = content;
        area.appendChild(div);
        area.scrollTop = area.scrollHeight;
    }

    // ═══════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
