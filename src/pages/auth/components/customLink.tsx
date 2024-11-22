 
interface ICustomLink{
    title:string,
    subtitle:string,
    nav:()=>void
} 

export const CustomLink = ({title,subtitle,nav}:ICustomLink) => (
  <p className="text-sm text-gray-600">
      {title}{" "}
    <span
      onClick={nav}
      className="text-indigo-600 cursor-pointer hover:text-indigo-700"
    >
      {subtitle}
    </span>
  </p>
);
