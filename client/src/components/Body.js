import React from "react";
import "../App.css"

export default function Body() {
  return (
<div className="w-full max-w-lg border mx-auto p-4 mt-30">
  <div className="flex items-center justify-between border-b-2 border-gray-400 py-3">
    <div className="bg-gray-200 text-gray-700 mr-3 py-2 px-3 leading-tight">
      Dummy Data
    </div>
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500 mr-4 cursor-pointer hover:text-green-700"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4 10.75L7 14L16 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <button
        className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        type="button"
        // onClick={handleDeleteTask}
      >
        Delete
      </button>
    </div>
  </div>
</div>


  );
}
