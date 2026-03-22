# Feature: Blog System

## Goal
A fully working blog you can actually publish to — with rich text, code blocks, and image uploads.

---

## Stack Decision

| Layer | Choice | Why |
|-------|--------|-----|
| Database & Auth | Appwrite Cloud | Easy setup, generous free tier, REST + SDK |
| Image Storage | AWS S3 | Already using AWS (S3 URLs in existing code) |
| Image Upload Trigger | AWS Lambda | Handles presigned URL generation |
| Frontend Editor | TipTap | Best Vue-compatible rich text editor |
| Frontend Framework | Nuxt (existing) | No change |

---

## Architecture

```
Admin (you) writes post
     |
     v
/admin/blog/new  (Nuxt page, password protected)
     |
     ├── Text content → TipTap editor
     |
     └── Images →  [Upload Image] button
                        |
                        v
              POST /api/s3-upload  (Nuxt server route or Lambda)
                        |
                        v
              Lambda generates S3 presigned URL
                        |
                        v
              Browser uploads file directly to S3
                        |
                        v
              S3 returns public URL
                        |
                        v
              URL inserted into TipTap editor

     |
     v
Save post → Appwrite Database (collection: posts)
     |
     v
Published post appears at /blog/[slug]
```

---

## Appwrite Setup

### Collections

**posts**
| Field | Type | Notes |
|-------|------|-------|
| title | string | |
| slug | string | URL-friendly, unique |
| content | string | HTML from TipTap |
| excerpt | string | Short summary |
| coverImage | url | S3 URL |
| tags | string[] | e.g. ["vue", "tutorial"] |
| category | enum | "coding-test" / "courses" / "general" |
| published | boolean | Draft vs live |
| publishedAt | datetime | |
| lang | enum | "en" / "ko" / "ar" |
| readingTimeMin | integer | calculated |

**tags** (optional, for tag management)
| Field | Type |
|-------|------|
| name | string |
| slug | string |

### Auth
- Only you write posts → use Appwrite's built-in auth
- Admin pages protected by session check
- Public reads are open (no auth needed for viewing)

---

## S3 Image Upload Flow

### Lambda Function: `upload-blog-image`

Trigger: POST request with `{ filename, contentType }`
Returns: `{ uploadUrl, publicUrl }`

```
Request:  POST /api/s3-upload
          { "filename": "my-image.jpg", "contentType": "image/jpeg" }

Response: {
  "uploadUrl": "https://s3.amazonaws.com/...?presigned-params",
  "publicUrl": "https://s3.eu-west-3.amazonaws.com/yapoey.com/blog/my-image.jpg"
}
```

Browser then: `PUT uploadUrl` with the file binary → goes directly to S3
No file passes through your server.

### S3 Bucket Config
- Bucket: `yapoey.com` (already exists based on current code)
- New prefix: `blog/` (e.g. `blog/2024/01/my-image.jpg`)
- CORS: allow PUT from `yapoey.com` and `localhost`
- Files public readable: yes

---

## Blog Pages (Frontend)

### Public Routes
- `/blog` — list all posts (existing, needs redesign)
- `/blog/[slug]` — single post view
- `/blog/tag/[tag]` — posts by tag
- `/blog/coding-test` — keep existing route (filter by category)
- `/blog/courses` — keep existing route (filter by category)

### Admin Routes (protected)
- `/admin/blog` — list all posts (with edit/delete)
- `/admin/blog/new` — create post
- `/admin/blog/[id]/edit` — edit existing post

### Post Page Features
- Title + cover image
- Reading time estimate
- Tags
- Table of contents (auto-generated from headings)
- Code blocks with syntax highlighting (Shiki or Prism)
- Copy code button
- Share buttons (Twitter/X, copy link)
- Previous / Next post navigation

---

## TipTap Editor Features Needed

Extensions to install:
- StarterKit (bold, italic, headings, lists, blockquote, code)
- CodeBlockLowlight (syntax highlighted code blocks)
- Image (insert image by URL)
- Link
- Placeholder
- CharacterCount

Custom extension: **Image Upload Button**
- Button in toolbar: "Upload Image"
- Opens file picker
- Triggers S3 upload flow
- Inserts returned URL into editor as `<img>`

---

## CLI Integration

In CLI mode, `blog` command:
```
yapoey@terminal:~$ blog

Latest posts:
  [1] Building a CLI portfolio with Gemini AI (Dec 2024)
  [2] Why I moved from Egypt to Korea (Nov 2024)
  [3] Vue.js performance tips I learned the hard way (Oct 2024)

Type `open 1` to open in browser, or `open blog` for all posts.
```

---

## Existing Blog Pages
Current: `/blog/coding-test/_categoryId/_problemId/` and `/blog/courses/_courseId/_lecture/`

These pages exist but content source is unclear (static data? API?).

Action:
- Audit what these pages currently load data from
- Migrate data to Appwrite if it's static/hardcoded
- Keep same URL structure for SEO

---

## Implementation Steps
1. Create Appwrite account + project + collections
2. Set up S3 bucket CORS for direct upload
3. Write Lambda function for presigned URLs
4. Build Nuxt server route proxy (`/api/s3-upload`)
5. Install TipTap + extensions
6. Build admin editor page (`/admin/blog/new`)
7. Build image upload flow in editor
8. Build post list + single post public pages
9. Add Appwrite SDK calls (list, get, create, update, delete)
10. Add blog command to CLI mode
11. Audit and migrate existing coding-test/courses content

**Outsource to Codex:**
- Appwrite SDK CRUD boilerplate
- S3 Lambda presigned URL function
- TipTap configuration and extensions setup
