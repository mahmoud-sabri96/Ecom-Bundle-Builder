export interface Category {
    id: string;
    label: string;
}

export type Variant = {
    id: string,
    value: string,
    label: string,
    image: string,
    qty: number
};

export interface Product {
    id: string;
    category: Category,
    image: string;
    imageAlt?: string;
    title: string;
    description?: string;
    learnMoreHref?: string;
    discountLabel?: string | null | undefined;
    variants: Variant[] ;
    selectedVariant?: string | null;
    oldPrice?: number | null;
    price: number;
    quantity: number;
    minQuantity?: number;
    maxQuantity: number;
    currency?: string;
}

export type BundleItem = Product;

export interface ServiceItem {
    id: string;
    icon: "plan" | "shipping";
    title: string;
    highlightedTitle?: string;
    subLabel?: string;
    oldPrice?: number;
    price: number;
    countsTowardTotal?: boolean;
}

export interface ProductCardProps {
    product: Product,
    activeVariant: Variant | null,
    setActiveVariant: (variant: Variant) => void,
    onIncrement: (productId: string) => void,
    onDecrement: (productId: string) => void,
}





