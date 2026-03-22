const CAREER_START = 2012

export function useResumeData() {
  const yearsExp = new Date().getFullYear() - CAREER_START

  const bio = {
    name: 'Mohamed Ibrahim',
    alias: 'YapoeY',
    title: 'Senior Full Stack Developer',
    location: 'Seoul, South Korea',
    from: 'Egypt',
    email: 'yapoey@gmail.com',
    website: 'yapoey.com',
    github: 'github.com/yapoey',
    linkedin: 'linkedin.com/in/yapoey',
    youtube: 'youtube.com/c/yapoey-tech',
    summary: `Full Stack Developer with ${yearsExp}+ years of experience building web and mobile applications. Based in Seoul, South Korea. Experienced in leading frontend teams, building design systems, and delivering products across healthcare, education, e-commerce, and SaaS platforms. Visited 22+ countries. YouTube creator teaching web development in Arabic.`,
  }

  const experience = [
    {
      title: 'Senior Frontend Developer & Frontend Team Lead',
      company: 'Sibel Health International',
      type: 'Full-time',
      location: 'Seoul, Korea & US',
      duration: '2022/10 — Present',
      highlights: [
        'Lead frontend team across Korea and US offices',
        'Built Discovery Hub — migrated entire codebase from React to Vue.js from scratch (256 commits)',
        'Built Itchy Sense product for Japanese company Maruho within Discovery platform',
        'Created Sibel Health Design System using atomic design methodology, extracted as shared npm workspace package',
        'Built Central Monitoring (Tucana) — real-time monitoring of 64 patients via WebSocket',
        'Optimized frontend performance for real-time data streaming',
        'Traveled to US (2024) to fix critical issues in Maternal project — helped company achieve FDA approval',
        'Created mock server for development and testing environments',
        'Implemented comprehensive E2E testing (Cypress) and unit testing (Jest) for both Discovery Hub and Tucana',
        'Set up GitHub Actions CI for automated test runs',
        'Managed Docker containers for development and deployment',
      ],
      tech: 'Vue.js, Next.js, TypeScript, SCSS, WebSocket, Docker, Cypress, Jest, i18n, Monorepo',
    },
    {
      title: 'Product Manager & Technical Lead',
      company: 'YapoeY Bit',
      type: 'Studio',
      location: 'Seoul, Korea',
      duration: '2022/10 — Present',
      highlights: [
        'Founded and leading a development studio delivering full-stack web and mobile products',
        'Leading cross-functional teams across frontend, backend, and mobile development',
        'Delivered 10+ products for clients in Korea, Egypt, Qatar, and Japan',
        'Key projects:',
        '→ NooN Center (Egypt) — Full education platform with live/recorded courses, instructor portal, admin dashboard. Next.js 15, Express, MySQL. 576 commits',
        '→ Russian Whale (Egypt) — Compound & guest management with maintenance request system, 7 user roles. Nuxt 3, Express, MySQL. 547 commits',
        '→ bizNavi (Korea) — Enterprise mobile app with 33 feature modules (tasks, attendance, payments, patents). Flutter, BLoC. 816 commits',
        '→ ChaiTalk (Own) — Social networking app with real-time messaging. Flutter, Express, Socket.IO, DynamoDB, Redis. 193 commits',
        '→ Layun (Korea) — Product CMS with multilingual support (EN/ES/KO/RU). React, Express, PostgreSQL. 285 commits',
        '→ Seoul Bird (Korea) — Bird watching platform with KakaoMap integration. Nuxt 4, AWS S3. 55 commits',
        '→ Meya-Meya (Own) — AI-powered restaurant ordering with voice/text via Gemini AI. Nuxt 4 monorepo, NestJS. In development',
        '→ cTask (Korea) — Organization management web app. Vue.js 3, PrimeVue. 128 commits',
        '→ West East Forte (Korea) — B2B agency website. Nuxt 3, @nuxt/content. 27 commits',
      ],
      tech: 'Vue.js, Nuxt.js, Next.js, React, Flutter, Node.js, Express, NestJS, MySQL, PostgreSQL, DynamoDB, Redis, AWS, Docker',
    },
    {
      title: 'Frontend Developer',
      company: 'b2ggames',
      type: 'Full-time',
      location: 'Seoul, Korea',
      duration: '2021/12 — 2022/10',
      highlights: [
        'Built Asian Model Festival (AMF) event website from scratch',
        'Built Korean Baseball League fantasy gaming platform',
        'Daily maintenance of existing projects, debugging, and cross-browser compatibility',
        'Set documentation system using Notion',
        'Set onboarding program for new developers',
        'Implemented multiple languages (English, Korean)',
      ],
      tech: 'Nuxt.js, Vuex, SASS, Jira, Bitbucket',
    },
    {
      title: 'Frontend Developer',
      company: 'Himedi',
      type: 'Full-time',
      location: 'Seoul, Korea',
      duration: '2019/12 — 2021/11',
      highlights: [
        'Built medical tourism platform connecting Korean hospitals with international patients from scratch',
        'Implemented 3 languages (English, Arabic, Russian) with full RTL support',
        'Translated UI/UX wireframes to production code',
        'Enhanced application performance and scalability',
        'Ensured cross-browser compatibility',
      ],
      tech: 'Vue.js, Vuex, Bootstrap 4, Webpack, Axios, i18n, RTLCSS',
    },
    {
      title: 'Full Stack Developer',
      company: 'GeeksFamily',
      type: 'Full-time',
      location: 'Seoul, Korea',
      duration: '2019/02 — 2019/11',
      highlights: [
        'Built POS system and delivery sharing platform',
        'Developed food ordering web app',
        'Integrated Facebook, Google Analytics, and payment APIs',
        'Built daily order calculation reporting tool',
      ],
      tech: 'Vue.js, Laravel, MySQL, Chart.js, jQuery, Bootstrap',
    },
    {
      title: 'Full Stack Developer',
      company: 'Bio & Pure for Cosmetic',
      type: 'Freelance',
      location: 'Qatar',
      duration: '2016/05 — 2018/08',
      highlights: [
        'Designed and developed cosmetics e-commerce website from scratch',
        'Full frontend and backend implementation',
      ],
      tech: 'Laravel, Bootstrap 4, MySQL, JavaScript',
    },
  ]

  const education = [
    {
      degree: 'Computer Science & Engineering',
      school: 'Hanyang University',
      location: 'Seoul, Korea',
      year: '2015 — 2019',
    },
    {
      degree: 'Korean Language Program',
      school: 'Kyung Hee University',
      location: 'Seoul, Korea',
      year: '2014 — 2015',
    },
    {
      degree: 'Bachelor in Accounting',
      school: 'Ain Shams University',
      location: 'Cairo, Egypt',
      year: '2009 — 2013',
    },
  ]

  const skills = {
    frontend: ['Vue.js', 'Nuxt.js', 'React', 'Next.js', 'Flutter', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SASS', 'Tailwind CSS', 'Bootstrap'],
    backend: ['Node.js', 'Express', 'NestJS', 'PHP', 'Laravel'],
    database: ['MySQL', 'PostgreSQL', 'DynamoDB', 'Redis'],
    cloud: ['AWS (S3, Lambda, EC2)', 'Docker', 'Google Cloud', 'Vercel'],
    tools: ['Git', 'GitHub', 'Bitbucket', 'Jira', 'Notion', 'Figma', 'Cypress', 'Jest'],
    languages: [
      { name: 'Arabic', level: 'Native', flag: '🇪🇬' },
      { name: 'English', level: 'Fluent', flag: '🇺🇸' },
      { name: 'Korean', level: 'Conversational', flag: '🇰🇷' },
    ],
  }

  const countries = [
    { name: 'South Korea', flag: '🇰🇷', note: 'Home since 2014' },
    { name: 'Egypt', flag: '🇪🇬', note: 'Home country' },
    { name: 'USA', flag: '🇺🇸', note: 'Sibel Health — FDA project' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Taiwan', flag: '🇹🇼' },
    { name: 'Hong Kong', flag: '🇭🇰' },
    { name: 'Philippines', flag: '🇵🇭' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Vietnam', flag: '🇻🇳' },
    { name: 'Cambodia', flag: '🇰🇭' },
    { name: 'Laos', flag: '🇱🇦' },
    { name: 'Finland', flag: '🇫🇮' },
    { name: 'Estonia', flag: '🇪🇪' },
    { name: 'Poland', flag: '🇵🇱' },
    { name: 'Qatar', flag: '🇶🇦', note: 'Client project' },
    { name: 'Kuwait', flag: '🇰🇼' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'UAE', flag: '🇦🇪' },
    { name: 'Oman', flag: '🇴🇲' },
    { name: 'Jordan', flag: '🇯🇴' },
    { name: 'Yemen', flag: '🇾🇪' },
  ]

  const stats = {
    yearsExp,
    projects: '15+',
    countriesVisited: '22+',
    languages: 3,
    companies: 6,
    degrees: 2,
    commits: '6000+',
  }

  return { bio, experience, education, skills, countries, stats }
}
