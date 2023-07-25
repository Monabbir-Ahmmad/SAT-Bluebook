import "./suneditor-content.css";

import { twMerge } from "tailwind-merge";

interface RichContentRendererProps {
  content: string;
  className?: string;
}

function RichContentRenderer({ content, className }: RichContentRendererProps) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
      className={twMerge("sun-editor-editable", className)}
    ></div>
  );
}

export default RichContentRenderer;
