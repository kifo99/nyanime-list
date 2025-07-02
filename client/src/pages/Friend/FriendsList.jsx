import { useFriendsList } from "../../features/queries/friendship/useFriendshipQuery.jsx";
import { useUsers } from "../../features/queries/user/useUserQueries.jsx";
import { Link, useParams } from "react-router-dom";

import InitialAvatar from "../../components/Avatar/InitialAvatar.jsx";

export default function FriendsList() {
  const { userId } = useParams();

  const { data: friends, isLoadingFriends } = useFriendsList(userId, {
    enabled: !!userId,
  });

  const userIds = friends?.map((req) => req);
  const friendsQueries = useUsers(userIds);

  if (isLoadingFriends) {
    return <div>Loading...</div>;
  }
  if (!friends || friends.length === 0) return <div>No friends</div>;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[60%] max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Friends</h1>
        <ul className="space-y-4">
          {friends.map((friend, index) => {
            const user = friendsQueries[index]?.data;
            if (!user) return <li key={friend._id}>User not found</li>;

            return (
              <li key={user._id}>
                <Link
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100"
                  to={`/user/${user._id}/profile`}
                >
                  <div className="flex-shrink-0">
                    <InitialAvatar userId={user._id} />
                  </div>
                  <div className="text-purple-600 font-medium text-lg">
                    {user.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
