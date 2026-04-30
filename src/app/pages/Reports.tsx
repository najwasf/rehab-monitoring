import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Target, Calendar } from 'lucide-react';

export const Reports = () => {
  const { sessions } = useApp();

  const chartData = sessions
    .slice()
    .reverse()
    .map((session, index) => ({
      name: `Sesi ${index + 1}`,
      skor: session.score,
      benar: session.correctMovements,
      salah: session.totalMovements - session.correctMovements,
      date: session.date,
      exercise: session.exerciseType,
    }));

  const exerciseStats = sessions.reduce((acc, session) => {
    if (!acc[session.exerciseType]) {
      acc[session.exerciseType] = {
        count: 0,
        totalScore: 0,
        totalCorrect: 0,
        totalMovements: 0,
      };
    }
    acc[session.exerciseType].count += 1;
    acc[session.exerciseType].totalScore += session.score;
    acc[session.exerciseType].totalCorrect += session.correctMovements;
    acc[session.exerciseType].totalMovements += session.totalMovements;
    return acc;
  }, {} as Record<string, { count: number; totalScore: number; totalCorrect: number; totalMovements: number }>);

  const exerciseChartData = Object.entries(exerciseStats).map(([name, stats]) => ({
    name,
    'Rata-rata Skor': Math.round(stats.totalScore / stats.count),
    'Sesi': stats.count,
  }));

  const averageScore = sessions.length > 0
    ? Math.round(sessions.reduce((acc, s) => acc + s.score, 0) / sessions.length)
    : 0;

  const totalCorrectMovements = sessions.reduce((acc, s) => acc + s.correctMovements, 0);
  const totalMovements = sessions.reduce((acc, s) => acc + s.totalMovements, 0);
  const overallAccuracy = totalMovements > 0
    ? Math.round((totalCorrectMovements / totalMovements) * 100)
    : 0;

  const lastWeekSessions = sessions.filter(s => {
    const sessionDate = new Date(s.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  }).length;

  const getProgressTrend = () => {
    if (sessions.length < 2) return 'Belum cukup data';
    const recent3 = sessions.slice(0, 3);
    const older3 = sessions.slice(3, 6);
    if (older3.length === 0) return 'Belum cukup data';

    const recentAvg = recent3.reduce((acc, s) => acc + s.score, 0) / recent3.length;
    const olderAvg = older3.reduce((acc, s) => acc + s.score, 0) / older3.length;

    if (recentAvg > olderAvg + 5) return 'Meningkat Signifikan';
    if (recentAvg > olderAvg) return 'Meningkat';
    if (recentAvg < olderAvg - 5) return 'Menurun';
    return 'Stabil';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Laporan & Progress</h1>
        <p className="text-gray-600">Analisis perkembangan rehabilitasi Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Sesi</CardTitle>
            <Activity className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{sessions.length}</div>
            <p className="text-xs text-gray-500 mt-1">Latihan diselesaikan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Rata-rata Skor</CardTitle>
            <Target className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageScore}%</div>
            <p className="text-xs text-gray-500 mt-1">Akurasi keseluruhan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Minggu Ini</CardTitle>
            <Calendar className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{lastWeekSessions}</div>
            <p className="text-xs text-gray-500 mt-1">Sesi latihan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tren Progress</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg">{getProgressTrend()}</div>
            <p className="text-xs text-gray-500 mt-1">Perbandingan 3 sesi terakhir</p>
          </CardContent>
        </Card>
      </div>

      {chartData.length > 0 ? (
        <>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Perbandingan Gerakan Benar vs Salah</CardTitle>
              <CardDescription>Analisis akurasi gerakan per sesi</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="benar" fill="#22c55e" name="Gerakan Benar" />
                  <Bar dataKey="salah" fill="#ef4444" name="Gerakan Salah" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {exerciseChartData.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Statistik Per Jenis Latihan</CardTitle>
                <CardDescription>Performa berdasarkan jenis latihan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={exerciseChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Rata-rata Skor" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Detail Statistik Per Jenis Latihan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(exerciseStats).map(([exercise, stats]) => (
                  <div key={exercise} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="mb-3">{exercise}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Sesi</p>
                        <p className="text-2xl">{stats.count}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rata-rata Skor</p>
                        <p className="text-2xl">{Math.round(stats.totalScore / stats.count)}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Gerakan Benar</p>
                        <p className="text-2xl">{stats.totalCorrect}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Akurasi</p>
                        <p className="text-2xl">
                          {Math.round((stats.totalCorrect / stats.totalMovements) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Belum ada data laporan</p>
            <p className="text-sm text-gray-400">
              Mulai latihan untuk melihat progress dan statistik Anda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
