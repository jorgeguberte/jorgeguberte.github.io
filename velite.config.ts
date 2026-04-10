import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'content',
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s.object({
        title: s.string(),
        slug: s.string(),
        date: s.isodate(),
        description: s.string(),
        tags: s.array(s.string()).optional(),
        content: s.mdx(),
      }),
    },
  },
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    clean: true,
  },
})
