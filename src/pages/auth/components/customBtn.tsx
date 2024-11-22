interface ICustomBtn {
  title: string;
}

export const CustomBtn = ({ title }: ICustomBtn) => (
  <button
    type="submit"
    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md
      hover:bg-indigo-700 focus:outline-none 
     focus:ring-2 focus:ring-indigo-500"
  >
    {title}
  </button>
);
