import { useCallback, useMemo } from "react";
// types
import type { Product } from "@/types/products";
// componets
import MobileProductCard from "./MobileProductCard";
import { StepAccordion } from "./ui/StepAccordion";
import OutlineButton from "./ui/OutlineButton";
import DesktopProductCard from "./DesktopProductCard";
// custom hook
import { useMediaQuery } from "@/hooks/useMediaQuery";
// zustand store
import { useBundleStore } from "@/store/appStore";
// lib
import { CAMERA_ID, SENSOR_ID } from "@/lib/utils/constant";
// icons
import { CameraIcon } from "./icons/CameraIcon";
import { SensorIcon } from "./icons/SensorIcon";
import { PlanIconGray } from "./icons/PlanIconGray";
import { ExtraIcon } from "./icons/ExtraIcon";
// ---------------------------------------------------------------------------
interface StepperViewProps {
  products: Product[]
}

export default function StepperView({ products }: StepperViewProps) {

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // const [activeVariant, setActiveVariant] = useState<Variant | null>(null)

  const { items, incrementQty, decrementQty, setActiveVariant } = useBundleStore();

  const cameraProducts = useMemo(() => products?.filter((prod) => prod?.category?.id === CAMERA_ID), [products])
  const sensorsProducts = useMemo(() => products?.filter((prod) => prod?.category?.id === SENSOR_ID), [products])

  const cameraItemsInBundle = useMemo(() => items?.filter((item) => item?.category?.id === CAMERA_ID), [items])
  const sensorsItemsInBundle = useMemo(() => items?.filter((item) => item?.category?.id === SENSOR_ID), [items])

  // const handleDecrement = (productId: string) => decrementQty(productId, activeVariant)

  // const handleIncrement = (productId: string) => incrementQty(productId, activeVariant)

  const handleDecrement = useCallback(
    (productId: string) => {
      const product = products?.find(prod => prod.id === productId);
      const activeVariant = product?.variants?.find(
        variant => variant.id === product.activeVariantId
      );
      decrementQty(productId, activeVariant);
    },
    [decrementQty, products]
  );

  const handleIncrement = useCallback(
    (productId: string) => {
      const product = products?.find(prod => prod.id === productId);
      const activeVariant = product?.variants?.find(
        variant => variant.id === product.activeVariantId
      );

      incrementQty(productId, activeVariant);
    },
    [incrementQty, products]
  );

  return (
    <div className="flex flex-col gap-3.25">

      {/* Cameras Step */}
      <StepAccordion
        contentId='choose_your_cameras'
        title="Choose your cameras"
        icon={<CameraIcon />}
        eyebrow="STEP 1 OF 4"
        badge={cameraItemsInBundle?.length ? `${cameraItemsInBundle.length} selected` : ""}
        isOpenByDefault={true}
      >

        <div className="flex flex-col items-center">

          {isDesktop ?
            <div className="grid grid-cols-2 gap-3.75">
              {cameraProducts?.map((product) =>
                <div key={product?.id}>
                  <DesktopProductCard
                    product={product}
                    setActiveVariant={setActiveVariant}
                    activeVariant={product?.variants?.find(vari => vari.id === product?.activeVariantId)}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                </div>)}
            </div>
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-col-5 gap-3.75">
              {cameraProducts?.map((product) =>
                <div key={product?.id} >
                  <MobileProductCard
                    product={product}
                    setActiveVariant={setActiveVariant}
                    activeVariant={product?.variants?.find(vari => vari.id === product?.activeVariantId)}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                </div>
              )}
            </div>}

          <OutlineButton
            // disabled={cameraItemsInBundle?.length === 0}
            label='Next: Choose your plan'
            onClick={() => console.log('next')}
          />
        </div>

      </StepAccordion >

      {/* Plan Step */}
      <StepAccordion
        contentId='choose_plan'
        title="Choose your plan"
        icon={<PlanIconGray />}
        eyebrow="STEP 2 OF 4"
        // badge="2 selected"
        isOpenByDefault={false}
      >
        <h2>Choose your plan</h2>
      </StepAccordion >

      {/* Sensors Step */}
      <StepAccordion
        contentId='choose_sensor'
        title="Choose your sensors"
        icon={<SensorIcon />}
        eyebrow="STEP 3 OF 4"
        badge={sensorsItemsInBundle?.length ? `${sensorsItemsInBundle.length} selected` : ""}
        isOpenByDefault={sensorsItemsInBundle?.length > 0}
      >
        <div className="flex flex-col items-center">

          {isDesktop ?
            <div className="grid grid-cols-2 gap-3.75">
              {sensorsProducts?.map((product) =>
                <div key={product?.id}>
                  <DesktopProductCard
                    product={product}
                    setActiveVariant={setActiveVariant}
                    activeVariant={product?.variants?.find(vari => vari.id === product?.activeVariantId)}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                </div>)}
            </div>
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-col-5 gap-3.75">
              {sensorsProducts?.map((product) =>
                <div key={product?.id} >
                  <MobileProductCard
                    product={product}
                    setActiveVariant={setActiveVariant}
                    activeVariant={product?.variants?.find(vari => vari.id === product?.activeVariantId)}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                </div>
              )}
            </div>}

          <OutlineButton
            // disabled={true}
            label='Next: Add Extra Protection'
            onClick={() => console.log('next')}
          />
        </div>
      </StepAccordion >

      <StepAccordion
        contentId='choose_protect'
        title="Add extra protection"
        icon={<ExtraIcon />}
        eyebrow="STEP 4 OF 4"
        // badge="2 selected"
        isOpenByDefault={false}
      >
        <h1>Add extra protection</h1>
      </StepAccordion >
    </div >
  )
}
