import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch("https://online-json-server-api.up.railway.app/project/666153071d2cd3eb1142d145/jobs");
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
}

export default async function Home() {
  const { data, error } = await getData();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-[-50px] w-full">
      <div className="max-container bg-white rounded-[10px]">
        <div className="flex flex-col lg:flex-row justify-between py-[28px] px-[32px]">
          <div className="flex items-center mb-4 lg:mb-0">
            <FaSearch className="w-[24px] h-[24px] mr-4 text-sky-600" />
            <input
              className="placeholder:text-[16px] w-full lg:w-[312px] bg-white focus:outline-none"
              type="text"
              name="filter-title"
              id="filter-title"
              placeholder="Filter by title, companies, expertise…"
            />
          </div>
          <div className="flex items-center mb-4 lg:mb-0 px-[23px]">
            <FaLocationDot className="w-[24px] h-[24px] mr-4 text-sky-600" />
            <input
              className="bg-white focus:outline-none w-full lg:w-auto"
              type="text"
              name="filter-locations"
              id="filter-locations"
              placeholder="Filter by location…"
            />
          </div>
          <div className="flex items-center">
            <input
              className="w-6 h-6 bg-white mr-4"
              type="checkbox"
              name="checkbox"
              id="checkbox"
            />
            <span className="text-[16px] font-bold mr-[26px]">Full Time Only</span>
            <button className="btn w-full lg:w-[123px] bg-sky-400 rounded-lg text-white hover:opacity-70 hover:bg-sky-400">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="max-container mt-[80px]">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {data.map((item) => (
            <li key={item.id} className="bg-slate-300 w-full lg:w-[350px] h-[253px] p-8 rounded-[12px]">
              <img src={item.logo} alt={`${item.company} logo`} className={`mt-[-58px] mb-6 bg-[${item.logoBackground}]`} />
              <div className="flex flex-col">
                <span className="mb-4 text-slate-500">
                  {item.postedAt} - {item.contract}
                </span>
                <Link href={`/jobs/${item.id}`} className="mb-[17px] font-bold text-black text-[20px] hover:opacity-70">
                  {item.position}
                </Link>
                <span className="text-slate-500 mb-[44px]">{item.company}</span>
                <p className="text-sky-600">{item.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
