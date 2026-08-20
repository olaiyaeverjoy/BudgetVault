<script setup>
import MainLayout from '@/layouts/MainLayout.vue'   // adjust path if needed
import { useAppStore } from '@/stores/app.js'

const app = useAppStore()

const statusItems = [
  { label: 'Bank connection', value: 'Not linked' },
  { label: 'Ownership', value: 'Pending' },
  { label: 'Auto savings', value: 'Off' },
  { label: 'Transaction sync', value: 'Waiting' },
]
</script>

<template>
  <MainLayout>
    <div class="bank-page">
      <!-- Header -->
      <header class="page-header">
        <div>
          <div class="section-label">Bank &amp; Cards</div>
          <h1 class="page-title">Connect your money to your plan.</h1>
          <p class="page-sub">
            Wema Bank is the primary connection in this demo. Other banks can
            enter the wider connection flow.
          </p>
        </div>

        <v-btn
          variant="outlined"
          class="dash-btn"
          @click="app.show('dashboard')"
        >
          ← Dashboard
        </v-btn>
      </header>

      <!-- Cards -->
      <div class="cards-flex">
        <!-- LEFT: Wema Bank -->
        <v-card class="panel left-panel" variant="flat">
          <div class="d-flex align-center justify-space-between mb-4">
            <div>
              <h2 class="panel-title">Wema Bank</h2>
              <span class="panel-sub">Primary bank connection</span>
            </div>
            <v-chip size="small" class="preferred-chip" label>
              Preferred
            </v-chip>
          </div>

          <!-- Bank Card -->
          <div class="bank-card">
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center ga-2">
                <div class="wema-logo">W</div>
                <span class="font-weight-bold">Wema Bank</span>
              </div>
              <span class="status-pill">● Ready to connect</span>
            </div>

            <div class="balance-label">Available balance · demo</div>
            <div class="balance-amount">₦420,000.00</div>

            <div class="d-flex justify-space-between bank-meta">
              <div>
                <div class="meta-label">Account</div>
                <strong>•••• 4821</strong>
              </div>
              <div class="text-right">
                <div class="meta-label">Status</div>
                <strong class="status-ok">Verification required</strong>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="status-grid">
            <div
              v-for="item in statusItems"
              :key="item.label"
              class="status-item"
            >
              <span>{{ item.label }}</span>
              <v-chip size="x-small" class="status-chip" label>
                {{ item.value }}
              </v-chip>
            </div>
          </div>

          <!-- Actions -->
          <div class="d-flex flex-column flex-sm-row ga-2 mt-4">
            <v-btn
              color="bvgreen"
              class="action-btn text-white"
              @click="app.demoConnect('Wema Bank')"
            >
              Connect Wema Bank
            </v-btn>
            <v-btn
              variant="outlined"
              class="action-btn"
              @click="app.demoConnect('Wema debit card')"
            >
              Link Wema card
            </v-btn>
          </div>
        </v-card>

        <!-- RIGHT: Why connect -->
        <v-card class="panel right-panel" variant="flat">
          <h3 class="panel-title mb-1">Why connect?</h3>
          <p class="why-text">
            Connect your bank so BudgetVault can bring your financial picture
            together and support planning, safe-to-spend, savings and
            automation workflows.
          </p>

          <!-- Debit Card -->
          <div class="debit-card">
            <div class="chip-strip"></div>
            <div class="card-number">•••• •••• •••• 4821</div>
            <div class="d-flex justify-space-between mt-4">
              <div>
                <div class="card-meta-label">Cardholder</div>
                <div class="card-meta-value">DEMO USER</div>
              </div>
              <div class="text-right">
                <div class="card-meta-label">Valid thru</div>
                <div class="card-meta-value">••/••</div>
              </div>
            </div>
          </div>

          <v-btn
            block
            variant="outlined"
            class="action-btn mt-3"
            @click="app.demoConnect('Wema debit card')"
          >
            Add / link Wema card
          </v-btn>

          <!-- Other Bank -->
          <div class="other-bank">
            <strong>Bank with another institution?</strong>
            <p>
              Keep Wema as the primary experience and use this CTA for the
              broader supported-bank connection flow.
            </p>
            <v-btn
              variant="outlined"
              class="action-btn"
              @click="() => window.alert('Demo: open supported banks selector')"
            >
              Connect another bank →
            </v-btn>
          </div>
        </v-card>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
/* Page */
.bank-page {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.page-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
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

@media (min-width: 640px) {
  .page-title {
    font-size: 26px;
  }
}

.page-sub {
  font-size: 13px;
  color: #6b7280;
  max-width: 36rem;
  margin: 0;
  line-height: 1.5;
}

.dash-btn {
  border-radius: 999px !important;
  border-color: #e5e7eb !important;
  background: #fff !important;
  font-weight: 600 !important;
  font-size: 12px !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  height: 36px !important;
  padding: 0 16px !important;
  align-self: flex-start;
}

/* Cards layout */
.cards-flex {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

@media (min-width: 960px) {
  .cards-flex {
    flex-direction: row;
    gap: 20px;
    align-items: flex-start;
  }

  .left-panel {
    flex: 3;
    min-width: 0;
  }

  .right-panel {
    flex: 2;
    min-width: 0;
  }
}

/* Panels */
.panel {
  background: #fff !important;
  border-radius: 20px !important;
  border: 1px solid #eef2f7 !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04) !important;
  padding: 18px 18px !important;
}

@media (min-width: 640px) {
  .panel {
    padding: 20px 22px !important;
  }
}

.panel-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.panel-sub {
  font-size: 12px;
  color: #6b7280;
}

.preferred-chip {
  background: #dff7ed !important;
  color: #167456 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  height: 24px !important;
}

/* Bank card */
.bank-card {
  background: linear-gradient(135deg, #084d3c, #0b624d);
  border-radius: 16px;
  padding: 20px 20px;
  color: #fff;
  min-height: 200px;
}

@media (min-width: 640px) {
  .bank-card {
    padding: 22px 24px;
    min-height: 210px;
  }
}

.wema-logo {
  width: 34px;
  height: 34px;
  background: #fff200;
  color: #17332a;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
}

.status-pill {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.12);
  padding: 6px 12px;
  border-radius: 999px;
  color: #c8f5e4;
}

.balance-label {
  margin-top: 24px;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a9d8c9;
}

.balance-amount {
  font-size: 28px;
  font-weight: 800;
  margin-top: 2px;
  letter-spacing: -0.02em;
}

@media (min-width: 640px) {
  .balance-amount {
    font-size: 30px;
  }
}

.bank-meta {
  margin-top: 18px;
  font-size: 12px;
}

.meta-label {
  font-size: 11px;
  color: #a9d8c9;
  margin-bottom: 2px;
}

.status-ok {
  color: #bff3df;
}

/* Status grid */
.status-grid {
  display: grid;
  gap: 8px;
  margin-top: 16px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #f8faf9;
  border: 1px solid #edf0ee;
  border-radius: 13px;
  font-size: 12px;
  color: #56645f;
}

.status-chip {
  background: #dff7ed !important;
  color: #167456 !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  height: 22px !important;
}

/* Buttons */
.action-btn {
  border-radius: 11px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  height: 40px !important;
}

/* Why connect */
.why-text {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.55;
  margin: 0 0 4px;
}

.debit-card {
  margin-top: 16px;
  background: linear-gradient(135deg, #142b27, #0a5140);
  border-radius: 16px;
  padding: 18px 20px;
  color: #fff;
}

.chip-strip {
  width: 38px;
  height: 26px;
  border-radius: 6px;
  background: #d8ba43;
  margin-bottom: 18px;
}

.card-number {
  font-size: 15px;
  letter-spacing: 3px;
}

.card-meta-label {
  font-size: 8px;
  text-transform: uppercase;
  color: #a8c6be;
  letter-spacing: 0.06em;
}

.card-meta-value {
  font-size: 11px;
  margin-top: 2px;
}

/* Other bank */
.other-bank {
  margin-top: 16px;
  padding: 16px;
  background: #fffaf0;
  border: 1px solid #f4e8bd;
  border-radius: 14px;
}

.other-bank strong {
  font-size: 12px;
  color: #111827;
}

.other-bank p {
  font-size: 11px;
  color: #6b7280;
  margin: 6px 0 12px;
  line-height: 1.45;
}
</style>