import { Coursesdata } from "@/app/data/coursesdata";
import { notFound } from "next/navigation";
type CoursePageProps = { 
  params: Promise<{ id: string }>; 
}; 
 
export default async function CoursePage({ params }: CoursePageProps) { 
  const { id } = await params; 
  // เติม: เมธอดของ Array ที่คืนสมาชิกตัวแรกที่ผ่านเงื่อนไข 
  const course = Coursesdata.find((item) => item.id === id); 
 
   if (!course) { 
    notFound(); 
  } 
 
  return ( 
    <article> 
      <h1>{course.name}</h1> 
      <p>รหัสวิชา {course.code}</p> 
      <p>หน่วยกิต {course.credit}</p> 
      <p>ผู้สอน {course.instructor}</p> 
    </article> 
  ); 
}
