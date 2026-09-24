"use client";

import { useState, type ChangeEvent } from "react";
import { Bands } from "../types/Bands";
import BandCard from "./BandCard";

type BandExplorerProps = {
  Bands: Bands[];
};

export default function BandExplorer({ Bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [followedIds, setFollowedIds] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>(() =>
    Bands.reduce((acc, band) => {
      acc[band.id] = (band as any).likes || 0;
      return acc;
    }, {} as { [key: number]: number })
  );

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  //  กดติดตาม / เลิกติดตาม
  function handleToggleFollow(id: number) {
    setFollowedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favId) => favId !== id)
        : [...prevIds, id]
    );
  }

  //กดไลค์เพิ่มจำนวนได้เรื่อยๆ
  function handleAddLike(id: number) {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  }

  //  ปุ่มยกเลิกไลค์ (รีเซ็ตไลค์เฉพาะวงนี้เป็น 0)
  function handleResetLike(id: number) {
    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [id]: 0,
    }));
  }

  // ปุ่มล้างสถานะทั้งหมด
  function handleResetAll() {
    setFollowedIds([]);
    setLikeCounts(
      Bands.reduce((acc, band) => {
        acc[band.id] = 0;
        return acc;
      }, {} as { [key: number]: number })
    );
    setKeyword("");
  }

  // จำนวนการกดไลค์โดยรวมทั้งหมด
  const totalLikes = Object.values(likeCounts).reduce((sum, count) => sum + count, 0);

  const searchText = keyword.trim().toLowerCase();
  const visibleBands = Bands.filter((band) =>
    band.name.toLowerCase().includes(searchText)
  );

  return (
    <div className="band-container">
      <div className="band-toolbar">
        {/* ช่องค้นหา */}
        <input
          type="search"
          className="search-input"
          aria-label="ค้นหาชื่อวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี"
        />

        {/* ปุ่มล้างสถานะต่างๆ */}
        <button 
          type="button"
          onClick={handleResetAll}
          className="btn-reset-all"
        >
          ล้างสถานะทั้งหมด
        </button>

        {/*แสดงจำนวนติดตามรวม และ ยอดไลค์รวม */}
        <div className="stats-badges-container">
          <div className="follow-counter-badge">
            กำลังติดตาม: <span>{followedIds.length}</span> วง
          </div>
          <div className="like-counter-badge">
            ยอดไลค์รวม: <span>{totalLikes}</span> ครั้ง
          </div>
        </div>
      </div>

      {/* Empty State bands */}
      {visibleBands.length === 0 ? (
        <div className="empty-state">
          <h3>ไม่พบวงดนตรีที่ตรงกับ "{keyword}"</h3>
          <p>ลองค้นหาด้วยคำอื่น หรือตรวจสอบตัวสะกดใหม่อีกครั้ง</p>
        </div>
      ) : (
        <section className="band-grid">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              isFollowed={followedIds.includes(band.id)}
              likeCount={likeCounts[band.id] || 0}
              onToggleFollow={() => handleToggleFollow(band.id)}
              onAddLike={() => handleAddLike(band.id)}
              onResetLike={() => handleResetLike(band.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}