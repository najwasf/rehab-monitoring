import { useState } from "react";
import { Link } from "react-router";

export const DoctorDashboard = () => {
  const [patients] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      age: 58,
      condition: "Stroke Iskemik - Kanan",
      lastScore: 82,
      status: "Aktif",
    },
    {
      id: 2,
      name: "Siti Aminah",
      age: 62,
      condition: "Stroke Hemoragik",
      lastScore: 74,
      status: "Perlu Perhatian",
    },
    {
      id: 3,
      name: "Rudi Hartono",
      age: 55,
      condition: "Stroke Ringan",
      lastScore: 90,
      status: "Baik",
    },
  ]);

  const avgScore =
    patients.reduce((acc, p) => acc + p.lastScore, 0) / patients.length;

  const critical = patients.filter((p) => p.lastScore < 75).length;

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard Dokter</h1>
          <p style={styles.subtitle}>
            Monitoring progress pasien rehabilitasi stroke
          </p>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <Card title="Total Pasien" value={patients.length} />
        <Card title="Rata-rata Skor" value={`${Math.round(avgScore)}%`} />
        <Card title="Perlu Perhatian" value={critical} />
        <Card title="Status Sistem" value="Aktif" />
      </div>

      {/* LIST PASIEN */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Daftar Pasien</h2>

        <div style={styles.list}>
          {patients.map((p) => (
            <div key={p.id} style={styles.card}>
              <div>
                <h3 style={styles.name}>{p.name}</h3>
                <p style={styles.desc}>
                  {p.age} tahun • {p.condition}
                </p>
              </div>

              <div style={styles.right}>
                <span style={styles.score}>{p.lastScore}%</span>

                <span
                  style={{
                    ...styles.badge,
                    background:
                      p.lastScore >= 85
                        ? "#16a34a"
                        : p.lastScore >= 75
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                >
                  {p.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================= UI CARD ================= */
const Card = ({ title, value }: any) => (
  <div style={styles.statCard}>
    <p style={styles.statTitle}>{title}</p>
    <h2 style={styles.statValue}>{value}</h2>
  </div>
);

/* ================= STYLE ================= */
const styles: any = {
  wrapper: {
    padding: 25,
    fontFamily: "Inter, sans-serif",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    margin: 0,
  },

  subtitle: {
    color: "#64748b",
    fontSize: 14,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 15,
    marginBottom: 25,
  },

  statCard: {
    background: "white",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
  },

  statTitle: {
    fontSize: 12,
    color: "#64748b",
  },

  statValue: {
    fontSize: 22,
    marginTop: 8,
  },

  section: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  card: {
    background: "white",
    padding: 15,
    borderRadius: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    margin: 0,
    fontSize: 16,
  },

  desc: {
    fontSize: 12,
    color: "#64748b",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  score: {
    fontWeight: "bold",
  },

  badge: {
    padding: "5px 10px",
    borderRadius: 8,
    color: "white",
    fontSize: 12,
  },

  actions: {
    display: "flex",
    gap: 10,
  },

  actionBtn: {
    padding: "10px 14px",
    background: "#2563eb",
    color: "white",
    borderRadius: 10,
    textDecoration: "none",
  },
};