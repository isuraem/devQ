"use client"
import { useState, useEffect } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import CollectionCard from '../components/collection-card/collectionCard';
import { getAllTagsByCompanyId } from '../../../services/tagServices/tagService';
import useAuthStore from '../../../services/utils/authStore';
import { useRouter } from 'next/navigation';

const CARDS_PER_PAGE = 15; // Define how many cards to display per page

export default function Collections() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tags, setTags] = useState<any>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();

  useEffect(() => {
    const getCompanyTags = async () => {
      try {
        const companyId = useAuthStore.getState().user.company?.id;
        const result = await getAllTagsByCompanyId(companyId);
        console.log("data:", result.data)
        let sortedTags: any = [...result.data];

        // Filter out tags with questionCount <= 0
        sortedTags = sortedTags.filter((tag: { questions: string | any[]; }) => tag.questions.length > 0);

        // Sort by name based on sortDirection
        sortedTags.sort((a: any, b: any) => {
          if (sortDirection === 'desc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });

        setTags(sortedTags);
      } catch (error) {
        console.error('Error fetching tags: ', error);
      }
    };

    getCompanyTags();
  }, [sortDirection]);

  const handleSort = () => {
    // Toggle between 'asc' and 'desc' when sorting
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const paginatedTags = tags.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE);

  const handleTagClick = (tagName: string) => {
    router.push(`/collections/questions?tagName=${tagName}`);
  };

  return (
    <div className="m-11">
      <h1 className="text-2xl font-semibold mb-7">All Collections</h1>
      <div className="flex mb-7">
        <p className="w-fit text-indigo-400 mr-2">Collections</p>
        <FaExchangeAlt
          className={`mt-1 text-${sortDirection === 'asc' ? 'blue-400' : 'indigo-400'} transform rotate-90 cursor-pointer`}
          onClick={handleSort}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedTags.length > 0 ? (
          paginatedTags.map((tag: any, index: number) => (
            <div key={index}>
              <CollectionCard
                tagName={tag.name}
                questionCount={tag.questions.length}
                onHandleClick={() => handleTagClick(tag.name)}
              />
            </div>

          ))
        ) : (
          <div className="text-gray-500">No collections to display.</div>
        )}
      </div>
      {tags.length > CARDS_PER_PAGE && (
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(tags.length / CARDS_PER_PAGE))].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-indigo-400 text-white' : 'bg-white border border-indigo-400 text-indigo-400'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
