import * as Yup from "yup";
import { getStudents } from "./seed";
const nameRegex = /^[A-Za-z ]+$/;
const oneWordRegex = /^[A-Za-z]+$/;
const phoneRegex = /^\+\d*-5\d-\d{7}$/;
export const loginSchema = Yup.object({
    username: Yup.string()
        .required("Username is required")
        .matches(
            nameRegex,
            "Username can only contain English letters and spaces"
        )
        .test(
            "two-words",
            "Username must contain exactly 2 words, each at least 3 characters",
            (value) => {
                if (!value) return false;
                const words = value.trim().split(" ");
                return (
                    words.length === 2 &&
                    words.every((word) => word.length >= 3)
                );
            }
        ),

    role: Yup.string()
        .oneOf(["Admin", "Instructor", "Student"], "You must select a role")
        .required("Role is required"),
});

export const studentSchema = Yup.object({
    firstName: Yup.string()
        .required("First Name is required")
        .matches(oneWordRegex, "First Name must contain only English letters, and no spaces").min(3, "First Name must be at least 3 characters long"),
    lastName: Yup.string()
        .required("Last Name is required")
        .matches(oneWordRegex, "Last Name must contain only English letters").min(3, "Last Name must be at least 3 characters long"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    phone: Yup.string()
        .required("Phone is required")
        .matches(phoneRegex, 'Phone must be in format "+<country>-5X-XXXXXXX"').test("unique-phone", "Phone already exists", function (value) {
            if (!value) return true;
            const students = getStudents() || [];
            return !students.some((s) => s.phone === value);
        }),
});

export const courseSchema = Yup.object().shape({
    title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    instructor: Yup.string().required("Instructor is required").test(
        "two-words",
        "Username must contain exactly 2 words, each at least 3 characters",
        (value) => {
            if (!value) return false;
            const words = value.trim().split(" ");
            return (
                words.length === 2 &&
                words.every((word) => word.length >= 3)
            );
        }
    ).min(3, "Instructor must be at least 3 characters"),
    hours: Yup.number().required("Hours are required").positive("Must be positive"),
    description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
});

export const enrollmentSchema = Yup.object().shape({
    studentId: Yup.string().required("Please select a student"),
})
