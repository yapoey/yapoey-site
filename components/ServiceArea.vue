<template>
  <section id="services" class="bg-[var(--color-bg-2)]">
    <div class="section-wrapper">
      <div class="text-center mb-16">
        <span class="section-label reveal">{{ $t('ServiceArea.services') }}</span>
        <h2 class="section-title reveal reveal-delay-1">{{ $t('ServiceArea.mainTitle') }}</h2>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(service, i) in services"
          :key="service.icon"
          class="glass-hover p-7 text-center reveal"
          :class="'reveal-delay-' + (i + 1)"
        >
          <div class="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
            {{ service.icon }}
          </div>
          <h4 class="text-lg font-semibold mb-3">{{ $t(service.title) }}</h4>
          <p class="text-sm text-[var(--color-text-muted)] leading-relaxed">{{ $t(service.desc) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
useReveal()

const services = [
  { icon: '💻', title: 'ServiceArea.firstTitle', desc: 'ServiceArea.subFirst' },
  { icon: '⚙️', title: 'ServiceArea.secTitle', desc: 'ServiceArea.subSec' },
  { icon: '📱', title: 'ServiceArea.thrTitle', desc: 'ServiceArea.subThr' },
  { icon: '🎨', title: 'ServiceArea.fourthTitle', desc: 'ServiceArea.subFourth' },
  { icon: '👥', title: 'ServiceArea.fifthTitle', desc: 'ServiceArea.subFifth' },
  { icon: '☁️', title: 'ServiceArea.sixthTitle', desc: 'ServiceArea.subSixth' },
]
</script>
