"use client"; 

import React, { useRef, useState, useMemo, useEffect } from 'react'; 
import dynamic from 'next/dynamic'; 

// Dynamically import JoditEditor to avoid server-side rendering issues, and cast it to 'any' type
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false }) as any;

// Define the props type for the RichTextEditor component
interface RichTextEditorProps {
  content: string; // The content to be edited
  setContent: (content: string) => void; // Function to update the content
  placeholder?: string; // Optional placeholder text
  readonly?: boolean; // Optional flag to make the editor read-only
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  setContent,
  placeholder = 'Start typing...', 
  readonly = false, // Default value for readonly is false
}) => {
  const editor = useRef<any>(null); // Ref to access the JoditEditor instance
  const [isClient, setIsClient] = useState<boolean>(false); // State to check if component is mounted on the client
  const [loading, setLoading] = useState<boolean>(true); // State to handle the loading state of the editor

  // useEffect hook to set isClient to true after the component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // useMemo hook to configure the JoditEditor settings
  const config = useMemo(() => ({
    readonly: readonly,
    placeholder: placeholder || 'Start typing...',
    removeButtons: ['about'], // Remove the 'about' button from the toolbar
    showCharsCounter: false, // Hide the characters counter
    showWordsCounter: false, // Hide the words counter
    showXPathInStatusbar: false, // Hide the XPath in the status bar
    toolbarAdaptive: false, // Disable adaptive toolbar
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'fullsize', 'selectall', 'print', 'source'
    ], // Define the toolbar buttons
    allowResizeX: false, // Disable horizontal resizing
    allowResizeY: false, // Disable vertical resizing
    allowHTML: true,  // Allow HTML to be inserted
    cleanHTML: false  // Disable cleaning of HTML when pasting or loading content
  }), [readonly, placeholder]);

  // useEffect hook to append custom styles and simulate editor loading time
  useEffect(() => {
    if (isClient) {
      const style = document.createElement('style');
      style.innerHTML = `
        .jodit-status-bar .jodit-status-bar__item:last-child {
          display: none;
        }
      `;
      document.head.appendChild(style);

      // Simulate loading time for the editor initialization
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the timeout as needed
    }
  }, [isClient]);

  // If the component is not mounted on the client, do not render anything
  if (!isClient) {
    return null;
  }

  return (
    <div className='mt-3'>
      {loading ? (
        <div>Loading editor...</div> // Display a loading message or component while the editor is initializing
      ) : (
        <JoditEditor
          ref={editor} // Assign the ref to the editor instance
          value={content} // Set the current content
          config={config} // Apply the editor configuration
          onBlur={(newContent: string) => setContent(newContent)} // Update the content onBlur event
          onChange={(newContent: string) => setContent(newContent)} // Update the content onChange event
        />
      )}
    </div>
  );
};

export default RichTextEditor; 