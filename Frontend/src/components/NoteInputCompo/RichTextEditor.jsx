import { useState } from "react";
import {
  faBold,
  faItalic,
  faUnderline,
  faUndo,
  faRedo,
  faStrikethrough,
} from "@fortawesome/free-solid-svg-icons";
import { Editor, EditorState, RichUtils, convertToRaw, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import IconToolButton from "./IconToolButton";

export default function RichTextEditor({
  expansionLevel,
  toggle,
  handleToggle,
  handleExpansion,
  onContentChange,
}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);

    const contentState = newEditorState.getCurrentContent();
    const text = contentState.getPlainText("");

    const length = text.length;
    if (handleExpansion) {
      handleExpansion(length);
    }

      if(onContentChange){
    const rawContent = convertToRaw(contentState);
    onContentChange({
      raw : rawContent,
      plainText: text,
      length: text.length,
    })
  }
  };


  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const undo = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const redo = () => {
    setEditorState(EditorState.redo(editorState));
  };

  const keyBindingFn = (e) => {
    return getDefaultKeyBinding(e);
  };

  const isInlineStyleActive = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  return (
    <div className="flex-1 w-full text-gray-200 placeholder-gray-200 border-none outline-none bg-transparent overflow-y-auto resize-none transition-all duration-300 ease-in-out">
      <div
        className={`
          ${
            toggle && expansionLevel === 0
              ? "min-h-[35px]"
              : toggle && expansionLevel === 1
              ? "min-h-[250px]"
              : toggle && expansionLevel === 2
              ? "min-h-[375px]"
              : toggle && expansionLevel === 3
              ? "min-h-[500px] max-h-[600px]"
              : "min-h-auto"
          } 
          w-full border-none outline-none bg-transparent overflow-y-auto resize-none transition-all duration-300 ease-in-out
        `}
        onClick={handleToggle}
      >
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFn}
          placeholder="Take a note..."
          spellCheck={true}
        />
      </div>

      {toggle && (
        <div
        className="flex justify-center pb-1.5 border-b border-gray-400 mb-1 mt-3.5"
        >
          <div className="flex flex-wrap gap-2 ">
            {/* Text Formatting */}
            <IconToolButton
              onClick={() => toggleInlineStyle("BOLD")}
              icon={faBold}
              tooltip="Bold (Ctrl+B)"
              isActive={isInlineStyleActive("BOLD")}
            />

            <IconToolButton
              onClick={() => toggleInlineStyle("ITALIC")}
              icon={faItalic}
              tooltip="Italic (Ctrl+I)"
              isActive={isInlineStyleActive("ITALIC")}
            />

            <IconToolButton
              onClick={() => toggleInlineStyle("UNDERLINE")}
              icon={faUnderline}
              tooltip="Underline (Ctrl+U)"
              isActive={isInlineStyleActive("UNDERLINE")}
            />

            <IconToolButton
              onClick={() => toggleInlineStyle("STRIKETHROUGH")}
              icon={faStrikethrough}
              tooltip="Strikethrough"
              isActive={isInlineStyleActive("STRIKETHROUGH")}
            />
            {/* Undo/Redo */}
            <IconToolButton
              onClick={undo}
              icon={faUndo}
              tooltip="Undo (Ctrl+Z)"
            />

            <IconToolButton
              onClick={redo}
              icon={faRedo}
              tooltip="Redo (Ctrl+Y)"
            />
          </div>
        </div>
      )}
    </div>
  );
}
