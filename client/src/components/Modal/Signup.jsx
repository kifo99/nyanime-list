export default function Signup() {
  return (
    <div className="bg-gray-100 rounded-lg shadow-lg w-4xl shadow-amber-50 hidden">
      <h1 className="text-amber-300 font-bold mb-4">Sign Up</h1>
      <form className=" space-y-4 ">
        <input
          type="text"
          name="name"
          placeholder=" Name"
          className=" w-full h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
        <input
          type="email"
          name="email"
          placeholder=" Email"
          className=" w-full h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
        <input
          type="password"
          name="password"
          placeholder=" Password"
          className=" w-full h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
        <input
          type="text"
          name="avatar"
          className=" w-full h-11 rounded-lg bg-amber-200 text-amber-800 border-none focus:border-amber-800  focus:ring-amber-800 focus:ring-2 outline-none focus:bg-amber-300 "
        />
      </form>
    </div>
  );
}
