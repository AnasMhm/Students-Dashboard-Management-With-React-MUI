import { Formik, Form } from "formik";
import MUIDialog from "../common/MUIDialog";
import MUITextField from "../common/MUITextField";
import { studentSchema } from "../../lib/validators";

const StudentFormDialog = ({ open, onClose, initialValues, onSubmit, title, saveText }) => {

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={studentSchema}
            onSubmit={onSubmit}
        >
            {({ values, handleChange, errors, touched }) => (
                <Form id="student-form">
                    <MUIDialog
                        open={open}
                        title={title}
                        onClose={onClose}
                        onSave={() => document.getElementById("student-form").requestSubmit()}
                        saveText={saveText}
                    >
                        <MUITextField
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            error={touched.firstName && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />
                        <MUITextField
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                        <MUITextField
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        <MUITextField
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                    </MUIDialog>
                </Form>
            )}
        </Formik>
    );
};

export default StudentFormDialog;
