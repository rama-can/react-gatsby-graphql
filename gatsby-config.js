const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    siteUrl: 'https://ramacan.dev',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        fileName: isDev,
        displayName: isDev,
        pure: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/dev-404-page/', '/404/', '/404.html'],
        query: `{
          allSitePage {
            nodes {
              path
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }) => {

          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: 'e22eaa1631c3ab0cca1ca74e11c929',
        localeFallbacks: {
          'id': 'en',
        },
      },
    },
  ],
};
