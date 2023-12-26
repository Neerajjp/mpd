import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "../context/sidebarContext";
import { getUser } from "../services/auth";
import { createProject, projectList } from "../services/project";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const navigate = useNavigate();

  const getProjectList = async () => {
    const data = await projectList();
    setProjects(data);
  }

  const createNewProject = async () => {
    const defaultBody = {
      "time": 1663506386709,
      "blocks": [
        {
          "id": "pSwlZGy4xF",
          "data": {
            "cols": [
              {
                "time": 1663506395504,
                "blocks": [],
                "version": "2.25.0"
              },
              {
                "time": 1663506395506,
                "blocks": [],
                "version": "2.25.0"
              }
            ],
            "newCol": [
              {
                "time": 1663506395507,
                "blocks": [],
                "version": "2.25.0"
              },
              {
                "time": 1663506395507,
                "blocks": [],
                "version": "2.25.0"
              }
            ]
          },
          "type": "columnsTop"
        },
        {
          "id": "FKqAx-VaWb",
          "data": {
            "cols": [
              {
                "time": 1663506395504,
                "blocks": [],
                "version": "2.25.0"
              }
            ]
          },
          "type": "columns"
        },
        {
          "id": "coYpek9sjK",
          "data": {
            "cols": [
              {
                "time": 1663506395505,
                "blocks": [],
                "version": "2.25.0"
              }
            ],
            "newCol": [
              {
                "time": 1663506395506,
                "blocks": [],
                "version": "2.25.0"
              }
            ]
          },
          "type": "columnsRight"
        }
      ],
      "version": "2.25.0"
    };
    if (newProjectName.length > 3) {
      const projectName = newProjectName.charAt(0).toUpperCase() + newProjectName.slice(1)
      const resData = await createProject({ name: projectName, user: getUser().id, body: defaultBody, stories: [{}] });
      navigate(`/projects/${resData.id}/edit`);
    } else {
      window.alert('Project name should be more than 3 letters')
    }


  };

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      <div className="container mx-auto pt-10 pb-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <button className="grid bg-white p-6 cursor-pointer" onClick={() => setShowNewProjectModal(true)} style={{ borderRadius: '10px' }}>
            <div className="flex justify-center">
              <svg fill="#822ea1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="60px" height="100px">
                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
              </svg>
            </div>
            <div className="py-4 text-center mgq-primary-light">
              <div>
                Add New Project
              </div>
            </div>
          </button>
          {projects?.results?.map((project) => (
            <Link to={`/projects/${project?.id}/edit`} className="grid bg-white p-6" style={{ borderRadius: '10px' }}>
              <div className="flex justify-between">
                <svg fill="#822ea1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="40px">
                  <path d="M 56 11 C 48.8 11 43 16.8 43 24 C 43 25.7 44.3 27 46 27 C 47.7 27 49 25.7 49 24 C 49 20.1 52.1 17 56 17 L 72 17 C 75.9 17 79 20.1 79 24 C 79 25.7 80.3 27 82 27 C 83.7 27 85 25.7 85 24 C 85 16.8 79.2 11 72 11 L 56 11 z M 24 31 C 16.8 31 11 36.8 11 44 L 11 61 C 11 62.1 11.6 62.999609 12.5 63.599609 C 28.4 73.099609 46.2 77.900391 64 77.900391 C 81.8 77.900391 99.6 73.099609 115.5 63.599609 C 116.4 62.999609 117 62.1 117 61 L 117 44 C 117 36.8 111.2 31 104 31 L 24 31 z M 24 37 L 104 37 C 107.9 37 111 40.1 111 44 L 111 59.300781 C 81.9 76.100781 46.1 76.100781 17 59.300781 L 17 44 C 17 40.1 20.1 37 24 37 z M 14 73 C 12.3 73 11 74.3 11 76 L 11 104 C 11 111.2 16.8 117 24 117 L 104 117 C 111.2 117 117 111.2 117 104 L 117 76 C 117 74.3 115.7 73 114 73 C 112.3 73 111 74.3 111 76 L 111 104 C 111 107.9 107.9 111 104 111 L 24 111 C 20.1 111 17 107.9 17 104 L 17 76 C 17 74.3 15.7 73 14 73 z" />
                </svg>
                <div>
                  <img width={'15px'} src="/3dots.png" alt="3dots" />
                </div>
              </div>
              <div className="py-4">
                <div className="px-1">
                  {project?.name}
                </div>
              </div>
              <div className="flex my-auto">
                <div className="border-circular pr-2">
                  <img width={'18px'} src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-5-1024.png" alt="" />
                  {/* <img width={'20px'} src={`https://avatars.dicebear.com/api/pixel-art/${Math.random()}.svg`} alt="" /> */}
                </div>
                <div className="mgq-primary-light text-sm" style={{ opacity: '0.8' }}>
                  {project?.user?.first_name} {project?.user?.last_name}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {showNewProjectModal ?
          <div className="relative z-10 p-5" aria-labelledby="modal-title" role="dialog" aria-modal={showNewProjectModal}>
            <div className={`fixed inset-0 ${showNewProjectModal ? 'bg-gray-500 bg-opacity-75 transition-opacity' : 'hidden'} `} />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className={`${showNewProjectModal ? 'flex' : 'hidden'} min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0`} >
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="mb-4">
                      <input onChange={e => setNewProjectName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="projectName" type="text" placeholder="Project Name" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="my-3 flex-row justify-center">
                      <div>
                        <button type="button" className="bg-red-500 radius-3 rounded-md border hover:bg-red-600 px-4 py-2 font-medium text-white text-sm focus:outline-none focus:shadow-outline" onClick={() => setShowNewProjectModal(false)}>Cancel</button>
                      </div>
                      <div>
                        <button type="button" className="mgq-bg-primary radius-3 rounded-md hover:mgq-bg-primary-dark text-white font-medium py-2 px-4 text-sm focus:outline-none focus:shadow-outline ml-3" onClick={() => createNewProject()}>Create</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          : null}
      </div>
    </>
  );
}

export default Projects;
