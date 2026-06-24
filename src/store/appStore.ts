import { create } from "zustand";
import type { BundleItem, Product, Variant } from "../types/products";
import data from "../db/products.json";

type BundleState = {
    products: Product[];
    items: BundleItem[];
    incrementQty: (productId: string, activeVariant?: Variant | null) => void;
    decrementQty: (productId: string, activeVariant?: Variant | null) => void;
};

function deriveItems(products: Product[]): BundleItem[] {
    return products.filter((product) => {
        const hasProductQty = product.quantity > 0;
        const hasVariantQty = product.variants.some((v) => v.qty > 0);
        return hasProductQty || hasVariantQty;
    });
}

export const useBundleStore = create<BundleState>((set) => ({
    products: data.products,
    items: deriveItems(data.products),

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

            // items is derived from the FRESH products, not the stale state
            return { products, items: deriveItems(products) };
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

            return { products, items: deriveItems(products) };
        }),
}));