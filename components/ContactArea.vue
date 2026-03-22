<template>
  <section id="contact" class="bg-[var(--color-bg-2)]">
    <div class="section-wrapper">
      <div class="text-center mb-16">
        <span class="section-label reveal">{{ $t('ContactArea.getInTouch') }}</span>
        <h2 class="section-title reveal reveal-delay-1">{{ $t('ContactArea.contact') }}</h2>
      </div>

      <div class="max-w-4xl mx-auto grid lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2 space-y-6 reveal reveal-delay-2">
          <div class="glass p-5 flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div>
              <div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{{ $t('Common.email') }}</div>
              <div class="font-medium mt-1">{{ $t('Common.vEmail') }}</div>
            </div>
          </div>

          <div class="glass p-5 flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{{ $t('ContactArea.location') }}</div>
              <div class="font-medium mt-1">{{ $t('Common.vAddress') }}</div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3 reveal reveal-delay-3">
          <form class="space-y-5" @submit.prevent="sendMessage">
            <div class="grid sm:grid-cols-2 gap-5">
              <input v-model="form.name" type="text" :placeholder="$t('ContactArea.enterName')" class="w-full px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
              <input v-model="form.email" type="email" :placeholder="$t('ContactArea.urEmail')" class="w-full px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
            </div>
            <input v-model="form.subject" type="text" :placeholder="$t('ContactArea.enterDiscussion')" class="w-full px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all" />
            <textarea v-model="form.message" rows="5" :placeholder="$t('ContactArea.enterMsg')" class="w-full px-5 py-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none" />
            <button type="submit" :disabled="!isValid" class="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none">
              {{ $t('ContactArea.sendMsg') }}
            </button>
          </form>
        </div>
      </div>

      <Teleport to="body">
        <div v-if="showConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div class="glass p-10 text-center animate-slide-up">
            <div class="text-5xl mb-4">😀</div>
            <div class="text-xl font-semibold">{{ $t('Common.sent') }}!</div>
          </div>
        </div>
      </Teleport>
    </div>
  </section>
</template>

<script setup>
useReveal()

const form = reactive({ name: '', email: '', subject: '', message: '' })
const showConfirm = ref(false)
const isValid = computed(() => form.name && form.email && form.message)

async function sendMessage() {
  console.log('Contact form submitted:', { ...form })
  showConfirm.value = true
  form.name = form.email = form.subject = form.message = ''
  setTimeout(() => { showConfirm.value = false }, 1500)
}
</script>
