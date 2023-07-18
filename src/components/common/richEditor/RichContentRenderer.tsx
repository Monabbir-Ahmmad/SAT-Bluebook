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
      className={twMerge(className, "sun-editor-editable")}
    ></div>
  );
}

export default RichContentRenderer;
