import { useState } from "react";
import axios from "axios";
import useAuthStore from "../../features/auth/useAuthStore";

export default function CustomList() {
  const [name, setName] = useState("");
  const { userId } = useAuthStore();

  async function handleCreateList() {
    try {
      await axios.post(
        `http://localhost:8080/watchlist/users/${userId}/custom-list`,
        {
          name,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setName("");
    }
  }
  return (
    <div className="flex h-screen ">
      <div className="grid grid-rows-3 text-start h-[300px] w-[350px] m-auto">
        <label>List Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="ex My top 10 anime"
        />
        <button onClick={handleCreateList}>Create</button>
      </div>
    </div>
  );
}
