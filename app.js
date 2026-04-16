// Initialize Lucide Icons
lucide.createIcons();

// State Management
let currentAgent = 'architect';
let userRole = 'admin';
let clubData = null;
let myRegistrations = [];
let transcriptInterval = null;

const agents = {
    architect: { name: 'Architect', pill: 'pill-architect', placeholder: 'Ask about planning...', responses: ["I've analyzed the $5,000 budget.", "Saturday is the best day for engagement."] },
    liaison: { name: 'Liaison', pill: 'pill-liaison', placeholder: 'Ask for marketing help...', responses: ["Drafts for Google are ready.", "LinkedIn growth is at 25%."] },
    sentinel: { name: 'Sentinel', pill: 'pill-sentinel', placeholder: 'Check security status...', responses: ["System is 100% secure.", "Weak password detected in treasurer account."] }
};

// --- Data Fetching ---
async function loadDataset() {
    try {
        const response = await fetch('dataset.json');
        clubData = await response.json();
        updateUI();
    } catch (e) {
        console.error("Failed to load dataset.");
    }
}

function updateUI() {
    if (!clubData) return;

    // Update Admin Dashboard
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 2) {
        statValues[0].textContent = clubData.summary.total_events;
        statValues[1].textContent = clubData.summary.total_budget.toLocaleString() + "$";
    }

    // Update Member Event Feed
    const feed = document.getElementById('event-feed');
    if (feed) {
        feed.innerHTML = `
            <h3 style="margin: 25px 0 15px; font-size: 18px; font-family: var(--font-title);">DISCOVER_EVENTS</h3>
            ${clubData.upcoming_events.map(event => `
                <div class="cyber-card fade-in" style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between;">
                        <h3 style="font-size: 16px;">${event.name}</h3>
                        <span style="color: var(--primary-cyan); font-size: 12px; font-weight: 700;">${event.date}</span>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 13px; margin: 10px 0;">Goal: ${event.target_attendance} attendees</p>
                    <button class="cyber-button" onclick="registerForEvent('${event.name}')" style="width: 100%; font-size: 11px; padding: 8px;">Register</button>
                </div>
            `).join('')}
        `;
    }

    // Update Admin Insights (AI Agent commentary)
    const insightsList = document.getElementById('ai-insights-list');
    if (insightsList && clubData.summary) {
        const insights = [
            { agent: 'Architect', type: 'pill-architect', text: `Growth is up ${clubData.summary.growth_rate}. Focus on the Tech Symposium scaling.` },
            { agent: 'Liaison', type: 'pill-liaison', text: `Budget of $${clubData.summary.total_budget.toLocaleString()} is optimal for Q3 marketing.` },
            { agent: 'Sentinel', type: 'pill-sentinel', text: `2 security threats blocked in the last 24 hours. Systems stable.` }
        ];

        insightsList.innerHTML = insights.map(insight => `
            <div class="cyber-card fade-in" style="padding: 15px; margin-bottom: 12px; border-right: 2px solid var(--primary-cyan);">
                <div class="agent-pill ${insight.type}" style="font-size: 10px; margin-bottom: 8px;">${insight.agent}_INSIGHT</div>
                <p style="font-size: 13px; line-height: 1.4;">${insight.text}</p>
            </div>
        `).join('');
    }
}

// --- Auth & Role Flow ---
function login(role) {
    userRole = role;
    const btn = document.querySelector(`.cyber-button[onclick="login('${role}')"]`);
    if (btn) btn.innerHTML = `<div class="spinner"></div>`;

    setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('app-main').style.display = 'flex';

        if (role === 'admin') {
            document.getElementById('admin-nav').style.display = 'flex';
            document.getElementById('member-nav').style.display = 'none';
            showScreen('dashboard');
        } else {
            document.getElementById('admin-nav').style.display = 'none';
            document.getElementById('member-nav').style.display = 'flex';
            showScreen('member-dashboard');
        }
    }, 1200);
}

// --- Smart Meeting Feature ---
function joinMeeting() {
    const modal = document.getElementById('live-meeting-modal');
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';

    // Simulate Transcript
    const transcriptText = [
        "Liaison IA: Hello everyone, let's discuss the Hackathon budget.",
        "President: We need $500 for the catering.",
        "Liaison IA: Analyzing local vendors... I found 3 options under $450.",
        "Architect IA: I recommend the Campus Plaza for the venue."
    ];
    let i = 0;
    transcriptInterval = setInterval(() => {
        document.getElementById('meeting-transcript').innerText = transcriptText[i % transcriptText.length];
        i++;
    }, 3000);
}

function leaveMeeting() {
    clearInterval(transcriptInterval);
    document.getElementById('live-meeting-modal').style.display = 'none';

    // Generate AI Summary
    const summaryCard = document.getElementById('meeting-ai-summary');
    summaryCard.innerHTML = `<div class="spinner" style="margin: 10px auto;"></div>`;

    setTimeout(() => {
        summaryCard.innerHTML = `
            <div class="agent-pill pill-architect" style="margin-bottom: 10px;">AI_SUMMARY_GENERATED</div>
            <p style="font-size: 13px; margin-bottom: 8px;">• <strong>Decided:</strong> Hackathon budget capped at $450.</p>
            <p style="font-size: 13px; margin-bottom: 8px;">• <strong>Venue:</strong> Campus Plaza selected for visibility.</p>
            <p style="font-size: 13px;">• <strong>Next Step:</strong> Liaison AI will draft the partnership proposal.</p>
        `;
    }, 2000);
}

// --- Utils ---
function registerForEvent(eventName) {
    if (myRegistrations.includes(eventName)) return alert("Already registered!");
    myRegistrations.push(eventName);
    updateMyEvents();
    alert(`Success! You are registered for ${eventName}`);
}

function updateMyEvents() {
    const list = document.getElementById('my-events-list');
    if (!list) return;
    list.innerHTML = myRegistrations.map(name => `
        <div class="cyber-card fade-in" style="border-left: 4px solid var(--primary-magenta);">
             <h3 style="font-size: 16px;">${name}</h3>
             <p style="color: var(--text-secondary); font-size: 12px; margin-top: 5px;">QR Ticket Generated</p>
        </div>
    `).join('') || `<div class="cyber-card" style="opacity: 0.6; text-align: center;">No registrations yet.</div>`;
}

function copyToClipboard(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => { alert("Copied!"); });
}

function toggleNotifs() {
    const panel = document.getElementById('notif-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function generateLiaisonContent() {
    const input = document.getElementById('liaison-input').value.trim();
    if (!input) return;
    const btn = document.querySelector("#liaison-hub .cyber-button");
    btn.innerHTML = `<div class="spinner"></div>`;
    setTimeout(() => {
        document.getElementById('insta-text').innerText = "📢 BIG NEWS: " + input + " is coming!";
        document.getElementById('email-text').innerText = "Subject: Sponsorship - " + input;
        btn.innerHTML = `Generate`;
        document.getElementById('liaison-results').style.display = 'block';
    }, 1000);
}

// --- Navigation ---
function showScreen(screenId, navEl) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (navEl) {
        const parentNav = navEl.parentElement;
        parentNav.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        navEl.classList.add('active');
    }
    if (screenId === 'chat') setupAgentSwiping();
}

function setupAgentSwiping() {
    const pills = document.querySelectorAll('#chat .agent-pill');
    pills.forEach(pill => {
        pill.onclick = () => {
            pills.forEach(p => p.style.opacity = '0.5');
            pill.style.opacity = '1';
            currentAgent = pill.textContent.toLowerCase();
            document.getElementById('user-input').placeholder = `Ask ${currentAgent}...`;
            document.getElementById('chat-messages').innerHTML = '';
            addMessage(`Hi! I'm your ${agents[currentAgent].name} Assistant.`);
        };
    });
}

function addMessage(text, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const msg = document.createElement('div');
    msg.className = `message ${isUser ? 'user' : 'bot'} fade-in`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleSend() {
    const input = document.getElementById('user-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';
    addMessage("Analyzing...", false);
    setTimeout(() => {
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.removeChild(chatMessages.lastChild);
            addMessage(agents[currentAgent].responses[0]);
        }
    }, 1000);
}

const sendB = document.getElementById('send-btn');
if (sendB) sendB.onclick = handleSend;

function scrollLogin(dir) {
    const login = document.getElementById('login');
    if (login) {
        const scrollAmount = 150;
        login.scrollBy(0, dir === 'up' ? -scrollAmount : scrollAmount);
    }
}

window.login = login;
window.showScreen = showScreen;
window.registerForEvent = registerForEvent;
window.generateLiaisonContent = generateLiaisonContent;
window.copyToClipboard = copyToClipboard;
window.toggleNotifs = toggleNotifs;
window.joinMeeting = joinMeeting;
window.leaveMeeting = leaveMeeting;
window.scrollLogin = scrollLogin;
// --- Scroll Tracking ---
const mainContent = document.getElementById('main-content');
const progressBar = document.getElementById('scroll-progress-bar');

if (mainContent && progressBar) {
    mainContent.addEventListener('scroll', () => {
        const winScroll = mainContent.scrollTop;
        const height = mainContent.scrollHeight - mainContent.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });
}

loadDataset();