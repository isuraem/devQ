import { FaRegUser } from "react-icons/fa";

export default function UserUpdates() {
  return (
    <div className="bg-indigo-100 p-6 rounded-xl">
      <div className=" flex">
        <FaRegUser className="mr-3 text-indigo-400  text-2xl" />
        <p className="font-semibold text-blue-950">
          Your profile details were changed successfully.
        </p>
      </div>
    </div>
  );
}

