import type { ServiceItem } from "@/types/products";

export const CAMERA_ID = 'cameras'
export const SENSOR_ID = 'sensors'

export const SERVICES: ServiceItem[] = [
  {
    id: "cam-unlimited",
    icon: "plan",
    title: "Cam",
    highlightedTitle: "Unlimited",
    oldPrice: 12.99,
    price: 9.99,
    countsTowardTotal: true,
  },
  {
    id: "fast-shipping",
    icon: "shipping",
    title: "Fast Shipping",
    oldPrice: 5.99,
    price: 0,
    // Promotional shipping isn't counted as part of the "value" baseline,
    // so it's excluded from the old-price subtotal used for savings math.
    countsTowardTotal: false,
  },
];