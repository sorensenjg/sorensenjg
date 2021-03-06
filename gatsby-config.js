module.exports = {
  siteMetadata: {
    title: `Justin Sorensen`,
    author: `Justin Sorensen`,
    description: ``,
    siteUrl: `https://sorensenjg.com`,
    social: {
      github: `sorensenjg`,
      twitter: `sorensenjg`,
    },
  },
  plugins: [
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        plugins: [
          "gatsby-tinacms-git",
          "gatsby-tinacms-remark",
          "gatsby-tinacms-json",
        ],
        sidebar: {
          hidden: process.env.NODE_ENV === "production",
          position: "displace",
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/data`,
        name: `data`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-60892318-3`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sorensenjg`,
        short_name: `sorensenjg`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#f95542`,
        display: `minimal-ui`,
        // icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
