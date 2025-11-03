// ===================================
// EMOTIONAL SUPPORT CHATBOT (Advanced, updated)
// app.js
// ===================================

// ===================================
// EMOTION DETECTION SYSTEM
// ===================================
const emotionKeywords = {
    happy: ['happy', 'joyful', 'excited', 'wonderful', 'amazing', 'great', 'fantastic', 'delighted', 'cheerful', 'thrilled', 'awesome', 'brilliant', 'excellent', 'content'],
    grateful: ['thankful', 'grateful', 'blessed', 'appreciate', 'fortunate', 'lucky', 'gratitude', 'thanks'],
    loved: ['loved', 'cared', 'supported', 'cherished', 'valued', 'adored', 'treasured'],
    calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil', 'at peace', 'relieved', 'okay', 'fine'],
    proud: ['proud', 'accomplished', 'achieved', 'succeeded', 'won', 'completed', 'success', 'achievement'],
    sad: ['sad', 'depressed', 'down', 'unhappy', 'miserable', 'heartbroken', 'crying', 'tears', 'sorrow', 'grief'],
    anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'fearful', 'panic', 'anxiety', 'terrified'],
    angry: ['angry', 'mad', 'frustrated', 'annoyed', 'furious', 'irritated', 'upset', 'rage', 'anger'],
    lonely: ['lonely', 'alone', 'isolated', 'abandoned', 'empty', 'disconnected', 'solitary'],
    tired: ['tired', 'exhausted', 'drained', 'weary', 'fatigued', 'burned out', 'worn out'],
    confused: ['confused', 'uncertain', 'unsure', 'lost', 'puzzled', "don't know", 'unclear'],
    bored: ['bored', 'unmotivated', 'indifferent', 'apathetic', 'disinterested'],
    stressed: ['stressed', 'overwhelmed', 'pressure', 'busy', 'hectic', 'swamped', 'overworked', 'tensed']
};

// ===================================
// ELABORATE EMOTIONAL RESPONSES
// ===================================
const emotionResponses = {
    happy: [
        "That’s truly wonderful to hear! 🌞 Your happiness radiates through your words. I can almost feel the warmth in your energy. When we’re happy, everything around us feels lighter — it’s a reminder that joy deserves to be celebrated, even in the small moments. Hold onto this feeling; it’s precious and healing."
    ],
    grateful: [
        "That’s such a beautiful place to be in. 🌸 Gratitude opens the heart and softens the spirit. When we take a moment to recognize the blessings around us — even the simple ones — life starts to feel richer and more meaningful. I’m so glad you’re in touch with that feeling today."
    ],
    loved: [
        "Feeling loved is one of life’s greatest gifts 💕. It gives us strength, safety, and a deep sense of belonging. It’s beautiful that you’re surrounded by people or moments that make you feel cared for. You deserve to be loved deeply, without hesitation, just for being who you are."
    ],
    calm: [
        "That’s wonderful, truly 🌿. Calmness is a rare treasure in today’s world. It’s in these peaceful moments that we reconnect with ourselves — our breath, our purpose, and our quiet joy. If you can, take a slow breath and enjoy the stillness; it’s your mind thanking you for listening."
    ],
    proud: [
        "I can feel the pride in your words, and you should absolutely embrace it 🌟. You’ve worked hard for this moment, and it’s okay to acknowledge your strength. Sometimes we move so fast that we forget to celebrate how far we’ve come. Take this moment — it’s yours to enjoy and reflect upon."
    ],
    sad: [
        "I can sense the heaviness in your heart 💙. It’s okay to feel sad — it doesn’t mean you’re weak, it means you care deeply. Sometimes sadness helps us release what we’ve been holding inside. You’re not alone; I’m here with you, listening. Be gentle with yourself right now — even sadness is part of healing."
    ],
    anxious: [
        "That sounds like a storm of thoughts swirling inside 💭. Anxiety can be so consuming, can’t it? But you’re safe here, and we can slow things down together. Try taking a slow breath in, and a longer breath out. Even small breaths remind your body you’re in control, one step at a time."
    ],
    angry: [
        "I can tell you’re upset, and that’s perfectly human 🔥. Anger often hides deeper emotions — pain, frustration, or feeling unheard. It’s okay to express it here safely. Let it out in words, not harm. I’m here to listen without judgment, and to help you find calm after the storm."
    ],
    lonely: [
        "Loneliness can be such a quiet ache 💔. It’s hard when we feel unseen or disconnected. But please know this: you are not invisible. I see you, I hear you, and you matter deeply. Sometimes connection begins with a single conversation — and this one counts. You are not truly alone tonight."
    ],
    tired: [
        "You sound worn out, and that’s perfectly okay 😔. Life can drain even the strongest hearts. Please remember — rest isn’t laziness, it’s self-respect. You’ve given so much of yourself; now it’s time to refill your cup. Be still for a while, breathe, and let your body and mind restore themselves."
    ],
    confused: [
        "Feeling uncertain is part of being human 🌫️. It means you’re growing, stretching beyond what’s comfortable. It’s okay not to have all the answers yet — clarity often comes slowly, like dawn breaking through fog. You’re finding your way, and I’m here to help you sort through the thoughts if you want."
    ],
    bored: [
        "Sometimes boredom whispers that our soul is ready for something new 🌱. It’s a quiet signal, not a bad one. Maybe your heart wants creativity, movement, or simply a change of pace. Let’s think together — what’s one small thing that might bring a spark back to your day?"
    ],
    stressed: [
        "That sounds like a lot to carry 💼. Stress can weigh on both the mind and the heart, leaving us feeling like we’re never enough. But you’re doing your best, even if it doesn’t feel like it. Take one small pause — unclench your shoulders, breathe in, breathe out. You are allowed to rest."
    ]
};

const defaultResponses = [
    "Thank you for sharing that with me 💝. I’m here with you — ready to listen, reflect, and understand. Would you like to tell me a bit more about what led you to feel this way?",
    "I hear your emotions clearly 🌷. Every feeling tells a story, and yours matters deeply. Please, go on — I’m listening."
];

// ===================================
// EMOTION DETECTION
// ===================================
function detectEmotion(message) {
    const lowerMessage = message.toLowerCase();
    let detectedEmotion = null;
    let emotionScore = 0;
    let negated = false;
    let negatedMatchedEmotion = null;

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
        let score = 0;
        for (const keyword of keywords) {
            const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gi');
            const matches = lowerMessage.match(regex);
            if (matches) score += matches.length;
        }
        if (score > emotionScore) {
            emotionScore = score;
            detectedEmotion = emotion;
        }
    }

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
        for (const keyword of keywords) {
            const negPatterns = [
                new RegExp(`\\bnot\\s+${escapeRegExp(keyword)}\\b`, 'i'),
                new RegExp(`\\bnot\\s+feeling\\s+${escapeRegExp(keyword)}\\b`, 'i'),
                new RegExp(`\\bi[' ]?m\\s+not\\s+${escapeRegExp(keyword)}\\b`, 'i'),
                new RegExp(`\\bi\\s+am\\s+not\\s+${escapeRegExp(keyword)}\\b`, 'i'),
                new RegExp(`\\bno\\s+longer\\s+${escapeRegExp(keyword)}\\b`, 'i'),
                new RegExp(`\\bnot\\s+really\\s+${escapeRegExp(keyword)}\\b`, 'i'),
                new RegExp(`\\bnever\\s+${escapeRegExp(keyword)}\\b`, 'i')
            ];
            if (negPatterns.some(rx => rx.test(lowerMessage))) {
                negated = true;
                negatedMatchedEmotion = emotion;
                break;
            }
        }
        if (negated) break;
    }

    let finalEmotion = detectedEmotion;
    if (negated && negatedMatchedEmotion) {
        finalEmotion = 'calm';
    }
    return { emotion: finalEmotion, detected: detectedEmotion, negated, negatedMatchedEmotion };
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ===================================
// RESPONSE GENERATION
// ===================================
function getEmotionalResponse(result, originalMessage) {
    const userName = localStorage.getItem('userName') || 'friend';
    const { emotion, detected, negated, negatedMatchedEmotion } = result;

    if (negated && negatedMatchedEmotion) {
        const pastEmotion = negatedMatchedEmotion;
        const templates = [
            `I’m relieved to hear you’re not ${pastEmotion} anymore, ${userName}. That suggests something has shifted — perhaps a situation eased or you found a small relief. Would you like to share what helped?`,
            `It’s good to hear you’re feeling less ${pastEmotion}, ${userName}. That change matters. If you want, tell me what felt different — even small comforts are worth noting.`,
            `That’s encouraging to hear, ${userName}. Not feeling ${pastEmotion} anymore can feel like a quiet ease returning. If you want, we can reflect on what helped bring that ease.`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }

    if (emotion && emotionResponses[emotion]) {
        const responses = emotionResponses[emotion];
        let response = responses[Math.floor(Math.random() * responses.length)];
        response += ` ${userName}, thank you for sharing that so openly.`;
        if (['sad', 'anxious', 'lonely', 'stressed', 'tired'].includes(emotion)) {
            response += ` Would you like a gentle breathing exercise or a comforting thought right now?`;
        }
        return response;
    }

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)] + ` ${userName}.`;
}

// ===================================
// CHAT LOGIC
// ===================================
function checkUserLogin() {
    const userName = localStorage.getItem('userName');
    const userAge = localStorage.getItem('userAge');
    if (!userName || !userAge) {
        window.location.href = 'index.html';
        return false;
    }
    return { userName, userAge };
}

function initializeChat() {
    const userData = checkUserLogin();
    if (!userData) return;

    const greetingEl = document.getElementById('userGreeting');
    const infoEl = document.getElementById('userInfo');
    if (greetingEl) greetingEl.textContent = `Hello, ${userData.userName}! 👋`;
    if (infoEl) infoEl.textContent = `${userData.userName} (${userData.userAge} years old)`;

    loadChatHistory();
    refreshHistoryList();

    const messages = getChatHistory();
    if (messages.length === 0) {
        setTimeout(() => {
            addBotMessage(`Welcome to Aura, 🌷 I’m Aura — your virtual emotional-support companion. I may not be human, but I listen with care and understanding. Let’s begin anew... how are you feeling right now?`, 'welcome');
        }, 700);
    }
}

// ===================================
// REMAINDER (unchanged)
// ===================================

function getChatHistory() {
    const history = localStorage.getItem('chatHistory');
    return history ? JSON.parse(history) : [];
}

function saveChatHistory(messages) {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
}

function addMessageToHistory(sender, message, emotion = null) {
    const messages = getChatHistory();
    const data = { sender, message, timestamp: new Date().toISOString(), emotion };
    messages.push(data);
    saveChatHistory(messages);
    refreshHistoryList();
    return data;
}

function loadChatHistory() {
    const messages = getChatHistory();
    const wrapper = document.getElementById('messagesWrapper');
    wrapper.innerHTML = '';
    messages.forEach(msg => displayMessage(msg.sender, msg.message, msg.timestamp, msg.emotion));
    scrollToBottom();
}

function displayMessage(sender, message, timestamp, emotion = null) {
    const wrapper = document.getElementById('messagesWrapper');
    const div = document.createElement('div');
    div.className = `message ${sender} ${emotion ? 'emotion-' + emotion : ''}`;
    const time = formatTimestamp(timestamp);
    div.innerHTML = `
        <div class="bubble">${escapeHtml(message)}</div>
        <div class="meta">${time}${emotion ? ` — <span class="emotion-tag">${emotion}</span>` : ''}</div>
    `;
    wrapper.appendChild(div);
    scrollToBottom();
}

function addUserMessage(message) {
    const data = addMessageToHistory('user', message);
    displayMessage('user', message, data.timestamp);
}

function addBotMessage(message, emotion = null) {
    const data = addMessageToHistory('ai', message, emotion);
    displayMessage('ai', message, data.timestamp, emotion);
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    if (!message) return;

    addUserMessage(message);
    input.value = '';
    showTypingIndicator();

    const detection = detectEmotion(message);
    const delay = 1200 + Math.random() * 1000;

    setTimeout(() => {
        const response = getEmotionalResponse(detection, message);
        hideTypingIndicator();
        addBotMessage(response, detection.emotion);
    }, delay);
}

function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.style.display = 'block';
    scrollToBottom();
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.style.display = 'none';
}

function clearChat() {
    if (confirm('Clear chat history?')) {
        localStorage.removeItem('chatHistory');
        const wrapper = document.getElementById('messagesWrapper');
        if (wrapper) wrapper.innerHTML = '';
        addBotMessage(`Welcome to Aura, 🌷 I’m Aura — your virtual emotional-support companion. I may not be human, but I listen with care and understanding. Let’s begin anew... how are you feeling right now?`, 'welcome');
    }
}

function formatTimestamp(ts) {
    const d = new Date(ts);
    return d.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    const container = document.getElementById('messagesWrapper');
    setTimeout(() => {
        if (container) container.scrollTop = container.scrollHeight;
    }, 100);
}

function refreshHistoryList() {
    const listEl = document.getElementById('historyList');
    if (!listEl) return;
    const messages = getChatHistory();
    if (!messages || messages.length === 0) {
        listEl.textContent = 'No messages yet.';
        return;
    }

    const recent = messages.slice(-8).reverse();
    listEl.innerHTML = '';
    for (const m of recent) {
        const item = document.createElement('div');
        item.className = 'history-item';
        const time = new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        item.innerHTML = `<strong>${m.sender === 'user' ? 'You' : 'Aura'}</strong> <span style="float:right;font-size:12px;color:#777">${time}</span><div style="margin-top:6px;font-size:14px;color:#444">${escapeHtml(m.message.length > 120 ? m.message.slice(0, 117) + '...' : m.message)}</div>`;
        listEl.appendChild(item);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeChat();

    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);

    const newChatBtn = document.getElementById('newChatBtn');
    if (newChatBtn) newChatBtn.addEventListener('click', clearChat);

    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const messages = getChatHistory();
            const text = messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}: ${m.message}`).join('\n\n');
            const blob = new Blob([text], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `aura_chat_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }
});
