import AddressForm from '@/components/AddressForm';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans">
      <header className="py-6 md:py-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100/50">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">Address Map Viewer</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Enter your address to view it on a map</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl mx-auto">
          <AddressForm />
        </div>
      </main>

      <footer className="py-6 md:py-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-t border-gray-100/50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base text-gray-600">© {new Date().getFullYear()} Address Map Viewer</p>
        </div>
      </footer>
    </div>
  );
}
