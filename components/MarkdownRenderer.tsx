"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
