import fs from "node:fs/promises";
import path from "node:path";
import { load } from "cheerio";

type Card = {
  slug: string;
  type: "internal"|"external";
  title?: string|null;
  date?: string|null;
  cover?: string|null;
  excerpt?: string|null;
  sourceUrl?: string|null;
  sourceName?: string|null;
  fetchedAt?: string|null;
};

const NEWS_DIR = "src/content/news";
const CACHE_DIR = ".cache/news-meta";

async function fetchOG(url: string){
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  const $ = load(html);
  const pick = (s:string)=>$(s).attr("content")?.trim() ?? "";
  const title = pick('meta[property="og:title"]') || $("title").first().text().trim();
  const image = pick('meta[property="og:image"]') || pick('meta[name="twitter:image"]');
  const date  = pick('meta[property="article:published_time"]') || pick('meta[name="date"]');
  const site  = pick('meta[property="og:site_name"]') || new URL(url).hostname;
  const desc  = pick('meta[property="og:description"]') || pick('meta[name="description"]');
  return { title, image, date, site, desc };
}

async function run(){
  await fs.mkdir(CACHE_DIR, { recursive: true });
  const files = (await fs.readdir(NEWS_DIR)).filter(f=>f.endsWith(".json"));
  for(const f of files){
    const p = path.join(NEWS_DIR, f);
    const card: Card = JSON.parse(await fs.readFile(p, "utf8"));
    if(card.type !== "external" || !card.sourceUrl) continue;

    const cachePath = path.join(CACHE_DIR, card.slug + ".json");
    let meta: any = null;
    try { meta = JSON.parse(await fs.readFile(cachePath, "utf8")); } catch {}

    if(!meta){
      const m = await fetchOG(card.sourceUrl);
      meta = {
        title: m.title || null,
        cover: m.image || null,
        date:  m.date  || null,
        sourceName: m.site || null,
        excerpt: m.desc || null,
        fetchedAt: new Date().toISOString()
      };
      await fs.writeFile(cachePath, JSON.stringify(meta, null, 2));
    }

    const merged: Card = {
      ...card,
      title: card.title ?? meta.title,
      date:  card.date  ?? meta.date,
      cover: card.cover ?? meta.cover,
      excerpt: card.excerpt ?? meta.excerpt,
      sourceName: card.sourceName ?? meta.sourceName,
      fetchedAt: meta.fetchedAt
    };
    await fs.writeFile(p, JSON.stringify(merged, null, 2));
  }
}
run();
