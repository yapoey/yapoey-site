import { defineSitemapEventHandler, asSitemapUrl } from '#imports'

export default defineSitemapEventHandler(() => {
  return [
    asSitemapUrl({
      loc: '/',
      changefreq: 'monthly',
      priority: 1.0,
    }),
    asSitemapUrl({
      loc: '/gui',
      changefreq: 'weekly',
      priority: 0.9,
    }),
    asSitemapUrl({
      loc: '/cli',
      changefreq: 'monthly',
      priority: 0.7,
    }),
    asSitemapUrl({
      loc: '/resume',
      changefreq: 'monthly',
      priority: 0.8,
    }),
    asSitemapUrl({
      loc: '/resume/print',
      changefreq: 'monthly',
      priority: 0.5,
    }),
  ]
})
