// app/components/LiveMarkdownRenderer.tsx
"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LiveMarkdownRendererProps {
  initialContent?: string;
}

const LiveMarkdownRenderer: React.FC<LiveMarkdownRendererProps> = ({
  initialContent = "",
}) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Textarea for typing markdown */}
      <textarea
        className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg h-[400px] resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your markdown here..."
      />

      {/* Rendered Markdown */}
      <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg h-[400px] overflow-y-auto prose max-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default LiveMarkdownRenderer;
