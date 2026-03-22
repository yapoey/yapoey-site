<template>
  <div>
    <!-- Action buttons (hidden when printing) -->
    <div class="action-bar no-print">
      <button @click="printPdf" class="action-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
        </svg>
        Save as PDF
      </button>
      <button @click="downloadMd" class="action-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        Download .md
      </button>
      <NuxtLink to="/resume" class="action-btn secondary">
        ← Back
      </NuxtLink>
    </div>

    <!-- Resume content -->
    <div class="resume-print">
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

      <section>
        <p class="summary">{{ bio.summary }}</p>
      </section>

      <section>
        <h2>Experience</h2>
        <div v-for="(job, i) in experience" :key="i" class="entry">
          <div class="entry-header">
            <div>
              <strong>{{ job.title }}</strong>, {{ job.company }}
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

      <section>
        <h2>Education</h2>
        <div v-for="(edu, i) in education" :key="i" class="entry">
          <div class="entry-header">
            <div><strong>{{ edu.degree }}</strong>, {{ edu.school }}</div>
            <div class="date">{{ edu.year }}</div>
          </div>
          <div class="meta">{{ edu.location }}</div>
        </div>
      </section>

      <section>
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          <div v-for="(items, category) in skillsForPrint" :key="category">
            <strong>{{ category }}:</strong> {{ items.join(', ') }}
          </div>
        </div>
      </section>

      <section>
        <h2>Languages</h2>
        <p>{{ skills.languages.map(l => `${l.name} (${l.level})`).join(' · ') }}</p>
      </section>
    </div>
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
  'Tools & Testing': skills.tools,
}

function printPdf() {
  window.print()
}

function downloadMd() {
  let md = `# ${bio.name}\n`
  md += `**${bio.title}**\n\n`
  md += `${bio.email} · ${bio.website} · ${bio.github} · ${bio.linkedin} · ${bio.location}\n\n`
  md += `---\n\n`
  md += `${bio.summary}\n\n`

  md += `## Experience\n\n`
  experience.forEach(job => {
    md += `### ${job.title}, ${job.company}\n`
    md += `${job.type} · ${job.location} · ${job.duration}\n\n`
    job.highlights.forEach(h => {
      md += `- ${h}\n`
    })
    md += `\n**Tech:** ${job.tech}\n\n`
  })

  md += `## Education\n\n`
  education.forEach(edu => {
    md += `### ${edu.degree}, ${edu.school}\n`
    md += `${edu.location} · ${edu.year}\n\n`
  })

  md += `## Technical Skills\n\n`
  Object.entries(skillsForPrint).forEach(([cat, items]) => {
    md += `**${cat}:** ${items.join(', ')}\n\n`
  })

  md += `## Languages\n\n`
  md += skills.languages.map(l => `- ${l.name} (${l.level})`).join('\n')
  md += '\n'

  const blob = new Blob([md], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'YapoeY-Resume.md'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style>
@page {
  margin: 0.5in;
  size: letter;
}

.action-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  background: #4f46e5;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Inter', system-ui, sans-serif;
}

.action-btn:hover {
  background: #4338ca;
}

.action-btn.secondary {
  background: transparent;
  color: #64748b;
  text-decoration: none;
}

.action-btn.secondary:hover {
  color: #1e293b;
}

.resume-print {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
  background: white;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 40px 40px;
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
  .no-print {
    display: none !important;
  }

  .resume-print {
    padding: 0;
    max-width: none;
  }
}
</style>
