export type Member = {
  name: string;
  image: string;
  position: string; // เพิ่ม: ตำแหน่งในวง เช่น "Leader / Main Vocal"
};

export type Bands = {
  id: number;
  name: string;
  member: Member[];
  debutDate: string;
  memberCount: number;
  latestAlbum: string;
  image: string;
  imageAlbum?: string;
};