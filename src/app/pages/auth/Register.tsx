import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import type { UserRole } from '../../context/AppContext';

export const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    setUser({
      id: `${role}${Date.now()}`,
      name,
      email,
      role,
    });

    navigate('/');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buat Akun Baru</CardTitle>
        <CardDescription>Daftar untuk memulai rehabilitasi</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Pasien</SelectItem>
                <SelectItem value="doctor">Dokter/Fisioterapis</SelectItem>
                <SelectItem value="family">Keluarga</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Daftar
          </Button>

          <p className="text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/auth/login" className="text-blue-600 hover:underline">
              Masuk di sini
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
