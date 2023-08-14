"use client";

import "./suneditor.css";
import "./suneditor-content.css";

import React, { forwardRef, useEffect, useRef } from "react";

import SunEditor from "suneditor";
import SunEditorCore from "suneditor/src/lib/core";
import { SunEditorOptions } from "suneditor/src/options";
import { buttonListResponsive } from "./buttonList";
import plugins from "suneditor/src/plugins";

export interface IRichEditor extends SunEditorCore {}

const RichEditor = forwardRef<IRichEditor | null, SunEditorOptions>(
  (
    {
      buttonList = buttonListResponsive,
      minHeight = "50vh",
      maxHeight = "80vh",
      height = "auto",
      value = "",
      ...rest
    },
    ref
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const editor = SunEditor.create(textAreaRef.current!, {
        plugins,
        buttonList,
        placeholder: "Start writing here...",
        defaultStyle: "font-size:16px; font-family:'Poppins';",
        showPathLabel: false,
        display: "block",
        popupDisplay: "full",
        fontSize: [18, 20, 22, 24, 26, 28, 36, 48, 72],
        formats: ["p", "div", "pre", "h1", "h2", "h3"],
        imageFileInput: false,
        height,
        minHeight,
        maxHeight,
        charCounterLabel: "Characters :",
        value: value,
        ...rest,
      });

      if (ref) {
        if (typeof ref === "function") {
          ref(editor);
        } else {
          ref.current = editor;
        }
      }

      return () => {
        editor.destroy();
      };
    }, []);

    return <textarea ref={textAreaRef} style={{ visibility: "hidden" }} />;
  }
);

RichEditor.displayName = "RichEditor";

export default RichEditor;
