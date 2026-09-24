// "use client";

// export default function CounterDemo() {
//   let count = 0;
// //   ประกาศตัวแปร let สามารถเปลี่ยนแปลงค่าได้

//   function handleClick() {
//     count = count + 1;
//     console.log("count =", count);
//   }

//   return (
//     <button type="button" onClick={handleClick}>
//       คลิกแล้ว {count} ครั้ง
//     </button>
//   );
// }

// ตอนนี้โค้ดส่วนนี้ติดปัญหาที่จน.click มันขึ้นแค่ใน console แต่ไม่แสดงผลออกหหน้าจอ page
// ด้านล่างคือ code ทีทำการแก้ไขแล้ว

"use client";

import { useState } from "react";

export default function CounterDemo() {
  const [count, setCount] = useState(0);

  function handleClick() {
    //     setCount(count + 1);

    // function แบบที่ 1 จน. click เพิ่มขึ้นที่ละ 1 เหมือนเดิม
    //     setCount(count + 1);
    //     setCount(count + 1);
    //     setCount(count + 1);

    // function แบบที่ 2 จน. click เพิ่มขึ้นที่ละ 3
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    //     console.log("คลิกแล้ว ${count+1} ครั้ง");
  }

  return (
    <button type="button" onClick={handleClick}>
      คลิกแล้ว {count} ครั้ง
    </button>
  );
}
