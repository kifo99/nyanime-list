import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import useAuthStore from "../../features/auth/useAuthStore";
import useActivityStore from "../../features/activity/useActivityStore";
import { CircleX } from "lucide-react";

export default function CustomList({ onSetShowCustom, onRefetchCustomList }) {
  const { listName, setListName, resetListName } = useActivityStore();
  const { userId } = useAuthStore();

  async function handleCreateList() {
    try {
      await axios.post(
        `http://localhost:8080/watchlist/users/${userId}/custom-list`,
        {
          name: listName,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      onSetShowCustom(false);
      resetListName("");
      onRefetchCustomList();
    }
  }

  return (
    <div className="flex relative items-center justify-center ">
      <CircleX
        stroke="gray"
        className="absolute top-0 left-0 m-1.5 hover:stroke-gray-800"
        onClick={() => onSetShowCustom(false)}
      />
      <div className="bg-gray-300 shadow-lg rounded-2xl p-8 w-[350px]">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create a Custom List
        </h2>
        <label className="block text-gray-700 mb-1 font-bold">List Name</label>
        <input
          onChange={(e) => setListName(e.target.value)}
          value={listName}
          placeholder="e.g. My top 10 anime"
          className="w-full p-2 mb-4 bg-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCreateList}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create
        </button>
      </div>
    </div>
  );
}

CustomList.propTypes = {
  onSetShowCustom: PropTypes.func,
  onRefetchCustomList: PropTypes.func,
};
