import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { User, Mail, Calendar, Heart, Save } from 'lucide-react';
import { toast } from 'sonner';

export const Profile = () => {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age || 0);
  const [strokeCondition, setStrokeCondition] = useState(user?.strokeCondition || '');

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name,
        age,
        strokeCondition,
      });
      setIsEditing(false);
      toast.success('Profil berhasil diperbarui');
    }
  };

  if (!user) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Profil Pasien</h1>
        <p className="text-gray-600">Kelola informasi data diri Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-xl">{user.name}</h2>
              <Badge variant="outline" className="mt-2 capitalize">
                {user.role}
              </Badge>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{user.email}</span>
              </div>
              {user.age && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{user.age} tahun</span>
                </div>
              )}
              {user.strokeCondition && (
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{user.strokeCondition}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Data Pasien</CardTitle>
            <CardDescription>
              {isEditing ? 'Edit informasi data pasien' : 'Informasi lengkap pasien'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user.email} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Umur</Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">Kondisi Stroke</Label>
                <Textarea
                  id="condition"
                  value={strokeCondition}
                  onChange={(e) => setStrokeCondition(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Contoh: Stroke Iskemik - Sisi Kanan"
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button type="button" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setAge(user.age || 0);
                        setStrokeCondition(user.strokeCondition || '');
                      }}
                    >
                      Batal
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profil
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {user.role === 'patient' && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Program Rehabilitasi</CardTitle>
            <CardDescription>Jenis latihan yang direkomendasikan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="mb-2">Angkat Tangan</h3>
                <p className="text-sm text-gray-600">
                  Latihan untuk meningkatkan mobilitas tangan kanan yang terkena stroke
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
