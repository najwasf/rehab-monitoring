import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">StrokeCare Link</h1>
          <p className="text-gray-600">Sistem Monitoring Rehabilitasi Pasien Stroke</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
