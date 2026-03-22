<template>
  <section id="contact" class="bg-[var(--color-bg-2)]">
    <div class="section-wrapper">
      <h2 class="section-title mb-12">{{ $t('ContactArea.contact') }}</h2>

      <div class="grid lg:grid-cols-3 gap-12">
        <!-- Left: Contact Info -->
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <div class="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium">{{ $t('Common.email') }}</h4>
              <span class="text-sm text-[var(--color-text-muted)]">{{ $t('Common.vEmail') }}</span>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium">{{ $t('AboutArea.address') }}</h4>
              <span class="text-sm text-[var(--color-text-muted)]">{{ $t('Common.vAddress') }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Contact Form -->
        <div class="lg:col-span-2">
          <form class="space-y-4" @submit.prevent="sendMessage">
            <div class="grid sm:grid-cols-2 gap-4">
              <input
                v-model="form.name"
                type="text"
                :placeholder="$t('ContactArea.enterName')"
                class="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              />
              <input
                v-model="form.email"
                type="email"
                :placeholder="$t('ContactArea.urEmail')"
                class="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              />
            </div>
            <input
              v-model="form.subject"
              type="text"
              :placeholder="$t('ContactArea.enterDiscussion')"
              class="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            />
            <textarea
              v-model="form.message"
              rows="5"
              :placeholder="$t('ContactArea.enterMsg')"
              class="w-full px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
            />
            <button
              type="submit"
              :disabled="!isValid"
              class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {{ $t('ContactArea.sendMsg') }}
            </button>
          </form>

          <!-- Success message -->
          <div
            v-if="showConfirm"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <div class="bg-primary rounded-xl p-8 text-center text-white animate-fade-in">
              <div class="text-4xl mb-3">😀</div>
              <div class="text-lg font-medium">{{ $t('Common.sent') }}!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const showConfirm = ref(false)

const isValid = computed(() => form.name && form.email && form.message)

async function sendMessage() {
  // Placeholder — will be replaced with Appwrite in Phase 5
  console.log('Contact form submitted:', { ...form })
  showConfirm.value = true
  form.name = form.email = form.subject = form.message = ''
  setTimeout(() => {
    showConfirm.value = false
  }, 1500)
}
</script>
