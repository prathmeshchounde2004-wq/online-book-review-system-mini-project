import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';

export const BrowseView: React.FC = () => {
  const {
    books,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    sortBy,
    setSortBy,
    selectBook,
    getBookStats,
  } = useApp();

  const [inputVal, setInputVal] = useState(searchQuery);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputVal.trim());
    setCurrentPage(1);
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query) ||
        (book.isbn && book.isbn.toLowerCase().includes(query));

      // Genre match
      const matchesGenre =
        selectedGenre === 'all' ||
        book.genre.toLowerCase() === selectedGenre.toLowerCase() ||
        book.categoryTag.toLowerCase() === selectedGenre.toLowerCase();

      return matchesQuery && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  const sortedBooks = useMemo(() => {
    const list = [...filteredBooks];
    if (sortBy === 'highest_rated') {
      return list.sort((a, b) => {
        const aStats = getBookStats(a.id);
        const bStats = getBookStats(b.id);
        const aScore = aStats.count > 0 ? aStats.average : 4.5;
        const bScore = bStats.count > 0 ? bStats.average : 4.5;
        return bScore - aScore;
      });
    } else if (sortBy === 'most_reviewed') {
      return list.sort((a, b) => {
        const aCount = getBookStats(a.id).count;
        const bCount = getBookStats(b.id).count;
        return bCount - aCount;
      });
    } else if (sortBy === 'alpha_asc') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredBooks, sortBy, getBookStats]);

  const totalPages = Math.max(1, Math.ceil(sortedBooks.length / ITEMS_PER_PAGE));
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col w-full pb-8 space-y-5">
      {/* Search & Filter Section */}
      <section className="flex flex-col gap-3">
        {/* Search Bar Card */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white p-2 rounded-xl shadow-sm border border-[#e5e2dd] flex items-center gap-2"
        >
          <div className="flex items-center justify-center pl-2 text-[#8d7168]">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </div>
          <input
            className="w-full bg-transparent text-[14px] text-[#1c1c19] placeholder:text-[#8d7168] focus:outline-none min-w-0 py-1.5"
            placeholder="Search title, author, ISBN, or keyword..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            type="search"
          />
          {inputVal && (
            <button
              type="button"
              onClick={() => {
                setInputVal('');
                setSearchQuery('');
              }}
              className="text-[#8d7168] hover:text-[#1c1c19] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            className="bg-[#c2410c] hover:bg-[#9b2f00] text-white text-[13px] font-semibold px-4 py-2.5 rounded-lg active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-sm"
            type="submit"
          >
            Search
          </button>
        </form>

        {/* Genre Chips (Scrollable Strip) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Genres' },
            { id: 'Technology', label: 'Technology' },
            { id: 'Science', label: 'Science' },
            { id: 'Fiction', label: 'Fiction' },
            { id: 'Mystery', label: 'Mystery' },
            { id: 'Biography', label: 'Biography' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedGenre(item.id);
                setCurrentPage(1);
              }}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                selectedGenre === item.id
                  ? 'bg-[#c2410c] text-white shadow-sm'
                  : 'bg-[#f6f3ee] text-[#59413a] hover:bg-[#ebe8e3]'
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Sorting & Quick Controls */}
        <div className="flex items-center justify-between gap-2 bg-[#f6f3ee] px-3.5 py-2.5 rounded-xl border border-[#e5e2dd]">
          <div className="flex items-center gap-1.5 text-[#59413a]">
            <span className="material-symbols-outlined text-[18px]">swap_vert</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Sort by</span>
          </div>

          <div className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white text-[#1c1c19] text-[13px] font-medium py-1.5 pl-3 pr-8 rounded-lg shadow-sm border border-[#e5e2dd] focus:outline-none cursor-pointer"
            >
              <option value="highest_rated">Highest Rated</option>
              <option value="most_reviewed">Most Reviewed</option>
              <option value="alpha_asc">Alphabetical (A–Z)</option>
            </select>
            <span className="material-symbols-outlined text-[18px] text-[#8d7168] pointer-events-none absolute right-2">
              expand_more
            </span>
          </div>
        </div>
      </section>

      {/* Result Metadata Banner */}
      <section className="flex items-center justify-between px-1">
        <div className="flex flex-col">
          <h2 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
            Curated Catalogue
          </h2>
          <p className="text-[12px] text-[#59413a]">
            Showing {sortedBooks.length} book{sortedBooks.length === 1 ? '' : 's'} in{' '}
            {selectedGenre === 'all' ? 'All Genres' : selectedGenre}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </p>
        </div>
        <span className="bg-[#f0ede9] text-[#59413a] text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 border border-[#e5e2dd]">
          Page {currentPage} of {totalPages}
        </span>
      </section>

      {/* Books Listing */}
      {paginatedBooks.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center border border-[#e5e2dd] shadow-sm flex flex-col items-center">
          <span className="material-symbols-outlined text-4xl text-[#8d7168] mb-2">
            menu_book
          </span>
          <h3 className="font-serif-title text-lg font-semibold text-[#1c1c19]">No books match your criteria</h3>
          <p className="text-sm text-[#59413a] mt-1 max-w-sm">
            Try adjusting your search query or selecting a different genre category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setInputVal('');
              setSelectedGenre('all');
            }}
            className="mt-4 px-4 py-2 bg-[#c2410c] text-white text-xs font-semibold rounded-lg hover:bg-[#9b2f00]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3.5" id="booksGrid">
          {paginatedBooks.map((book) => {
            const stats = getBookStats(book.id);
            const score = stats.count > 0 ? stats.average : 4.8;
            const revCount = stats.count > 0 ? stats.count : 142;

            return (
              <article
                key={book.id}
                className="bg-white rounded-xl p-3.5 shadow-sm border border-[#e5e2dd] flex gap-3.5 transition-transform active:scale-[0.99] hover:shadow-md"
              >
                {/* Book Cover */}
                <div className="relative w-24 h-32 shrink-0 rounded-lg overflow-hidden bg-[#f0ede9] shadow-sm border border-[#e5e2dd]">
                  <img
                    className="w-full h-full object-cover"
                    src={book.coverImageUrl}
                    alt={book.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute top-1.5 left-1.5 bg-[#c2410c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                    {book.categoryTag}
                  </span>
                </div>

                <div className="flex flex-col justify-between min-w-0 flex-1 py-0.5">
                  <div>
                    <div className="flex items-center gap-1 text-[#fe932c] text-[11px] mb-1">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-bold text-[#1c1c19] text-[13px]">{score}</span>
                      <span className="text-[#8d7168] font-normal">({revCount} reviews)</span>
                    </div>

                    <h3 className="font-serif-title text-[16px] leading-tight text-[#1c1c19] line-clamp-2 font-semibold">
                      {book.title}
                    </h3>
                    <p className="text-[12px] text-[#8d7168] mt-0.5 truncate">{book.author}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 bg-[#f6f3ee] rounded-lg px-2.5">
                    <span className="text-[11px] font-medium text-[#4a5569] truncate">
                      {book.format || `${book.pubYear} • ${book.genre}`}
                    </span>
                    <button
                      onClick={() => selectBook(book.id)}
                      className="text-[12px] text-[#c2410c] font-semibold hover:underline flex items-center gap-0.5 shrink-0"
                    >
                      <span>Details</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav
          aria-label="Catalog Pagination"
          className="mt-4 flex items-center justify-between bg-white p-2.5 rounded-xl shadow-sm border border-[#e5e2dd]"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              currentPage === 1
                ? 'bg-[#f0ede9] text-[#8d7168] opacity-50 cursor-not-allowed'
                : 'bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg text-[13px] font-bold flex items-center justify-center transition-colors ${
                  currentPage === pg
                    ? 'bg-[#c2410c] text-white shadow-sm'
                    : 'bg-[#f6f3ee] text-[#59413a] hover:bg-[#f0ede9]'
                }`}
              >
                {pg}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-[#f0ede9] text-[#8d7168] opacity-50 cursor-not-allowed'
                : 'bg-[#c2410c] text-white hover:bg-[#9b2f00] shadow-sm'
            }`}
          >
            <span>Next</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </nav>
      )}
    </div>
  );
};
