import Link from "next/link";

export default function Navbar() {
  return (
    <header className="siteHeader">
  <nav className="navbar">
    <ul className="navList">
      <li><a href="/" className="navLink">หน้าแรก</a></li>
      <li><a href="/courses" className="navLink">รายวิชา</a></li>
      <li><a href="/about" className="navLink">เกี่ยวกับเรา</a></li>
      <li><a href="/bands" className="navLink">วงดนตรี</a></li>
      <li><a href="/game" className="navLink">ประวัติการเล่นเกม</a></li> 
    </ul>
  </nav>
</header>
  );
}
