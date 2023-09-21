import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";

const CreateProject = () => {
  return (
    <Modal>
      <h3 className="md:text-5xl text-3xl font-extrabold text-left max-w-5xl w-full">
        Create a New Project
      </h3>
      <ProjectForm />
    </Modal>
  );
};

export default CreateProject;
