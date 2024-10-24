import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { env } from 'node:process';

const options = {
  title: "MetaCPAN infra",
  description: "MetaCPAN infrastructure and networking",
  bundler: viteBundler(),
  theme: defaultTheme({
    sidebar: "heading",
    sidebarDepth: 5,
    displayAllHeaders: true,
    lastUpdated: true,
    editLinks: true,
    repo: 'metacpan/network-infrastructure',
    navbar: [
      { text: "Playbooks", link: "/playbooks/" },
      { text: "Sites", link: "/sites/" },
      { text: "Docker", link: "/docker/" },
      { text: "Servers", link: "/servers/" },
    ],
  }),
  head: [
  //   [
  //     "link",
  //     {
  //       rel: "stylesheet",
  //       href: "https://use.fontawesome.com/releases/v5.7.1/css/all.css",
  //       integrity:
  //         "sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr",
  //       crossorigin: "anonymous"
  //     }
  //   ]
  ]
};

if (env.GITHUB_PAGES_BASE) {
  options.base = env.GITHUB_PAGES_BASE.replace(/\/?$/, '/');
}

export default defineUserConfig(options);
