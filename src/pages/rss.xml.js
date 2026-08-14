import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  const works = await getCollection('works', ({ data }) => !data.draft);

  return rss({
    title: `${SITE_TITLE} – Veprimtaria Artistike`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: works.map((work) => ({
      title: work.data.title,
      description: work.data.description ?? '',
      link: `veprat/${work.data.slug ?? work.id}/`,
      pubDate: new Date(work.data.year, 0, 1), // uses year as date
    })),
  });
}
