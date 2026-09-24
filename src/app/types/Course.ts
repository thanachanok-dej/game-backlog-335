// export type Course ={
//     id: number;
//     code: string;
//     title: string;
//     credits?: number;
//     isOpen?: boolean;
// }
//type มีการเพิ่มข้อมูลผู้สอนเข้ามา
export type Course = { 
  id: string; 
  code: string; 
  name: string; 
  credit: number; 
  instructor: string; 
}; 