<template>
  <div class="resume-print">
    <!-- Header -->
    <header class="header">
      <h1>{{ bio.name }}</h1>
      <p class="title">{{ bio.title }}</p>
      <div class="contact-row">
        <span>{{ bio.email }}</span>
        <span>·</span>
        <span>{{ bio.website }}</span>
        <span>·</span>
        <span>{{ bio.github }}</span>
        <span>·</span>
        <span>{{ bio.linkedin }}</span>
        <span>·</span>
        <span>{{ bio.location }}</span>
      </div>
    </header>

    <!-- Summary -->
    <section>
      <p class="summary">{{ bio.summary }}</p>
    </section>

    <!-- Experience -->
    <section>
      <h2>Experience</h2>
      <div v-for="(job, i) in experience" :key="i" class="entry">
        <div class="entry-header">
          <div>
            <strong>{{ job.title }}</strong> — {{ job.company }}
          </div>
          <div class="date">{{ job.duration }}</div>
        </div>
        <div class="meta">{{ job.type }} · {{ job.location }}</div>
        <ul>
          <li v-for="(h, j) in job.highlights" :key="j">
            {{ h.startsWith('→') ? h : h }}
          </li>
        </ul>
        <div class="tech">{{ job.tech }}</div>
      </div>
    </section>

    <!-- Education -->
    <section>
      <h2>Education</h2>
      <div v-for="(edu, i) in education" :key="i" class="entry">
        <div class="entry-header">
          <div><strong>{{ edu.degree }}</strong> — {{ edu.school }}</div>
          <div class="date">{{ edu.year }}</div>
        </div>
        <div class="meta">{{ edu.location }}</div>
      </div>
    </section>

    <!-- Skills -->
    <section>
      <h2>Technical Skills</h2>
      <div class="skills-grid">
        <div v-for="(items, category) in skillsForPrint" :key="category">
          <strong>{{ category }}:</strong> {{ items.join(', ') }}
        </div>
      </div>
    </section>

    <!-- Languages -->
    <section>
      <h2>Languages</h2>
      <p>{{ skills.languages.map(l => `${l.name} (${l.level})`).join(' · ') }}</p>
    </section>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

const { bio, experience, education, skills } = useResumeData()

const skillsForPrint = {
  Frontend: skills.frontend,
  Backend: skills.backend,
  Database: skills.database,
  'Cloud & DevOps': skills.cloud,
  Tools: skills.tools,
}
</script>

<style>
@page {
  margin: 0.5in;
  size: letter;
}

.resume-print {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
  background: white;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  font-size: 11px;
  line-height: 1.5;
}

.header {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #1a1a1a;
}

.header h1 {
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.header .title {
  font-size: 14px;
  color: #4f46e5;
  margin: 4px 0;
}

.contact-row {
  font-size: 10px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.summary {
  font-size: 11px;
  color: #444;
  margin-bottom: 12px;
}

section {
  margin-bottom: 14px;
}

h2 {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
  margin-bottom: 8px;
}

.entry {
  margin-bottom: 10px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.entry-header strong {
  font-size: 12px;
}

.date {
  font-size: 10px;
  color: #4f46e5;
  white-space: nowrap;
}

.meta {
  font-size: 10px;
  color: #888;
  margin-bottom: 4px;
}

ul {
  margin: 4px 0;
  padding-left: 16px;
}

li {
  margin-bottom: 2px;
  font-size: 10.5px;
  color: #333;
}

.tech {
  font-size: 10px;
  color: #4f46e5;
  margin-top: 4px;
}

.skills-grid {
  display: grid;
  gap: 4px;
}

.skills-grid strong {
  font-size: 11px;
}

@media print {
  .resume-print {
    padding: 0;
    max-width: none;
  }
}
</style>
