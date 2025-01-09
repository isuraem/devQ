"use client";
import CodeSnippet from '@/app/components/code-snippet/code-snippet';
import { useState, useRef } from 'react';
import { FaBold, FaItalic, FaUnderline, FaCode, FaPaperclip, FaImage, FaRedo } from 'react-icons/fa';

export default function AnswerQuestion() {
  const [description, setDescription] = useState('');
  const [showCodeSnippet, setShowCodeSnippet] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      setDescription('');
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="mt-9 ml-11 mr-11">
      <p className="text-2xl font-semibold">Upload Answer</p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Type your answer below</h2>
        <div className="mt-2 p-2 border border-gray-300 rounded-md w-full">
          <div className="flex justify-between mb-2">
            <div className="flex space-x-3">
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('bold')}>
                <FaBold />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('italic')}>
                <FaItalic />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => executeCommand('underline')}>
                <FaUnderline />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded" onClick={() => setShowCodeSnippet(true)}>
                <FaCode />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <FaPaperclip />
              </button>
              <button className="p-2 hover:bg-gray-200 rounded">
                <FaImage />
              </button>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded" onClick={handleReset}>
              <FaRedo />
            </button>
          </div>
          <div
            contentEditable
            ref={editorRef}
            className="w-full p-2 border border-gray-300 rounded-md h-48"
            onInput={(e) => setDescription(e.currentTarget.innerHTML)}
          ></div>
        </div>
      </div>
      {showCodeSnippet && (
        <div className="mt-8 flex justify-center">
          <div className="w-full mb-4">
            <CodeSnippet />
          </div>
        </div>
      )}
      <div className="flex pt-7 justify-center mt-auto mb-7">
        <button className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-300">
          Upload
        </button>
      </div>
    </div>
  );
}
