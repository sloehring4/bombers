import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { SpiritWearProduct } from '@/lib/data/spirit-wear';

interface ProductCardProps {
  product: SpiritWearProduct;
  storeUrl: string;
}

export default function ProductCard({ product, storeUrl }: ProductCardProps) {
  const buyUrl = product.externalUrl || storeUrl;

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-bombers-yellow hover:shadow-lg transition-all">
      {/* Image section */}
      <div className="relative h-48 bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="object-cover rounded-t-lg w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>

      {/* Content section */}
      <div className="p-6">
        {/* Category badge */}
        <div className="mb-2">
          <span className="bg-bombers-navy/10 text-bombers-navy text-xs px-2 py-0.5 rounded-full uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Product name */}
        <h3 className="text-lg font-bold text-bombers-navy mb-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {product.description}
        </p>

        {/* Price and buy button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-bombers-navy">
            ${product.price}
          </span>
          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-bombers-yellow text-bombers-navy px-4 py-2 rounded font-semibold text-sm hover:bg-bombers-yellow/90 transition-colors"
          >
            Buy Now
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Optional sizes display */}
        {product.sizes && (
          <p className="text-xs text-gray-500 mt-3">
            Sizes: {product.sizes.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
