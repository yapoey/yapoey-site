// Centralized GA4 event tracking. nuxt-gtag's useTrackEvent is auto-imported
// and queues calls until gtag loads; in dev it no-ops because gtag.enabled
// in nuxt.config.ts is gated on NODE_ENV === 'production'.
export function useAnalytics() {
  const track = (event, params = {}) => {
    if (!import.meta.client) return
    const clean = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    )
    useTrackEvent(event, clean)
  }

  return {
    navClick: (section, location = 'header') =>
      track('nav_click', { section, location }),

    ctaClick: (cta, location) =>
      track('cta_click', { cta, location }),

    modeSelect: (mode, method) =>
      track('mode_select', { mode, method }),

    languageChange: (to, from, location = 'header') =>
      track('language_change', { from, to, location }),

    themeChange: (theme) =>
      track('theme_change', { theme }),

    mobileMenu: (state) =>
      track('mobile_menu', { state }),

    worksFilter: (filter) =>
      track('works_filter', { filter }),

    projectView: (project, category, company) =>
      track('project_view', { project, category, company }),

    projectVisit: (project, url) =>
      track('project_visit', { project, url }),

    resumeTab: (tab) =>
      track('resume_tab', { tab }),

    experienceExpand: (jobTitle, company) =>
      track('experience_expand', { job_title: jobTitle, company }),

    fileDownload: (fileName, linkText) =>
      track('file_download', { file_name: fileName, file_extension: 'pdf', link_text: linkText }),

    contactSubmit: (status) =>
      track('contact_submit', { status }),

    socialClick: (platform, location = 'footer') =>
      track('social_click', { platform, location }),

    cliCommand: (command, source) =>
      track('cli_command', { command, source }),

    cliTheme: (theme) =>
      track('cli_theme', { theme }),
  }
}
