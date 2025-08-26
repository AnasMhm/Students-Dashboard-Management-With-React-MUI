import ContainerBox from "../components/common/ContainerBox.jsx";
import CourseAccordion from "../components/enrollments/CourseAccordion.jsx";
import PageHeader from "../components/common/PageHeader.jsx";

const Enrollments = () => {

    return (
        <ContainerBox>
            <PageHeader title="Enrollments" />
            <CourseAccordion />
        </ContainerBox>
    );
};

export default Enrollments;
