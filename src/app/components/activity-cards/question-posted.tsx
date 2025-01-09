import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
import useAuthStore from '../../../../services/utils/authStore';
import moment from 'moment';
import { useRouter } from "next/navigation";

interface User {
  email: string;
  id: number;
  name: string;
  role: number;
}

interface QuestionDetails {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  likecount: number;
  status: boolean;
}

interface QuestionPostedProps {
  notificationText: string;
  userData: User;
  question: QuestionDetails;
  createdAt: Date;
}

export default function QuestionPosted({ notificationText, userData, question, createdAt }: QuestionPostedProps) {
  const { user } = useAuthStore();
  let user_id: any = user?.id;

  const router = useRouter();

  const handleCardClick = () => {
      router.push(`/questions/answer-question?id=${question.id}`);
  };
  const now = moment();
  const createdAtMoment = moment(createdAt);
  const minutesDifference = now.diff(createdAtMoment, 'minutes');
  const hoursDifference = now.diff(createdAtMoment, 'hours');

  let timeDifference;
  if (hoursDifference < 1) {
    timeDifference = `${minutesDifference} minutes ago`;
  } else if (hoursDifference < 24) {
    timeDifference = `${hoursDifference} hours ago`;
  } else {
    timeDifference = createdAtMoment.fromNow();
  }


  return (
    <div className="bg-indigo-100 p-6 rounded-xl">
      <div className="flex justify-between">
        <div className="flex">
          <FaRegMessage className="mr-3 text-indigo-400 mb-2 text-2xl" />
          {userData.id == user_id ?
            <p className="font-semibold text-blue-950 mb-6">Your question was added successfully</p>
            :
            <p className="font-semibold text-blue-950 mb-6">
              New question added by {userData.name}
            </p>
          }
        </div>
        <p className="text-gray-600">{timeDifference}</p>
      </div>
      <div
        className="text-red-400 border p-3 rounded-xl border-red-400 hover:bg-white w-fit"
        onClick={handleCardClick}
      >
        View Question
      </div>
    </div>
  );

}