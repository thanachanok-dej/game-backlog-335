export default function Home() {
  return (
    <div className="container">
      <h1 className="hero-title">CSMJU Website</h1>

      <div className="card-section">
        <h2>สรุปข้อมูลระบบ</h2>
        <p><strong>จำนวนรายวิชา:</strong> 3 รายวิชา</p>
        <p><strong>สถานะระบบ:</strong> <span className="status-badge status-open">เปิดใช้งาน</span></p>
      </div>

      <div className="card-section">
        <h2>เทคโนโลยีที่ใช้พัฒนา</h2>
        <p>HTML • CSS • TypeScript • Next.js</p>
      </div>
    </div>
  );
}