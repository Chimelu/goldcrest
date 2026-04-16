import type { NewsItem } from '../types';

type Props = {
  news: NewsItem[];
};

export default function NewsPage({ news }: Props) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <h2 className="text-lg font-semibold">Crypto News & Trends</h2>
      <p className="text-xs text-slate-400">Latest trending items from market feeds.</p>
      <div className="mt-3 space-y-2">
        {news.length === 0 ? (
          <p className="text-sm text-slate-400">No news available yet.</p>
        ) : (
          news.map(item => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-slate-700 p-3 text-sm hover:border-amber-400/60 hover:bg-slate-800/60"
            >
              {item.title}
            </a>
          ))
        )}
      </div>
    </section>
  );
}
