export default function MyProfile() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="bg-amber-400 w-1/3 m-1">
        <div>Profile pic</div>
        <div>User info</div>
      </div>
      <div className="bg-rose-500 w-2/3 m-1">Feed</div>
    </div>
  );
}
