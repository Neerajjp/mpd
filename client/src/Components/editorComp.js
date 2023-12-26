/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import Paragraph from 'editorjs-paragraph-with-alignment';
import Alert from 'editorjs-alert';
import EditorJsColumns from './EditorColumn/src/EditorJsColumns';
import EditorJsColumnsRight from './EditorColumn/src/EditorJsColumnsRight';
import EditorJsColumnsTop from './EditorColumn/src/EditorJsColumnsTop';
import EditorOption from './EditorOption';
import TopBlockEditorOption from './EditorOption/TopBlockEditorOption';

const Editor = ({ id, editorData, setEditorData, isRead, isMount , ejInstance}) => {

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!ejInstance.current && isMount) {
      initEditor();
      setInit(true)
    }
  }, [isMount]);

  const onRead =async () => {
    if(ejInstance.current && init){
      ejInstance.current.configuration.readOnly = isRead
     await ejInstance.current.save()
    }
  }

  const initEditor = async () => {
    let column_tools = {
      header: Header,
      alert: Alert,
      paragraph : {
        class : Paragraph,
      },
      rightParagraph : {
        class : Paragraph,
       config:{ defaultAlignment : 'right'}
},
      dropDown : EditorOption,
      topDropdown : TopBlockEditorOption,
      delimiter: Delimiter,
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
    }

    // next define the tools in the main block
    // Warning - Dont just use main_tools - you will probably generate a circular reference
    let main_tools = {
      // Load Official Tools
      header: Header,
      alert: Alert,
      paragraph : Paragraph,
      delimiter: Delimiter,
      rightParagraph : {
        class : Paragraph,
        config:{ defaultAlignment : 'right'}
      },
      Marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },
      columnsTop: {
        class: EditorJsColumnsTop,
        config: {
          tools: column_tools, // IMPORTANT! ref the column_tools
          // EditorJsLibrary : EditorJS
        }
      },
      columns: {
        class: EditorJsColumns,
        config: {
          tools: column_tools, // IMPORTANT! ref the column_tools
          // EditorJsLibrary : EditorJS
        }
      },
      columnsRight: {
        class: EditorJsColumnsRight,
        config: {
          tools: column_tools, // IMPORTANT! ref the column_tools
          // EditorJsLibrary : EditorJS
        }
      },
    }

    const editor = new EditorJS({
      readOnly:isRead,
      holder: id,
      data: editorData,
      onChange: async (api, event) => {
        let content = await ejInstance.current.save();
          const data = await api.saver.save()
        setEditorData(data);
      },
      autofocus: true,
      tools: main_tools,
    });

    try {
      await editor.isReady;
      ejInstance.current = editor;
    } catch (reason) {
      console.error(`Editor.js initialization failed because of ${reason}`)
    }

  };
  return (
    <>
      <div style={{marginTop : "20px"}} id={id}> </div>
    </>
  );
}

export default Editor;