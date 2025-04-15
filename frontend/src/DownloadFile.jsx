import axios from "axios";
import React from "react";

const DownloadFile = () => {
  const download = async () => {
    try {
      const response = await fetch("http://localhost:3000/download");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "file.pdf"; // Suggest filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div>
      <h2>Download File</h2>
      <br />
      <button onClick={() => download()}>Download</button>
    </div>
  );
};

export default DownloadFile;
