import useFriendshipStore from "../../features/friends/useFriendshipStore";

export default function AddFriend() {
  const { isOpened } = useFriendshipStore();

  return (
    <div>
      {isOpened && (
        <div>
          <p>Opened</p>
        </div>
      )}
    </div>
  );
}
