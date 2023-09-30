import { ProjectInterface } from "@/common.types";
import { fetchAllProjects } from "@/lib/actions";

type ProjectsSearch = {
  projectsSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectsSearch;

  const projectsToDisplay = data?.projectsSearch?.edges || [];
  if (projectsToDisplay.length === 0) {
    return (
      <section className="flex items-center justify-start flex-col lg:px-20 py-6 px-5">
        Categories
        <p className="w-full text-center my-10 px-2">
          No projects found. Start by creating one.
        </p>
      </section>
    );
  }
  return (
    <section className="flex items-center justify-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 mt-10 w-full"></section>
      <h1>LoadMore</h1>
    </section>
  );
};
export default Home;
