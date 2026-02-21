import Link from "next/link";
import { T, Var, Num, DateTime, Plural } from "gt-next";
import { getTranslations } from "gt-next/server";
import { exhibitions } from "@/data/exhibitions";
import { artworks } from "@/data/artworks";

const currentExhibitions = exhibitions.filter((e) => e.status === "current");
const featuredArtwork = artworks[0];

export default async function HomePage() {
  const d = await getTranslations();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] py-28 px-4">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #C9B037 0%, transparent 50%)" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <T>
            <p className="text-[#C9B037] text-sm font-medium tracking-widest uppercase mb-4">Meridian Museum of Contemporary Art</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#F5F5F5]">Discover. Reflect. Connect.</h1>
            <p className="text-lg md:text-xl text-[#AAA] mb-10 max-w-2xl mx-auto">
              Explore our world-class collection of contemporary art spanning painting, sculpture, photography, and installation.
            </p>
          </T>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/exhibitions" className="bg-[#C9B037] text-[#1A1A1A] font-semibold px-8 py-3 rounded-lg hover:bg-[#D4BE4A] transition-colors">
              <T>View Exhibitions</T>
            </Link>
            <Link href="/collection" className="border border-[#C9B037] text-[#C9B037] font-semibold px-8 py-3 rounded-lg hover:bg-[#C9B037]/10 transition-colors">
              <T>Browse Collection</T>
            </Link>
          </div>
        </div>
      </section>

      {/* Current Exhibitions */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <T>
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">Current Exhibitions</h2>
          <p className="text-[#888] mb-8">
            <Plural n={currentExhibitions.length}
              singular={<><Num>{currentExhibitions.length}</Num> exhibition now on view</>}
              plural={<><Num>{currentExhibitions.length}</Num> exhibitions now on view</>}
            />
          </p>
        </T>
        <div className="grid md:grid-cols-2 gap-6">
          {currentExhibitions.map((ex) => (
            <Link key={ex.id} href={`/exhibitions/${ex.id}`}
              className="group bg-[#222] rounded-xl overflow-hidden border border-[#333] hover:border-[#C9B037]/50 transition-colors">
              <div className="h-48 relative" style={{ backgroundColor: ex.color }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-1 group-hover:text-[#C9B037] transition-colors">{d(`exhibitions.${ex.id}.title`)}</h3>
                <p className="text-sm text-[#C9B037] mb-3">{d(`exhibitions.${ex.id}.subtitle`)}</p>
                <p className="text-sm text-[#999] mb-4 line-clamp-2">{d(`exhibitions.${ex.id}.description`)}</p>
                <p className="text-xs text-[#666]">
                  <T>
                    <DateTime>{new Date(ex.startDate)}</DateTime> — <DateTime>{new Date(ex.endDate)}</DateTime>
                  </T>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Artwork */}
      <section className="bg-[#222] py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-lg flex-shrink-0" style={{ backgroundColor: featuredArtwork.color }} />
          <div>
            <T>
              <p className="text-sm text-[#C9B037] font-medium mb-2">Featured Artwork</p>
            </T>
            <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">{d(`artworks.${featuredArtwork.id}.title`)}</h2>
            <p className="text-sm text-[#AAA] mb-1">
              <Var>{featuredArtwork.artist}</Var>, <Num>{featuredArtwork.year}</Num>
            </p>
            <p className="text-[#999] mb-3 line-clamp-3">{d(`artworks.${featuredArtwork.id}.description`)}</p>
            <p className="text-xs text-[#666]">
              <Num>{featuredArtwork.dimensions.width}</Num> x <Num>{featuredArtwork.dimensions.height}</Num> {featuredArtwork.dimensions.unit}
            </p>
            <Link href={`/collection/${featuredArtwork.id}`} className="inline-block mt-4 text-sm text-[#C9B037] hover:underline">
              <T>View artwork details</T>
            </Link>
          </div>
        </div>
      </section>

      {/* Visitor Info */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <T>
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-8 text-center">Visitor Information</h2>
        </T>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#222] rounded-xl p-6 border border-[#333]">
            <T>
              <h3 className="text-[#C9B037] font-semibold mb-3">Hours</h3>
              <p className="text-sm text-[#999]">Tuesday — Sunday</p>
              <p className="text-sm text-[#999]">10:00 AM — 6:00 PM</p>
              <p className="text-sm text-[#999] mt-2">Closed Mondays</p>
            </T>
          </div>
          <div className="bg-[#222] rounded-xl p-6 border border-[#333]">
            <T>
              <h3 className="text-[#C9B037] font-semibold mb-3">Admission</h3>
              <p className="text-sm text-[#999]">Adults: $18</p>
              <p className="text-sm text-[#999]">Students and Seniors: $12</p>
              <p className="text-sm text-[#999]">Members: Free</p>
              <p className="text-sm text-[#999] mt-2">Free admission every first Friday</p>
            </T>
          </div>
          <div className="bg-[#222] rounded-xl p-6 border border-[#333]">
            <T>
              <h3 className="text-[#C9B037] font-semibold mb-3">Location</h3>
              <p className="text-sm text-[#999]">1200 Museum Boulevard</p>
              <p className="text-sm text-[#999]">Arts District</p>
              <p className="text-sm text-[#999] mt-2">Accessible by public transit</p>
            </T>
          </div>
        </div>
      </section>
    </div>
  );
}
