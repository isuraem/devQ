import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { likeAQuestion, unlikeAQuestion } from "../../../../services/questionServices/questionService";

interface User {
    email: string;
    id: number;
    name: string;
    role: number;
}
interface CardProps {
    questionId: string;
    questionTitle: string;
    answerCount: number;
    tags: string[];
    likes: { id: number, user: User }[];
    user: User;
    currentUser: string;
    refreshQuestions: () => void;
}

const QuestionCard: React.FC<CardProps> = ({ questionId, questionTitle, tags, user, answerCount, likes, currentUser, refreshQuestions}) => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/questions/answer-question?id=${questionId}`);
    };

    const handleTheLikeButton = async () => {
        console.log("New data", currentUser, questionId)
        let result = await likeAQuestion(currentUser, questionId);

        if (result) {
            console.log("data")
            refreshQuestions()
        }
    }

    const handleTheDisLikeButton = async () => {
        console.log("New data", currentUser, questionId)
        let result = await unlikeAQuestion(currentUser, questionId);

        if (result) {
            console.log("data")
            refreshQuestions()
        }
    }

    const userHasLiked = likes.some(like => like.user.id === parseInt(currentUser));

    return (
        <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md mb-3"

        >
            <div className="mb-2 text-lg font-medium text-blue-950" onClick={handleCardClick}>
                <Link href="./questions/answer-question">
                    {questionTitle}
                </Link>
            </div>
            <div className="flex items-center mb-4">
                {tags.length > 0 && tags.map((tag: any, index: number) => (
                    <span key={index} className="px-2 py-1 mr-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded">{tag.name}</span>
                ))}
            </div>
            <div className="flex justify-between items-center text-gray-500">
                <div className="flex flex-row">
                    <div className="flex items-center">
                        <FaRegComment className="mr-1" />
                        {answerCount}
                    </div>
                    {/* {!userHasLiked && (
                        <div className="flex items-center ml-2" onClick={handleTheLikeButton}>
                            <BiLike className={`mr-1`} />
                            {likes.length > 0 ? likes.length : 0}
                        </div>
                    )} */}

                    {userHasLiked ? (
                        <div className="flex items-center ml-2" onClick={handleTheDisLikeButton}>
                            <BiSolidLike className={`mr-1 ${userHasLiked ? 'text-red-500' : ''}`} />
                            {likes.length > 0 ? likes.length : 0}
                        </div>
                    ) : (
                        <div className="flex items-center ml-2" onClick={handleTheLikeButton}>
                            <BiLike className={`mr-1`} />
                            {likes.length > 0 ? likes.length : 0}
                        </div>
                    )
                    }

                </div>
                <div className="flex items-center">
                    <div className="bg-[#211951] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-blue-950">{user.name}</span>
                </div>
            </div>
        </div>
    );
}
export default QuestionCard;