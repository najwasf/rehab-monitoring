import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import { Calendar, Activity, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Progress } from '../components/ui/progress';

export const Dashboard = () => {
  const { user, sessions, schedules, notifications } = useApp();

  const todaySessions = sessions.filter(s => s.date === '2026-04-30');
  const averageScore = sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.score, 0) / sessions.length)
    : 0;
  const totalExercises = sessions.length;
  const upcomingSchedules = schedules.slice(0, 3);
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Selamat datang kembali, {user?.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Latihan</CardTitle>
            <Activity className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalExercises}</div>
            <p className="text-xs text-gray-500 mt-1">Sesi latihan selesai</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Rata-rata Skor</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageScore}%</div>
            <Progress value={averageScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Latihan Hari Ini</CardTitle>
            <Clock className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{todaySessions.length}</div>
            <p className="text-xs text-gray-500 mt-1">Sesi diselesaikan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Jadwal Aktif</CardTitle>
            <Calendar className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{schedules.length}</div>
            <p className="text-xs text-gray-500 mt-1">Program latihan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Mendatang</CardTitle>
            <CardDescription>Program latihan yang dijadwalkan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p>{schedule.exerciseType}</p>
                      <p className="text-sm text-gray-500">
                        {schedule.day}, {schedule.time} ({schedule.duration} menit)
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{schedule.day}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Tidak ada jadwal</p>
            )}
            <Link to="/schedule">
              <Button variant="outline" className="w-full mt-2">
                Lihat Semua Jadwal
              </Button>
            </Link>
          </CardContent>
        </Card>

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Latihan Terakhir</CardTitle>
          <CardDescription>Riwayat sesi latihan terbaru</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <p>{session.exerciseType}</p>
                  <p className="text-sm text-gray-500">
                    {session.date} - {session.time}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{session.feedback}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl">{session.score}%</div>
                  <p className="text-xs text-gray-500">
                    {session.correctMovements}/{session.totalMovements} benar
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/feedback">
            <Button variant="outline" className="w-full mt-4">
              Lihat Semua Feedback
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/monitoring">
          <Button className="w-full h-20 text-lg">
            <Activity className="w-6 h-6 mr-2" />
            Mulai Latihan
          </Button>
        </Link>
        <Link to="/schedule">
          <Button variant="outline" className="w-full h-20 text-lg">
            <Calendar className="w-6 h-6 mr-2" />
            Atur Jadwal
          </Button>
        </Link>
        <Link to="/reports">
          <Button variant="outline" className="w-full h-20 text-lg">
            <TrendingUp className="w-6 h-6 mr-2" />
            Lihat Progress
          </Button>
        </Link>
      </div>
    </div>
  );
};
