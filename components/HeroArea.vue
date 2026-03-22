<template>
  <section class="min-h-[calc(100vh-4rem)] flex items-center pt-16 relative overflow-hidden">
    <div class="section-wrapper">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text Content -->
        <div>
          <span class="text-sm font-medium text-primary uppercase tracking-wider">
            {{ $t('HeroArea.hey') }}
          </span>
          <h1 class="text-5xl md:text-6xl font-bold mt-3 mb-4">
            {{ $t('HeroArea.YapoeY') }}
          </h1>
          <p class="text-lg text-[var(--color-text-muted)] mb-6">
            {{ $t('HeroArea.motto') }}
          </p>
          <div class="text-lg text-[var(--color-text-muted)] mb-8">
            {{ $t('HeroArea.Iam') }}
            <span class="text-primary font-semibold" ref="typedEl">{{ currentText }}<span class="animate-blink">|</span></span>
          </div>
          <a
            :href="$t('doc.pdf')"
            class="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            {{ $t('HeroArea.shortCv') }}
          </a>
        </div>

        <!-- Right: Hero Image -->
        <div class="hidden lg:flex justify-center">
          <img
            src="/assets/img/hero/heroRight.png"
            alt="Hero"
            class="max-w-md w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()

const strings = computed(() => [
  t('HeroArea.freelancer'),
  t('HeroArea.frontend'),
  t('HeroArea.backend'),
])

const currentText = ref('')
const currentIndex = ref(0)

let timeout = null

function typeText(text, charIndex, onDone) {
  if (charIndex <= text.length) {
    currentText.value = text.slice(0, charIndex)
    timeout = setTimeout(() => typeText(text, charIndex + 1, onDone), 80)
  } else {
    timeout = setTimeout(onDone, 1500)
  }
}

function deleteText(text, charIndex, onDone) {
  if (charIndex >= 0) {
    currentText.value = text.slice(0, charIndex)
    timeout = setTimeout(() => deleteText(text, charIndex - 1, onDone), 40)
  } else {
    timeout = setTimeout(onDone, 300)
  }
}

function cycle() {
  const text = strings.value[currentIndex.value]
  typeText(text, 0, () => {
    deleteText(text, text.length, () => {
      currentIndex.value = (currentIndex.value + 1) % strings.value.length
      cycle()
    })
  })
}

onMounted(() => {
  cycle()
})

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>
