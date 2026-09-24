"use client"; //use client คือการรับค่าจาก user

import { useState, type ChangeEvent } from "react";
import { Course } from "../types/Course";
import CourseCard from "./CourseCard";
import CourseForm, { CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
  courses: Course[];
};

// export type CourseDraft = {
//   code: string;
//   name: string;
//   credit: string;
//   instructor: string;
// };

export default function CourseExplorer({
  courses: initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const searchText = keyword.trim().toLowerCase();
  // เก็บผลการค้นหาไว้ที่ตัวแปรใหม่
  const visibleCourses = courses.filter(
    (course) =>
      //ค้นหาตามชื่อวิชา หรือ รหัสวิชา
      course.name.toLowerCase().includes(searchText) ||
      course.code.includes(searchText),
  );

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  //เมื่อกด favorite แล้วให้เก็บค่า id เอาไวใน array
  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id],
    );
  }

  function handleCreate(draft: CourseDraft) {
    // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข
    setCourses(courses.filter((course) => course.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course,
      ),
    );

    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  const editingCourse = courses.find((course) => course.id === editingId);

  return (
    <div>
      <input
        type="search"
        aria-label="ค้นหารายวิชา"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
      />

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section>
          {visibleCourses.map((course) => (
            // <CourseCard key={course.id} course={course}/>
            <CourseCard
              key={course.id}
              course={course}
              // isFavorite={favoriteIds.includes(course.id)}
              // onToggleFavorite={(id) => handleToggleFavorite(String(id))}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
    </div>
  );
}
