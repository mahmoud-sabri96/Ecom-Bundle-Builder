// types
import type { ProductCardProps } from "@/types/products";
// lib
import { cn } from "@/lib/utils/cn";
// icons
import { MinusIcon } from "./icons/MinusIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { useProductCard } from "@/hooks/useProductCard";
// ---------------------------------------------------------------------

export default function MobileProductCard({
  product,
  onIncrement,
  activeVariant,
  setActiveVariant,
  onDecrement,
}: ProductCardProps) {

  const {
    selectedVariant,
    hasQuantity,
    isDisabledBtn,
    handleChangeVariant,
    visibleQty
  } = useProductCard(product, activeVariant, setActiveVariant)

  // const [selectedVariant, setSelectedVariant] = useState<Variant | null>(activeVariant);
  // const hasVariant = product?.variants?.length
  // const hasQuantity = product?.quantity > 0 || product?.variants?.some(v => v.qty >= 1)
  // const isDisabledBtn = (hasVariant && !selectedVariant?.id) ? true : false
  // const handleChangeVariant = useCallback(
  //   (variant: Variant) => {
  //     setSelectedVariant(variant);
  //     setActiveVariant(variant);
  //   },
  //   [setSelectedVariant, setActiveVariant]
  // );
  // const visibleQty = useMemo(() => {
  //   if (product?.variants?.length > 0) {
  //     return product?.variants?.find(i => i.id === selectedVariant?.id)?.qty
  //   } else {
  //     return product?.quantity
  //   }
  // }, [selectedVariant, product])

  return (
    <article className={cn("w-full h-full group cursor-default  rounded-[10px] hover:shadow border-2 border-transparent bg-white p-2.5 shadow-xs",
      (hasQuantity) && 'border-[#4E2FD2B2] border-2'
    )} >

      {/* Image with discount badge */}
      <div className="relative">
        {product?.discountLabel &&
          <span className="absolute -top-1 -left-1 whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow">
            {product?.discountLabel}
          </span>
        }

        <div className="flex justify-center pt-3">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-20 w-20 group-hover:scale-140 transition-all duration-200 object-contain"
          />
        </div>
      </div>

      {/* Details */}
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-black">{product?.title}</h3>
        <p className="mt-1 text-sm text-gray-mid line-clamp-2">{product?.description}</p>
        <a
          href={product?.learnMoreHref}
          className="mt-0.5 inline-block text-xs font-medium text-indigo-600 underline hover:text-indigo-700"
        >
          Learn More
        </a>

        {/* Variants selector */}
        <div className="mt-2.5 flex gap-1.5">
          {product?.variants?.map((variant) => {
            const isSelected = selectedVariant?.id === variant?.id;
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => handleChangeVariant(variant)}
                className={cn(
                  "flex items-center cursor-pointer gap-1.5 rounded-xs border px-2 py-1.5 text-sm transition-colors",
                  isSelected
                    ? "border-primary ring-1 bg-[#1DF0BB0A] ring-primary"
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                <div className="w-5 h-5">
                  <img src={variant?.image} alt="" />
                </div>
                <span className="text-gray-700">{variant.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quantity + Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              // disabled={isDisabledBtn}
              title={isDisabledBtn ? 'Please choose a variant first' : ''}
              onClick={() =>
                isDisabledBtn ?
                  alert('Please Choose the variant first')
                  :
                  onDecrement(product?.id)
              }
              aria-label="Decrease quantity"
              className={cn("flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200",
                (selectedVariant && selectedVariant?.qty <= 1) && "border  border-gray-light text-gray-light bg-[white]",
                // isDisabledBtn ? 'cursor-not-allowed' : ''
              )}
            >
              <MinusIcon />
            </button>
            <span className="w-4 text-center text-sm font-medium text-gray-900">
              {visibleQty || 0}
            </span>
            <button
              type="button"
              onClick={() =>
                isDisabledBtn ?
                  alert('Please Choose the variant first')
                  :
                  onIncrement(product?.id)
              }
              // disabled={isDisabledBtn || visibleQty === product.maxQuantity}
              disabled={visibleQty === product.maxQuantity}
              title={
                isDisabledBtn ? 'Please choose a variant first'
                  :
                  visibleQty === product.maxQuantity ? 'You have reached the maximum quantity' : ''
              }
              aria-label="Increase quantity"
              className={cn(
                "flex h-7 w-7 cursor-pointer items-center justify-center rounded-sm bg-gray-100 text-gray-600 hover:bg-gray-200",
                // isDisabledBtn ? 'disabled cursor-not-allowed' : ''
              )}
            >
              <PlusIcon />
            </button>
          </div>

          <div className="text-right">
            {product?.oldPrice ?
              <span className="text-base text-danger font-normal line-through">
                ${product?.oldPrice.toFixed(2)} {" "}
              </span>
              :
              null
            }
            <span className="text-base font-noraml text-gray-dark">
              ${product?.price?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}