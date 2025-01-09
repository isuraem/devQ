// // "use client";
// // import { useState, useEffect } from "react";
// // import QuestionPosted from "../components/activity-cards/question-posted";
// // import NewMember from "../components/activity-cards/new-member";
// // import MemberQuestion from "../components/activity-cards/member-question";
// // import MemberLike from "../components/activity-cards/member-like";
// // import UserUpdates from "../components/activity-cards/user-updates";
// // import useAuthStore from '../../../services/utils/authStore';
// // import { getAllActivitiesByCompanyId, getAllPrivateActivitiesByUserId } from "../../../services/activityServices/activityService";

// // export default function Activity() {

// //   const [activeButton, setActiveButton] = useState('new');
// //   const [publicActionDetails, setPublicActionDetails] = useState<any>([]);
// //   const [privateActionDetails, setPrivateActionDetails] = useState<any>([]);

// //   const handleButtonClick = (button: string) => { // Specify the type of 'button' as string
// //     setActiveButton(button);
// //   };

// //   const getButtonClasses = (button: string) => (
// //     `border border-indigo-400 font-semibold py-3 px-3 
// //     ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
// //     flex-shrink-0 rounded-md`
// //   );
// //   useEffect(() => {
// //     fetchActivities();
// //   }, []);

// //   const fetchActivities = async () => {
// //     const companyId = useAuthStore.getState().user?.company?.id;
// //     const userId = useAuthStore.getState().user?.id;

// //     if (companyId && userId) {
// //       try {
// //         const publicResult = await getAllActivitiesByCompanyId(companyId);
// //         const sortedPublicActivities = publicResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// //         setPublicActionDetails(sortedPublicActivities);

// //         const privateResult = await getAllPrivateActivitiesByUserId(userId);
// //         const sortedPrivateActivities = privateResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
// //         setPrivateActionDetails(sortedPrivateActivities);

// //       } catch (error) {
// //         console.error('Error fetching activities:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className="mt-9 px-3 ml-9 mr-9">
// //         <div className="text-2xl font-semibold mb-3 ">
// //           Your Activity
// //         </div>
// //         <div className="flex justify-between items-center pt-5">
// //           <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md ">
// //             <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
// //               New
// //             </button>

// //             <button onClick={() => handleButtonClick('today')} className={getButtonClasses('today')}>
// //               All
// //             </button>

// //             <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
// //               My Questions
// //             </button>

// //           </div>
// //         </div>
// //         <div className="mt-7 space-y-5">
// //           <>
// //             {publicActionDetails.map((publicDetails: any, index: number) => (
// //               (publicDetails.activityType == 0 ?
// //                 <QuestionPosted
// //                   key={index}
// //                   notificationText={publicDetails.notificationText}
// //                   userData={publicDetails.user}
// //                   question={publicDetails.question}
// //                   createdAt={publicDetails.createdAt}
// //                 />
// //                 :
// //                 <NewMember
// //                   userName={publicDetails.user.name}
// //                   createdAt={publicDetails.createdAt}
// //                 />)
// //             ))}
// //             {privateActionDetails.map((privateDetails: any, index: number) => (
// //               (privateDetails.activityType == 0 ?
// //                 <MemberQuestion
// //                   performedBy={privateDetails.performedBy}
// //                   userData={privateDetails.user}
// //                   question={privateDetails.question}
// //                   createdAt={privateDetails.createdAt}
// //                 />
// //                 :
// //                 <MemberLike 
// //                 performedBy={privateDetails.performedBy}
// //                 userData={privateDetails.user}
// //                 question={privateDetails.question}
// //                 createdAt={privateDetails.createdAt}
// //                 />)
// //             ))}
// //           </>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// "use client";
// import { useState, useEffect } from "react";
// import QuestionPosted from "../components/activity-cards/question-posted";
// import NewMember from "../components/activity-cards/new-member";
// import MemberQuestion from "../components/activity-cards/member-question";
// import MemberLike from "../components/activity-cards/member-like";
// import useAuthStore from '../../../services/utils/authStore';
// import { getAllActivitiesByCompanyId, getAllPrivateActivitiesByUserId } from "../../../services/activityServices/activityService";

// export default function Activity() {
//   const [activeButton, setActiveButton] = useState('new');
//   const [publicActionDetails, setPublicActionDetails] = useState<any>([]);
//   const [privateActionDetails, setPrivateActionDetails] = useState<any>([]);
//   const [displayedPublicActivities, setDisplayedPublicActivities] = useState<any>([]);
//   const [displayedPrivateActivities, setDisplayedPrivateActivities] = useState<any>([]);

//   const handleButtonClick = (button: string) => {
//     setActiveButton(button);
//     if (button === 'new') {
//       setDisplayedPublicActivities(publicActionDetails.slice(0, 3));
//       setDisplayedPrivateActivities(privateActionDetails.slice(0, 3));
//     } else if (button === 'all') {
//       setDisplayedPublicActivities(publicActionDetails);
//       setDisplayedPrivateActivities(privateActionDetails);
//     }
//   };

//   const getButtonClasses = (button: string) => (
//     `border border-indigo-400 font-semibold py-3 px-3 
//     ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
//     flex-shrink-0 rounded-md`
//   );

//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   const fetchActivities = async () => {
//     const companyId = useAuthStore.getState().user?.company?.id;
//     const userId = useAuthStore.getState().user?.id;

//     if (companyId && userId) {
//       try {
//         const publicResult = await getAllActivitiesByCompanyId(companyId);
//         const sortedPublicActivities = publicResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         setPublicActionDetails(sortedPublicActivities);
//         setDisplayedPublicActivities(sortedPublicActivities.slice(0, 5));

//         const privateResult = await getAllPrivateActivitiesByUserId(userId);
//         const sortedPrivateActivities = privateResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//         setPrivateActionDetails(sortedPrivateActivities);
//         setDisplayedPrivateActivities(sortedPrivateActivities.slice(0, 5));
//       } catch (error) {
//         console.error('Error fetching activities:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="mt-9 px-3 ml-9 mr-9">
//         <div className="text-2xl font-semibold mb-3">
//           Your Activity
//         </div>
//         <div className="flex justify-between items-center pt-5">
//           <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md">
//             <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
//               New
//             </button>

//             <button onClick={() => handleButtonClick('all')} className={getButtonClasses('all')}>
//               All
//             </button>

//             <button onClick={() => handleButtonClick('thisWeek')} className={getButtonClasses('thisWeek')}>
//               My Questions
//             </button>
//           </div>
//         </div>
//         <div className="mt-7 space-y-5">
//           <>
//             {displayedPublicActivities.map((publicDetails: any, index: number) => (
//               publicDetails.activityType == 0 ? (
//                 <QuestionPosted
//                   key={index}
//                   notificationText={publicDetails.notificationText}
//                   userData={publicDetails.user}
//                   question={publicDetails.question}
//                   createdAt={publicDetails.createdAt}
//                 />
//               ) : (
//                 <NewMember
//                   key={index}
//                   userName={publicDetails.user.name}
//                   createdAt={publicDetails.createdAt}
//                 />
//               )
//             ))}
//             {displayedPrivateActivities.map((privateDetails: any, index: number) => (
//               privateDetails.activityType == 0 ? (
//                 <MemberQuestion
//                   key={index}
//                   performedBy={privateDetails.performedBy}
//                   userData={privateDetails.user}
//                   question={privateDetails.question}
//                   createdAt={privateDetails.createdAt}
//                 />
//               ) : (
//                 <MemberLike
//                   key={index}
//                   performedBy={privateDetails.performedBy}
//                   userData={privateDetails.user}
//                   question={privateDetails.question}
//                   createdAt={privateDetails.createdAt}
//                 />
//               )
//             ))}
//           </>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import QuestionPosted from "../components/activity-cards/question-posted";
import NewMember from "../components/activity-cards/new-member";
import MemberQuestion from "../components/activity-cards/member-question";
import MemberLike from "../components/activity-cards/member-like";
import Card from '../components/question-card/questionCard';
import useAuthStore from '../../../services/utils/authStore';
import { getAllActivitiesByCompanyId, getAllPrivateActivitiesByUserId } from "../../../services/activityServices/activityService";
import { getAllQuestionRelateToUserId } from '../../../services/questionServices/questionService';
import { HiOutlineAdjustments } from "react-icons/hi";

export default function Activity() {
  const [activeButton, setActiveButton] = useState('new');
  const [publicActionDetails, setPublicActionDetails] = useState<any>([]);
  const [privateActionDetails, setPrivateActionDetails] = useState<any>([]);
  const [displayedPublicActivities, setDisplayedPublicActivities] = useState<any>([]);
  const [displayedPrivateActivities, setDisplayedPrivateActivities] = useState<any>([]);
  const [questionDetails, setQuestionDetails] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const { user } = useAuthStore();
  let user_id: any = user?.id;

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
    setCurrentPage(1);
    if (button === 'new') {
      setDisplayedPublicActivities(publicActionDetails.slice(0, 3));
      setDisplayedPrivateActivities(privateActionDetails.slice(0, 3));
    } else if (button === 'all') {
      setDisplayedPublicActivities(publicActionDetails);
      setDisplayedPrivateActivities(privateActionDetails);
    } else if (button === 'questions') {
      getCompanyQuestion();
    }
  };

  const getButtonClasses = (button: string) => (
    `border border-indigo-400 font-semibold py-3 px-3 
    ${activeButton === button ? 'bg-indigo-400 text-white' : 'bg-white text-indigo-400 hover:bg-indigo-400 hover:text-white focus:bg-indigo-400 focus:text-white'}
    flex-shrink-0 rounded-md`
  );

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const companyId = useAuthStore.getState().user?.company?.id;
    const userId = useAuthStore.getState().user?.id;

    if (companyId && userId) {
      try {
        const publicResult = await getAllActivitiesByCompanyId(companyId);
        const sortedPublicActivities = publicResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPublicActionDetails(sortedPublicActivities);
        setDisplayedPublicActivities(sortedPublicActivities.slice(0, 5));

        const privateResult = await getAllPrivateActivitiesByUserId(userId);
        const sortedPrivateActivities = privateResult.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPrivateActionDetails(sortedPrivateActivities);
        setDisplayedPrivateActivities(sortedPrivateActivities.slice(0, 5));
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    }
  };

  const getCompanyQuestion = async () => {
    const userId = useAuthStore.getState().user?.id;
    try {
      const result = await getAllQuestionRelateToUserId(userId);
      setQuestionDetails(result.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(questionDetails.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(questionDetails.length / itemsPerPage);
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

  return (
    <div>
      <div className="mt-9 px-3 ml-9 mr-9">
        <div className="text-2xl font-semibold mb-3">
          Your Activity
        </div>
        <div className="flex justify-between items-center pt-5">
          <div className="bg-white p-3 flex space-x-3 border border-indigo-400 rounded-md">
            <button onClick={() => handleButtonClick('new')} className={getButtonClasses('new')}>
              New
            </button>

            <button onClick={() => handleButtonClick('all')} className={getButtonClasses('all')}>
              All
            </button>

            <button onClick={() => handleButtonClick('questions')} className={getButtonClasses('questions')}>
              My Questions
            </button>
          </div>
        </div>
        <div className="mt-7 space-y-5">
          <>
            {activeButton !== 'questions' ? (
              <>
                {displayedPublicActivities.map((publicDetails: any, index: number) => (
                  publicDetails.activityType == 0 ? (
                    <QuestionPosted
                      key={index}
                      notificationText={publicDetails.notificationText}
                      userData={publicDetails.user}
                      question={publicDetails.question}
                      createdAt={publicDetails.createdAt}
                    />
                  ) : (
                    <NewMember
                      key={index}
                      userName={publicDetails.user.name}
                      createdAt={publicDetails.createdAt}
                    />
                  )
                ))}
                {displayedPrivateActivities.map((privateDetails: any, index: number) => (
                  privateDetails.activityType == 0 ? (
                    <MemberQuestion
                      key={index}
                      performedBy={privateDetails.performedBy}
                      userData={privateDetails.user}
                      question={privateDetails.question}
                      createdAt={privateDetails.createdAt}
                    />
                  ) : (
                    <MemberLike
                      key={index}
                      performedBy={privateDetails.performedBy}
                      userData={privateDetails.user}
                      question={privateDetails.question}
                      createdAt={privateDetails.createdAt}
                    />
                  )
                ))}
              </>
            ) : (
              <>
                {questionDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((detail: any, index: number) => (
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
            )}
          </>
        </div>
      </div>
    </div>
  );
}
