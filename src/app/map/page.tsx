'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import MapComponent from '@/components/MapComponent';

export default function MapPage() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 font-sans">
      <header className="py-6 md:py-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-b border-gray-100/50">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-800 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">Address Map Viewer</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Viewing location on the map</p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-xl sm:rounded-2xl transition-all duration-200 hover:shadow-md transform hover:-translate-x-0.5"
          >
            ← Back to Search
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="bg-gradient-to-br from-white/90 to-gray-50/90 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 backdrop-blur-md overflow-hidden h-[400px] sm:h-[500px] md:h-[600px]">
          <MapComponent address={address} />
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