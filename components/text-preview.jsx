"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

const TextPreview = ({ value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill theme="bubble" readOnly value={value} />
    </div>
  );
};

export default TextPreview;
