// import ButtonComponent from "../components/ButtonComponenr";
// import CounterDemo from "../components/CounterDemo";
import CourseExplorer from "../components/CourseExplorer";

import CourseCard from "../components/CourseCard";
import { Course } from "../types/Course";
import { Coursesdata } from "../data/coursesdata";

export default function CoursesPage() {
  return (
    <main className="container">
      <h1>รายการวิชา</h1>

      {/* add button */}
      {/* <ButtonComponent/> */}
      {/* add CounterDemo */}
      {/* <CounterDemo/>
      <br />
       */}

      {/* add CourseExplorer */}
      <CourseExplorer courses={Coursesdata}/>
      
      {/* ไม่ได้ใช้แล้วเนื่องจากรับ import จาก CourseExplorer ซึงทำเงื่อนไขแทน หน้าหลัก เรียบร้อยแล้ว*/}
      {/* <div className="courses-container">
        {Coursesdata.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div> */}
    </main>
  );
}
