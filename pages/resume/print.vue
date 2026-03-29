<template>
  <div>
    <!-- Action bar (hidden when printing) -->
    <div class="action-bar no-print">
      <NuxtLink to="/resume" class="action-btn ghost">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        {{ $t('ResumePage.back') }}
      </NuxtLink>
      <div class="action-spacer"></div>
      <button @click="printPdf" class="action-btn primary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
        </svg>
        {{ $t('ResumePage.printSavePdf') }}
      </button>
      <button @click="downloadMd" class="action-btn outline">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        {{ $t('ResumePage.downloadMd') }}
      </button>
    </div>

    <!-- Resume content -->
    <div class="resume-print">
      <header class="header">
        <h1>{{ bio.name }}</h1>
        <p class="title">{{ bio.title }}</p>
        <div class="contact-row">
          <span>{{ bio.email }}</span>
          <span class="sep">·</span>
          <span>{{ bio.website }}</span>
          <span class="sep">·</span>
          <span>{{ bio.github }}</span>
          <span class="sep">·</span>
          <span>{{ bio.linkedin }}</span>
          <span class="sep">·</span>
          <span>{{ bio.location }}</span>
        </div>
      </header>

      <section>
        <p class="summary">{{ bio.summary }}</p>
      </section>

      <section>
        <h2>{{ $t('ResumePage.experience') }}</h2>
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
              {{ h.startsWith('→') ? h.slice(2) : h }}
            </li>
          </ul>
          <div class="tech">{{ job.tech }}</div>
        </div>
      </section>

      <section>
        <h2>{{ $t('ResumePage.education') }}</h2>
        <div v-for="(edu, i) in education" :key="i" class="entry">
          <div class="entry-header">
            <div><strong>{{ edu.degree }}</strong>, {{ edu.school }}</div>
            <div class="date">{{ edu.year }}</div>
          </div>
          <div class="meta">{{ edu.location }}</div>
        </div>
      </section>

      <section>
        <h2>{{ $t('ResumePage.technicalSkills') }}</h2>
        <div class="skills-grid">
          <div v-for="(items, category) in skillsForPrint" :key="category">
            <strong>{{ category }}:</strong> {{ items.join(', ') }}
          </div>
        </div>
      </section>

      <section>
        <h2>{{ $t('ResumePage.humanLanguages') }}</h2>
        <p>{{ skills.languages.map(l => `${l.name} (${l.level})`).join(' · ') }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false })

useHead({ title: 'YapoeY | Resume (Print)' })

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
      md += `- ${h.startsWith('→') ? h.slice(2) : h}\n`
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
  gap: 10px;
  padding: 12px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.action-spacer {
  flex: 1;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: 'Inter', system-ui, sans-serif;
  transition: all 0.15s;
  text-decoration: none;
}

.action-btn.primary {
  background: #4f46e5;
  color: white;
  box-shadow: 0 1px 3px rgba(79, 70, 229, 0.3);
}

.action-btn.primary:hover {
  background: #4338ca;
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.4);
}

.action-btn.outline {
  background: white;
  color: #4f46e5;
  border: 1px solid #e2e8f0;
}

.action-btn.outline:hover {
  border-color: #4f46e5;
  background: #f5f3ff;
}

.action-btn.ghost {
  background: transparent;
  color: #64748b;
}

.action-btn.ghost:hover {
  color: #1e293b;
  background: #f1f5f9;
}

.resume-print {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #1a1a1a;
  background: white;
  max-width: 800px;
  margin: 0 auto;
  padding: 64px 40px 40px;
  font-size: 11px;
  line-height: 1.6;
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
  letter-spacing: -0.02em;
}

.header .title {
  font-size: 14px;
  color: #4f46e5;
  margin: 4px 0;
  font-weight: 500;
}

.contact-row {
  font-size: 10px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.contact-row .sep {
  color: #ccc;
}

.summary {
  font-size: 11px;
  color: #444;
  margin-bottom: 12px;
  line-height: 1.6;
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
  color: #1a1a1a;
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
  font-weight: 500;
}

.meta {
  font-size: 10px;
  color: #888;
  margin-bottom: 4px;
}

ul {
  margin: 4px 0;
  padding-left: 16px;
  list-style-type: disc;
}

li {
  margin-bottom: 2px;
  font-size: 10.5px;
  color: #333;
  line-height: 1.5;
}

li::marker {
  color: #4f46e5;
  font-size: 8px;
}

.tech {
  font-size: 10px;
  color: #4f46e5;
  margin-top: 4px;
  font-weight: 500;
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

@media (max-width: 640px) {
  .action-bar {
    padding: 10px 16px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .action-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .action-spacer {
    display: none;
  }

  .resume-print {
    padding: 56px 20px 24px;
  }
}
</style>
