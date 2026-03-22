<template>
  <section id="about" class="bg-[var(--color-bg)]">
    <div class="section-wrapper">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Image -->
        <div class="hidden lg:flex justify-center">
          <img
            src="/assets/img/about/aboutMe.png"
            alt="About Me"
            class="max-w-sm w-full h-auto rounded-2xl"
          />
        </div>

        <!-- Right: Details -->
        <div>
          <h2 class="section-title">{{ $t('AboutArea.aboutMe') }}</h2>
          <p class="text-[var(--color-text-muted)] mt-4 leading-relaxed">
            {{ $t('AboutArea.summery') }}
          </p>

          <!-- Info List -->
          <ul class="mt-8 space-y-3">
            <li v-for="item in infoItems" :key="item.label" class="flex gap-3">
              <span class="font-medium min-w-[120px]">{{ $t(item.label) }}</span>
              <span class="text-[var(--color-text-muted)]">{{ $t(item.value) }}</span>
            </li>
          </ul>

          <!-- Download CV -->
          <div class="mt-8">
            <a
              :href="$t('doc.pdf')"
              class="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              {{ $t('AboutArea.downloadCv') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const infoItems = [
  { label: 'AboutArea.name', value: 'Common.vName' },
  { label: 'AboutArea.dob', value: 'Common.vDob' },
  { label: 'AboutArea.address', value: 'Common.vAddress' },
  { label: 'Common.email', value: 'Common.vEmail' },
]
</script>
