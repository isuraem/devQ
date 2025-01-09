interface CollectionCardProps {
  tagName: string;
  questionCount: number;
  onHandleClick: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ tagName, questionCount, onHandleClick }) => {
  return (
    <div
      className="w-40 h-30 mx-auto my-4 p-4 border border-gray-300 rounded-xl shadow-lg"
      onClick={onHandleClick}
    >
      <div className="text-center">
        <div className="my-2 p-2 border bg-indigo-100 rounded-md shadow-sm">
          <p className="text-sm">{tagName}</p>
        </div>
        <h5>{questionCount} Questions</h5>
      </div>
    </div>
  );
};

export default CollectionCard;
