import { Heart } from "lucide-react";
import axios from "axios";
import * as Yup from "yup";
import { useParams } from "react-router-dom";

import StarRating from "../../components/Star/StarRating";

import useRatingStore from "../../features/activity/useActivityStore";
import useAuthStore from "../../features/auth/useAuthStore.js";
import { useGetAnime } from "../../features/queries/anime/useAnimeQueries.jsx";
import { Form, Formik, Field } from "formik";

export default function AddReview() {
  const { animeId } = useParams();
  const { rating, like, setLike, reset } = useRatingStore();
  const { userId } = useAuthStore();
  const { data: anime, animeIsLoading } = useGetAnime(animeId, {
    enabled: !!animeId,
  });

  const validationSchema = Yup.object({
    review: Yup.string().required("review is required"),
    watchedOn: Yup.date(),
    watchedBefore: Yup.boolean(),
    rating: Yup.number(),
    tags: Yup.string(),
    like: Yup.boolean(),
  });

  async function handleAdd(values, { resetForm }) {
    try {
      await axios.post(
        `http://localhost:8080/reviews/add/${userId}/${animeId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
      reset();
    }
  }

  if (animeIsLoading) {
    return (
      <div>
        <p>Anime is loading</p>
      </div>
    );
  }

  if (!anime) {
    return <div>Anime not available</div>;
  }

  console.log(rating);

  return (
    <div className="flex-row gap-2 mt-6 mb-10 w-full">
      <h1 className="font-bold text-center text-gray-600 text-3xl">
        I Watched...
      </h1>
      <div className="grid grid-cols-[30%_70%] gap-6 w-[80%] m-auto">
        <div className=" mt-4">
          <img src={anime.image} alt={anime.title || anime.japaneseTitle} />
        </div>
        <div className="w-fit mt-4">
          <div className="flex items-center">
            <h1 className="text-gray-600 font-bold text-2xl">
              {`${anime.title} ${anime.year}`}{" "}
            </h1>
          </div>
          <Formik
            initialValues={{
              watchedOn: new Date().toISOString().split("T")[0],
              watchedBefore: false,
              review: "",
              rating: 0,
              tags: "",
              like: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleAdd}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="flex justify-around w-full">
                  <div className="m-1">
                    <label
                      htmlFor="watchedOn"
                      className="m-1 text-gray-600 font-bold"
                    >
                      Watched on:
                    </label>
                    <Field
                      className="m-1 text-rose-500 font-bold"
                      type="date"
                      name="watchedOn"
                      id="watchedOn"
                    />
                  </div>

                  <div className="m-1">
                    <label
                      htmlFor="watchedBefore"
                      className="m-1 text-gray-600 font-bold"
                    >
                      Watched before:
                    </label>
                    <Field
                      type="checkbox"
                      id="watchedBefore"
                      name="watchedBefore"
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Field
                    as="textarea"
                    id="review"
                    name="review"
                    rows={10}
                    placeholder="Add review..."
                    className="w-full border-2 border-gray-500 rounded-lg h-full"
                  />
                </div>
                <div className="flex justify-center items-center w-full">
                  <div className="m-1">
                    <label htmlFor="tags" className="m-1">
                      Tags:
                    </label>
                    <Field
                      className="border rounded-lg border-gray-500"
                      type="text"
                      id="tags"
                      name="tags"
                    />
                  </div>

                  <div className="m-1 flex justify-center items-center">
                    <h2 className="m-1">Rating:</h2>
                    <StarRating
                      maxRating={5}
                      color="yellow"
                      onChange={() => setFieldValue("rating", rating)}
                    />
                  </div>

                  <div className="m-1 flex items-center min-w-[100px]">
                    <Heart
                      className=" hover:fill-red-600"
                      type="button"
                      id="like"
                      name="like"
                      color="red"
                      fill={like ? "red" : "none"}
                      onClick={() => {
                        setLike(!like);
                        setFieldValue("like", !like);
                      }}
                    />
                    <span className="ml-1">{like ? "Remove" : "Like"}</span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    className="border-2 font-bold text-2xl border-rose-500 w-[160px] h-[50px] min-w-[100px] m-2 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
