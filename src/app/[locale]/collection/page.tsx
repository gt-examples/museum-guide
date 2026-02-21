"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { T, Var, Num, Plural, Branch } from "gt-next";
import { useGT, useTranslations } from "gt-next/client";
import { artworks, mediums, artists } from "@/data/artworks";

export default function CollectionPage() {
  const [search, setSearch] = useState("");
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [yearRange, setYearRange] = useState<[number, number]>([1400, 2025]);

  const filtered = useMemo(() => {
    return artworks.filter((a) => {
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.artist.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedMediums.length > 0 && !selectedMediums.includes(a.medium)) return false;
      if (selectedArtist && a.artist !== selectedArtist) return false;
      if (a.year < yearRange[0] || a.year > yearRange[1]) return false;
      return true;
    });
  }, [search, selectedMediums, selectedArtist, yearRange]);

  const gt = useGT();
  const d = useTranslations();

  const toggleMedium = (m: string) => {
    setSelectedMediums((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <T>
        <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">Collection</h1>
        <p className="text-[#888] mb-8">Search and explore our full catalog of artworks.</p>
      </T>

      {/* Filters */}
      <div className="bg-[#222] rounded-xl p-6 border border-[#333] mb-8">
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={gt("Search artworks or artists...")}
            className="w-full bg-[#1A1A1A] border border-[#444] rounded-lg px-4 py-2 text-[#F5F5F5] placeholder-[#666] focus:outline-none focus:border-[#C9B037] transition-colors text-sm"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Medium Checkboxes */}
          <div>
            <T>
              <p className="text-sm text-[#C9B037] font-medium mb-2">Medium</p>
            </T>
            <div className="space-y-1">
              {mediums.map((m) => (
                <label key={m} className="flex items-center gap-2 text-sm text-[#999] cursor-pointer hover:text-[#F5F5F5] transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedMediums.includes(m)}
                    onChange={() => toggleMedium(m)}
                    className="accent-[#C9B037]"
                  />
                  <T>
                    <Branch
                      branch={m}
                      painting={<>Painting</>}
                      sculpture={<>Sculpture</>}
                      photography={<>Photography</>}
                      installation={<>Installation</>}
                    />
                  </T>
                </label>
              ))}
            </div>
          </div>

          {/* Artist Select */}
          <div>
            <T>
              <p className="text-sm text-[#C9B037] font-medium mb-2">Artist</p>
            </T>
            <select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#444] rounded-lg px-3 py-2 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C9B037] transition-colors"
            >
              <option value="">{gt("All artists")}</option>
              {artists.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Period Slider */}
          <div>
            <T>
              <p className="text-sm text-[#C9B037] font-medium mb-2">Period</p>
            </T>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666]"><Num>{yearRange[0]}</Num></span>
              <input
                type="range"
                min={1400}
                max={2025}
                value={yearRange[0]}
                onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
                className="flex-1 accent-[#C9B037]"
              />
              <input
                type="range"
                min={1400}
                max={2025}
                value={yearRange[1]}
                onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
                className="flex-1 accent-[#C9B037]"
              />
              <span className="text-xs text-[#666]"><Num>{yearRange[1]}</Num></span>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#666] mb-6">
        <T>
          <Plural
            n={filtered.length}
            singular={<><Num>{filtered.length}</Num> artwork found</>}
            plural={<><Num>{filtered.length}</Num> artworks found</>}
          />
        </T>
      </p>

      {/* Artwork Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/collection/${artwork.id}`}
            className="group bg-[#222] rounded-xl overflow-hidden border border-[#333] hover:border-[#C9B037]/50 transition-colors"
          >
            <div className="h-40 relative" style={{ backgroundColor: artwork.color }}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#F5F5F5] group-hover:text-[#C9B037] transition-colors mb-1">{d(`artworks.${artwork.id}.title`)}</h3>
              <T>
                <p className="text-sm text-[#999]"><Var>{artwork.artist}</Var>, <Num>{artwork.year}</Num></p>
                <p className="text-xs text-[#666] mt-1 capitalize">
                  <Branch
                    branch={artwork.medium}
                    painting={<>Painting</>}
                    sculpture={<>Sculpture</>}
                    photography={<>Photography</>}
                    installation={<>Installation</>}
                  />
                </p>
                <p className="text-xs text-[#555] mt-1">
                  <Num>{artwork.dimensions.width}</Num> x <Num>{artwork.dimensions.height}</Num> <Var>{artwork.dimensions.unit}</Var>
                </p>
              </T>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#666]">
          <T>No artworks match your search criteria. Try adjusting the filters.</T>
        </div>
      )}
    </div>
  );
}
