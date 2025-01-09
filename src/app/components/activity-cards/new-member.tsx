import { FaRegSmile } from "react-icons/fa";
import moment from 'moment';

interface NewMemberProps {
  userName: string;
  createdAt: string;
}

export default function NewMember({ userName, createdAt }: NewMemberProps) {
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
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FaRegSmile className="mr-3 text-indigo-400 text-2xl" />
          <p className="font-semibold text-blue-950">
            New member joined: {userName}!
          </p>
        </div>
        <p className="text-gray-600">{timeDifference}</p>
      </div>
    </div>
  );
}
