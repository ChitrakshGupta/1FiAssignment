"use client";

interface Variant {
  id: string;
  name: string;
  storage?: string | null;
  color?: string | null;
  colorHex?: string | null;
  mrp: number;
  price: number;
  imageUrl?: string | null;
  isDefault?: boolean;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariantId: string;
  onSelect: (variant: Variant) => void;
}

// Group variants by storage, then by color within storage
function groupByStorage(variants: Variant[]) {
  const storages: string[] = [];
  const byStorage: Record<string, Variant[]> = {};

  for (const v of variants) {
    const storage = v.storage ?? "Default";
    if (!byStorage[storage]) {
      byStorage[storage] = [];
      storages.push(storage);
    }
    byStorage[storage].push(v);
  }
  return { storages, byStorage };
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  const selectedVariant = variants.find((v) => v.id === selectedVariantId);
  const { storages, byStorage } = groupByStorage(variants);
  const hasStorage = variants.some((v) => v.storage);
  const hasColor = variants.some((v) => v.color && v.colorHex);

  // Active storage tab — always derived from the currently selected variant
  const activeStorage = selectedVariant?.storage ?? storages[0];

  // Colors available for the currently active storage
  const colorsForStorage = hasStorage
    ? (byStorage[activeStorage ?? ""] ?? [])
    : variants;

  // ─── Storage tab click ───────────────────────────────────────────────────
  // When the user picks a new storage, try to keep the same color if it exists
  // in the new storage bucket; otherwise fall back to the first variant there.
  function handleStorageChange(storage: string) {
    const variantsInStorage = byStorage[storage] ?? [];
    if (!variantsInStorage.length) return;

    const currentColor = selectedVariant?.color;
    const sameColor = currentColor
      ? variantsInStorage.find((v) => v.color === currentColor)
      : null;

    onSelect(sameColor ?? variantsInStorage[0]);
  }

  // ─── Color swatch click ──────────────────────────────────────────────────
  // Only variants within the active storage are rendered, so clicking a swatch
  // never crosses a storage boundary — the bug is structurally impossible now.
  function handleColorChange(variant: Variant) {
    onSelect(variant);
  }

  return (
    <div className="space-y-4">
      {/* Storage selector */}
      {hasStorage && storages.length > 1 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Storage
          </p>
          <div className="flex flex-wrap gap-2">
            {storages.map((storage) => {
              const isActive = activeStorage === storage;
              return (
                <button
                  key={storage}
                  onClick={() => handleStorageChange(storage)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? "border-[#712CDC] bg-[#F5F0FD] text-[#712CDC]"
                      : "border-gray-200 text-gray-600 bg-white"
                  }`}
                >
                  {storage}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color selector — only shows colors for the active storage */}
      {hasColor && colorsForStorage.length > 1 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Color
            {selectedVariant?.color && (
              <span className="text-gray-900 normal-case ml-2 font-medium">
                · {selectedVariant.color}
              </span>
            )}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {colorsForStorage.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  onClick={() => handleColorChange(variant)}
                  title={variant.color ?? variant.name}
                  className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                    isSelected
                      ? "border-[#712CDC] scale-110 shadow-md"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: variant.colorHex ?? "#E5E7EB" }}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No color — show text chips for variant name */}
      {!hasColor && variants.length > 1 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Variant
          </p>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  onClick={() => onSelect(variant)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isSelected
                      ? "border-[#712CDC] bg-[#F5F0FD] text-[#712CDC]"
                      : "border-gray-200 text-gray-600 bg-white"
                  }`}
                >
                  {variant.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* When only one color option exists per storage, show it as a text chip */}
      {hasColor && colorsForStorage.length === 1 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Color
          </p>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#712CDC] bg-[#F5F0FD] text-[#712CDC] text-sm font-medium"
          >
            <span
              className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: colorsForStorage[0]?.colorHex ?? "#E5E7EB" }}
            />
            {colorsForStorage[0]?.color ?? colorsForStorage[0]?.name}
          </div>
        </div>
      )}
    </div>
  );
}
