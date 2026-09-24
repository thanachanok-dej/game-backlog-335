import { Course } from "../types/Course";
import link from "next/link";
type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
  // isFavorite: boolean;
  // onToggleFavorite: (id: string) => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="course-card">
      <h2 className="course-title">{course.name}</h2>

      <div className="course-details">
        <p className="course-code">
          <strong>รหัสวิชา:</strong> {course.code}
        </p>
        <p className="course-credits">
          <strong>หน่วยกิต:</strong> {course.credit} หน่วยกิต
        </p>
      </div>

      {/* <div className="course-status-wrapper">
        <span className={`status-badge ${course.isOpen ? "open" : "closed"}`}>
          {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
        </span>
      </div> */}

      {/* <button
        type="button"
        className="favorite-btn"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
      </button> */}
      <button type="button" onClick={onEdit}>
        แก้ไข
      </button>
      <button type="button" onClick={onDelete}>
        ลบ
      </button>
    </article>
  );
}
