import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.HEAD ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  'main'

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'content/posts',
        fields: [
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
          },
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
      },
      {
        name: 'snippet',
        label: 'Snippets',
        path: 'content/snippets',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
          },
          {
            type: 'image',
            name: 'image',
            label: 'Image',
          },
          {
            type: 'string',
            name: 'source',
            label: 'Source',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
            templates: [
              {
                name: 'Iframe',
                label: 'Iframe',
                fields: [
                  {
                    name: 'src',
                    label: 'Src',
                    type: 'string',
                  },
                  {
                    name: 'width',
                    label: 'Width',
                    type: 'string',
                  },
                  {
                    name: 'height',
                    label: 'Height',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/snippets/${document._sys.filename}`,
        },
      },
    ],
  },
})
