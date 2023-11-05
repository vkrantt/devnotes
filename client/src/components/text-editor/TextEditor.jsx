import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiUndo, BiRedo, BiCodeAlt, BiImage } from "react-icons/bi";
import { BsArrowReturnLeft, BsTextParagraph } from "react-icons/bs";
import { PiListNumbersBold } from "react-icons/pi";
import { MdFormatListBulleted } from "react-icons/md";

function TextEditor({ setNote, description }) {
  useEffect(() => {
    if (description) {
      document.getElementById("editor").innerHTML = description;
    }
  }, [description]);

  const applyStyle = (style, value = null) => {
    if (style === "code") {
      value = `<code>${window.getSelection().toString()}</code>`;
      style = "insertHTML";
    }
    document.execCommand(style, false, value);
  };

  const applyFontSize = (size) => {
    if (size) {
      document.execCommand("fontSize", false, size);
    }
  };

  const handleImageSelect = (event) => {
    const url = prompt("Enter the image url");
    document.execCommand("insertImage", false, url);
  };

  const handleTextColorChange = (event) => {
    const color = event.target.value;
    applyStyle("foreColor", color);
  };

  // Reset all fomatting
  const resetFormatting = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const newNode = document.createElement("div");
      newNode.appendChild(range.cloneContents());
      const plainText = newNode.textContent;
      range.deleteContents();
      range.insertNode(document.createTextNode(plainText));
    }
  };

  const addBullets = () => {
    document.execCommand("insertUnorderedList", false, null);
  };

  const addNumbers = () => {
    document.execCommand("insertOrderedList", false, null);
  };

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center mb-3 border border-2 shadow-sm rounded-2 overflow-hidden">
        <Button
          variant="none"
          type="button"
          className=" bg-blue text-light rounded-0 btn-sm "
          onClick={() => applyStyle("bold")}
        >
          <b>B</b>
        </Button>
        <Button
          variant="none"
          type="button"
          className=" bg-blue text-light rounded-0 btn-sm "
          onClick={() => applyStyle("italic")}
        >
          <i>I</i>
        </Button>
        <Button
          variant="none"
          type="button"
          className=" bg-blue text-light rounded-0 btn-sm me-2"
          onClick={() => applyStyle("underline")}
        >
          <u>U</u>
        </Button>
        <select
          className="rounded-0 bg-blue text-light btn-sm me-1 border-0 py-1"
          onChange={(e) => applyFontSize(e.target.value)}
        >
          <option value="">Font</option>
          <option value="6">H1</option>
          <option value="5">H2</option>
          <option value="4">H3</option>
          <option value="3">H4</option>
          <option value="2">H5</option>
          <option value="1">H6</option>
        </select>

        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={handleImageSelect}
        >
          <BiImage />
        </Button>
        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={() => applyStyle("formatBlock", "p")}
        >
          <BsTextParagraph />
        </Button>
        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={() => applyStyle("insertLineBreak")}
        >
          <BsArrowReturnLeft />
        </Button>
        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm "
          onClick={() => document.execCommand("undo")}
        >
          <BiUndo />
        </Button>
        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={() => document.execCommand("redo")}
        >
          <BiRedo />
        </Button>
        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={() => applyStyle("formatBlock", "pre")}
        >
          <BiCodeAlt />
        </Button>

        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={() => addBullets()}
        >
          <MdFormatListBulleted />
        </Button>

        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={() => addNumbers()}
        >
          <PiListNumbersBold />
        </Button>

        <input
          type="color"
          className="rounded-0 bg-light btn-sm me-1 border-0 py-1"
          onChange={handleTextColorChange}
        />

        <Button
          variant="none"
          type="button"
          className="bg-blue text-light rounded-0 btn-sm me-1"
          onClick={resetFormatting}
        >
          Reset
        </Button>
      </div>

      <div
        id="editor"
        contentEditable="true"
        className="border border-muted rounded-2 shadow-sm border-2"
        style={{
          width: "100%",
          height: "600px",
          padding: "10px",
          resize: "vertical",
          overflow: "auto",
          outline: "none",
        }}
      ></div>
    </div>
  );
}

export default TextEditor;
