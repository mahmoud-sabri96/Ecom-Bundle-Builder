import { useCallback, useMemo, useState } from "react";
// types
import type { Product, ServiceItem, Variant } from "@/types/products";
// zustand store
import { useBundleStore } from "@/store/appStore";
// icons
import { DeliveryIcon } from "./icons/DeliveryIcon";
import { MinusIcon } from "./icons/MinusIcon";
import { PlanIcon } from "./icons/PlanIcon";
import { PlusIcon } from "./icons/PlusIcon";
// lib
import { formatMoney } from "@/lib/utils/formatMoney";
import { CAMERA_ID, SENSOR_ID, SERVICES } from "@/lib/utils/constant";
import { cn } from "@/lib/utils/cn";
// ----------------------------------------------------------------------------------

const FINANCING_LABEL = "as low as $19.19/mo";
/*  Main Component */
export default function SummaryView() {

  const { products, items, incrementQty, decrementQty, bundleNewPrice, bundleOldPrice } = useBundleStore();

  const cameraItems = useMemo(() => items?.filter((item) => item?.category?.id === CAMERA_ID), [items])
  const sensorsItems = useMemo(() => items?.filter((item) => item?.category?.id === SENSOR_ID), [items])

  const visibleOldTotalPrice = bundleOldPrice + Number(SERVICES[0]?.oldPrice) + Number(SERVICES[1]?.oldPrice)
  const visibleNewTotalPrice = bundleNewPrice + Number(SERVICES[0]?.price) + Number(SERVICES[1]?.price)

  const handleSaveLater = useCallback(() => {
    if(!items?.length) return;
    localStorage.setItem("bundle", JSON.stringify({
      items: products,
      paln: SERVICES[0],
      shipping: SERVICES[1],
    }))
  }, [products, items])


  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 md:gap-10 lg:gap-7  bg-[#EDF4FF] rounded-[10px]  p-2 md:p-3.75">

      <div>
        <p className="text-[12px] font-normal uppercase tracking-wider text-gray-darker">
          Review
        </p>

        <div className="w-full pt-5  p-1.25">
          {/* Header */}
          <h1 className="text-lg md:text-2xl font-semibold text-gray-900">
            Your security system
          </h1>

          <p className="mt-1.25 text-sm text-[#1F1F1FBF] leading-[130%] tracking-[0.6px]">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <div className="mt-2.5 ">

            {/* Camera Section */}
            <div>
              <div className="pt-2 min-h-10 border-t border-[#CED6DE]">
                <SectionLabel>Cameras</SectionLabel>
                {cameraItems?.map((item) => {
                  return (
                    <div key={item.id} className="divide-y divide-gray-100">
                      <ProductRow
                        product={item}
                        onIncrease={incrementQty}
                        onDecrease={decrementQty}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sensors Section */}
            <div>
              <div className="pt-2 min-h-10 border-t border-[#CED6DE]">
                <SectionLabel>Sensors</SectionLabel>
                {sensorsItems?.map((item) => {
                  return (
                    <div key={item.id} className="divide-y divide-gray-100">
                      <ProductRow
                        product={item}
                        onIncrease={incrementQty}
                        onDecrease={decrementQty}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-[#CED6DE]">
              <SectionLabel>Plan</SectionLabel>
              <div className="divide-y divide-gray-100">
                <ServiceRow service={SERVICES[0]} />
              </div>
            </div>

            <div className="py-1 pt-2 border-t border-[#CED6DE]">
              <ServiceRow service={SERVICES[1]} />
            </div>
          </div>

        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="flex items-end md:flex-col md:items-start xl:flex-row lg:justify-between gap-3">

          <div className="flex items-center justify-between gap-6.25">
            <img src={'/images/products/guaranteeBadge.svg'} alt="" />
            <div className="hidden md:block xl:hidden max-w-62">
              <p className="text-black font-semibold text-lg">30-day hassle-free returns</p>
              <p className="text-black font-normal text-base">If you're not totally in love with the product, we will refund you 100%.</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-end md:flex-row md:justify-between  md:items-center xl:flex-col  lg:items-end">
            <span className="mb-0 lg:mb-1 inline-flex rounded-[3px] bg-primary px-2 py-1 text-[12px] font-normal text-white">
              {FINANCING_LABEL}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[22px] font-semibold text-gray-mid line-through">
                {formatMoney((visibleOldTotalPrice))}
              </span>
              <span className="text-[28px] font-bold text-primary">
                {formatMoney(visibleNewTotalPrice)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3.5 text-center text-[12px] font-medium text-success">
          Congrats! You're saving {formatMoney(visibleOldTotalPrice - visibleNewTotalPrice)} on your security
          bundle!
        </p>

        <button
          type="button"
          className="mt-1 w-full cursor-pointer rounded-sm bg-primary py-3 text-[17px] font-bold text-white transition-colors hover:bg-indigo-800"
        >
          Checkout
        </button>

        <button
          type="button"
          onClick={handleSaveLater}
          className="mt-1 w-full cursor-pointer hover:text-blue transition duration-200 text-center text-sm text-gray-darker underline underline-offset-1"
        >
          Save my system for later
        </button>
      </div>
    </div>
  );
}


/*  Components   */
interface ProductRowProps {
  product: Product;
  onDecrease: (id: string, variant?: Variant | null) => void;
  onIncrease: (id: string, variant?: Variant | null) => void;
}

function ProductRow({ product, onIncrease, onDecrease }: ProductRowProps) {

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>();

  const hasVariant = product?.variants?.length

  const isDisabledBtn = (hasVariant && !selectedVariant?.id) ? true : false

  const variantsTotalQty = product?.variants?.reduce((total, variant) => total + variant.qty, 0)

  const totalNewPrice = hasVariant ? (variantsTotalQty * product.price) : (product.price * product.quantity);

  const totalOldTotal = hasVariant ? (variantsTotalQty * Number(product.oldPrice)) : (product.price * Number(product.oldPrice))

  const visibleVariant = useMemo(() => product?.variants?.filter(variant => variant?.qty > 0), [product])

  return (
    <div className="flex items-center gap-1 md:gap-3 py-2.5">
      <img
        src={product.image}
        alt={product.title}
        className="h-10 w-10 shrink-0 rounded-md bg-white    object-cover"
      />

      <div className="min-w-0 shrink-0 flex-1">
        <p className="line-clamp-2 cursor-default text-[13px] font-medium text-gray-900" title={product?.title}>
          {product?.title}
        </p>
        <div>
          {visibleVariant?.length ?
            visibleVariant?.map((variant) => (
              <div key={variant?.id} className="flex flex-col items-start">
                <button
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={
                    cn("text-xs cursor-pointer hover:underline transition-all duration-200 text-gray-mid",
                      selectedVariant?.id === variant?.id ? "text-blue" : ""
                    )}
                >
                  ({`x${variant.qty}`}) {variant.label}
                </button>
              </div>
            ))
            :
            null
          }
        </div>
      </div>

      {/* Quantity Stepper */}
      <div className="flex h-7 items-center gap-2 rounded-md  px-1.5">
        <button
          type="button"
          aria-label="Decrease quantity"
          // disabled={isDisabledBtn}
          onClick={() =>
            isDisabledBtn ?
              alert('Please Choose the variant first which under the product name')
              :
              onDecrease(product?.id, selectedVariant)
          }
          className="flex h-5 w-5 cursor-pointer items-center justify-center bg-white rounded-sm disabled:opacity-30"
        >
          <MinusIcon color="#575757" />
        </button>
        <span className="w-3 text-center text-xs font-semibold text-gray-800">
          {(hasVariant ?
            product?.variants?.find((variant) => variant?.id === selectedVariant?.id)?.qty
            : product.quantity
          )
            || 0}
        </span>
        <button
          type="button"
          aria-label="Increase quantity"
          // disabled={isDisabledBtn}
          onClick={() =>
            isDisabledBtn ?
              alert('Please Choose the variant first which under the product name')
              :
              onIncrease(product?.id, selectedVariant)
          }
          className="flex h-5 w-5 items-center cursor-pointer justify-center bg-white rounded-sm disabled:opacity-30"
        >
          <PlusIcon color="#575757" />
        </button>
      </div>

      {/* Pricing */}
      <PriceTag
        totalOldPrice={product.oldPrice ? totalOldTotal : null}
        totalNewPrice={totalNewPrice}
        currency={product?.currency}
      />
    </div>
  );
}

interface PriceTagProps {
  totalOldPrice?: number | null;
  totalNewPrice: number;
  currency: string | undefined;
}

function PriceTag({ totalOldPrice, totalNewPrice, currency }: PriceTagProps) {
  const isFree = totalNewPrice === 0;
  return (
    <div className="flex md:w-20 flex-col items-end leading-tight">
      {totalOldPrice && (
        <span className="text-sm font-bold text-gray-mid line-through">
          {formatMoney(totalOldPrice, currency)}
        </span>
      )}
      <span
        className={[
          "text-sm font-bold",
          isFree ? "text-primary" : "text-primary",
        ].join(" ")}
      >
        {isFree ? "FREE" : formatMoney(totalNewPrice, currency)}
      </span>
    </div>
  );
}

function ServiceRow({ service }: { service: ServiceItem }) {
  return (
    <div className="flex items-center gap-2.5   py-2">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center">
        {service.icon === "plan" ? <PlanIcon /> :
          <span className="flex items-center justify-center size-10 bg-white rounded-[5px]">
            <DeliveryIcon />
          </span>
        }
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-gray-900">
          {service.title}{" "}
          {service.highlightedTitle && (
            <span className="text-primary">{service.highlightedTitle}</span>
          )}
        </p>
      </div>

      <PriceTag totalOldPrice={service.oldPrice} totalNewPrice={service.price} currency="$" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[12px] font-normal uppercase tracking-wider text-[#A8B2BD]">
      {children}
    </p>
  );
}



