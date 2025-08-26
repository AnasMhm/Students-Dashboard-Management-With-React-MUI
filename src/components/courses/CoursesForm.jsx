import { Formik, Form } from "formik";
import MUIDialog from "../common/MUIDialog";
import MUITextField from "../common/MUITextField";
import { courseSchema } from "../../lib/validators";
const CourseForm = ({ editingCourse, dialogOpen, handleCloseDialog, handleSave, }) => {
    return (
        <Formik
            enableReinitialize
            initialValues={
                editingCourse
                    ? { ...editingCourse }
                    : { title: "", instructor: "", hours: "", description: "" }
            }
            validationSchema={courseSchema}
            onSubmit={handleSave}
        >
            {({ values, handleChange, errors, touched, submitForm }) => (
                <Form id="course-form">
                    <MUIDialog
                        open={dialogOpen}
                        title={editingCourse ? "Edit Course" : "Add Course"}
                        onClose={handleCloseDialog}
                        onSave={submitForm}
                        saveText={editingCourse ? "Update" : "Create"}
                    >
                        <MUITextField
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                        <MUITextField
                            label="Instructor"
                            name="instructor"
                            value={values.instructor}
                            onChange={handleChange}
                            error={touched.instructor && Boolean(errors.instructor)}
                            helperText={touched.instructor && errors.instructor}
                        />
                        <MUITextField
                            label="Hours"
                            name="hours"
                            type="number"
                            value={values.hours}
                            onChange={handleChange}
                            error={touched.hours && Boolean(errors.hours)}
                            helperText={touched.hours && errors.hours}
                        />
                        <MUITextField
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />
                    </MUIDialog>
                </Form>
            )}
        </Formik>
    );
};

export default CourseForm;
