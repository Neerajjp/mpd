import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Editor from '../Components/editorComp';
import { SidebarContext } from '../context/sidebarContext';
import { projectDetails, projectUpdate } from '../services/project';
import { storyIndexing } from '../utils/story';
import { tabWidth } from '../utils/tabWidth';

function Project() {
  const { id, type } = useParams();
  const [isMount, setIsMount] = useState(false);
  const [isLoding, setIsLoading] = useState(false);
  const [editorData, setEditorData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRead, setIsRead] = useState(type);
  const { setHeaderName } = useContext(SidebarContext);
  const [isReadLoading, setIsReadLoading] = useState(false);
  const [showIndexesModal, setShowIndexesModal] = useState(false);

  const navigate = useNavigate();
  const ejInstance = useRef();

  const getProjectById = async () => {
    const data = await projectDetails(id);
    setEditorData(data?.body);
    setProjectData(data);
    setIsMount(true);
    setHeaderName(data?.name);
  };

  const updateProjectById = async (payload, setLoading) => {
    if (isRead === 'view') return setLoading(false);
    await ejInstance.current.save();
    let stories =  storyIndexing(payload?.body?.blocks)
    const data = await projectUpdate(id, {...payload, stories}, setLoading);
    setEditorData(data?.body);
    setProjectData(data);
    setIsMount(true);
    setHeaderName(data?.name);
  };

  useEffect(() => {
    getProjectById();
    return () => {
      setHeaderName('');
    };
  }, []);

  return (
    <>
      <div
        className={`container mx-auto sm:pt-2 ${
          isRead === 'view' && 'bg-white'
        }`}
        style={{
          paddingLeft: tabWidth ? 0 : 100,
          paddingRight: tabWidth ? 0 : 100,
          maxHeight: '90vh',
          overflowY: 'scroll',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          {isRead === 'edit' && (
            <button
              disabled={isLoding}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  updateProjectById(
                    {
                      body: editorData,
                      name: projectData?.name,
                    },
                    setIsLoading
                  );
                }, [1000]);
              }}
              className="mgq-bg-primary mb-3 radius-3 hover:mgq-bg-primary-dark text-white py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline mr-3"
              type="button"
            >
              {isLoding ? 'Saving' : 'Save'}
            </button>
          )}
          <button
            className="bg-gray-500 mb-3 radius-3 hover:bg-gray-700  text-white py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline mr-3"
            type="button"
            onClick={() => setShowIndexesModal(true)}
          >
            Indexes
          </button>
          <button
            disabled={isReadLoading}
            onClick={async () => {
              setIsReadLoading(true);
              setTimeout(async () => {
                await updateProjectById(
                  {
                    body: editorData,
                    name: projectData?.name,
                  },
                  setIsReadLoading
                );
                window.location.href = `/projects/${id}/${
                  type === 'view' ? 'edit' : 'view'
                }`;
              }, [200]);
            }}
            className="bg-gray-500 mb-3 radius-3 hover:bg-gray-700  text-white py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline mr-3"
            type="button"
          >
            {isReadLoading
              ? 'Loading...'
              : isRead === 'edit'
              ? 'Preview'
              : 'Edit'}
          </button>

          {/* {isRead === 'edit' && <button
            onClick={async () => {
              await updateProjectById({ body: {}, name: projectData?.name })
              window.location.reload()
            }}
            className="bg-red-500 mb-3 radius-3 hover:bg-red-700  text-white py-2 px-4 rounded text-sm focus:outline-none focus:shadow-outline"
            type="button"
          >
            Clear Editor
          </button>} */}
        </div>

        <Editor
          isMount={isMount}
          isRead={isRead === 'edit' ? false : true}
          ejInstance={ejInstance}
          id="main-editor"
          setEditorData={setEditorData}
          editorData={editorData}
        />
        {showIndexesModal ?
          <div className="relative z-10 p-5" aria-labelledby="modal-title" role="dialog" aria-modal={showIndexesModal}>
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className={`${showIndexesModal ? 'flex' : 'hidden'} min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0`} >
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div>
                      {projectData?.stories?.map(story => (
                        story.scene_id?
                        <div key={story.scene_id} className="mb-4">
                          <div>
                            <span className="text-xl font-black">{story.scene_number}</span>
                            <span className="text-sm"> has <span className='font-medium'>{story.charecters_count} {story.charecters_count===1?"character":"characters"}</span></span>
                          {Object.keys(story.charecters).map(key => (
                            <div className='ml-4' key={key}>
                              <span className='font-bold'>{key}</span> has <span className='font-bold'>{story.charecters[key]}</span> {story.charecters[key]===1?"dialogue":"dialogues"}
                            </div>
                          ))}
                          {story?.character_array.length !== Object.keys(story?.charecters).length ?
                          <div className='ml-4'>
                            <span className='font-bold'>
                            {story?.character_array?.map((character, index) => (
                              Object.keys(story?.charecters).includes(character)?"":`${character}${index===story.character_array.length-1?"":", "}`
                            ))}
                            </span> have <span className='font-bold'>0</span> dialogues
                          </div>
                          :""}
                          </div>
                        </div>
                        : <div className="flex justify-center">
                          Nothing is indexed yet, please save or refresh the project
                        </div>
                      ))}
                    </div>
                    <div className="my-3 flex justify-end">
                      <div>
                        <button type="button" className="bg-red-500 radius-3 rounded-md border hover:bg-red-600 px-4 py-2 font-medium text-white text-sm focus:outline-none focus:shadow-outline" onClick={() => setShowIndexesModal(false)}>
                          Cancel
                        </button>
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

export default Project;
