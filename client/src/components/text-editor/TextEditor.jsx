import React from 'react';
import { Button } from 'react-bootstrap';
import { BiUndo, BiRedo, BiCodeAlt , BiImage} from "react-icons/bi";
import { BsArrowReturnLeft, BsTextParagraph} from "react-icons/bs";


function TextEditor({setNote}) {

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
   
  };

  const applyFontSize = (size) => {
    if (size) {
      document.execCommand('fontSize', false, size);
    }
  };

  const handleImageSelect = (event) => {
    // const file = event.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const imageUrl = e.target.result;
    //     document.execCommand("insertImage", false, imageUrl);
    //   };
    //   reader.readAsDataURL(file);
    // }
    const url = prompt("Enter the image url");
    document.execCommand("insertImage", false, url);
  };
  
//   const insertTable = () => {
//     const rows = prompt("Enter the number of rows:");
//     const columns = prompt("Enter the number of columns:");
//     if (rows && columns) {
//       let tableHTML = '<table border="1">';
//       for (let i = 0; i < rows; i++) {
//         tableHTML += '<tr>';
//         for (let j = 0; j < columns; j++) {
//           tableHTML += '<td></td>';
//         }
//         tableHTML += '</tr>';
//       }
//       tableHTML += '</table>';
//       document.execCommand('insertHTML', false, tableHTML);
//     }
//   };

  const convertToText = () => {
    const editorContent = document.getElementById("editor").innerHTML;
    setNote((note)=>{
       return {
        ...note,
        description: editorContent
       }
    });
  };

  return (
    <div>
      <div className='d-flex flex-wrap align-items-center mb-3'>
       <Button variant="light" type="button" className=" rounded-0 btn-sm me-2" onClick={() => applyStyle('bold')}><b>B</b></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-2" onClick={() => applyStyle('italic')}><i>I</i></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-2" onClick={() => applyStyle('underline')}><u>U</u></Button>
        <select className="rounded-0 bg-light btn-sm me-1 border-0 py-1" onChange={(e) => applyFontSize(e.target.value)}>
          <option value="">Font</option>
          <option value="6">H1</option>
          <option value="5">H2</option>
          <option value="4">H3</option>
          <option value="3">H4</option>
          <option value="2">H5</option>
          <option value="1">H6</option>
        </select>
        {/* <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
        /> */}
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-1" onClick={handleImageSelect}><BiImage/></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-1" onClick={() => applyStyle("formatBlock", "p")}><BsTextParagraph/></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-1" onClick={() => applyStyle("insertLineBreak")}><BsArrowReturnLeft/></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-1" onClick={() => document.execCommand('undo')}><BiUndo/></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-1" onClick={() => document.execCommand('redo')}><BiRedo/></Button>
        <Button variant="light" type="button" className=" rounded-0 btn-sm me-1" onClick={() => applyStyle('formatBlock', 'pre')}><BiCodeAlt/></Button>
        {/* <button type="button" className="format-btn" onClick={insertTable}>Table</button> */}
      </div>

      <div
        id="editor"
        contentEditable="true"
        className='border border-muted rounded-0 shadow-sm border-2'
        style={{
          width: '100%',
          height: '400px',
          padding: '10px',
          resize: 'vertical',
          overflow: 'auto',
          outline: 'none'
        }}
      ></div>        
      <Button variant="light" className=" rounded-0 px-4 my-3" type="button" onClick={convertToText}>Done</Button>

    </div>
  );
}

export default TextEditor;
