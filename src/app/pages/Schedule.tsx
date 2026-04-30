import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

export const Schedule = () => {
  const { user, schedules, addSchedule, removeSchedule } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [day, setDay] = useState('Senin');
  const [time, setTime] = useState('09:00');
  const [exerciseType, setExerciseType] = useState('Angkat Tangan Kanan');
  const [duration, setDuration] = useState(30);

  const handleAddSchedule = () => {
    if (user) {
      addSchedule({
        id: `schedule${Date.now()}`,
        patientId: user.id,
        day,
        time,
        exerciseType,
        duration,
      });
      setIsOpen(false);
      toast.success('Jadwal berhasil ditambahkan');
    }
  };

  const handleRemoveSchedule = (id: string) => {
    removeSchedule(id);
    toast.success('Jadwal berhasil dihapus');
  };

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const exerciseTypes = [
    'Angkat Tangan Kanan',
    'Angkat Tangan Kiri',
    'Rotasi Pergelangan Tangan',
    'Latihan Keseimbangan',
    'Latihan Berjalan',
    'Fleksi Jari',
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Jadwal Latihan</h1>
          <p className="text-gray-600">Kelola jadwal program rehabilitasi</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Jadwal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Jadwal Baru</DialogTitle>
              <DialogDescription>
                Buat jadwal latihan rehabilitasi baru
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="day">Hari</Label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger id="day">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {daysOfWeek.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="exercise">Jenis Latihan</Label>
                <Select value={exerciseType} onValueChange={setExerciseType}>
                  <SelectTrigger id="exercise">
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
                <Label htmlFor="duration">Durasi (menit)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  min={15}
                  max={120}
                />
              </div>

              <Button onClick={handleAddSchedule} className="w-full">
                Simpan Jadwal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.length > 0 ? (
          schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{schedule.exerciseType}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSchedule(schedule.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </CardTitle>
                <CardDescription>Program latihan terjadwal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm">{schedule.day}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm">
                      {schedule.time} ({schedule.duration} menit)
                    </p>
                  </div>
                </div>
                <Badge className="w-full justify-center" variant="outline">
                  Aktif
                </Badge>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Belum ada jadwal latihan</p>
              <Button onClick={() => setIsOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Jadwal Pertama
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips Jadwal Latihan</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Lakukan latihan secara rutin sesuai jadwal yang telah ditentukan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Mulai dengan durasi pendek dan tingkatkan secara bertahap</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Istirahat yang cukup di antara sesi latihan</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Konsultasikan dengan dokter sebelum mengubah jadwal latihan</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
