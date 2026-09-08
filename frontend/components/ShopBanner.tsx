import Image from "next/image";

/**
 * ShopBanner
 * Matches the exact top card used in the 1Fi mobile application:
 * - Royal purple background with gold confetti
 * - ✦ NO-COST EMIs badge
 * - "Shop today, Pay later using Mutual funds" typography
 * - 3D shopping bag with red sports car, bike, laptop, and phone
 */
export default function ShopBanner() {
  return (
    <div className="relative w-full overflow-hidden bg-[#260f95]">
      <Image
        src="/images/shop-banner.png"
        alt="Shop today, Pay later using Mutual funds"
        width={1080}
        height={710}
        priority
        unoptimized
        className="w-full h-auto object-cover object-top block select-none pointer-events-none"
      />
    </div>
  );
}

