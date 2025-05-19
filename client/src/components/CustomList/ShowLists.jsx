import PropTypes from "prop-types";
import axios from "axios";
import useAuthStore from "../../features/auth/useAuthStore";
import { useAllCustomLists } from "../../features/queries/activity/watchlist/useWatchlistQueries";

import useActivityStore from "../../features/activity/useActivityStore";

import { CircleX } from "lucide-react";

export default function ShowLists({ onSetShowLists, animeId }) {
  const { listName, setListName, resetListName } = useActivityStore();
  const { userId } = useAuthStore();

  const { data: customLists, isCustomListsLoading } = useAllCustomLists(
    userId,
    {
      enabled: !!userId,
    }
  );
  const name = customLists.length > 0 ? customLists[0].name : "";

  async function handleSelectList() {
    try {
      await axios.post(
        `http://localhost:8080/watchlist/users/${userId}/custom-list/${
          listName || name
        }/${animeId}`
      );
      onSetShowLists(false);
    } catch (error) {
      console.error(error);
    } finally {
      resetListName("");
    }
  }

  if (isCustomListsLoading) {
    console.log(isCustomListsLoading);

    return <div>Loading..</div>;
  }

  return (
    <div className="flex relative items-center justify-center ">
      <CircleX
        stroke="gray"
        className="absolute top-0 left-0 m-1.5 hover:stroke-gray-800"
        onClick={() => onSetShowLists(false)}
      />
      <div className="bg-gray-300 shadow-lg rounded-2xl p-8 w-[350px]">
        <h2 className="text-xl font-semibold mb-4 text-center">Custom Lists</h2>
        <label className="block text-gray-700 mb-1 font-bold">
          Select List
        </label>
        <select
          onChange={(e) => setListName(e.target.value)}
          value={listName || name}
          placeholder="e.g. My top 10 anime"
          className="w-full p-2 mb-4 bg-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Array.isArray(customLists) &&
            customLists.map((list) => (
              <option
                key={list._id}
                value={list.name}
                className="font-bold text-gray-800"
              >
                {list.name}
              </option>
            ))}
        </select>
        <button
          onClick={handleSelectList}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add
        </button>
      </div>
    </div>
  );
}

ShowLists.propTypes = {
  onSetShowLists: PropTypes.func,
  animeId: PropTypes.number,
};
