import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h1 className="text-9xl mb-4">404</h1>
        <h2 className="text-3xl mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak dapat ditemukan.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
        </div>
      </div>
    </div>
  );
};
