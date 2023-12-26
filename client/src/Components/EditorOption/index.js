/**
 * Build styles
 */
 require('./index.css').toString();

 /**
  * Base Paragraph Block for the Editor.js.
  * Represents simple paragraph
  *
  * @author CodeX (team@codex.so)
  * @copyright CodeX 2018
  * @license The MIT License (MIT)
  */
 
 /**
  * @typedef {object} ParagraphConfig
  * @property {string} placeholder - placeholder for the empty paragraph
  * @property {boolean} preserveBlank - Whether or not to keep blank paragraphs when saving editor data
  */
 
 /**
  * @typedef {Object} ParagraphData
  * @description Tool's input and output data format
  * @property {String} text — Paragraph's content. Can include HTML tags: <a><b><i>
  */
 class EditorOption {
   /**
    * Default placeholder for Paragraph Tool
    *
    * @return {string}
    * @constructor
    */
   static get DEFAULT_PLACEHOLDER() {
     return '';
   }
 
   /**
    * Render plugin`s main Element and fill it with saved data
    *
    * @param {object} params - constructor params
    * @param {ParagraphData} params.data - previously saved data
    * @param {ParagraphConfig} params.config - user config for Tool
    * @param {object} params.api - editor.js api
    * @param {boolean} readOnly - read only mode flag
    */
   constructor({data, config, api, readOnly}) {

     this.api = api;
     this.readOnly = readOnly;
    this.newData = data
    this.colId =this.api.ui.nodes.wrapper.parentElement.id?.split(' ')?.[1] + " " + "top-1"

     this._CSS = {
       block: this.api.styles.block,
       wrapper: 'ce-new'
     };


     this.optionElement = document.getElementById(this.colId)
     this.lastChild  = this.optionElement;
     this.editorData = this.lastChild.getElementsByClassName('cdx-block')[0].innerText

   

     if (!this.readOnly) {
       this.onKeyUp = this.onKeyUp.bind(this);
     }
 
     /**
      * Placeholder for paragraph if it is first Block
      * @type {string}
      */
     this._placeholder = config.placeholder ? config.placeholder : EditorOption.DEFAULT_PLACEHOLDER;
     this._data = {};
     this._element = this.drawView();

     this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;
     
     this.data = "Option 1";
   }
 
   /**
    * Check if text content is empty and set empty string to inner html.
    * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
    *
    * @param {KeyboardEvent} e - key up event
    */
   onKeyUp(e) {
     this._rerender()

     if (e.code !== 'Backspace' && e.code !== 'Delete') {
       return;
     }     


     this.selectList.addEventListener("change", () => {
       this.data = this.selectList.value
       this.data = {text : this.selectList.value}
     })
     this.render()



 
    //  const {textContent} = this.selectList.value
 
    //  if (textContent === '') {
    //    this._element.innerText = '';
    //  }
   }
 
   /**
    * Create Tool's view
    * @return {HTMLElement}
    * @private
    */
   drawView() {

    //  let div = document.createElement('DIV');
    this.selectList = document.createElement("select");

 
    this.selectList.classList.add(this._CSS.wrapper, this._CSS.block);
    this.selectList.ariaPlaceholder = "Select Keyword"
     //Create array of options to be added
const  array = this.editorData.split(',');

//Create and append select list
this.selectList.id = "mySelect";

const defaultOption = document.createElement("option");
defaultOption.text = "Select..."
defaultOption.value = ""
defaultOption.selected = true
this.selectList.append(defaultOption) 

if(this.newData.text) {
  this.selectList.innerText = ''
  const opts=  document.createElement("option");

  opts.value= this.newData.text
  opts.text = this.newData.text
  opts.selected = true
  this.selectList.appendChild(opts)


}
else {
  const defaultOption = document.createElement("option");
  defaultOption.text = "Select..."
  defaultOption.value = ""
  defaultOption.selected = true
  this.selectList.append(defaultOption) 
}


// for (var i = 0; i < array.length; i++) {
//        const option = document.createElement("option");
//       option.value = array[i];
//       option.text = array[i];

//     this.selectList.append(option)
//     }
    // this.selectList.labels = "testsgds"

    this.selectList.value = this.newData.text || ''
    if(this.readOnly) {
      this.selectList.disabled = true
    }

     if (!this.readOnly) {

       this.selectList.addEventListener('click', this.onKeyUp);
     }

 
     return this.selectList;
   }
 
   /**
    * Return Tool's view
    *
    * @returns {HTMLDivElement}
    */
   render() {
     return this.drawView();
   }

   _rerender() {
    this.optionElement = document.getElementById(this.colId)
    this.lastChild  = this.optionElement;
    this.editorData = this.lastChild.getElementsByClassName('cdx-block')[0].innerText

    let options = this.selectList.getElementsByTagName('option')


    for(let item of options) {
        this.selectList.removeChild(item)
    }

    this.selectList.value = ''
    this.selectList.textContent = ''



    
    const  array = this.editorData.split(',');
    const defaultOption = document.createElement("option");
    defaultOption.text = "Select..."
    defaultOption.value = ""
    this.selectList.appendChild(defaultOption)


    for(let item of array) {
      const opts = document.createElement('option')
      opts.text = item.trim()
      opts.value = item.trim() 
      this.selectList.appendChild(opts)
    }




    if (!this.readOnly) {

      this.selectList.addEventListener('click', this.onKeyUp);
    }


    //  console.log({list : this.selectList, data : this.editorData})
      return this.selectList
   }
 
   /**
    * Method that specified how to merge two Text blocks.
    * Called by Editor.js by backspace at the beginning of the Block
    * @param {ParagraphData} data
    * @public
    */
   merge(data) {
     let newData = {
       text : data
     };
 
     this.data = newData;
   }
 
   /**
    * Validate Paragraph block data:
    * - check for emptiness
    *
    * @param {ParagraphData} savedData — data received after saving
    * @returns {boolean} false if saved data is not correct, otherwise true
    * @public
    */
   validate(savedData) {
     if (savedData.text.trim() === '' && !this._preserveBlank) {
       return false;
     }
 
     return true;
   }
 
   /**
    * Extract Tool's data from the view
    * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
    * @returns {ParagraphData} - saved data
    * @public
    */
   save(toolsContent) {
     return {
       text: this.selectList.value
     };
   }
 
   /**
    * On paste callback fired from Editor.
    *
    * @param {PasteEvent} event - event with pasted data
    */
   onPaste(event) {
     const data = {
       text: this.selectList.value
     };
 
     this.data = data;
   }
 
   /**
    * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
    */
   static get conversionConfig() {
     return {
       export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
       import: 'text' // to covert other block's exported string to Paragraph, fill 'text' property of tool data
     };
   }
 
   /**
    * Sanitizer rules
    */
   static get sanitize() {
     return {
       text: {
         br: true,
       }
     };
   }
 
   /**
    * Returns true to notify the core that read-only mode is supported
    *
    * @return {boolean}
    */
   static get isReadOnlySupported() {
     return true;
   }
 
   /**
    * Get current Tools`s data
    * @returns {ParagraphData} Current data
    * @private
    */
   get data() {

     let text = this._element.innerText;
 
     this._data.text = text;
 
     return this._data;
   }
 
   /**
    * Store data in plugin:
    * - at the this._data property
    * - at the HTML
    *
    * @param {ParagraphData} data — data to set
    * @private
    */
   set data(data) {
     this._data = data || {};
 
     this._element.innerText = this._data.text || '';
   }
 
   /**
    * Used by Editor paste handling API.
    * Provides configuration to handle P tags.
    *
    * @returns {{tags: string[]}}
    */
   static get pasteConfig() {
     return {
       tags: [ 'P' ]
     };
   }
 
   /**
    * Icon and title for displaying at the Toolbox
    *
    * @return {{icon: string, title: string}}
    */
   static get toolbox() {
     return {
       icon: '',
       title: ''
     };
   }
 }
 
 export default EditorOption;