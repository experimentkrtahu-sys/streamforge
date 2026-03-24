import { HeroCarousel } from "@/components/show/hero-carousel";
import { ShowRail } from "@/components/show/show-rail";
import { getHomepageData } from "@/modules/shows/queries";

export default async function HomePage() {
  const data = await getHomepageData();
  return (
    <div className="container-page py-6 space-y-8">
      <HeroCarousel shows={data.hero} />
      <ShowRail title="Trending now" shows={data.trending} />
      <ShowRail title="Latest releases" shows={data.latest} />
      <ShowRail title="Recently added" shows={data.recent} />
      <ShowRail title="Top rated" shows={data.topRated} />
      {data.genreRows.map((row) => (
        <ShowRail key={row.name} title={row.name} shows={row.shows} />
      ))}
    </div>
  );
}
