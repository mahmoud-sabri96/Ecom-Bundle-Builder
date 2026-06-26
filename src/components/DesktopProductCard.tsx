// types
import type { ProductCardProps } from "@/types/products";
// lib
import { cn } from "@/lib/utils/cn";
// icons
import { MinusIcon } from "./icons/MinusIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { useProductCard } from "@/hooks/useProductCard";
// -----------------------------------------------------------------------------

export default function DesktopProductCard({
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
    visibleQty,
  } = useProductCard(product, activeVariant, setActiveVariant)

  return (
    <article
      className={cn("w-full h-full  group cursor-default flex items-center rounded-[10px] border-2 border-transparent hover:shadow  bg-white p-5 shadow-xs",
        (hasQuantity) && 'border-[#4E2FD2B2] border-2'
      )}
    >
      <div className="relative flex gap-4.75">

        {/* discount badge */}
        {product?.discountLabel &&
          <span className="absolute top-0 left-0  whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
            {product?.discountLabel}
          </span>
        }

        <div className="flex min-w-15 items-center">
          <img
            src={product?.image}
            alt={product?.title}
            className="h-28 w-28 group-hover:scale-130 transition-transform duration-300 ease-in-out object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col">
          <h3 className="text-lg font-semibold text-black">{product?.title}</h3>
          <p className="mt-1 text-sm text-gray-mid line-clamp-2">{product?.description}</p>
          <a
            href={product?.learnMoreHref}
            className="mt-0.5 text-sm font-medium text-blue underline hover:text-indigo-700"
          >
            Learn More
          </a>

          {/* Variants selector */}
          <div className="mt-3 flex gap-1.5">
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
                  <div className="w-6 h-6">
                    <img src={variant?.image} alt="" />
                  </div>
                  <span className="text-gray-700">{variant.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quantity + Price */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
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
              <span className="w-5 text-center text-base font-medium text-dark-black">
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
                <p className="text-base text-danger font-semibold line-through">
                  ${product?.oldPrice?.toFixed(2)}
                </p>
                :
                null
              }
              <p className="text-base font-semibold text-gray-dark">
                ${product?.price?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

