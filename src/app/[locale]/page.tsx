import { T } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import { Currency } from "gt-next";

type MenuItem = {
  name: string;
  description: string;
  prices: { size: string; price: number }[];
  tags: string[];
  seasonal?: boolean;
};

const menu: MenuItem[] = [
  {
    name: "Espresso",
    description: "Rich, full-bodied shot of pure coffee intensity.",
    prices: [
      { size: "Single", price: 3.5 },
      { size: "Double", price: 4.5 },
    ],
    tags: ["Dairy-free", "Vegan"],
  },
  {
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and velvety foam.",
    prices: [
      { size: "Small", price: 4.5 },
      { size: "Medium", price: 5.25 },
      { size: "Large", price: 6.0 },
    ],
    tags: [],
  },
  {
    name: "Oat Milk Latte",
    description:
      "Smooth espresso with creamy oat milk for a naturally sweet finish.",
    prices: [
      { size: "Small", price: 5.0 },
      { size: "Medium", price: 5.75 },
      { size: "Large", price: 6.5 },
    ],
    tags: ["Dairy-free", "Vegan"],
  },
  {
    name: "Matcha Latte",
    description:
      "Ceremonial-grade matcha whisked with steamed milk of your choice.",
    prices: [
      { size: "Small", price: 5.5 },
      { size: "Medium", price: 6.25 },
      { size: "Large", price: 7.0 },
    ],
    tags: [],
  },
  {
    name: "Cold Brew",
    description:
      "Steeped for 18 hours, producing a smooth and low-acidity brew served over ice.",
    prices: [
      { size: "Medium", price: 5.0 },
      { size: "Large", price: 6.0 },
    ],
    tags: ["Dairy-free", "Vegan"],
  },
  {
    name: "Lavender Honey Latte",
    description:
      "Espresso with house-made lavender syrup, local honey, and steamed milk.",
    prices: [
      { size: "Small", price: 6.0 },
      { size: "Medium", price: 6.75 },
      { size: "Large", price: 7.5 },
    ],
    tags: ["Seasonal"],
    seasonal: true,
  },
  {
    name: "Spiced Chai",
    description:
      "Black tea infused with cinnamon, cardamom, ginger, and clove, steamed with milk.",
    prices: [
      { size: "Small", price: 4.75 },
      { size: "Medium", price: 5.5 },
      { size: "Large", price: 6.25 },
    ],
    tags: [],
  },
  {
    name: "Maple Pecan Cold Brew",
    description:
      "Cold brew with real maple syrup, pecan milk, and a hint of vanilla.",
    prices: [
      { size: "Medium", price: 6.5 },
      { size: "Large", price: 7.25 },
    ],
    tags: ["Seasonal", "Dairy-free", "Vegan"],
    seasonal: true,
  },
];

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, string> = {
    "Dairy-free": "bg-emerald-900/50 text-emerald-300 border-emerald-800",
    Vegan: "bg-green-900/50 text-green-300 border-green-800",
    Seasonal: "bg-amber-900/50 text-amber-300 border-amber-800",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full border ${colors[tag] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}
    >
      {tag}
    </span>
  );
}

function MenuCard({ item, gt }: { item: MenuItem; gt: (s: string) => string }) {
  return (
    <div className="border border-neutral-800 rounded-lg p-5 hover:border-neutral-700 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-neutral-100">
          {gt(item.name)}
        </h3>
        {item.seasonal && (
          <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">
            {gt("Seasonal")}
          </span>
        )}
      </div>
      <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
        {gt(item.description)}
      </p>
      <div className="flex flex-wrap gap-3 mb-4">
        {item.prices.map((p) => (
          <div
            key={p.size}
            className="flex items-center gap-2 text-sm"
          >
            <span className="text-neutral-500">{gt(p.size)}</span>
            <span className="text-neutral-200 font-medium">
              <Currency currency="USD">{p.price}</Currency>
            </span>
          </div>
        ))}
      </div>
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <T key={tag}>
              <TagBadge tag={tag} />
            </T>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function Home() {
  const gt = await getGT();

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="https://generaltranslation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              General Translation
            </a>
            <span className="text-neutral-700">/</span>
            <h1 className="text-sm font-semibold text-neutral-100">
              {gt("Coffee Shop")}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/gt-examples/coffee-shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="View on GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <T>
            <h2 className="text-2xl font-semibold text-neutral-100 mb-3">
              Menu
            </h2>
            <p className="text-base text-neutral-400 max-w-xl leading-relaxed">
              Handcrafted drinks made with carefully sourced ingredients. All
              prices in USD. Oat, almond, and soy milk available as
              substitutions for any drink.
            </p>
          </T>
        </div>

        <T>
          <div className="mb-8">
            <p className="text-xs text-neutral-600 border border-neutral-800 rounded-md px-4 py-3">
              This is an example application built with General Translation to
              demonstrate internationalization. It is not a real coffee shop.
            </p>
          </div>
        </T>

        <div className="grid gap-4 sm:grid-cols-2">
          {menu.map((item) => (
            <MenuCard key={item.name} item={item} gt={gt} />
          ))}
        </div>

        <T>
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <h3 className="text-lg font-semibold text-neutral-100 mb-4">
              Dietary Information
            </h3>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div className="border border-neutral-800 rounded-lg p-4">
                <p className="font-medium text-emerald-300 mb-1">Dairy-free</p>
                <p className="text-neutral-500">
                  Made without any dairy products. Available with oat, almond, or
                  soy milk.
                </p>
              </div>
              <div className="border border-neutral-800 rounded-lg p-4">
                <p className="font-medium text-green-300 mb-1">Vegan</p>
                <p className="text-neutral-500">
                  Contains no animal products whatsoever. All syrups are
                  plant-based.
                </p>
              </div>
              <div className="border border-neutral-800 rounded-lg p-4">
                <p className="font-medium text-amber-300 mb-1">Seasonal</p>
                <p className="text-neutral-500">
                  Available for a limited time. Seasonal ingredients sourced from
                  local farms.
                </p>
              </div>
            </div>
          </div>
        </T>
      </main>
    </div>
  );
}
