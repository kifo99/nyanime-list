import { useUser } from "../../features/queries/user/useUserQueries.jsx";

import useAuthStore from "../../features/auth/useAuthStore.js";

export default function InitialAvatar() {
  const { userId } = useAuthStore();
  const { data: user, userIsLoading } = useUser(userId, {
    enabled: !!userId,
  });

  if (userIsLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Error loading user or profile data.</div>;
  }
  return (
    <div className="my-2 mx-auto">
      <img
        crossOrigin="anonymous"
        src={`http://localhost:8080${user.avatar}`}
        alt="Profile Picture"
        className="rounded-full w-10 h-10 m-auto"
      />
    </div>
  );
}
