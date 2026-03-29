<template>
  <div id="body">
    <HeroArea />
    <ServiceArea />
    <AboutArea />
    <ResumeArea />
    <WorksArea />
    <ContactArea />
  </div>
</template>

<script setup>
useHead({ title: 'YapoeY | Portfolio' })
useSeoMeta({
  description: 'Mohamed Ibrahim (YapoeY) | Full Stack Developer portfolio. Projects in Vue.js, React, Node.js, Flutter, and more.',
  ogTitle: 'YapoeY | Portfolio',
  ogDescription: 'Full Stack Developer portfolio. Projects in Vue.js, React, Node.js, Flutter, and more.',
  ogUrl: 'https://yapoey.com/gui',
  twitterTitle: 'YapoeY | Portfolio',
  twitterDescription: 'Full Stack Developer portfolio. Projects in Vue.js, React, Node.js, Flutter, and more.',
})
</script>
