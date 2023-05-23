import React from "react";

function Article() {
  return (
    <div
      style={{ position: "absolute", top: "230px", left: "33%", zIndex: "999" }}
    >
      <textarea
        style={{
          width: "600px",
          height: "200px",
          padding: "10px",
          boxSizing: "border-box",
          resize: "none",
        }}
        placeholder="Start an article.."
      />
    </div>
  );
}

export default Article;
