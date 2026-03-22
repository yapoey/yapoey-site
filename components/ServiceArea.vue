<template>
  <section id="services" class="bg-[var(--color-bg-2)]">
    <div class="section-wrapper">
      <div class="grid lg:grid-cols-5 gap-12 items-start">
        <!-- Left: Intro -->
        <div class="lg:col-span-2">
          <span class="text-sm font-medium text-primary uppercase tracking-wider">
            {{ $t('ServiceArea.services') }}
          </span>
          <h2 class="section-title mt-3">
            {{ $t('ServiceArea.mainTitle') }}
          </h2>
          <p class="text-[var(--color-text-muted)] mt-4">
            {{ $t('ServiceArea.subTitle') }}
          </p>
        </div>

        <!-- Right: Service Cards -->
        <div class="lg:col-span-3 grid sm:grid-cols-2 gap-6">
          <div
            v-for="service in services"
            :key="service.icon"
            class="glass p-6 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div class="text-3xl mb-4">{{ service.icon }}</div>
            <h4 class="text-lg font-semibold mb-2">{{ $t(service.title) }}</h4>
            <p class="text-sm text-[var(--color-text-muted)]">{{ $t(service.desc) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  { icon: '🚀', title: 'ServiceArea.secTitle', desc: 'ServiceArea.subSec' },
  { icon: '📱', title: 'ServiceArea.thrTitle', desc: 'ServiceArea.subThr' },
  { icon: '⚙️', title: 'ServiceArea.fourthTitle', desc: 'ServiceArea.subFourth' },
  { icon: '📋', title: 'ServiceArea.firstTitle', desc: 'ServiceArea.subFirst' },
]
</script>
