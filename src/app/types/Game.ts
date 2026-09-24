export type GameStatus = "ยังไม่เริ่ม" | "กำลังเล่น" | "เล่นจบแล้ว";

export interface Game {
  id: string;
  title: string;
  platform: string;
  hours: number;
  status: GameStatus;
}

export interface GameFormData {
  title: string;
  platform: string;
  hours: string; // เก็บเป็น string ใน form input แล้วค่อยแปลงเป็น number ตอน submit
  status: GameStatus;
}

export interface FormErrors {
  title?: string;
  platform?: string;
  hours?: string;
}
