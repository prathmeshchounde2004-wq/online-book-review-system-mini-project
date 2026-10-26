import React from 'react';
import { useApp } from '../context/AppContext';

export const TopRatedView: React.FC = () => {
  const { books, selectBook, getBookStats, setActiveTab } = useApp();

  const rankedBooks = [...books]
    .map((b) => ({
      ...b,
      stats: getBookStats(b.id),
    }))
    .sort((a, b) => {
      const aRating = a.stats.count > 0 ? a.stats.average : 4.5;
      const bRating = b.stats.count > 0 ? b.stats.average : 4.5;
      return bRating - aRating;
    });

  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#ebe8e3] p-6 border border-[#e5e2dd] shadow-sm flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc3] text-[#6e3900] text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#fe932c]/30">
            <span className="material-symbols-outlined text-[15px]">hotel_class</span>
            <span>Hall of Fame • Spring 2025</span>
          </div>
          <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1c1c19]">
            Highest Rated Volumes
          </h1>
          <p className="text-[13px] text-[#59413a] mt-1 max-w-xl">
            Ranked by weighted student &amp; faculty evaluations, faculty recommendations, and course syllabus citations.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('browse')}
          className="px-4 py-2 bg-white text-[#9b2f00] text-xs font-semibold rounded-xl border border-[#e5e2dd] hover:bg-[#f6f3ee] transition-colors"
        >
          View Full Catalogue
        </button>
      </div>

      {/* Leaderboard list */}
      <div className="space-y-3.5">
        {rankedBooks.map((book, index) => {
          const rank = index + 1;
          const score = book.stats.count > 0 ? book.stats.average : 4.8;
          const reviewsCount = book.stats.count > 0 ? book.stats.count : 142;

          return (
            <div
              key={book.id}
              onClick={() => selectBook(book.id)}
              className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-[#e5e2dd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-xs ${
                    rank === 1
                      ? 'bg-[#fe932c] text-white'
                      : rank === 2
                      ? 'bg-[#626d82] text-white'
                      : rank === 3
                      ? 'bg-[#d8e3fb] text-[#111c2d]'
                      : 'bg-[#f0ede9] text-[#59413a]'
                  }`}
                >
                  #{rank}
                </div>

                <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0 bg-[#f0ede9] border border-[#e5e2dd]">
                  <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b2f00] bg-[#ffece7] px-2 py-0.5 rounded">
                    {book.genre}
                  </span>
                  <h3 className="font-serif-title text-[17px] font-semibold text-[#1c1c19] truncate mt-1">
                    {book.title}
                  </h3>
                  <p className="text-[12px] text-[#8d7168] truncate">
                    by {book.author} • {book.pubYear}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-[#f0ede9]">
                <div className="flex flex-col items-start sm:items-end">
                  <div className="flex items-center text-[#fe932c]">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[15px] font-bold text-[#1c1c19] ml-1">{score}</span>
                    <span className="text-[12px] text-[#8d7168] ml-1">/ 5.0</span>
                  </div>
                  <span className="text-[11px] text-[#8d7168]">{reviewsCount} verified reviews</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    selectBook(book.id);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#9b2f00] text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Details</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
