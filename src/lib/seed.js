import { getItemFromStorage, setItemInStorage } from "./storage";

const defaultStudents = [
  {
    id: "stu_001",
    firstName: "Sara",
    lastName: "Khaled",
    email: "sara@example.com",
    phone: "+970-56-6666666",
    createdAt: "2025-08-10T10:00:00Z",
  },
  {
    id: "stu_002",
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar@example.com",
    phone: "+970-56-6666666",
    createdAt: "2025-08-15T09:00:00Z",
  },
];

const defaultCourses = [
  { id: "crs_001", title: "React Advanced", hours: 20, instructor: "Mohammad Ahmed", description: "Advanced patterns with hooks and performance." },
  { id: "crs_002", title: "JavaScript Basics", hours: 16, instructor: "Sara Khaled", description: "Fundamentals of JS, ES6 features." },
  { id: "crs_003", title: "HTML & CSS", hours: 12, instructor: "Ali Hassan", description: "Responsive design and layout." },
];

const defaultEnrollments = [
  { id: "enr_001", studentId: "stu_001", courseId: "crs_001", progress: 70 },
  { id: "enr_002", studentId: "stu_001", courseId: "crs_002", progress: 50 },
  { id: "enr_003", studentId: "stu_002", courseId: "crs_002", progress: 30 },
  { id: "enr_004", studentId: "stu_002", courseId: "crs_003", progress: 20 },
];

export const getStudents = () => {
  let students = getItemFromStorage("students");
  if (!students || !students.length) {
    setItemInStorage("students", defaultStudents);
    return defaultStudents;
  }
  return students;
};

export const getCourses = () => {
  let courses = getItemFromStorage("courses");
  if (!courses || !courses.length) {
    setItemInStorage("courses", defaultCourses);
    return defaultCourses;
  }
  return courses;
};

export const getEnrollments = () => {
  let enrollments = getItemFromStorage("enrollments");
  if (!enrollments || !enrollments.length) {
    setItemInStorage("enrollments", defaultEnrollments);
    return defaultEnrollments;
  }
  return enrollments;
};
