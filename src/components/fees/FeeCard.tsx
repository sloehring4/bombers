import { DollarSign } from 'lucide-react';
import type { AgeFee } from '@/lib/data/fees';

interface FeeCardProps {
  fee: AgeFee;
}

export default function FeeCard({ fee }: FeeCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-bombers-yellow transition">
      <div className="flex items-center gap-3 mb-4">
        <DollarSign className="w-6 h-6 text-bombers-navy" />
        <h3 className="text-xl font-bold text-bombers-navy">{fee.ageGroup}</h3>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-bold text-bombers-navy">
          ${fee.total}
        </div>
        {fee.description && (
          <p className="text-sm text-gray-600 mt-2">{fee.description}</p>
        )}
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-200">
        {fee.breakdown.map((item, index) => (
          <div key={index} className="flex justify-between text-sm text-gray-700">
            <span>{item.label}</span>
            <span className="font-semibold">${item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
