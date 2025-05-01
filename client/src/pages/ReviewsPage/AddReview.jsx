import { Heart, Star, StarHalf } from "lucide-react";

export default function AddReview() {
  return (
    <div className="flex-row gap-2 mt-6 w-full">
      <h1 className="font-bold text-center text-3xl text-rose-600 mt-4">
        I Watched...
      </h1>
      <div className="grid grid-cols-[30%_70%] gap-6 w-[80%] m-auto">
        <div className=" mt-4">
          <img
            src="https://cdn.myanimelist.net/images/anime/4/19644.jpg"
            alt="Image"
          />
        </div>
        <div className="w-fit mt-4">
          <div>
            <h2>Title 2025</h2>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="m-1">
              <label>Watched on </label>
              <input type="date" id="watchedOn" name="watchedOn" />
            </div>

            <div className="m-1">
              <label>Watched Before </label>
              <input type="checkbox" id="watchedBefore" name="watchedBefore" />
            </div>
          </div>
          <div>
            <textarea
              id="review"
              name="review"
              rows={10}
              placeholder="Add review..."
              className="w-full border-2 border-gray-500 rounded-lg h-full"
            ></textarea>
          </div>
          <div className="flex justify-center items-center w-full">
            <div className="m-1">
              <label>Tags</label>
              <input
                className="border rounded-lg border-gray-500"
                type="text"
                id="tags"
                name="tags"
              />
            </div>

            <div className="m-1">
              <label>Rating</label>
              <input
                className="border rounded-lg border-gray-500"
                type="number"
                id="rating"
                name="rating"
              />
            </div>

            <div className="m-1">
              <h2>Like</h2>
              <button id="like" name="like">
                <Heart color="red" fill="red" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button>Add</button>
      </div>
    </div>
  );
}
