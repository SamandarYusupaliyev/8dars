import { notFound } from 'next/navigation';

const getData = async (id) => {
  try {
    const res = await fetch(`https://online-json-server-api.up.railway.app/project/666153071d2cd3eb1142d145/jobs/${id}`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function Jobs({ params: { id } }) {
  const jobs = await getData(id);

  if (!jobs) {
    notFound(); // Если данные не найдены, возвращаем 404 страницу
  }

  return (
    <>
      <div className="max-container mb-[80px] sm:px-4 sm:mb-[40px]">
        <div className="bg-white flex flex-col sm:flex-row sm:w-[730px] mt-[-50px] mr-auto ml-auto rounded-[10px] shadow-lg mb-8">
          <div className="flex justify-center sm:justify-start">
            <img
              src={jobs?.logo?.slice(1)}
              alt={`${jobs.company} logo`}
              className="w-[140px] h-[150px]"
            />
          </div>
          <div className="py-[40px] px-[42px] flex flex-col justify-between">
            <div className="mb-4 sm:mr-[282px]">
              <h1 className="font-bold text-[24px] text-black mb-[13px]">
                {jobs.company}
              </h1>
              <p className="lowercase text-black opacity-70 mt-0">
                {jobs.company}.com
              </p>
            </div>
            <div className="rounded-[2px] bg-blue-200 border-0 text-blue-500 cursor-pointer btn hover:bg-blue-100">
              Company site
            </div>
          </div>
        </div>
        <div className="w-[730px] mr-auto ml-auto shadow-xl p-12 bg-white">
          <div className="flex flex-col sm:flex-row justify-between mb-[40px] items-center">
            <div>
              <p className="text-slate-600 mb-2">
                {jobs.postedAt} - {jobs.contract}
              </p>
              <h1 className="text-[28px] text-black font-bold">
                {jobs.position}
              </h1>
              <p className="text-sky-700 font-bold">{jobs.location}</p>
            </div>
            <button className="btn w-[141px] bg-sky-500 text-white text-[16px] font-bold border-0 hover:bg-sky-500 hover:opacity-70">
              Apply Now
            </button>
          </div>
          <p className="mb-10 text-slate-500 text-[16px] font-normal">
            {jobs.description}
          </p>
          <h3 className="text-black font-bold text-[20px] mb-[28px]">
            Requirements
          </h3>
          <p className="mb-10 text-slate-500 text-[16px] font-normal">
            {jobs.requirements.content}
          </p>
          <ul className="list-disc mb-12">
            {jobs.requirements.items.map((item, index) => (
              <li key={index} className="mb-2 ml-[25px]">
                <p className="text-slate-500 text-[16px] font-normal">
                  {item}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="text-black font-bold text-[20px] mb-[28px]">
            What You Will Do
          </h3>
          <p className="mb-10 text-slate-500 text-[16px] font-normal">
            {jobs.role.content}
          </p>
          <ul className="list-decimal">
            {jobs.role.items.map((item, index) => (
              <li key={index} className="mb-2 ml-[25px]">
                <p className="text-slate-500 text-[16px] font-normal">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-container py-[23px] flex flex-col items-center sm:flex-row justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="font-bold text-[20px] mb-4 text-black">
              {jobs.position}
            </h1>
            <span className="text-slate-500">So Digital Inc.</span>
          </div>
          <button className="btn w-[141px] bg-sky-500 text-white text-[16px] font-bold border-0 hover:bg-sky-500 hover:opacity-70">
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
}
