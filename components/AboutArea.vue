<template>
  <section id="about">
    <div class="section-wrapper">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="hidden lg:flex justify-center reveal">
          <div class="relative">
            <div class="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/10 rounded-3xl blur-xl" />
            <img src="/assets/img/about/aboutMe.png" alt="About Me" class="relative max-w-sm w-full h-auto rounded-2xl shadow-2xl" />
          </div>
        </div>

        <div>
          <span class="section-label reveal">{{ $t('AboutArea.aboutMe') }}</span>
          <h2 class="section-title reveal reveal-delay-1">{{ $t('AboutArea.getToKnowMe') }}</h2>
          <p class="text-[var(--color-text-muted)] mt-6 leading-relaxed reveal reveal-delay-2">
            {{ $t('AboutArea.summery') }}
          </p>

          <div class="flex flex-wrap gap-3 mt-6 reveal reveal-delay-3">
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span>🇪🇬</span> {{ $t('AboutArea.langArabic') }}
            </span>
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span>🇺🇸</span> {{ $t('AboutArea.langEnglish') }}
            </span>
            <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span>🇰🇷</span> {{ $t('AboutArea.langKorean') }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-8 reveal reveal-delay-3">
            <div v-for="item in infoItems" :key="item.label" class="glass p-4">
              <div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{{ $t(item.label) }}</div>
              <div class="font-medium mt-1">{{ $t(item.value) }}</div>
            </div>
          </div>

          <div class="mt-8 reveal reveal-delay-4">
            <NuxtLink :to="$t('doc.pdf')" class="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              {{ $t('AboutArea.downloadCv') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
useReveal()

const infoItems = [
  { label: 'AboutArea.name', value: 'Common.vName' },
  { label: 'AboutArea.dob', value: 'Common.vDob' },
  { label: 'AboutArea.address', value: 'Common.vAddress' },
  { label: 'Common.email', value: 'Common.vEmail' },
]
</script>
