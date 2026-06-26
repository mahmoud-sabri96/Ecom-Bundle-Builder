import { create } from "zustand";
import type { BundleItem, Product, Variant } from "../types/products";
import data from "../db/products.json";

const bundle = localStorage.getItem("bundle");

const cashedBundle = bundle ? JSON.parse(bundle) : {}

type BundleState = {
    products: Product[];
    items: BundleItem[];
    bundleOldPrice: number;
    bundleNewPrice: number;
    incrementQty: (productId: string, activeVariant?: Variant | null) => void;
    decrementQty: (productId: string, activeVariant?: Variant | null) => void;
    setActiveVariant: (productId: string, variantId: string) => void;
};
function deriveItems(products: Product[]): BundleItem[] {
    return products.filter((product) => {
        const hasProductQty = product.quantity > 0;
        const hasVariantQty = product.variants.some((v) => v.qty > 0);
        return hasProductQty || hasVariantQty;
    });
}
function calculateTotals(items: Product[]) {
    return items.reduce(
        (totals, product) => {
            const qty =
                product.variants && product.variants.length > 0
                    ? product.variants.reduce((sum, variant) => sum + variant.qty, 0)
                    : product.quantity;

            totals.totalNewPrice += product.price * qty;

            const effectiveOldPrice = product.oldPrice ? product.oldPrice : product.price;
            totals.totalOldPrice += effectiveOldPrice * qty;

            return totals;
        },
        {
            totalOldPrice: 0,
            totalNewPrice: 0,
        }
    );
}

export const useBundleStore = create<BundleState>((set) => ({
    products: bundle ? cashedBundle?.items : data.products,
    items: bundle ? deriveItems(cashedBundle?.items) : deriveItems(data.products),
    bundleOldPrice: bundle ? calculateTotals(cashedBundle?.items)['totalOldPrice'] : 0,
    bundleNewPrice: bundle ? calculateTotals(cashedBundle?.items)['totalNewPrice'] : 0,

    incrementQty: (productId, activeVariant) =>
        set((state) => {
            const products = state.products.map((product) => {
                if (product.id !== productId) return product;

                if (product.variants.length > 0) {
                    return {
                        ...product,
                        variants: product.variants.map((variant) =>
                            variant.id === activeVariant?.id
                                ? { ...variant, qty: variant.qty + 1 }
                                : variant,
                        ),
                    };
                }

                return {
                    ...product,
                    quantity:
                        product.quantity < product.maxQuantity
                            ? product.quantity + 1
                            : product.quantity,
                };
            });
            const items = deriveItems(products);
            const { totalOldPrice, totalNewPrice } = calculateTotals(items);
            // items is derived from the FRESH products, not the stale state
            return {
                products,
                items,
                bundleOldPrice: totalOldPrice,
                bundleNewPrice: totalNewPrice
            };
        }),

    decrementQty: (productId, activeVariant) =>
        set((state) => {
            const products = state.products.map((product) => {
                if (product.id !== productId) return product;

                if (product.variants.length > 0) {
                    return {
                        ...product,
                        variants: product.variants.map((variant) =>
                            variant.id === activeVariant?.id
                                ? { ...variant, qty: Math.max(0, variant.qty - 1) }
                                : variant,
                        ),
                    };
                }

                return { ...product, quantity: Math.max(0, product.quantity - 1) };
            });
            const items = deriveItems(products);
            const { totalOldPrice, totalNewPrice } = calculateTotals(items);
            return {
                products,
                items,
                bundleOldPrice: totalOldPrice,
                bundleNewPrice: totalNewPrice
            };
        }),
    setActiveVariant: (productId, variantId) =>
        set((state) => {
            const products = state.products.map((product) => {
                if (product.id !== productId) return product;

                // Guard against setting a variant id that doesn't belong to this product
                const variantExists = product.variants.some((v) => v.id === variantId);
                if (!variantExists) return product;

                return { ...product, activeVariantId: variantId };
            });

            return { products };
        }),
}));

