export default function MyProfile() {
  return (
    <div className="grid grid-cols-[30%_70%] gap-3 w-[80%] my-8 mx-auto bg-indigo-200 rounded-2xl">
      <div className="grid grid-rows-2 gap-2 border-r border-r-purple-950  my-8 ">
        <div className="my-8 mx-auto">
          <img
            src="https://i.pinimg.com/736x/b3/9d/79/b39d7959fb755a5461a6d7647c2b83b3.jpg"
            alt="Profile Picture"
            className="rounded-full w-[80%] m-auto"
          />
        </div>
        <div className="my-8 mx-auto">
          <h1 className="text-2xl text-start font-bold text-purple-950">
            Gambit333
          </h1>
        </div>
      </div>
      <div className="  my-8">
        <div className="grid grid-rows-2 gap-4">
          <h1 className="text- text-2xl font-bold text-purple-950">
            Biography:
          </h1>
          <p className="font-mono w-full">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
            blanditiis eveniet quo, doloremque, eaque totam nobis molestiae
            similique illum reprehenderit impedit ex possimus numquam est
            architecto ab laudantium modi atque.
          </p>
        </div>
        <div>
          <h1 className="text- text-2xl font-bold text-purple-950">Feed:</h1>
        </div>
      </div>
    </div>
  );
}
