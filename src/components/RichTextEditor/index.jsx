import React, { useState, useRef } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import "./style.css";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const RichTextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const onChange = (newEditorState) => setEditorState(newEditorState);

  const focus = () => editorRef.current.focus();

  const [focused, setFocused] = useState(false);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return null;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  let className = `RichEditor-editor border-t border-t-neutral-500 transition-all ${
    focused && "border-t-blue-700"
  } text-sm`;
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getFirstBlock().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <label
          htmlFor={props.id}
          className={`block mb-2 text-sm font-medium text-black select-none hover:text-blue-700 hover:cursor-pointer active:text-blue-800 transition-all ${
            props.required ? " required" : ""
          }`}
          onClick={focus}
        >
          {props.label}
        </label>
      </div>
      <div
        className={`RichEditor-root border border-neutral-500 rounded-md p-[0.5rem] transition-all ${
          focused && "ring-2 ring-blue-700 border-transparent"
        }`}
      >
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className={className} onClick={focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={onChange}
            placeholder={props.placeholder}
            ref={editorRef}
            spellCheck
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>
      {!!props.helperText && (
        <p className="py-[0.25rem] text-xs text-neutral-400 select-none flex flex-row gap-[.25rem] items-center">
          <InformationCircleIcon width={12} />
          {props.helperText}
        </p>
      )}
    </div>
  );
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const StyleButton = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className =
    "RichEditor-styleButton px-[0.5rem] bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 transition-all rounded m-[0.25rem]";
  if (props.active) {
    className +=
      " RichEditor-activeButton bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900";
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RichTextEditor;
