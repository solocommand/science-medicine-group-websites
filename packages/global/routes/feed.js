const { asyncRoute, isFunction: isFn } = require('@parameter1/base-cms-utils');
const { getAsArray, get } = require('@parameter1/base-cms-object-path');
const gql = require('graphql-tag');
const { encode } = require('html-entities');
const moment = require('moment');

module.exports = (app) => {
  const parseEmbeddedMedia = get(app, 'locals.parseEmbeddedMedia');
  const renderBody = isFn(parseEmbeddedMedia) ? parseEmbeddedMedia : v => v;
  app.get('/feed', asyncRoute(async (req, res) => {
    const FEED = gql`
      query Feed($input: WebsiteScheduledContentQueryInput = {}, $siteId: ObjectID!) {
        websiteSite(input: { id: $siteId }) {
          id
          shortName
          name
          url
        }
        websiteScheduledContent(input: $input) {
          totalCount
          edges {
            node {
              id
              name
              teaser
              body
              publishedDate(input: { format: "ddd, DD MMM YYYY hh:mm:ss ZZ" })
              labels
              siteContext {
                url
              }
              company {
                id
                name
              }
              primarySite {
                id
                shortName
              }
              primaryImage {
                id
                src(input: { options: { auto: "format,compress" } })
                alt
                isLogo
              }
              websiteSchedules {
                section {
                  id
                  name
                }
              }
              ... on Authorable {
                authors {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const limit = 10;
    const skip = 0;
    const input = {
      includeContentTypes: ['Article'],
      pagination: {
        limit,
        skip,
      },
    };

    const siteId = req.app.locals.config.website('id');
    const variables = { input, siteId };
    const { data } = await req.apollo.query({ query: FEED, variables });
    const { websiteSite: site } = data;
    const siteUrl = `https://${site.url}`;
    const encodeOptions = { mode: 'specialChars', level: 'html5' };
    const siteName = encode(site.name, encodeOptions);
    const lastBuildDate = moment().format('ddd, DD MMM YYYY hh:mm:ss ZZ');

    const items = getAsArray(data, 'websiteScheduledContent.edges').map((edge) => {
      const { node } = edge;
      const itemName = encode(node.name, encodeOptions);
      const itemUrl = get(node, 'siteContext.url');
      const itemAuthors = getAsArray(node, 'authors.edges').map(o => get(o, 'node.name')).filter(o => o).join(', ');
      const itemPubDate = node.publishedDate;
      const itemTeaser = node.teaser;
      const itemBody = renderBody(node.body, res, { lazyloadImages: false });
      const schedules = new Set(getAsArray(node, 'websiteSchedules')
        .map(o => get(o, 'section.name'))
        .filter(name => name !== 'Home')
        .map(s => `<category><![CDATA[${s}]]></category>`));
      const item = [
        '<item>',
        `<title>${itemName}</title>`,
        `<link>${itemUrl}</link>`,
        `<dc:creator><![CDATA[${itemAuthors}]]></dc:creator>`,
        `<pubDate>${itemPubDate}</pubDate>`,
        ...schedules,
        `<guid isPermaLink="false">${siteUrl}/${node.id}</guid>`,
        `<description><![CDATA[${itemTeaser}]]></description>`,
        `<content:encoded><![CDATA[${itemBody}]]></content:encoded>`,
        '</item>',
      ];
      return item.join('\n');
    });

    const rssAttributes = [
      'version="2.0"',
      'xmlns:content="http://purl.org/rss/1.0/modules/content/"',
      'xmlns:wfw="http://wellformedweb.org/CommentAPI/"',
      'xmlns:dc="http://purl.org/dc/elements/1.1/"',
      'xmlns:atom="http://www.w3.org/2005/Atom"',
      'xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"',
      'xmlns:slash="http://purl.org/rss/1.0/modules/slash/"',
    ].join(' ');
    const parts = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      `<rss ${rssAttributes}>`,
      '<channel>',
      `<title>${siteName}</title>`,
      `<atom:link href="${siteUrl}/feed/" rel="self" type="application/rss+xml" />`,
      `<link>${siteUrl}</link>`,
      `<description>${siteName}</description>`,
      `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
      '<language>en-US</language>',
      '<sy:updatePeriod>hourly</sy:updatePeriod>',
      '<sy:updateFrequency>1</sy:updateFrequency>',
      ...items,
      '</channel>',
      '</rss>',
    ];
    res.set('Content-Type', 'application/rss+xml');
    res.send(parts.join('\n'));
  }));
};
