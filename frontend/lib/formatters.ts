/**
 * Format a price in rupees to Indian format
 * e.g. 127400 → "₹1,27,400"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a number in Indian style without currency symbol
 * e.g. 127400 → "1,27,400"
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/**
 * Calculate discount percentage
 * e.g. mrp=134900, price=127400 → "6% off"
 */
export function discountPercent(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Format EMI rate display
 * 0% → "No-cost EMI"
 * 10.5% → "10.5% p.a."
 */
export function formatInterestRate(rate: number): string {
  if (rate === 0) return "0% p.a.";
  return `${rate}% p.a.`;
}
