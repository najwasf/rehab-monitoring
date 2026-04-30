import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { MessageSquare, TrendingUp, TrendingDown, Minus, Calendar, Clock } from 'lucide-react';

export const Feedback = () => {
  const { sessions } = useApp();

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: 'default' as const, label: 'Sangat Baik', color: 'bg-green-500' };
    if (score >= 60) return { variant: 'secondary' as const, label: 'Baik', color: 'bg-blue-500' };
    if (score >= 40) return { variant: 'outline' as const, label: 'Cukup', color: 'bg-yellow-500' };
    return { variant: 'destructive' as const, label: 'Perlu Latihan', color: 'bg-red-500' };
  };

  const getTrend = (currentScore: number, index: number) => {
    if (index >= sessions.length - 1) return null;
    const previousScore = sessions[index + 1].score;
    if (currentScore > previousScore) return 'up';
    if (currentScore < previousScore) return 'down';
    return 'same';
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Feedback & Evaluasi</h1>
        <p className="text-gray-600">Riwayat hasil latihan dan feedback sistem</p>
      </div>

      {sessions.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">Belum ada feedback</p>
            <p className="text-sm text-gray-400">
              Mulai latihan untuk mendapatkan feedback dari sistem
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {sessions.map((session, index) => {
            const scoreBadge = getScoreBadge(session.score);
            const trend = getTrend(session.score, index);

            return (
              <Card key={session.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3">
                        <span>{session.exerciseType}</span>
                        <Badge variant={scoreBadge.variant}>{scoreBadge.label}</Badge>
                        {trend && (
                          <div className="flex items-center gap-1">
                            {trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : trend === 'down' ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : (
                              <Minus className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.time}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl mb-1">{session.score}%</div>
                      <p className="text-sm text-gray-500">
                        {session.correctMovements}/{session.totalMovements} gerakan
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Akurasi Gerakan</span>
                      <span>{session.score}%</span>
                    </div>
                    <Progress value={session.score} className="h-2" />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm mb-1">Feedback AI:</p>
                        <p className="text-blue-900">{session.feedback}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Gerakan Benar</p>
                      <p className="text-2xl text-green-700">{session.correctMovements}</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Gerakan Salah</p>
                      <p className="text-2xl text-red-700">
                        {session.totalMovements - session.correctMovements}
                      </p>
                    </div>
                  </div>

                  {session.score >= 80 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800">
                        ✓ Sangat baik! Pertahankan konsistensi latihan Anda
                      </p>
                    </div>
                  )}

                  {session.score < 60 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800 mb-2">
                        ⚠ Saran untuk meningkatkan:
                      </p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Perhatikan posisi tubuh dan postur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Lakukan gerakan lebih perlahan dan terkontrol</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Ikuti instruksi feedback real-time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span>•</span>
                          <span>Konsultasikan dengan fisioterapis jika kesulitan</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {sessions.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Ringkasan Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Sesi Latihan</p>
                <p className="text-3xl">{sessions.length}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Rata-rata Skor</p>
                <p className="text-3xl">
                  {Math.round(
                    sessions.reduce((acc, s) => acc + s.score, 0) / sessions.length
                  )}
                  %
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Gerakan Benar</p>
                <p className="text-3xl">
                  {sessions.reduce((acc, s) => acc + s.correctMovements, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
