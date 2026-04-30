import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import {
  Home,
  User,
  Calendar,
  Activity,
  MessageSquare,
  BarChart3,
  Bell,
  LogOut
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useEffect } from 'react';

export const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, notifications } = useApp();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: User, label: 'Profil', path: '/profile' },
    { icon: Calendar, label: 'Jadwal', path: '/schedule' },
    { icon: Activity, label: 'Monitoring', path: '/monitoring' },
    { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
    { icon: BarChart3, label: 'Laporan', path: '/reports' },
    { icon: Bell, label: 'Notifikasi', path: '/notifications', badge: unreadCount },
  ];

  const handleLogout = () => {
    setUser(null);
    navigate('/auth/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl">StrokeCare Link</h1>
          <p className="text-sm text-gray-500 mt-1">{user.name}</p>
          <Badge variant="outline" className="mt-2 capitalize">{user.role}</Badge>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <Badge variant="destructive" className="rounded-full px-2 py-0.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
