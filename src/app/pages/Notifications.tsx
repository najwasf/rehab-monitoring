import { useApp } from '../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Bell, CheckCircle2, Clock, AlertCircle, Info, Check } from 'lucide-react';
import { toast } from 'sonner';

export const Notifications = () => {
  const { notifications, markNotificationRead, addNotification } = useApp();

  const handleMarkAsRead = (id: string) => {
    markNotificationRead(id);
    toast.success('Notifikasi ditandai sudah dibaca');
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) markNotificationRead(n.id);
    });
    toast.success('Semua notifikasi ditandai sudah dibaca');
  };

  const handleTestNotification = () => {
    const types: Array<'reminder' | 'success' | 'warning' | 'info'> = ['reminder', 'success', 'warning', 'info'];
    const type = types[Math.floor(Math.random() * types.length)];
    const messages = {
      reminder: ['Waktu latihan tiba!', 'Jangan lupa latihan hari ini'],
      success: ['Latihan selesai dengan baik!', 'Skor meningkat!'],
      warning: ['Perhatikan postur tubuh', 'Butuh perbaikan gerakan'],
      info: ['Jadwal latihan diperbarui', 'Fitur baru tersedia'],
    };

    addNotification({
      id: `notif${Date.now()}`,
      title: type === 'reminder' ? 'Pengingat' : type === 'success' ? 'Sukses' : type === 'warning' ? 'Peringatan' : 'Info',
      message: messages[type][Math.floor(Math.random() * messages[type].length)],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      read: false,
      type,
    });
    toast.success('Notifikasi test ditambahkan');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 flex items-center gap-3">
            Notifikasi
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount} baru
              </Badge>
            )}
          </h1>
          <p className="text-gray-600">Pengingat dan update sistem</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTestNotification}>
            Test Notifikasi
          </Button>
          {unreadCount > 0 && (
            <Button onClick={handleMarkAllAsRead}>
              <Check className="w-4 h-4 mr-2" />
              Tandai Semua
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Belum ada notifikasi</p>
            <p className="text-sm text-gray-400">
              Notifikasi akan muncul di sini ketika ada update
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`${
                notif.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-blue-500'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">{getIcon(notif.type)}</div>
                    <div className="flex-1">
                      <CardTitle className="text-base flex items-center gap-2">
                        {notif.title}
                        {!notif.read && (
                          <Badge variant="secondary" className="text-xs">
                            Baru
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                    </div>
                  </div>
                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(notif.id)}
                    >
                      Tandai Dibaca
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Pengaturan Notifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Pengingat Jadwal Latihan</p>
                <p className="text-xs text-gray-500">Notifikasi saat waktu latihan tiba</p>
              </div>
              <Badge variant="default">Aktif</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Notifikasi Hasil Latihan</p>
                <p className="text-xs text-gray-500">Update setelah sesi latihan selesai</p>
              </div>
              <Badge variant="default">Aktif</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm">Progress Mingguan</p>
                <p className="text-xs text-gray-500">Laporan perkembangan setiap minggu</p>
              </div>
              <Badge variant="default">Aktif</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
