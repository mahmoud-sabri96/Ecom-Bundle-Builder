import type { Product, Variant } from "@/types/products";
import { useCallback, useMemo, useState } from "react";

export function useProductCard(product: Product, activeVariant: Variant | null, setActiveVariant: (v: Variant) => void) {


    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(activeVariant);

    const hasVariant = product?.variants?.length

    const hasQuantity = product?.quantity > 0 || product?.variants?.some(v => v.qty >= 1)

    const isDisabledBtn = (hasVariant && !selectedVariant?.id) ? true : false

    const handleChangeVariant = useCallback(
        (variant: Variant) => {
            setSelectedVariant(variant);
            setActiveVariant(variant);
        },
        [setSelectedVariant, setActiveVariant]
    );

    const visibleQty = useMemo(() => {
        if (product?.variants?.length > 0) {
            return product?.variants?.find(i => i.id === selectedVariant?.id)?.qty
        } else {
            return product?.quantity
        }
    }, [selectedVariant, product])

    return {
        selectedVariant,
        hasVariant,
        hasQuantity,
        isDisabledBtn,
        handleChangeVariant,
        visibleQty,
    }
}
