// หน้ารายละเอียดเกม ที่แสดงข้อมูลของเกมแต่ละรายการ โดยใช้ Dynamic Route ของ Next.js

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {initialGames} from '../../data/gamedata';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const game = initialGames.find((g) => g.id === id);

  if (!game) {
    return {
      title: 'ไม่พบเกม - Game Backlog',
    };
  }

  return {
    title: `${game.title} - Game Backlog`,
  };
}

export default async function GameDetailPage({ params }: Props) {
  const { id } = await params;
  const game = initialGames.find((g) => g.id === id);

  if (!game) {
    notFound();
  }

  return (
    <div className="container-detail">
      <Link href="/games" className="link-back">
        ← กลับไปหน้าหลัก
      </Link>
      <div className="card-detail">
        <h1 className="heading-1">{game.title}</h1>
        <div className="space-y-2 text-lg">
          <p>
            <strong className="text-gray-700">แพลตฟอร์ม:</strong> {game.platform}
          </p>
          <p>
            <strong className="text-gray-700">ชั่วโมงที่คาดว่าจะใช้เล่น:</strong>{' '}
            {game.hours} ชั่วโมง
          </p>
          <p>
            <strong className="text-gray-700">สถานะ:</strong>{' '}
            <span className="status-badge">{game.status}</span>
          </p>
        </div>
      </div>
    </div>
  );
}