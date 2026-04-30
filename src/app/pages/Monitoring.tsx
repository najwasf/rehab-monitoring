import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Camera, Video, CheckCircle2, XCircle, AlertCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const Monitoring = () => {
  const { user, addSession, addNotification } = useApp();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [exerciseType, setExerciseType] = useState('Angkat Tangan Kanan');
  const [timer, setTimer] = useState(0);
  const [movements, setMovements] = useState(0);
  const [correctMovements, setCorrectMovements] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'warning' | 'error'>('success');
  const intervalRef = useRef<number | null>(null);
  const feedbackIntervalRef = useRef<number | null>(null);

  const exerciseTypes = [
    'Angkat Tangan Kanan',
    'Angkat Tangan Kiri',
    'Rotasi Pergelangan Tangan',
    'Latihan Keseimbangan',
    'Latihan Berjalan',
  ];

  const feedbackMessages = {
    success: [
      'Gerakan sudah benar! Pertahankan',
      'Sangat baik! Lanjutkan seperti ini',
      'Posisi tangan sempurna',
      'Excellent! Gerakan akurat',
      'Postur tubuh sudah baik',
    ],
    warning: [
      'Angkat tangan lebih tinggi',
      'Perlambat gerakan sedikit',
      'Luruskan posisi tubuh',
      'Tahan posisi lebih lama',
      'Tingkatkan rentang gerak',
    ],
    error: [
      'Gerakan kurang tepat, ulangi',
      'Posisi tangan belum benar',
      'Kembali ke posisi awal',
      'Perhatikan postur tubuh',
    ],
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      feedbackIntervalRef.current = window.setInterval(() => {
        const randomType = Math.random();
        let type: 'success' | 'warning' | 'error';

        if (randomType < 0.6) {
          type = 'success';
          setCorrectMovements(prev => prev + 1);
        } else if (randomType < 0.85) {
          type = 'warning';
        } else {
          type = 'error';
        }

        setFeedbackType(type);
        const messages = feedbackMessages[type];
        setCurrentFeedback(messages[Math.floor(Math.random() * messages.length)]);
        setMovements(prev => prev + 1);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (feedbackIntervalRef.current) clearInterval(feedbackIntervalRef.current);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimer(0);
    setMovements(0);
    setCorrectMovements(0);
    setCurrentFeedback('Mulai latihan... Posisikan diri Anda di depan kamera');
    setFeedbackType('success');
    toast.success('Monitoring dimulai');
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Latihan dilanjutkan' : 'Latihan dijeda');
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (feedbackIntervalRef.current) clearInterval(feedbackIntervalRef.current);

    const score = movements > 0 ? Math.round((correctMovements / movements) * 100) : 0;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);

    const session = {
      id: `session${Date.now()}`,
      patientId: user?.id || '',
      date,
      time,
      exerciseType,
      score,
      feedback: score >= 80 ? 'Gerakan sudah sangat baik' : score >= 60 ? 'Tingkatkan akurasi gerakan' : 'Perlu latihan lebih lanjut',
      correctMovements,
      totalMovements: movements,
    };

    addSession(session);

    addNotification({
      id: `notif${Date.now()}`,
      title: 'Latihan Selesai',
      message: `Skor latihan: ${score}%. Gerakan benar: ${correctMovements}/${movements}`,
      time,
      read: false,
      type: 'success',
    });

    setIsActive(false);
    setIsPaused(false);
    toast.success(`Latihan selesai! Skor: ${score}%`);

    setTimeout(() => {
      navigate('/feedback');
    }, 1500);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (feedbackIntervalRef.current) clearInterval(feedbackIntervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
    setMovements(0);
    setCorrectMovements(0);
    setCurrentFeedback('');
    toast.info('Sesi direset');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = movements > 0 ? Math.round((correctMovements / movements) * 100) : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Monitoring Latihan</h1>
        <p className="text-gray-600">Latihan dengan panduan AI real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Kamera Monitoring</span>
              <Badge variant={isActive ? 'default' : 'outline'}>
                {isActive ? (isPaused ? 'Dijeda' : 'Aktif') : 'Nonaktif'}
              </Badge>
            </CardTitle>
            <CardDescription>Sistem akan mendeteksi gerakan Anda secara otomatis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              {isActive ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
                      <p className="text-white text-lg">Kamera Aktif - Tracking Gerakan</p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded">
                          <p className="text-white/70 text-xs">Posisi X</p>
                          <p className="text-white text-xl">{Math.floor(Math.random() * 100)}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-3 rounded">
                          <p className="text-white/70 text-xs">Posisi Y</p>
                          <p className="text-white text-xl">{Math.floor(Math.random() * 100)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-sm">REC</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Kamera belum aktif</p>
                  <p className="text-gray-500 text-sm mt-2">Pilih jenis latihan dan klik Mulai</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Jenis Latihan</label>
                <Select
                  value={exerciseType}
                  onValueChange={setExerciseType}
                  disabled={isActive}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Waktu</label>
                <div className="text-3xl text-center py-4 bg-gray-50 rounded-lg">
                  {formatTime(timer)}
                </div>
              </div>

              <div className="space-y-3">
                {!isActive ? (
                  <Button onClick={handleStart} className="w-full" size="lg">
                    <Play className="w-4 h-4 mr-2" />
                    Mulai Latihan
                  </Button>
                ) : (
                  <>
                    <Button onClick={handlePause} variant="outline" className="w-full">
                      <Pause className="w-4 h-4 mr-2" />
                      {isPaused ? 'Lanjutkan' : 'Jeda'}
                    </Button>
                    <Button onClick={handleStop} className="w-full">
                      Selesai
                    </Button>
                    <Button onClick={handleReset} variant="ghost" className="w-full">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistik Real-time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Gerakan Terdeteksi</span>
                  <span>{movements}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-600">Benar</span>
                  <span className="text-green-600">{correctMovements}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-red-600">Salah</span>
                  <span className="text-red-600">{movements - correctMovements}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Akurasi</span>
                  <span>{accuracy}%</span>
                </div>
                <Progress value={accuracy} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {currentFeedback && (
        <Card
          className={`${
            feedbackType === 'success'
              ? 'border-green-500 bg-green-50'
              : feedbackType === 'warning'
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-red-500 bg-red-50'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {feedbackType === 'success' ? (
                <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
              ) : feedbackType === 'warning' ? (
                <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h3 className="mb-1">Feedback AI</h3>
                <p
                  className={`text-lg ${
                    feedbackType === 'success'
                      ? 'text-green-700'
                      : feedbackType === 'warning'
                      ? 'text-yellow-700'
                      : 'text-red-700'
                  }`}
                >
                  {currentFeedback}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Panduan Latihan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm">Sebelum Memulai:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Pastikan ruangan cukup terang</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Posisikan tubuh menghadap kamera</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Pastikan seluruh tubuh terlihat</span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm">Saat Latihan:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Ikuti feedback yang diberikan sistem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Lakukan gerakan dengan perlahan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">•</span>
                  <span>Jeda jika merasa lelah</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
