"use client"
import { useState } from 'react'; // Importing the useState hook from React
import { FaTrash } from 'react-icons/fa'; // Importing the FaTrash icon from react-icons library

// Defining the props interface for the CodeSnippet component
interface CodeSnippetProps {
  initialCode?: string; // Optional initial code prop
}

// Defining the CodeSnippet functional component
const CodeSnippet: React.FC<CodeSnippetProps> = ({ initialCode = '' }) => {
  // Initializing state variables: code and isCopied
  const [code, setCode] = useState(initialCode); // State to hold the code snippet
  const [isCopied, setIsCopied] = useState(false); // State to track if the code is copied

  // Function to handle the copy action
  const handleCopy = () => {
    navigator.clipboard.writeText(code) // Writing the code to the clipboard
      .then(() => {
        setIsCopied(true); // Setting isCopied to true on successful copy
        setTimeout(() => setIsCopied(false), 2000); // Resetting isCopied after 2 seconds
      })
      .catch(err => console.error('Failed to copy text: ', err)); // Logging an error if copy fails
  };

  // Function to handle the clear action
  const handleClear = () => {
    setCode(''); // Clearing the code state
  };

  // Function to handle changes in the textarea
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value); // Updating the code state with the textarea value
  };

  return (
    <div className="relative bg-gray-800 text-white font-mono rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-gray-900 px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <FaTrash className="text-white" onClick={handleClear} /> {/* Trash icon for clearing the code */}
        </div>
        <button
          className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleCopy}
        >
          {isCopied ? 'Copied' : 'Copy Code'} {/* Button text changes based on isCopied state */}
        </button>
      </div>
      <textarea
        value={code} // Setting the value of the textarea to the code state
        onChange={handleChange} // Handling changes in the textarea
        className="w-full bg-transparent text-white font-mono outline-none resize-none p-4"
        rows={5} // Setting the number of visible text lines for the textarea
        placeholder="Enter your code here..." // Placeholder text for the textarea
      />
    </div>
  );
};

export default CodeSnippet; // Exporting the CodeSnippet component as the default export
