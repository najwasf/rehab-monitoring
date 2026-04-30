import { Link, useNavigate } from 'react-router';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.logo}>RehabCare</h2>

        <div style={styles.navRight}>
          <Link to="/auth/login" style={styles.link}>
            Login
          </Link>

          <Link to="/auth/register" style={styles.buttonSmall}>
            Get Started
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>

        <div style={styles.badge}>
          Smart Rehabilitation System
        </div>

        <h1 style={styles.title}>
          Rehabilitasi Stroke Lebih Terpantau & Terarah
        </h1>

        <p style={styles.desc}>
          Sistem monitoring latihan pasien berbasis digital untuk membantu
          dokter dan pasien memantau perkembangan secara real-time.
        </p>

        <div style={styles.actions}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/auth/login')}
          >
            Mulai Sekarang
          </button>

          <Link to="/auth/register" style={styles.secondaryBtn}>
            Daftar
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>

        <div style={styles.card}>
          <h3>Monitoring Real-Time</h3>
          <p>Tracking latihan pasien secara langsung</p>
        </div>

        <div style={styles.card}>
          <h3>Jadwal Rehabilitasi</h3>
          <p>Pengaturan sesi latihan lebih rapi</p>
        </div>

        <div style={styles.card}>
          <h3>Analisis Progress</h3>
          <p>Melihat perkembangan pasien secara otomatis</p>
        </div>

      </div>

      {/* FOOTER */}
      <div style={styles.footer}>
        © 2026 RehabCare. All rights reserved.
      </div>

    </div>
  );
};

/* ===== STYLE (MATCH LOGIN THEME) ===== */
const styles: any = {

  wrapper: {
    minHeight: '100vh',
    background: '#f1f5f9', // sama kayak login bg-slate-100
    fontFamily: 'Inter, sans-serif',
    color: '#0f172a',
  },

  /* NAVBAR */
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '18px 50px',
    alignItems: 'center',
  },

  logo: {
    fontSize: 20,
    fontWeight: 700,
    color: '#0f172a',
  },

  navRight: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },

  link: {
    color: '#475569',
    textDecoration: 'none',
    fontSize: 14,
  },

  buttonSmall: {
    padding: '8px 14px',
    background: '#2563eb', // sama kayak login button
    borderRadius: 8,
    color: 'white',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
  },

  /* HERO */
  hero: {
    textAlign: 'center',
    padding: '80px 20px 50px',
    maxWidth: 750,
    margin: '0 auto',
  },

  badge: {
    display: 'inline-block',
    padding: '6px 12px',
    background: '#e2e8f0',
    borderRadius: 20,
    fontSize: 12,
    color: '#334155',
    marginBottom: 18,
  },

  title: {
    fontSize: 40,
    fontWeight: 700,
    lineHeight: 1.2,
    color: '#0f172a',
  },

  desc: {
    marginTop: 14,
    color: '#64748b',
    fontSize: 15,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  actions: {
    marginTop: 25,
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
  },

  primaryBtn: {
    padding: '11px 18px',
    background: '#2563eb',
    border: 'none',
    borderRadius: 8,
    color: 'white',
    cursor: 'pointer',
    fontWeight: 600,
  },

  secondaryBtn: {
    padding: '11px 18px',
    background: 'white',
    border: '1px solid #cbd5e1',
    borderRadius: 8,
    color: '#0f172a',
    textDecoration: 'none',
    fontWeight: 500,
  },

  /* FEATURES */
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 18,
    padding: '0 50px',
    marginTop: 40,
  },

  card: {
    background: 'white',
    padding: 18,
    borderRadius: 12,
    border: '1px solid #e2e8f0',
  },

  footer: {
    textAlign: 'center',
    padding: 40,
    color: '#64748b',
    marginTop: 50,
    fontSize: 12,
  },
};