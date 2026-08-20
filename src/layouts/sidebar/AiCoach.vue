<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAppStore } from '@/stores/app'

const app = useAppStore()

const inputText = ref('')
const messagesBox = ref<HTMLElement | null>(null)

function ask(q: string) {
  app.coachAsk(q)
}

function send() {
  const q = inputText.value.trim()

  if (!q) return

  inputText.value = ''
  ask(q)
}

watch(
  () => app.aiMessages.length,
  async () => {
    await nextTick()

    if (messagesBox.value) {
      messagesBox.value.scrollTop = messagesBox.value.scrollHeight
    }
  }
)
</script>

<template>
  <MainLayout>
    <div class="coach-page">
      <!-- ================= HEADER ================= -->
      <header class="page-header">
        <div>
          <div class="section-label">AI Coach</div>

          <h1 class="page-title">Your money, explained in plain language.</h1>

          <p class="page-sub">
            Ask BudgetVault about your spending, budget, savings goals or upcoming commitments. Your
            coach helps you understand what's happening and what you could do next.
          </p>
        </div>
      </header>

      <!-- ================= HERO ================= -->
      <section class="coach-hero">
        <div class="hero-content">
          <div class="hero-label">
            <span class="hero-dot"></span>
            Your personal money coach
          </div>

          <h2>What would you like to understand about your money?</h2>

          <p>Ask a question or choose one of the suggestions below.</p>

          <div class="quick-actions">
            <button class="quick-btn" @click="ask('How am I doing this month?')">
              How am I doing?
            </button>

            <button class="quick-btn" @click="ask('Where am I spending too much?')">
              Find overspending
            </button>

            <button class="quick-btn" @click="ask('Can I afford my next goal?')">
              Check a goal
            </button>

            <button class="quick-btn" @click="ask('Help me plan next month')">
              Plan next month
            </button>
          </div>
        </div>
      </section>

      <!-- ================= MAIN CONTENT ================= -->
      <div class="coach-grid">
        <!-- CHAT -->
        <v-card class="panel chat-panel" variant="flat">
          <div class="panel-heading">
            <div>
              <h2 class="panel-title">Talk to your coach</h2>

              <span class="panel-sub"> Ask anything about your BudgetVault plan. </span>
            </div>

            <div class="coach-status">
              <span></span>
              Ready
            </div>
          </div>

          <!-- Messages -->
          <div ref="messagesBox" class="messages-box">
            <div
              v-for="(m, i) in app.aiMessages"
              :key="i"
              class="message-row"
              :class="{ 'user-row': m.role === 'user' }"
            >
              <!-- Coach avatar -->
              <div v-if="m.role === 'coach'" class="coach-avatar">✦</div>

              <div
                class="message-bubble"
                :class="m.role === 'user' ? 'user-message' : 'coach-message'"
              >
                {{ m.text }}
              </div>
            </div>

            <!-- Empty state -->
            <div v-if="!app.aiMessages.length" class="empty-chat">
              <div class="empty-icon">✦</div>

              <strong> Your AI Coach is ready. </strong>

              <span> Ask a question below or choose one of the suggestions. </span>
            </div>
          </div>

          <!-- Input -->
          <div class="chat-input-wrap">
            <input
              v-model="inputText"
              type="text"
              placeholder="e.g. Can I save ₦100,000 this month?"
              @keydown.enter="send"
            />

            <button class="ask-btn" @click="send">Ask</button>
          </div>

          <p class="disclaimer">
            Coach suggestions are educational guidance based on information in your BudgetVault.
            They are not financial, investment or lending advice.
          </p>
        </v-card>

        <!-- INSIGHTS -->
        <v-card class="panel insights-panel" variant="flat">
          <div class="panel-heading">
            <div>
              <h2 class="panel-title">What your money is saying</h2>

              <span class="panel-sub"> A quick view of your current financial picture. </span>
            </div>
          </div>

          <div class="insights-list">
            <div class="insight-card">
              <div class="insight-title">You're on track with savings</div>

              <p>
                You've saved ₦18,000 this month. Keeping your current pace could put you around
                ₦216,000 ahead over a full year.
              </p>
            </div>

            <div class="insight-card">
              <div class="insight-title">Your flexible spending needs attention</div>

              <p>
                Food, transport and small purchases are taking a larger share of your available
                money than your planned budget.
              </p>
            </div>

            <div class="insight-card">
              <div class="insight-title">One upcoming commitment</div>

              <p>
                Your next major planned payment is close enough that the coach recommends protecting
                that amount before discretionary spending.
              </p>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <span> Budget health </span>

              <strong class="good"> Good </strong>
            </div>

            <div class="stat-card">
              <span> Savings pace </span>

              <strong> 15% </strong>
            </div>
          </div>
        </v-card>
      </div>

      <!-- ================= QUESTIONS ================= -->
      <section class="panel questions-panel">
        <div class="panel-heading">
          <div>
            <h2 class="panel-title">Start with a question</h2>

            <span class="panel-sub"> Pick a topic and let your coach take it from there. </span>
          </div>
        </div>

        <div class="question-grid">
          <button class="question-card" @click="ask('Break down my spending this month')">
            <strong> Break down my spending </strong>

            <span> See the categories shaping your month. </span>
          </button>

          <button class="question-card" @click="ask('Give me a realistic savings plan')">
            <strong> Create a realistic savings plan </strong>

            <span> Turn your current income and commitments into a practical target. </span>
          </button>

          <button class="question-card" @click="ask('What should I cut first?')">
            <strong> What should I cut first? </strong>

            <span> Find flexible areas before touching essentials. </span>
          </button>

          <button class="question-card" @click="ask('Explain my budget simply')">
            <strong> Explain my budget simply </strong>

            <span> Get a plain-language explanation of your setup. </span>
          </button>
        </div>
      </section>
    </div>
  </MainLayout>
</template>

<style scoped>
.coach-page {
  max-width: 1400px;
  margin: 0 auto;
}

/* ================= HEADER ================= */

.page-header {
  margin-bottom: 20px;
}

.section-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #167456;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 4px 0 6px;
  color: #111827;
  line-height: 1.25;
}

.page-sub {
  font-size: 13px;
  color: #6b7280;
  max-width: 600px;
  margin: 0;
  line-height: 1.5;
}

@media (min-width: 640px) {
  .page-title {
    font-size: 28px;
  }
}

/* ================= HERO ================= */

.coach-hero {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
  color: white;
  background: linear-gradient(135deg, #074033, #0a5c48, #0d7059);
}

@media (min-width: 640px) {
  .coach-hero {
    padding: 30px;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9cebd0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.hero-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9cebd0;
  box-shadow: 0 0 0 3px rgba(156, 235, 208, 0.2);
}

.coach-hero h2 {
  margin: 0 0 8px;
  font-size: 25px;
  line-height: 1.25;
  font-weight: 750;
  letter-spacing: -0.02em;
}

.coach-hero p {
  margin: 0 0 18px;
  color: #c9e6dc;
  font-size: 13px;
}

.quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-btn {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.15s ease;
}

.quick-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* ================= GRID ================= */

.coach-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

@media (min-width: 960px) {
  .coach-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    align-items: stretch;
  }
}

/* ================= PANELS ================= */

.panel {
  background: #fff !important;
  border-radius: 20px !important;
  border: 1px solid #eef2f7 !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04) !important;
  padding: 18px !important;
}

@media (min-width: 640px) {
  .panel {
    padding: 20px 22px !important;
  }
}

.panel-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 3px;
  color: #111827;
}

.panel-sub {
  display: block;
  font-size: 11px;
  color: #6b7280;
}

/* ================= STATUS ================= */

.coach-status {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border-radius: 999px;
  background: #dff7ed;
  color: #167456;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
}

.coach-status span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #167456;
}

/* ================= CHAT ================= */

.chat-panel {
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.messages-box {
  flex: 1;
  min-height: 320px;
  max-height: 430px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 4px 2px;
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 9px;
}

.user-row {
  justify-content: flex-end;
}

.coach-avatar {
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #dff7ee;
  color: #074033;
  font-size: 15px;
  font-weight: 800;
}

.message-bubble {
  max-width: 82%;
  padding: 10px 13px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.5;
}

.coach-message {
  background: #f3f6f4;
  color: #30404a;
}

.user-message {
  background: #074033;
  color: white;
}

.empty-chat {
  flex: 1;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #6b7280;
  gap: 6px;
}

.empty-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: #dff7ee;
  color: #074033;
  font-size: 20px;
  margin-bottom: 4px;
}

.empty-chat strong {
  color: #1a2b34;
  font-size: 13px;
}

.empty-chat span {
  max-width: 280px;
  font-size: 11px;
  line-height: 1.5;
}

/* ================= INPUT ================= */

.chat-input-wrap {
  display: flex;
  gap: 8px;
  padding-top: 14px;
  margin-top: auto;
  border-top: 1px solid #eceae4;
}

.chat-input-wrap input {
  flex: 1;
  min-width: 0;
  border: 1px solid #deddd6;
  border-radius: 11px;
  padding: 10px 13px;
  background: #fafaf8;
  outline: none;
  font-size: 12px;
  color: #1a2b34;
}

.chat-input-wrap input:focus {
  border-color: #074033;
  background: white;
}

.ask-btn {
  border: none;
  border-radius: 11px;
  padding: 0 17px;
  background: #074033;
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.ask-btn:hover {
  background: #0a5c48;
}

.disclaimer {
  margin: 11px 0 0;
  color: #8b918f;
  font-size: 10px;
  line-height: 1.45;
}

/* ================= INSIGHTS ================= */

.insights-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.insight-card {
  padding: 13px;
  border: 1px solid #d8eee6;
  border-radius: 13px;
  background: #f2faf7;
}

.insight-title {
  margin-bottom: 4px;
  color: #1a2b34;
  font-size: 12px;
  font-weight: 700;
}

.insight-card p {
  margin: 0;
  color: #68757d;
  font-size: 11px;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 9px;
  margin-top: 12px;
}

.stat-card {
  padding: 12px;
  border: 1px solid #e9e7e0;
  border-radius: 13px;
  background: #f8f7f3;
}

.stat-card span {
  display: block;
  margin-bottom: 4px;
  color: #80888d;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stat-card strong {
  color: #1a2b34;
  font-size: 17px;
}

.stat-card .good {
  color: #074033;
}

/* ================= QUESTIONS ================= */

.questions-panel {
  margin-bottom: 4px;
}

.question-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 9px;
}

@media (min-width: 640px) {
  .question-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.question-card {
  border: 1px solid #e7e6df;
  border-radius: 13px;
  padding: 14px;
  text-align: left;
  background: #f8f8f5;
  cursor: pointer;
  transition: 0.15s ease;
}

.question-card:hover {
  background: #f2faf7;
  border-color: #b8ddd0;
}

.question-card strong {
  display: block;
  margin-bottom: 4px;
  color: #1a2b34;
  font-size: 12px;
}

.question-card span {
  color: #7b858c;
  font-size: 11px;
  line-height: 1.45;
}
</style>
