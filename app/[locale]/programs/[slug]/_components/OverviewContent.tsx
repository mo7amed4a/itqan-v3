import { getData } from "@/lib/data";
export default async function OverviewContent({
  lng,
  overview
}:{
  lng: any,
  overview: any
}) {
  let data;
  const response = await getData(`page/programs`, lng);
  data = response?.data?.page;
  return (
    data && (
      <section className="container md:max-w-[85%] mx-auto 6xl:!container px-4 py-10 md:px-0">
        {/* <h1 className="text-lg text-start md:text-2xl font-bold text-gray-500">
          {overview?.name}
        </h1> */}
        <section className="text-start pb-12 px-4">
          <p
            className="text-gray-700 w-full prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: overview?.details }}
          ></p>
        </section>
      </section>
    )
  );
}