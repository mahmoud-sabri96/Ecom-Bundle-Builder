import './App.css'
import BundleBuilderPage from './pages/BundleBuilderPage';

function App() {

  // const items = useBundleStore((s) => s.items);

  return (
    <main className="mx-auto w-full max-w-7xl  md:p-4 lg:px-4 py-4">
      <BundleBuilderPage />
    </main>
  )
}

export default App
