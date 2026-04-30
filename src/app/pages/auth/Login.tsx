import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();

  const userData = {
    id: role === 'doctor' ? 'doctor1' : 'patient1',
    name: role === 'doctor' ? 'Dr. Andi Pratama' : 'Budi Santoso',
    email: email || 'user@example.com',
    role,
    age: role === 'patient' ? 58 : undefined,
    strokeCondition: role === 'patient' ? 'Stroke Iskemik - Sisi Kanan' : undefined,
  };

  setUser(userData);
  localStorage.setItem('user', JSON.stringify(userData));

  // ✅ FIX HERE
  navigate(role === 'doctor' ? '/doctor' : '/app');
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Masuk ke Akun</CardTitle>
        <CardDescription>Masukkan kredensial Anda untuk melanjutkan</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* ROLE DROPDOWN (BARU) */}
          <div className="space-y-2">
            <Label>Login sebagai</Label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full border rounded-md p-2 text-sm"
            >
              <option value="patient">Pasien</option>
              <option value="doctor">Dokter</option>
            </select>
          </div>

          {/* BUTTON */}
          <Button type="submit" className="w-full">
            Masuk
          </Button>

          {/* REGISTER */}
          <p className="text-center text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link to="/auth/register" className="text-blue-600 hover:underline">
              Daftar di sini
            </Link>
          </p>

        </form>
      </CardContent>
    </Card>
  );
};