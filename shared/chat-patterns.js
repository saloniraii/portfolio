/* ============================================
   CHAT PATTERNS COMPONENT — Saloni Rai Portfolio
   Reusable accordion + chat demo for conversational edge cases

   Usage:
   1. Add <div id="chatPatterns"></div> where you want it
   2. Link shared/chat-patterns.css
   3. Include this script after the div

   Self-initializing IIFE — renders into #chatPatterns automatically.
   ============================================ */

(function() {
    'use strict';

    // ─── SCENARIO DATA ───
    const SCENARIOS = {
        'bulk-data': {
            title: 'Bulk Data Display',
            subtitle: 'Bulk data, spoken',
            problem: 'Partner has 147 leads. You can\'t dump them all. No table component exists in chat. How do you make bulk data navigable through text alone?',
            solution: 'Summarize by region first, let them drill down with natural language filters. Page results in digestible chunks of 10.',
            messages: [
                { type: 'user', text: 'Show me all my leads' },
                { type: 'bot', text: 'You have 147 leads across 4 regions:\n\nWest — 52 leads ($4.2M)\nAPAC — 41 leads ($3.8M)\nNortheast — 33 leads ($2.1M)\nSoutheast — 21 leads ($1.4M)\n\nWant me to zoom into a region, filter by value, or show the top 10?' },
                { type: 'user', text: 'Top 10 by value' },
                { type: 'bot', text: 'Top 10 by deal value:\n\n1. Pinnacle Dynamics — $520K — APAC\n2. Acme Corp — $450K — West\n3. Cascade Analytics — $420K — APAC\n4. NovaTech Solutions — $390K — West\n5. Meridian Group — $380K — NE\n6. OceanView Tech — $350K — APAC\n7. Summit Retail — $340K — West\n8. Vertex AI — $320K — SE\n9. BrightPath Edu — $310K — NE\n10. Atlas Financial — $290K — West\n\nShowing 10 of 147. Say "next 10" or filter by region.' },
                { type: 'user', text: 'APAC ones over $300K' },
                { type: 'bot', text: 'APAC × $300K+ — 5 leads:\n\n1. Pinnacle Dynamics — $520K — Negotiation\n2. Cascade Analytics — $420K — Proposal\n3. OceanView Tech — $350K — Discovery\n4. TechWave APAC — $330K — Qualification\n5. NexusPoint — $310K — Proposal\n\nThat\'s all of them. Sync these 5, or drill into one?' },
            ]
        },
        'info-dump': {
            title: 'Info Dump Parsing',
            subtitle: 'Info dump, spoken',
            problem: 'User gives you everything at once in messy prose — name, product, quantity, contact, close date, all in one run-on sentence. Asking "is this the name? is this the product?" one by one is painful.',
            solution: 'Parse it all, present back structured for confirmation. Let them correct specific fields without re-entering everything.',
            messages: [
                { type: 'user', text: 'hey register a deal for me — its meridian logistics they want smartsolar pro about 60 units, close by end of august, contact is james chen james.chen@meridian.io, net new in APAC' },
                { type: 'bot', text: 'Got it — here\'s what I parsed:\n\nCustomer: Meridian Logistics\nProduct: SmartSolar Pro × 60\nClose: Aug 2026\nContact: James Chen (james.chen@meridian.io)\nType: Net new\nRegion: APAC\n\nLook right?' },
                { type: 'user', text: 'actually 80 units not 60' },
                { type: 'bot', text: 'Updated to 80 units. Everything else stays the same.\n\nReady to submit?' },
                { type: 'user', text: 'yes' },
                { type: 'bot', text: 'Done — deal registered. Meridian Logistics / SmartSolar Pro × 80 / Aug 2026. You\'ll get a decision in 5 business days.' },
            ]
        },
        'interruption': {
            title: 'Journey Interruption',
            subtitle: 'Interruption, spoken',
            problem: 'User is mid-way through deal registration, then suddenly asks an unrelated question. If you lose their progress, they\'ll have to start over. If you ignore their question, you seem rigid.',
            solution: 'Answer the interrupting question, silently save progress, offer to resume with one word. No data lost, no frustration.',
            messages: [
                { type: 'user', text: 'I want to register a deal' },
                { type: 'bot', text: 'Let\'s do it. Who\'s the customer?' },
                { type: 'user', text: 'Meridian Logistics' },
                { type: 'bot', text: 'Got it. Which product?' },
                { type: 'user', text: 'wait — how many leads did I sync yesterday?' },
                { type: 'bot', text: 'You synced 12 leads yesterday — 6 APAC, 4 West, 2 NE.\n\nI\'ve saved your deal registration progress (Meridian Logistics). Say "continue" when you want to pick back up.' },
                { type: 'user', text: 'continue' },
                { type: 'bot', text: 'Resuming — Meridian Logistics. Which product are they interested in?' },
                { type: 'user', text: 'SmartSolar Pro, 60 units, close end of August' },
                { type: 'bot', text: 'Done — deal registered. Meridian Logistics / SmartSolar Pro × 60 / Aug 2026.' },
            ]
        },
        'disambiguation': {
            title: 'Disambiguation',
            subtitle: 'Disambiguation, spoken',
            problem: '"Show me the Acme deal" — but there are 3 Acme entries. Traditional bots ask "Did you mean A, B, or C?" which feels robotic and annoying.',
            solution: 'Show all matches with enough context to differentiate (value, stage, region). Accept natural language to pick — "the big one" or "the one in negotiation" works.',
            messages: [
                { type: 'user', text: 'Show me the Acme deal' },
                { type: 'bot', text: 'I found 3 Acme deals:\n\n1. Acme Corp — $450K — Negotiation — West — Sep 2026\n2. Acme Healthcare — $280K — Discovery — NE — Nov 2026\n3. Acme Retail Group — $95K — Closed Won — SE — Jun 2026\n\nWhich one?' },
                { type: 'user', text: 'the big one in negotiation' },
                { type: 'bot', text: 'Acme Corp — $450K\n\nStage: Negotiation\nRegion: West\nContact: Sarah Miller\nNext step: Contract review (Jul 15)\nExpected close: Sep 2026\n\nWhat would you like to do with it?' },
            ]
        },
        'progressive': {
            title: 'Progressive Disclosure',
            subtitle: 'Progressive disclosure, spoken',
            problem: '"How are my deals going?" is vague. Dumping 23 deals with full details is overwhelming. Giving just a number is useless.',
            solution: 'Start with the summary, surface the most interesting signal (at-risk deals), let them drill in. Each layer adds depth on demand.',
            messages: [
                { type: 'user', text: 'how are my deals going?' },
                { type: 'bot', text: '23 active deals — $4.7M total pipeline.\n\n5 in Negotiation ($1.8M) — closest to close\n8 in Proposal ($1.6M)\n10 in Discovery ($1.3M)\n\n3 deals are at risk — no activity in 14+ days. Want to see those?' },
                { type: 'user', text: 'yes' },
                { type: 'bot', text: '3 at-risk deals:\n\n1. NovaTech — $390K — 18 days idle — Proposal — "Waiting on legal review"\n2. BrightPath — $310K — 21 days idle — Discovery — "Champion went on leave"\n3. Atlas Financial — $290K — 16 days idle — Proposal — No notes\n\nWant me to draft a check-in for any of these?' },
                { type: 'user', text: 'draft one for NovaTech' },
                { type: 'bot', text: '"Hi Sarah — circling back on the SmartSolar proposal. I know legal reviews take time — is there anything I can help move along on our end? Happy to hop on a call this week."\n\nSend it, or want me to adjust the tone?' },
            ]
        },
        'permission': {
            title: 'Permission Boundary',
            subtitle: 'Permission boundary, spoken',
            problem: 'User asks for data they don\'t have access to. A hard "Access Denied" is jarring and unhelpful. You need to say no without making them feel blocked.',
            solution: 'Explain why softly, immediately offer what they can see, and provide a path to get access. Turn a dead end into a fork in the road.',
            messages: [
                { type: 'user', text: 'show me the full revenue dashboard for Q3' },
                { type: 'bot', text: 'The Q3 revenue dashboard is restricted to Tier 1 partners. You\'re currently Gold (Tier 2).\n\nHere\'s what I can show you:\n— Your pipeline & bookings\n— Region partner leaderboard\n— Quota attainment vs. target\n\nOr I can send an access request to your partner manager.' },
                { type: 'user', text: 'request access' },
                { type: 'bot', text: 'Done — sent a request to Lisa Park (your Partner Manager). She usually responds in 1–2 business days.\n\nWant me to show your pipeline summary in the meantime?' },
            ]
        },
        'multi-intent': {
            title: 'Multi-Intent',
            subtitle: 'Multi-intent, spoken',
            problem: '"Sync my APAC leads and register a deal for Meridian" — two distinct actions in one breath. Forcing them to do one at a time ignores how people actually talk.',
            solution: 'Acknowledge both, handle them in sequence, report progress on each. The user sees both tasks advancing without having to manage the queue.',
            messages: [
                { type: 'user', text: 'Sync my APAC leads and register a deal for Meridian' },
                { type: 'bot', text: 'Two things — handling both.\n\n1. Syncing APAC leads...\n2. Registering deal for Meridian — will need a few details after.' },
                { type: 'bot', text: '1. Done — 12 APAC leads synced to your CRM.\n\n2. For the Meridian deal: which product?' },
                { type: 'user', text: 'CloudSync Enterprise, 150 users, close September' },
                { type: 'bot', text: 'Both done.\n\n1. 12 APAC leads synced ✓\n2. Deal registered — Meridian / CloudSync Enterprise × 150 / Sep 2026 ✓\n\nAnything else?' },
            ]
        },
        'confirmation': {
            title: 'Confirmation Design',
            subtitle: 'Confirmation, spoken',
            problem: '"Delete all my Southeast leads" — destructive, irreversible, affects $1.4M pipeline. Too little friction = accidental data loss. Too much = annoying.',
            solution: 'State exactly what will happen and the stakes. Require typing the action back as confirmation. Allow refinement ("keep the Proposal ones") before confirming.',
            messages: [
                { type: 'user', text: 'Delete all my Southeast leads' },
                { type: 'bot', text: 'That would permanently remove 21 leads from your CRM (Southeast region). Total pipeline affected: $1.4M. This includes 3 leads currently in Proposal stage.\n\nThis can\'t be undone. Type "delete 21 leads" to confirm.' },
                { type: 'user', text: 'wait, keep the ones in Proposal stage' },
                { type: 'bot', text: 'Keeping 3 Proposal-stage leads. That leaves 18 to delete (all in Discovery or Qualification only).\n\nRemoving: 18 leads ($980K)\nKeeping: 3 leads in Proposal ($420K)\n\nType "delete 18 leads" to confirm.' },
                { type: 'user', text: 'delete 18 leads' },
                { type: 'bot', text: '18 leads removed. 3 Proposal-stage leads kept.\n\nDeleted leads are recoverable from trash for 30 days by your admin.' },
            ]
        }
    };

    // ─── FIND CONTAINER ───
    const container = document.getElementById('chatPatterns');
    if (!container) return;

    // ─── RENDER HTML ───
    const scenarioKeys = Object.keys(SCENARIOS);
    const chevronSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>';

    let accordionHTML = '';
    scenarioKeys.forEach((key, i) => {
        const s = SCENARIOS[key];
        accordionHTML += `
            <div class="cp-accordion-item${i === 0 ? ' active' : ''}" data-scenario="${key}">
                <button class="cp-accordion-trigger">
                    <span class="cp-title">${s.title}</span>
                    <span class="cp-arrow">${chevronSVG}</span>
                </button>
                <div class="cp-accordion-content">
                    <div class="cp-description">
                        <div class="cp-label">The problem</div>
                        <div class="cp-problem">${s.problem}</div>
                        <div class="cp-solution">→ ${s.solution}</div>
                    </div>
                </div>
            </div>`;
    });

    container.innerHTML = `
        <div class="cp-split-layout">
            <div class="cp-accordion-side">${accordionHTML}</div>
            <div class="cp-chat-side">
                <div class="cp-chat-card">
                    <div class="cp-chat-header">
                        <div class="cp-chat-avatar">A</div>
                        <div class="cp-chat-header-text">
                            <div class="cp-chat-title">Partner Agent</div>
                            <div class="cp-chat-subtitle" id="cpChatSubtitle">${SCENARIOS[scenarioKeys[0]].subtitle}</div>
                        </div>
                    </div>
                    <div class="cp-chat-messages" id="cpChatMessages"></div>
                </div>
                <button class="cp-replay-btn" id="cpReplayBtn">↻ Replay</button>
            </div>
        </div>`;

    // ─── STATE ───
    let currentScenario = scenarioKeys[0];
    let animationTimeouts = [];
    const chatMessages = document.getElementById('cpChatMessages');
    const chatSubtitle = document.getElementById('cpChatSubtitle');

    // ─── ANIMATION ───
    function clearAnimations() {
        animationTimeouts.forEach(t => clearTimeout(t));
        animationTimeouts = [];
    }

    function addMessage(msg) {
        const div = document.createElement('div');
        div.className = `cp-msg ${msg.type === 'user' ? 'cp-user-msg' : 'cp-bot-msg'}`;
        const content = msg.text.replace(/\n/g, '<br>');
        div.innerHTML = `<div class="cp-bubble">${content}</div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderMessages() {
        clearAnimations();
        chatMessages.innerHTML = '';

        const scenario = SCENARIOS[currentScenario];
        chatSubtitle.textContent = scenario.subtitle;

        let delay = 300;

        scenario.messages.forEach((msg) => {
            const t = setTimeout(() => {
                if (msg.type === 'bot') {
                    const typing = document.createElement('div');
                    typing.className = 'cp-typing-dots';
                    typing.innerHTML = '<span></span><span></span><span></span>';
                    chatMessages.appendChild(typing);
                    chatMessages.scrollTop = chatMessages.scrollHeight;

                    const t2 = setTimeout(() => {
                        typing.remove();
                        addMessage(msg);
                    }, 600);
                    animationTimeouts.push(t2);
                } else {
                    addMessage(msg);
                }
            }, delay);
            animationTimeouts.push(t);

            delay += msg.type === 'bot' ? 1300 : 800;
        });
    }

    // ─── ACCORDION LOGIC ───
    container.querySelectorAll('.cp-accordion-item').forEach(item => {
        item.querySelector('.cp-accordion-trigger').addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            container.querySelectorAll('.cp-accordion-item').forEach(i => i.classList.remove('active'));

            if (!wasActive) {
                item.classList.add('active');
                currentScenario = item.dataset.scenario;
                renderMessages();
            }
        });
    });

    document.getElementById('cpReplayBtn').addEventListener('click', renderMessages);

    // ─── INIT ───
    renderMessages();

})();
