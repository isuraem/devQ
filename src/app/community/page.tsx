"use client";
import { useState, useEffect } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Card from "../components/user-card/userCard";
import Modal from "../components/modals/inviteUserModal";
import { getAllUsersByCompanyId } from "../../../services/companyServices/companyService";
import useAuthStore from "../../../services/utils/authStore";

interface User {
  position: string;
  email: string;
  id: number;
  name: string;
  role: number;
}

function Community() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorted, setSorted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardsData, setCardsData] = useState<User[]>([]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Search triggered");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleInviteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSort = () => {
    setSorted(!sorted);
  };

  const filteredCards = cardsData
    .filter((card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sorted ? a.name.localeCompare(b.name) : 0));

  useEffect(() => {
    getCompanyQuestion();
  }, []);

  const getCompanyQuestion = async () => {
    let companyId = useAuthStore.getState().user.company?.id;
    const result = await getAllUsersByCompanyId(companyId);
    setCardsData(result.data.users);
    console.log("data", result.data);
  };

  return (
    <div className="mt-9 ml-11 mr-11">
      <p className="text-2xl font-semibold">All members</p>
      <div className="mt-3 flex flex-row justify-between w-full flex-wrap">
        <div className="flex flex-row gap-2 items-center flex-wrap">
          <p className="w-fit text-indigo-400">Name</p>
          <FaExchangeAlt
            className="text-indigo-400 transform rotate-90 cursor-pointer mr-3"
            onClick={handleSort}
          />
          <div className="relative flex-grow max-w-sm min-w-[200px]">
            <input
              type="text"
              placeholder="Search members"
              className="border border-gray-600 rounded-full py-2 px-4 outline-none bg-white text-blue-950 pr-10 pl-10 w-full"
              onKeyPress={handleKeyPress}
              onChange={handleChange}
            />
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950 text-2xl cursor-pointer" />
          </div>
        </div>
        <div className="font-semibold flex-shrink-0 mt-3 sm:mt-0 min-w-[100px]">
          <button
            className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-300"
            onClick={handleInviteClick}
          >
            Invite
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-7 mt-4 ">
        {filteredCards.map((card, index) => (
          <Card
            key={index}
            name={card.name}
            email={card.email}
            position={card.position}
            userID={card.id}
            role={card.role}
            refreshUser={getCompanyQuestion}
          />
        ))}
      </div>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        refreshUser={getCompanyQuestion}
      />
    </div>
  );
}

export default Community;
