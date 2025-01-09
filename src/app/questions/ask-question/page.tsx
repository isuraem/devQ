"use client";
import CodeSnippet from '@/app/components/code-snippet/code-snippet';
import { useState, useRef } from 'react';
import { FaBold, FaItalic, FaUnderline, FaCode, FaPaperclip, FaImage, FaRedo } from 'react-icons/fa';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';
import RichTextEditor from '@/app/components/text-area-editor/textAreaEditor';
import { createQuestion } from '../../../../services/questionServices/questionService';
import useAuthStore from '../../../../services/utils/authStore';
import { useRouter } from "next/navigation";


type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'Golang', label: 'Golang' },
  { value: 'Java', label: 'Java' },
  { value: 'CSS', label: 'CSS' },
  { value: 'Tailwind', label: 'Tailwind' },
  { value: 'Python', label: 'Python' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'Node.js', label: 'Node' },
  { value: 'Nest.js', label: 'Nest.js' },
  { value: 'NEXT.js', label: 'NEXT.js' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Angular', label: 'Angular' },
  { value: 'Express.js', label: 'Express.js' },
  { value: 'Wordpress', label: 'Wordpress' },
  { value: 'React', label: 'React' },
  { value: 'Django', label: 'Django' }, 
  { value: 'Ruby on Rails', label: 'Ruby on Rails' }, 
  { value: 'Swift', label: 'Swift' }, 
  { value: 'PHP', label: 'PHP' },
  { value: 'MongoDB', label: 'MongoDB' }, 
  { value: 'GraphQL', label: 'GraphQL' }, 
  { value: 'Redux', label: 'Redux' },
  { value: 'Sass', label: 'Sass' }, 
];

const animatedComponents = makeAnimated();

export default function AskQuestion() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<MultiValue<OptionType>>([]);
  const [isCodeSnippetVisible, setIsCodeSnippetVisible] = useState(false); // State to toggle code snippet visibility
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Start typing...');
  const [readonly, setReadonly] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');




  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
      setDescription('');
    }
  };

  const handleTagsChange = (selectedOptions: MultiValue<OptionType>) => {
    if (selectedOptions.length <= 3) {
      setSelectedTags(selectedOptions);
    }
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const toggleCodeSnippet = () => {
    setIsCodeSnippetVisible(!isCodeSnippetVisible); // Toggle the visibility of code snippet
  };

  const submitHandler = async() => {
    let userId = useAuthStore.getState().user.id;
    const tagsValues = selectedTags.map(tag => tag.value);
    let data: any = {
      user_id: userId,
      tags: tagsValues,
      status: true,
      description: content,
      title: title
    }
    let response = await createQuestion(data);
    console.log("data, ",response.data)
    if(response){
      router.push(`/questions/answer-question?id=${response.data.id}`);
    }
    
  };

  return (
    <div className="mt-9 ml-11 mr-11 mb-11">
      <p className="text-2xl font-semibold">
        Ask a Question
      </p>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Question Title</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          name="title"
          className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Describe your Issue</h2>
        <RichTextEditor
          content={content}
          setContent={setContent}
          placeholder={placeholder}
          readonly={readonly}
          
        />
      </div>
      <div>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Tags</h2>
        <Select
          isMulti
          components={animatedComponents}
          value={selectedTags}
          onChange={handleTagsChange}
          options={options}
          className="mt-2"
          placeholder="Select up to 3 tags..."
        />
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-300"
          onClick={submitHandler}
        >
          Save and Continue
        </button>
      </div>
    </div>
  );
}
