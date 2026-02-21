"use client";

import { useState } from "react";
import Link from "next/link";
import { T, Var, DateTime, Plural, Num, Branch } from "gt-next";
import { useTranslations } from "gt-next/client";
import { exhibitions } from "@/data/exhibitions";

type StatusFilter = "all" | "current" | "upcoming" | "past";

export default function ExhibitionsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const d = useTranslations();

  const filtered = exhibitions.filter((ex) =>
    statusFilter === "all" ? true : ex.status === statusFilter
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <T>
        <h1 className="text-3xl font-bold text-[#F5F5F5] mb-2">Exhibitions</h1>
        <p className="text-[#888] mb-8">Discover our current, upcoming, and past exhibitions.</p>
      </T>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(["all", "current", "upcoming", "past"] as StatusFilter[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === s
                ? "bg-[#C9B037] text-[#1A1A1A]"
                : "bg-[#222] text-[#999] border border-[#333] hover:border-[#C9B037]/50"
            }`}
          >
            <T>
              <Branch
                branch={s}
                all={<>All</>}
                current={<>Current</>}
                upcoming={<>Upcoming</>}
                past={<>Past</>}
              />
            </T>
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-[#666] mb-6">
        <T>
          <Plural
            n={filtered.length}
            singular={<><Num>{filtered.length}</Num> exhibition</>}
            plural={<><Num>{filtered.length}</Num> exhibitions</>}
          />
        </T>
      </p>

      {/* Exhibition Timeline */}
      <div className="space-y-6">
        {filtered.map((ex) => (
          <Link
            key={ex.id}
            href={`/exhibitions/${ex.id}`}
            className="group block bg-[#222] rounded-xl overflow-hidden border border-[#333] hover:border-[#C9B037]/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-64 h-40 md:h-auto flex-shrink-0 relative" style={{ backgroundColor: ex.color }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#222] hidden md:block" />
              </div>
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    ex.status === "current" ? "bg-[#C9B037]/20 text-[#C9B037]" :
                    ex.status === "upcoming" ? "bg-blue-500/20 text-blue-400" :
                    "bg-[#444] text-[#888]"
                  }`}>
                    <T>
                      <Branch
                        branch={ex.status}
                        current={<>Now on view</>}
                        upcoming={<>Coming soon</>}
                        past={<>Past</>}
                      />
                    </T>
                  </span>
                  {ex.audioTourAvailable && (
                    <span className="text-xs text-[#888] bg-[#333] px-2 py-1 rounded-full">
                      <T>Audio tour available</T>
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-[#F5F5F5] mb-1 group-hover:text-[#C9B037] transition-colors">{d(`exhibitions.${ex.id}.title`)}</h2>
                <p className="text-sm text-[#C9B037] mb-3">{d(`exhibitions.${ex.id}.subtitle`)}</p>
                <p className="text-sm text-[#999] mb-4 line-clamp-2">{d(`exhibitions.${ex.id}.description`)}</p>
                <T>
                  <div className="flex items-center gap-4 text-xs text-[#666]">
                    <span><DateTime>{new Date(ex.startDate)}</DateTime> — <DateTime>{new Date(ex.endDate)}</DateTime></span>
                    <span>
                      <Plural
                        n={ex.artworkIds.length}
                        singular={<><Num>{ex.artworkIds.length}</Num> artwork</>}
                        plural={<><Num>{ex.artworkIds.length}</Num> artworks</>}
                      />
                    </span>
                  </div>
                </T>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#666]">
          <T>No exhibitions match the selected filter.</T>
        </div>
      )}
    </div>
  );
}
