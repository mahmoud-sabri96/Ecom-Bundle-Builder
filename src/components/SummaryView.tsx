
import { useMemo, useState } from "react";
import { MinusIcon } from "./icons/MinusIcon";
import { PlusIcon } from "./icons/PlusIcon";
import { formatMoney } from "@/lib/utils/formatMoney";
import { DeliveryIcon } from "./icons/DeliveryIcon";
import { PlanIcon } from "./icons/PlanIcon";
import type { Product, ServiceItem, Variant } from "@/types/products";
import { CAMERA_ID, SENSOR_ID } from "@/lib/utils/constant";
import { useBundleStore } from "@/store/appStore";



const SERVICES: ServiceItem[] = [
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

const FINANCING_LABEL = "as low as $19.19/mo";

/*  Main Component */
export default function SummaryView() {

  const [services] = useState<ServiceItem[]>(SERVICES);

  // const handleQuantityChange = (productId: string, next: number) => {
  //   setCategories((prev) =>
  //     prev.map((category) => ({
  //       ...category,
  //       items: category.items.map((item) =>
  //         item.id === productId ? { ...item, quantity: next } : item
  //       ),
  //     }))
  //   );
  // };

  const { items, incrementQty, decrementQty } = useBundleStore();

  // const { oldTotal, newTotal, savings } = useMemo(() => {
  //   let old = 0;
  //   let current = 0;

  //   categories.forEach((category) => {
  //     category.items.forEach((item) => {
  //       if (item?.countsTowardTotal === false) return;
  //       const lineOld =
  //         (item.oldPrice ?? item.price) * item.quantity;
  //       const lineNew = item.price * item.quantity;
  //       old += lineOld;
  //       current += lineNew;
  //     });
  //   });

  //   services.forEach((service) => {
  //     if (service.countsTowardTotal === false) {
  //       current += service.price;
  //       return;
  //     }
  //     old += service.oldPrice ?? service.price;
  //     current += service.price;
  //   });

  //   return { oldTotal: old, newTotal: current, savings: old - current };
  // }, [categories, services]);

  const cameraItems = useMemo(() => items?.filter((item) => item?.category?.id === CAMERA_ID), [items])
  const sensorsItems = useMemo(() => items?.filter((item) => item?.category?.id === SENSOR_ID), [items])

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 md:gap-10  bg-[#EDF4FF] rounded-[10px]  p-2 md:p-3.75">

      <div>
        <p className="text-[12px] font-normal uppercase tracking-wider text-gray-darker">
          Review
        </p>

        <div className="w-full pt-5  p-1.25">
          {/* Header */}

          <h1 className="text-2xl font-semibold text-gray-900">
            Your security system
          </h1>

          <p className="mt-1.25 text-sm text-[#1F1F1FBF] leading-[130%] tracking-[0.6px]">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>

          <div className="mt-2.5 ">

            <div>
              <div className="pt-2 min-h-10 border-t border-[#CED6DE]">
                <SectionLabel>Cameras</SectionLabel>
                {cameraItems?.map((item) => (
                  <div className="divide-y divide-gray-100">
                    <ProductRow
                      key={item.id}
                      product={item}
                    // onQuantityChange={handleQuantityChange}
                    // onVariantChange={handleVariantChange}
                    />
                  </div>
                ))}
              </div>
            </div>


            <div>
              <div className="pt-2 min-h-10 border-t border-[#CED6DE]">
                <SectionLabel>Sensors</SectionLabel>
                {sensorsItems?.map((item) => (
                  <div className="divide-y divide-gray-100">
                    <ProductRow
                      key={item.id}
                      product={item}
                    // onQuantityChange={handleQuantityChange}
                    // onVariantChange={handleVariantChange}
                    />
                  </div>
                ))}
              </div>
            </div>


            <div className="pt-2 border-t border-[#CED6DE]">
              <SectionLabel>Plan</SectionLabel>
              <div className="divide-y divide-gray-100">
                <ServiceRow service={services[0]} />
              </div>
            </div>

            <div className="py-1 pt-2 border-t border-[#CED6DE]">
              <ServiceRow service={services[1]} />
            </div>
          </div>

        </div>
      </div>

      {/* Summary */}
      <div>
        <div className="mt-4 flex items-end justify-between gap-3">

          <div>
            <img src={'/images/products/guaranteeBadge.svg'} alt="" />
          </div>

          <div className="flex flex-col items-end">
            <span className="mb-1 rounded-[3px] bg-primary px-2 py-1 text-[12px] font-normal text-white">
              {FINANCING_LABEL}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-gray-mid line-through">
                {formatMoney(50)}
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatMoney(100)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-3.5 text-center text-[12px] font-medium text-success">
          Congrats! You're saving {formatMoney(60)} on your security
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
          className="mt-1 w-full text-center text-sm text-gray-darker underline underline-offset-1"
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
  onQuantityChange: (id: string, next: number) => void;
  onVariantChange: (id: string, value: string) => void;
}

function ProductRow({ product, onQuantityChange }: ProductRowProps) {

  const lineTotal = product.price * product.quantity;
  const lineOldTotal =
    product.oldPrice !== undefined ? product?.oldPrice * product.quantity : undefined;

  const visibleVariant = product?.variants?.length ? product?.variants?.filter((vari) => vari.qty > 0)  : [] 

  console.log(visibleVariant)

  return (
    <div className="flex items-center gap-1 md:gap-3 py-2.5">
      <img
        src={product.image}
        alt={product.imageAlt}
        className="h-10 w-10 shrink-0 rounded-md bg-white    object-cover"
      />

      <div className="min-w-0 shrink-0 flex-1">
        <p className="line-clamp-2 cursor-default text-[13px] font-medium text-gray-900" title={product.title}>
          {product.title}
        </p>
        <div>
          {
            visibleVariant?.length ?
            visibleVariant?.map((variant)=> (
              <p key={variant?.id} className="text-xs text-gray-mid"> ({`x${variant.qty}`}) {variant.label}</p>
            ))
            :
            null
          }
        </div>
      </div>

      <QuantityStepper
        quantity={product.quantity}
        min={product.minQuantity}
        max={product.maxQuantity}
        onChange={(next) => onQuantityChange(product.id, next)}
      />

      <PriceTag
        oldLineTotal={lineOldTotal}
        lineTotal={lineTotal}
        currency={product.currency}
      />
    </div>
  );
}


interface QuantityStepperProps {
  quantity: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}

function QuantityStepper({ quantity, min, max, onChange }: QuantityStepperProps) {
  return (
    <div className="flex h-7 items-center gap-2 rounded-md  px-1.5">
      <button
        type="button"
        aria-label="Decrease quantity"
        // disabled={quantity <= min}
        onClick={() => onChange(Math.max(min, quantity - 1))}
        className="flex h-5 w-5 cursor-pointer items-center justify-center bg-white rounded-sm disabled:opacity-30"
      >
        <MinusIcon color="#575757" />
      </button>
      <span className="w-3 text-center text-xs font-semibold text-gray-800">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        // disabled={quantity >= max}
        onClick={() => onChange(Math.min(max, quantity + 1))}
        className="flex h-5 w-5 items-center cursor-pointer justify-center bg-white rounded-sm disabled:opacity-30"
      >
        <PlusIcon color="#575757" />
      </button>
    </div>
  );
}

interface PriceTagProps {
  oldLineTotal?: number;
  lineTotal: number;
  currency: string;
}

function PriceTag({ oldLineTotal, lineTotal, currency }: PriceTagProps) {
  const isFree = lineTotal === 0;
  return (
    <div className="flex md:w-20 flex-col items-end leading-tight">
      {oldLineTotal !== undefined && (
        <span className="text-sm font-bold text-gray-mid line-through">
          {formatMoney(oldLineTotal, currency)}
        </span>
      )}
      <span
        className={[
          "text-sm font-bold",
          isFree ? "text-primary" : "text-primary",
        ].join(" ")}
      >
        {isFree ? "FREE" : formatMoney(lineTotal, currency)}
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

      <PriceTag oldLineTotal={service.oldPrice} lineTotal={service.price} currency="$" />
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



