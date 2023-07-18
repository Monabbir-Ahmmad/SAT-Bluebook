export const buttonList = [
  ["undo", "redo"],
  ["fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link", "image", "video", "audio"],
  ["removeFormat", "preview"],
];

export const buttonListMini = [
  ["undo", "redo"],
  [
    "bold",
    "underline",
    "italic",
    "strike",
    "subscript",
    "superscript",
    "link",
    "table",
  ],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list"],
  [],
  ["removeFormat"],
];

export const buttonListResponsive = [
  // Default
  ["undo", "redo"],
  ["fontSize", "formatBlock"],
  ["paragraphStyle", "blockquote"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor", "textStyle"],
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link", "image", "video", "audio"],
  ["removeFormat"],

  // (min-width:992px)
  [
    "%992",
    [
      ["undo", "redo"],
      [
        ":p-More Paragraph-default.more_paragraph",
        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
      ],
      ["bold", "underline", "italic", "strike"],
      [
        ":t-More Text-default.more_text",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "textStyle",
      ],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "lineHeight"],
      [
        "-right",
        ":r-More Rich-default.more_plus",
        "table",
        "link",
        "image",
        "video",
        "audio",
      ],
      ["removeFormat"],
    ],
  ],
  // (min-width:768px)
  [
    "%768",
    [
      ["undo", "redo"],
      [
        ":p-More Paragraph-default.more_paragraph",

        "fontSize",
        "formatBlock",
        "paragraphStyle",
        "blockquote",
      ],
      [
        ":t-More Text-default.more_text",
        "bold",
        "underline",
        "italic",
        "strike",
        "subscript",
        "superscript",
        "fontColor",
        "hiliteColor",
        "textStyle",
      ],
      [
        ":e-More Line-default.more_horizontal",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "lineHeight",
      ],
      [
        ":r-More Rich-default.more_plus",
        "table",
        "link",
        "image",
        "video",
        "audio",
      ],
      ["removeFormat"],
    ],
  ],
];
