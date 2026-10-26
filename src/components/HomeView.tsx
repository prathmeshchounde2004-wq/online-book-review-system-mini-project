import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const {
    books,
    selectBook,
    setActiveTab,
    setSearchQuery,
    setSelectedGenre,
    getBookStats,
    setShowJavaModal,
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');
  const [activeShelf, setActiveShelf] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setActiveTab('browse');
    }
  };

  const handleShelfClick = (genre: string) => {
    setActiveShelf(genre);
    setSelectedGenre(genre === 'all' ? 'all' : genre);
  };

  // Get top 3 featured books
  const featuredBooks = books.slice(0, 3);

  // Compute top 3 highest rated books for Hall of Fame
  const rankedBooks = [...books]
    .map((b) => ({
      ...b,
      stats: getBookStats(b.id),
    }))
    .sort((a, b) => (b.stats.average || 4.5) - (a.stats.average || 4.5))
    .slice(0, 3);

  return (
    <div className="flex flex-col w-full gap-6 pb-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-[#ebe8e3] p-6 sm:p-8 shadow-sm border border-[#e5e2dd]">
        <div className="absolute -right-10 -bottom-10 w-52 h-52 rounded-full bg-[#fe932c]/15 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#f0ede9] text-[#9b2f00] text-[11px] font-bold tracking-wider uppercase border border-[#e5e2dd]">
            <span className="material-symbols-outlined text-[15px]">auto_stories</span>
            <span>Academic Reading Forum</span>
          </div>

          <h1 className="font-serif-title text-2xl sm:text-4xl text-[#1c1c19] tracking-tight font-bold leading-tight">
            Discover Your Next Favourite Book
          </h1>

          <p className="text-[14px] sm:text-[15px] text-[#59413a] leading-relaxed">
            Explore literary masterpieces, curated academic readings, and candid student &amp; faculty
            reviews.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-2 flex flex-col sm:flex-row gap-2 w-full bg-white p-2 rounded-xl shadow-sm border border-[#e5e2dd]"
          >
            <div className="flex items-center flex-1 px-3 gap-2 min-h-[44px]">
              <span className="material-symbols-outlined text-[#8d7168] text-[20px] shrink-0">
                search
              </span>
              <input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full bg-transparent text-[14px] text-[#1c1c19] placeholder:text-[#8d7168] focus:outline-none min-w-0"
                placeholder="Search by title, author, or ISBN..."
                type="text"
              />
            </div>
            <button
              className="flex items-center justify-center gap-1.5 bg-[#c2410c] hover:bg-[#9b2f00] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors shrink-0 shadow-sm active:translate-y-px"
              type="submit"
            >
              <span>Find Book</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </form>
        </div>
      </section>

      {/* Genre Filter Pills */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider">
            Curated Shelves
          </span>
          <button
            onClick={() => {
              setSelectedGenre('all');
              setActiveTab('browse');
            }}
            className="text-[11px] font-bold text-[#9b2f00] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All' },
            { id: 'Fiction', label: 'Fiction' },
            { id: 'Science', label: 'Science' },
            { id: 'Technology', label: 'Technology' },
            { id: 'Mystery', label: 'Mystery' },
            { id: 'Biography', label: 'Biography' },
          ].map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleShelfClick(genre.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                activeShelf === genre.id
                  ? 'bg-[#c2410c] text-white shadow-sm'
                  : 'bg-[#f6f3ee] text-[#59413a] hover:bg-[#ebe8e3]'
              }`}
              type="button"
            >
              {genre.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-serif-title text-[22px] sm:text-[24px] font-semibold text-[#1c1c19]">
              Featured Volumes
            </h2>
            <p className="text-[12px] text-[#8d7168]">Selected for critical discourse this term</p>
          </div>
          <div className="flex items-center gap-1 text-[#9b2f00]">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">FACULTY PICKS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredBooks.map((book) => {
            const stats = getBookStats(book.id);
            const displayRating = stats.count > 0 ? stats.average : 4.8;
            const displayReviews = stats.count > 0 ? stats.count : 142;

            return (
              <article
                key={book.id}
                className="flex flex-col rounded-xl bg-white p-4 shadow-sm border border-[#e5e2dd] transition-transform hover:-translate-y-0.5 justify-between"
              >
                <div>
                  <div className="flex gap-3.5">
                    {/* Book Cover */}
                    <div className="w-24 h-32 shrink-0 rounded-lg overflow-hidden bg-[#f0ede9] shadow-sm relative border border-[#e5e2dd]">
                      <img
                        className="w-full h-full object-cover"
                        src={book.coverImageUrl}
                        alt={book.title}
                        onError={(e) => {
                          // Fallback styled book spine
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute top-1.5 left-1.5 bg-[#fcf9f4]/90 backdrop-blur-xs text-[#9b2f00] text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                        {book.categoryTag}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <div className="flex items-center gap-1 text-[#fe932c]">
                          <span
                            className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="text-[13px] font-bold text-[#1c1c19]">
                            {displayRating}
                          </span>
                          <span className="text-[12px] text-[#8d7168]">
                            ({displayReviews} reviews)
                          </span>
                        </div>
                        <h3 className="font-serif-title text-[16px] sm:text-[17px] font-semibold text-[#1c1c19] truncate mt-1">
                          {book.title}
                        </h3>
                        <p className="text-[12px] text-[#59413a] truncate">by {book.author}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="px-2 py-0.5 rounded bg-[#f0ede9] text-[#59413a] text-[11px] font-medium">
                          {book.genre}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#f0ede9] text-[#59413a] text-[11px] font-medium">
                          {book.pubYear}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 flex items-center justify-between border-t border-[#f0ede9]">
                  <div className="flex items-center gap-1 text-[#8d7168] text-[12px]">
                    <span className="material-symbols-outlined text-[16px]">school</span>
                    <span className="truncate max-w-[120px]">{book.departmentChoice || 'Faculty Choice'}</span>
                  </div>
                  <button
                    onClick={() => selectBook(book.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#9b2f00] text-[12px] font-semibold transition-colors"
                  >
                    <span>View Details</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Top Rated Leaderboard */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fe932c] text-[22px]">
              workspace_premium
            </span>
            <h2 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
              Top Hall of Fame
            </h2>
          </div>
          <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider">
            Updated Weekly
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {rankedBooks.map((item, index) => {
            const rank = index + 1;
            const rankBg =
              rank === 1
                ? 'bg-[#fe932c] text-white'
                : rank === 2
                ? 'bg-[#626d82] text-white'
                : 'bg-[#e5e2dd] text-[#59413a]';

            const rating = item.stats.count > 0 ? item.stats.average : 4.8;
            const revCount = item.stats.count > 0 ? item.stats.count : 120 + index * 50;

            return (
              <div
                key={item.id}
                onClick={() => selectBook(item.id)}
                className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-[#f6f3ee] transition-colors shadow-sm border border-[#e5e2dd] cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full ${rankBg} flex items-center justify-center text-[12px] font-bold shrink-0 shadow-xs`}
                  >
                    {rank}
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-[15px] text-[#1c1c19] font-semibold truncate leading-snug">
                      {item.title}
                    </span>
                    <span className="text-[12px] text-[#8d7168] truncate">
                      {item.author} • {item.genre}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0 ml-2">
                  <div className="flex items-center gap-0.5 text-[#fe932c]">
                    <span
                      className="material-symbols-outlined text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[13px] text-[#1c1c19] font-bold">{rating}</span>
                  </div>
                  <span className="text-[10px] text-[#8d7168]">{revCount} revs</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Campus Reading Gauge */}
      <section className="rounded-xl bg-[#f6f3ee] p-4 flex flex-col gap-2.5 border border-[#e5e2dd]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b2f00] text-[20px]">insights</span>
            <span className="text-[12px] font-bold text-[#1c1c19] uppercase tracking-wide">
              Campus Reading Gauge
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#111c2d] bg-[#d8e3fb] px-2.5 py-0.5 rounded-full">
            Spring 2025 Semester
          </span>
        </div>

        <div className="w-full bg-[#e5e2dd] rounded-full h-2.5 overflow-hidden flex">
          <div className="bg-[#9b2f00] h-full" style={{ width: '45%' }} title="Technology"></div>
          <div className="bg-[#fe932c] h-full" style={{ width: '35%' }} title="Fiction"></div>
          <div className="bg-[#4a5569] h-full" style={{ width: '20%' }} title="Science"></div>
        </div>

        <div className="flex items-center justify-between text-[#8d7168] text-[11px] font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#9b2f00] inline-block"></span> 45% Technology
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#fe932c] inline-block"></span> 35% Fiction
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4a5569] inline-block"></span> 20% Science
          </span>
        </div>
      </section>

      {/* Mini Project Capstone Architecture Showcase Banner */}
      <footer className="rounded-2xl bg-[#ebe8e3] p-5 flex flex-col gap-3.5 border border-[#e5e2dd]">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#c2410c] text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[22px]">terminal</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-[#9b2f00] uppercase tracking-wider">
              Mini Project Capstone
            </span>
            <h4 className="font-serif-title text-[18px] font-semibold text-[#1c1c19] leading-tight mt-0.5">
              Advanced Java Architecture
            </h4>
            <p className="text-[13px] text-[#59413a] mt-1 leading-relaxed">
              Designed with standard Servlets, JavaServer Pages (JSP), and layered MVC pattern for
              seamless session management and robust MySQL JDBC querying.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e2dd]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowJavaModal(true)}
              className="text-[13px] font-semibold text-[#9b2f00] hover:underline flex items-center gap-1"
            >
              <span>View Java Servlets &amp; MySQL Code</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
            <span className="text-[#8d7168]">•</span>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-[13px] text-[#59413a] hover:text-[#9b2f00] transition-colors"
            >
              Browse Catalogue
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-[#8d7168] text-[11px] font-medium">
            <span className="material-symbols-outlined text-[15px]">school</span>
            <span>AJP • College Mini Project 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
