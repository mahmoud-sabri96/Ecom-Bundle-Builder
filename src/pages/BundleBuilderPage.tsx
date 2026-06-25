// components
import StepperView from "@/components/StepperView";
import SummaryView from "@/components/SummaryView";
// zustand store
import { useBundleStore } from "@/store/appStore";
// ------------------------------------------------------
export default function BundleBuilderPage() {

    const products = useBundleStore((s) => s.products);
    
    return (
        <section className="grid grid-cols-3 gap-5 xl:gap-7.25">

            {/* Right Hand Side */}
            <div className="col-span-3 md:col-span-3 xl:col-span-2">
                <StepperView products={products} />
            </div>

            {/* Left Hand Side */}
            <div className="col-span-3  md:col-span-3 xl:col-span-1">
                <SummaryView  />
            </div>

        </section>
    )
}

