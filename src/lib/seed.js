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
  { id: "crs_002", title: "JavaScript Basics", hours: 16, instructor: "Ahmed Hamed", description: "Fundamentals of JS, ES6 features." },
  { id: "crs_003", title: "HTML & CSS", hours: 12, instructor: "Ali Hassan", description: "Responsive design and layout." },
];

const defaultEnrollments = [
  { id: "enr_001", studentId: "stu_001", courseId: "crs_001", progress: 70 },
  { id: "enr_002", studentId: "stu_001", courseId: "crs_002", progress: 50 },
  { id: "enr_003", studentId: "stu_002", courseId: "crs_002", progress: 30 },
  { id: "enr_004", studentId: "stu_002", courseId: "crs_003", progress: 20 },
];
// // -------------------- Students --------------------
// export const defaultStudents = Array.from({ length: 500 }, (_, i) => {
//   const id = `stu_${(i + 1).toString().padStart(3, "0")}`;
//   const firstNames = ["Sara", "Omar", "Ali", "Lina", "Mohammad", "Aya", "Yousef", "Mona"];
//   const lastNames = ["Khaled", "Hassan", "Ahmed", "Saleh", "Ali", "Nasser"];
//   const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
//   const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
//   const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
//   const phone = `+970-56-${Math.floor(1000000 + Math.random() * 9000000)}`;
//   const createdAt = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();

//   return { id, firstName, lastName, email, phone, createdAt };
// });

// // -------------------- Courses --------------------
// export const defaultCourses = Array.from({ length: 20 }, (_, i) => {
//   const id = `crs_${(i + 1).toString().padStart(3, "0")}`;
//   const titles = [
//     "React Advanced", "JavaScript Basics", "HTML & CSS", "Node.js Fundamentals",
//     "TypeScript Essentials", "Vue.js Basics", "Angular Advanced", "Python for Web",
//     "Django Essentials", "Flask Web Development", "MongoDB Basics", "SQL Essentials",
//     "GraphQL Fundamentals", "Next.js Advanced", "Redux in Practice", "Tailwind CSS",
//     "SASS & CSS Grid", "Docker for Developers", "Git & GitHub", "Testing with Jest"
//   ];
//   const instructors = ["Mohammad Ahmed", "Sara Khaled", "Ali Hassan", "Lina Saleh", "Omar Nasser"];
//   const hours = Math.floor(Math.random() * 20) + 5; // 5 - 25 hours
//   const description = `Course on ${titles[i]}. Learn all important concepts.`;

//   return { id, title: titles[i], hours, instructor: instructors[i % instructors.length], description };
// });

// // -------------------- Enrollments --------------------
// export const defaultEnrollments = Array.from({ length: 1000 }, (_, i) => {
//   const id = `enr_${(i + 1).toString().padStart(4, "0")}`;
//   const studentId = defaultStudents[Math.floor(Math.random() * defaultStudents.length)].id;
//   const courseId = defaultCourses[Math.floor(Math.random() * defaultCourses.length)].id;
//   const progress = Math.floor(Math.random() * 101); // 0 - 100%

//   return { id, studentId, courseId, progress };
// });

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
