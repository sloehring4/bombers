import type { Metadata } from 'next';
import ProductGrid from '@/components/spirit-wear/ProductGrid';
import { spiritWearProducts, SPIRIT_WEAR_STORE_URL } from '@/lib/data/spirit-wear';

export const metadata: Metadata = {
  title: 'Spirit Wear | O\'Fallon Bombers',
  description: 'Shop official O\'Fallon Bombers apparel, accessories, and team gear.',
};

export default function SpiritWearPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-bombers-navy mb-4">
          Spirit Wear
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Show your Bombers pride with official team apparel and accessories.
        </p>
      </div>

      {/* Product Catalog Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-bombers-navy mb-6 border-b-4 border-bombers-yellow pb-2 inline-block">
          Available Products
        </h2>
        <div className="mt-8">
          <ProductGrid products={spiritWearProducts} storeUrl={SPIRIT_WEAR_STORE_URL} />
        </div>
      </section>

      {/* Store CTA Section */}
      <section className="bg-bombers-navy text-white rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Visit Our Store
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Browse our complete catalog and make purchases through our secure online store.
        </p>
        <a
          href={SPIRIT_WEAR_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-bombers-yellow text-bombers-navy px-8 py-3 rounded-lg font-semibold hover:bg-bombers-yellow/90 transition-colors"
        >
          Shop All Products
        </a>
      </section>
    </main>
  );
}
