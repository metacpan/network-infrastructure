module.exports = {
    title: "MetaCPAN infra",
    description: "MetaCPAN infrastructure and networking",
    themeConfig: {
      sidebar: "auto",
      sidebarDepth: 5,
      displayAllHeaders: true,
      lastUpdated: "Last Updated",
          // defaults to false, set to true to enable
    editLinks: true,
    repo: 'metacpan/network-infrastructure',
      nav: [
        { text: "Home", link: "/" },
        { text: "Docker", link: "/docker/" },
        { text: "Servers", link: "/servers/" },
        { text: "Playbooks", link: "/playbooks/" }
      ]
    },
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