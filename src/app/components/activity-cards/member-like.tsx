import { LuMessagesSquare } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import moment from 'moment';
interface User {
  email: string;
  id: number;
  name: string;
  role: number;
}

interface PerformedBy {
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
  userData: User;
  performedBy: PerformedBy;
  question: QuestionDetails;
  createdAt: Date;
}

export default function MemberLike({ userData, question, createdAt, performedBy }: QuestionPostedProps) {
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
      <div className=" flex">
        <GoHeart className="mr-3 text-indigo-400  text-2xl" />
        <div className="flex flex-row justify-between w-full">
          <p className="font-semibold text-blue-950">
            {performedBy.name} Liked your question.
          </p>
          <p className="text-gray-600">{timeDifference}</p>
        </div>

      </div>
    </div>
  );
}
