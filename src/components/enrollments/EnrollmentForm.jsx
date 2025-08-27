import { Formik, Form } from "formik";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const EnrollmentForm = ({ availableStudents, enrollmentSchema, onEnroll }) => {
    return (
        <Formik
            initialValues={{ studentId: "" }}
            validationSchema={enrollmentSchema}
            onSubmit={(values, { resetForm }) => onEnroll(values, resetForm)}
        >
            {({ values, handleChange, errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Select Student</InputLabel>
                        <Select
                            name="studentId"
                            value={values.studentId}
                            onChange={handleChange}
                            label="Select Student"
                            error={touched.studentId && Boolean(errors.studentId)}
                        >
                            {availableStudents.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.firstName} {s.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                        {touched.studentId && errors.studentId && (
                            <Typography variant="caption" color="error">
                                {errors.studentId}
                            </Typography>
                        )}
                    </FormControl>
                    <Button type="submit" variant="contained">
                        Enroll Student
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EnrollmentForm;
