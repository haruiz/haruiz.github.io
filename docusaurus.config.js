import {themes} from 'prism-react-renderer';
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
require('dotenv').config()


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Henry Ruiz',
  tagline: 'Hello world!|I\'m Henry Ruiz|Research Scientist at Texas A&M AgriLife Research|Machine Learning GDE|Open Source Lover',
  url: 'https://haruiz.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  trailingSlash: false,
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'haruiz', // Usually your GitHub org/user name.
  projectName: 'haruiz.github.io', // Usually your repo name.
  deploymentBranch: "main",
  // staticDirectories: ['public', 'static'],
  customFields: {
    githubUri: "https://github.com/haruiz",
    pictureUri: "/img/profile4.jpg",
    CONVERTKIT_API_KEY: process.env.CONVERTKIT_API_KEY,
    CONVERTKIT_FORM_ID: process.env.CONVERTKIT_FORM_ID
  },
  plugins: [
      '@docusaurus/plugin-ideal-image',
       'docusaurus-plugin-sass',
      ['./plugins/blog-plugin', {
        id: "blog",
        routeBasePath: "blog",
        path: "./blog",
      }
    ]
  ],
  presets: [
    [
      '@docusaurus/preset-classic', {
        blog: false,
        docs: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-K381GSE8KL'
        },
        gtag: {
          trackingID: 'G-K381GSE8KL'
        }
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    {
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        // respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Home',
        items: [
          {to: '/about', label: 'About', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/courses', label: 'Courses', position: 'left'},
          {to: '/publications', label: 'Publications', position: 'left'},
          {to: '/posters', label: 'Posters', position: 'left'},
          {to: '/newsletter', label: 'Newsletter', position: 'right'},
          // {to: '/slides', label: 'Slides', position: 'left'},
          {
            href: 'https://github.com/haruiz',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        // additionalLanguages: ['bash', 'diff', 'json'],
        magicComments: [{
            className: 'code-block-error-line',
            line: 'error-line-next',
          }
        ]
      },
    }
};

module.exports = config;
