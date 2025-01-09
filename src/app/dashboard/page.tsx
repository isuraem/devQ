"use client";
import { useState, useEffect } from 'react';
import { HiOutlineAdjustments } from "react-icons/hi";
import Card from '../components/question-card/questionCard';
import { getAllQuestionByUserId } from '../../../services/questionServices/questionService';
import useAuthStore from '../../../services/utils/authStore';

export default function Home() {
  const [activeButton, setActiveButton] = useState('all');
  const [questionDetails, setQuestionDetails] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { user } = useAuthStore();
  let user_id : any = user?.id;

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setCurrentPage(1);
  };

  const getButtonClasses = (button: string) => (
    `border border-indigo-400 font-semibold py-3 px-3 
    ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
    flex-shrink-0 rounded-md`
  );

  const getActiveText = () => {
    switch (activeButton) {
      case 'all':
        return 'All Questions';
      case 'new':
        return 'New Questions';
      case 'today':
        return 'Today\'s Top Selected';
      case 'thisWeek':
        return 'This Week\'s Questions';
      case 'thisMonth':
        return 'This Month\'s Questions';
      default:
        return '';
    }
  };

  useEffect(() => {
    getCompanyQuestion();
  }, []);

  const getCompanyQuestion = async () => {
    let userId = useAuthStore.getState().user?.id;
    console.log("data", userId);
    const result = await getAllQuestionByUserId(userId);
    setQuestionDetails(result.data);
    console.log("data", result.data);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filterQuestions().length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filterQuestions().length / itemsPerPage);
    if (totalPages <= 1) return null; 
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${i === currentPage ? 'bg-indigo-400 text-white' : 'bg-white border border-indigo-400 text-indigo-400'}`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="flex justify-center items-center space-x-1">
        <button
          onClick={handlePreviousPage}
          className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border border-indigo-400 text-indigo-400'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages}
        <button
          onClick={handleNextPage}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border border-indigo-400 text-indigo-400'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  const filterQuestions = () => {
    const now = new Date();
    switch (activeButton) {
      case 'today':
        return questionDetails.filter((q: { createdAt: string | number | Date; }) => new Date(q.createdAt).toDateString() === now.toDateString());
      case 'thisWeek':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return questionDetails.filter((q: { createdAt: string | number | Date; }) => new Date(q.createdAt) >= oneWeekAgo);
      case 'thisMonth':
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return questionDetails.filter((q: { createdAt: string | number | Date; }) => new Date(q.createdAt) >= oneMonthAgo);
      case 'new':
        return questionDetails.slice(0, 8);  // Return only the first 8 questions
      case 'all':
      default:
        return questionDetails;
    }
  };

  const filteredQuestions = filterQuestions();
  const currentItems = filteredQuestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full overflow-x-auto"> {/* Allow horizontal scroll on small screens */}
      <div className="mt-9 px-3 ml-9">
        <div className="text-2xl font-semibold mb-3">
          {getActiveText()}
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md flex-shrink-0 mr-9">
            <button onClick={() => handleButtonClick('all')} className={getButtonClasses('all')}>
              All
            </button>

            <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
              New
            </button>

            <button onClick={() => handleButtonClick('today')} className={getButtonClasses('today')}>
              Today
            </button>

            <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
              This week
            </button>

            <button onClick={() => handleButtonClick('thisMonth')} className={getButtonClasses('thisMonth')}>
              This month
            </button>

            <button onClick={() => handleButtonClick('adjustments')} className="flex-shrink-0">
              <HiOutlineAdjustments className={`text-5xl p-2 rounded ${activeButton === 'adjustments' ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 '}flex-shrink-0`} />
            </button>
          </div>
          <div className="mr-9 font-semibold flex-shrink-0">
            <a className="bg-red-400 text-white py-3 px-5 rounded-md hover:bg-red-300" href="/questions/ask-question">
              Ask Question
            </a>
          </div>
        </div>
      </div>
      <div className='mt-8 px-8'>
        {currentItems.length > 0 ? (
          <>
            {currentItems.map((detail: any, index: number) => (
              <Card
                key={index}
                questionId={detail.id}
                questionTitle={detail.title}
                tags={detail.tags}
                user={detail.user}
                answerCount={detail.answers.length}
                likes={detail.likes}
                currentUser={user_id}
                refreshQuestions={getCompanyQuestion}
              />
            ))}
            <div className="flex justify-center mt-4">
              {renderPagination()}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            No questions to display.
          </div>
        )}
      </div>
    </div>
  );
}
