"use client"
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import useAuthStore from '../../../../services/utils/authStore';
import { getQuestionById, createAnswer } from '../../../../services/questionServices/questionService';
import RichTextEditor from '@/app/components/text-area-editor/textAreaEditor';
import { AiOutlineDelete } from 'react-icons/ai';
import ConfirmationModal from '../../components/modals/confirmationModal';
import { deleteAnswerById } from '../../../../services/questionServices/questionService';
import { CodeBlock, dracula } from 'react-code-blocks';


export default function QuestionAnswer() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [isCopied, setIsCopied] = useState(false);
  const [questionDetails, setQuestionDetails] = useState<any>(null);
  const [content, setContent] = useState('');
  const [placeholder, setPlaceholder] = useState('Start typing...');
  const [readonly, setReadonly] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getCompanyQuestion();
    }
  }, [id]);

  const getCompanyQuestion = async () => {
    try {
      const companyId = useAuthStore.getState().user.company?.id;
      const result = await getQuestionById(id);
      setQuestionDetails(result.data);
    } catch (error) {
      console.error('Error fetching question details: ', error);
    }
  };

  const handleCopy = () => {
    if (questionDetails) {
      const plainText = questionDetails?.description.replace(/<[^>]*>/g, '');
      navigator.clipboard
        .writeText(plainText)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => console.error('Failed to copy text: ', err));
    }
  };

  const submitHandler = async () => {
    let userId = useAuthStore.getState().user.id;
    let questionId = id;

    let data: any = {
      user_id: userId,
      question_id: questionId,
      answer_text: content,
    };

    try {
      let response = await createAnswer(data);
      setContent('')
      if (response) {
        getCompanyQuestion()
      }

      console.log('Answer created: ', response);
      // Optionally, update the UI or fetch updated question details
    } catch (error) {
      console.error('Error creating answer: ', error);
    }
  };

  const renderCode = (code: any) => {
    return (
      <pre className="whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
    );
  };

  const getDaysDifference = (createdAt: any) => {
    const today = moment();
    const createdAtMoment = moment(createdAt); // Parse createdAt as UTC to avoid timezone issues
    const daysDifference = today.diff(createdAtMoment, 'days'); // Calculate difference in days

    if (daysDifference === 0) {
      return 'today';
    } else {
      return `${daysDifference} days ago`;
    }
  };


  const deleteAnswer = (answerId: string) => {
    setSelectedAnswerId(answerId);
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedAnswerId) {
        await deleteAnswerById(selectedAnswerId);
        getCompanyQuestion();
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error deleting answer: ', error);
    }
  };

  return (
    <div className="mt-9 mb-9 ml-11 mr-11">
      <h1 className="text-2xl text-blue-950 font-bold">{questionDetails?.title || 'Loading...'}</h1>
      <h2 className="text-sm mt-4 text-blue-950 mb-3 font-semibold">
        {questionDetails && `Posted ${getDaysDifference(questionDetails?.createdAt)}`}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: questionDetails?.description || '' }} />
      <div className="mt-9 relative bg-gray-800 text-white font-mono p-4 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 focus:outline-none"
          onClick={handleCopy}
        >
          {isCopied ? 'Copied' : 'Copy Code'}
        </button>
        <CodeBlock
          text={questionDetails?.description}
          language={'text'}
          showLineNumbers={true}
          theme={dracula}
        />
      </div>
      {questionDetails?.answers.length > 0 && (
        <div className="mt-4 ml-1">
          <p className="text-xl font-semibold">{questionDetails?.answers.length} Answers </p>
          {questionDetails?.answers.map((answer: any, index: number) => (
            <div key={index} className="border border-blue-500 border-3 px-4 py-4 rounded-md mt-2 mb-2">
              <div dangerouslySetInnerHTML={{ __html: answer.answer_text || '' }} />
              <div className="flex justify-end">
                <p className="text-md font-bold mr-4">
                  Added <span className="text-blue-500">{getDaysDifference(moment(answer.createdAt))}</span>
                </p>
                <p className="text-md font-bold ml-4">
                  Answered by <span className="text-blue-500">{answer.user.name}</span>
                </p>
                {useAuthStore.getState().user.id === answer.user.id && (
                  <AiOutlineDelete
                    onClick={() => deleteAnswer(answer.id)}
                    className="ml-4 mt-1 text-red-500 cursor-pointer hover:text-red-700"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-9">
        <h2 className="text-xl font-semibold">Type your answer below</h2>
        <RichTextEditor content={content} setContent={setContent} placeholder={placeholder} readonly={readonly} />
      </div>

      <div className="flex pt-7 justify-center mt-auto mb-7">
        <button className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-300" onClick={submitHandler}>
          Upload
        </button>
      </div>


      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalVisible(false)}
      />
    </div>
  );
}
