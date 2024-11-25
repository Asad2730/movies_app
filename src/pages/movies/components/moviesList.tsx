import { useSelector } from "react-redux";
import { IResult } from "../interface/data";
import { FaRegHeart } from "react-icons/fa";
import { IUser } from "../interface/user";

interface IMoviesList {
  data: IResult[];
  handleNavigate: (item: IResult) => void;
  addToFavorite?: (item: IResult, token: string,userId:string) => Promise<void>;
  view: string;
}

export const MoviesList = ({
  data,
  handleNavigate,
  addToFavorite,
  view,
}: IMoviesList) => {
  const user:IUser = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);

  return (
    <div className={`grid ${view === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-4`}>
      {data.map((item: IResult, index: number) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between border border-gray-200"
        >
          <div className="relative w-full h-48 overflow-hidden rounded-lg">
            <img
              src={item.artworkUrl100.replace("100x100", "600x600")}
              alt={item.trackName}
              className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
            />
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold text-gray-900 truncate">{item.trackName}</h3>
            <p className="text-sm text-gray-500">{item.primaryGenreName}</p>
          </div>

          <p className="text-md font-semibold text-gray-700 text-center mt-2">
            {item.trackPrice ? `$${item.trackPrice}` : "Free"}
          </p>

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-2">
            <button
              onClick={() => handleNavigate(item)}
              className="w-full md:w-auto bg-green-500 text-white md:px-5 md:py-2 rounded-lg font-medium shadow-md"
            >
              Details
            </button>

            {token && addToFavorite && (
              <button
                onClick={() => addToFavorite(item, token,user._id)}
                className="w-full md:w-auto text-red-500 text-2xl"
                title="Add to Favorites"
              >
                <FaRegHeart />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
