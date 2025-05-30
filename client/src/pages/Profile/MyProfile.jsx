import { useProfile } from "../../features/queries/profile/useProfileQueries";
import { useUser } from "../../features/queries/user/useUserQueries.jsx";

import useAuthStore from "../../features/auth/useAuthStore.js";

import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { userId } = useAuthStore();
  const { data: profile, profileIsLoading } = useProfile(userId, {
    enabled: !!userId,
  });
  const { data: user, userIsLoading } = useUser(userId, {
    enabled: !!userId,
  });

  const navigate = useNavigate();

  if (profileIsLoading || userIsLoading) {
    return <div>Loading...</div>;
  }
  if (!user || !profile) {
    return <div>Error loading user or profile data.</div>;
  }

  return (
    <div className="grid grid-cols-[30%_70%] gap-3 w-[80%] my-8 mx-auto bg-indigo-200 rounded-2xl">
      <div className="flex flex-col gap-2 border-r border-r-purple-950  my-2 ">
        <div className="my-2 mx-auto">
          {console.log(user.avatar)}
          <img
            src={`http://localhost:8080/${user.avatar}`}
            alt="Profile Picture"
            className="rounded-full w-[80%] m-auto"
          />
        </div>

        <div className="flex flex-col gap-1 my-2 mx-5">
          <h1 className="text-2xl text-start font-bold text-purple-950 my-1">
            {user.name}
          </h1>
          <h1 className="text-2xl text-start font-bold text-purple-950 my-1">
            Custom Lists:
          </h1>
          <div>
            {profile.customLists.length > 0
              ? profile.customLists.map((list) => (
                  <li
                    className="list-none text-purple-950 font-bold border-b border-b-purple-950 py-2 my-1 hover:text-purple-700 hover:border-b-purple-700 hover:text-xl"
                    key={list._id}
                    onClick={() => navigate(`/custom-list/${list.name}`)}
                  >
                    {list.name}
                  </li>
                ))
              : "..."}
          </div>
        </div>
      </div>
      <div className="my-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-2xl font-bold text-purple-950">Biography:</h1>
          <p className="font-mono text-[13px] sm:text-[14px] md:text-[15px] tracking-tight leading-tight break-words whitespace-normal max-w-[90%]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
            blanditiis eveniet quo, doloremque, eaque totam nobis molestiae
            similique illum reprehenderit impedit ex possimus numquam est
            architecto ab laudantium modi atque.
          </p>
        </div>

        <div className="mt-6">
          <h1 className="text-2xl font-bold text-purple-950">Feed:</h1>
        </div>
      </div>
    </div>
  );
}
