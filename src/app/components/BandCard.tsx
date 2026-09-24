import React from 'react';
import { Bands } from '../types/Bands';

interface BandCardProps {
  band: Bands;
  isFollowed: boolean;
  likeCount: number;
  onToggleFollow: () => void;
  onAddLike: () => void;
  onResetLike: () => void;
}

export default function BandCard({
  band,
  isFollowed,
  likeCount,
  onToggleFollow,
  onAddLike,
  onResetLike,
}: BandCardProps) {
  return (
    <div className="band-card">
      <div>
        <div className="band-header">
          <div className="band-cover-wrapper">
            {band.image && (
              <img src={band.image} alt={band.name} className="band-cover-img" />
            )}
            {/* vinyl disc */}
            <div className="classic-vinyl-disc">
              <div className="vinyl-center-label"></div>
            </div>
          </div>

          <div className="band-title-area">
            <h2>{band.name}</h2>
            <div className="band-meta">
              <span>เดบิวต์: {band.debutDate}</span>
              <span>สมาชิกทั้งหมด: {band.memberCount} คน</span>
            </div>
          </div>
        </div>

        <div className="member-section-title">MEMBERS</div>
        <div className="member-chip-list">
          {band.member.map((m, index) => (
            <div key={index} className="member-chip">
              <img src={m.image} alt={m.name} className="member-chip-img" />
              <div className="member-chip-info">
                <span className="member-chip-name">{m.name}</span>
                <span className="member-chip-role">{m.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="album-bar">
        {band.imageAlbum && (
          <img src={band.imageAlbum} alt={band.latestAlbum} className="album-bar-img" />
        )}
        <div className="album-bar-text">
          <span className="album-bar-label">LATEST ALBUM</span>
          <span className="album-bar-title">{band.latestAlbum}</span>
        </div>
      </div>

      {/* Action Zone */}
      <div className="band-actions" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {/* ปุ่มกดติดตาม เมื่อกำลังติดตามแล้วเอาเมาส์ลากไปชี้จะขึ้น "เลิกติดตาม" */}
        <button
          type="button"
          className={`btn-follow ${isFollowed ? 'following' : ''}`}
          onClick={onToggleFollow}
        >
          <span className="btn-text">
            {isFollowed ? 'กำลังติดตาม' : '+ ติดตาม'}
          </span>
        </button>

        {/*  กดไลค์ + ปุ่มยกเลิกไลค์ */}
        <div className="like-action-group" style={{ display: 'flex', gap: '5px', alignItems: 'center', flex: 1 }}>
          <button
            type="button"
            className="btn-like liked"
            onClick={onAddLike}
            style={{ flex: 1 }}
          >
            ❤️ Liked ({likeCount})
          </button>

          <button
            type="button"
            className="btn-unlike"
            onClick={onResetLike}
            title="ยกเลิกไลค์"
            style={{
              padding: '10px 14px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#666',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}