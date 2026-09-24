"use client"; //component ทำงานฝั่ง client รับข้อมูล + ปรับเปลี่ยนข้อมุลที่รับจากผู้ใช้

// 1  import ทั้งหมด
import { FormEvent, ChangeEvent, useState } from "react";
import { Course } from "../types/Course";

// 2  type ของ Props และ type ของข้อมูลในฟอร์ม
export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) {
    return emptyDraft;
  }
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

// 3  State ของฟอร์มและ State ของข้อความแจ้งเตือน
export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  // เติม: Hook ที่ใช้ประกาศตัวแปรสถานะภายใน Component
  const [draft, setDraft] = useState<CourseDraft>(emptyDraft);

  const [errors, setErrors] = useState<FormErrors>({});

  // 4  ฟังก์ชันตรวจสอบความถูกต้อง

  type FormErrors = Partial<Record<keyof CourseDraft, string>>;

  function validate(value: CourseDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.code.trim() === "") {
      nextErrors.code = "กรุณาระบุรหัสวิชา";
    }

    // เติม: เมธอดที่ตัดช่องว่างหัวท้ายของข้อความออก
    if (value.name.trim() === "") {
      nextErrors.name = "กรุณาระบุชื่อวิชา";
    }

    const credit = Number(value.credit);
    if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
      nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
    }
    if (value.instructor.trim() == "") {
      nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
    }
    return nextErrors;
  }

  // 5  ฟังก์ชัน handle สำหรับเหตุการณ์ต่าง ๆ
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // เติม: เมธอดที่ยับยั้งพฤติกรรมเริ่มต้นของเบราว์เซอร์
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    // เติม: เมธอดของ Object ที่คืนอาร์เรย์ของชื่อคีย์ทั้งหมด
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }
  // 6  return ส่วนแสดงผล
  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="code">รหัสวิชา</label>
      <input
        id="code"
        name="code"
        type="text"
        value={draft.code}
        onChange={handleChange}
        aria-invalid={!!errors.code}
        aria-describedby={errors.code ? "code-error" : undefined}
      />
      {errors.code ? <p id="code-error">{errors.code}</p> : null}
      <label htmlFor="name">ชื่อวิชา</label>
      // เติม: ชื่อฟิลด์ใน CourseDraft ที่ช่องนี้รับผิดชอบ
      <input
        id="name"
        name="________"
        type="text"
        value={draft.name}
        onChange={handleChange}
        aria-invalid={!!errors.code}
        aria-describedby={errors.code ? "code-error" : undefined}
      />
      {errors.code ? <p id="code-error">{errors.code}</p> : null}
      <label htmlFor="credit">หน่วยกิต</label>
      <input
        id="credit"
        name="credit"
        type="number"
        inputMode="numeric"
        min="1"
        max="6"
        value={draft.credit}
        onChange={handleChange}
        aria-invalid={!!errors.code}
        aria-describedby={errors.code ? "code-error" : undefined}
      />
      {errors.code ? <p id="code-error">{errors.code}</p> : null}
      <label htmlFor="instructor">ผู้สอน</label>
      <input
        id="instructor"
        name="instructor"
        type="text"
        value={draft.instructor}
        onChange={handleChange}
        aria-invalid={!!errors.code}
        aria-describedby={errors.code ? "code-error" : undefined}
      />
      {errors.code ? <p id="code-error">{errors.code}</p> : null}

        {/* ปุ่มยกเลิกปรากฏเฉพาะขณะอยู่ในโหมดแก้ไข จึงใช้ initialCourse เป็นเงื่อนไข  */}
      <button type="submit">บันทึก</button>
      {initialCourse ? (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      ) : null}
    </form>
  );
}
