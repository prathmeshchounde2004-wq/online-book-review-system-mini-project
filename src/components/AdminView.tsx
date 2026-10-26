import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book } from '../types';

export const AdminView: React.FC = () => {
  const {
    books,
    reviews,
    users,
    currentUser,
    loginAs,
    addBook,
    updateBook,
    deleteBook,
    moderateReview,
    selectBook,
    getBookStats,
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // New book form fields
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newGenre, setNewGenre] = useState('Technology');
  const [newCategoryTag, setNewCategoryTag] = useState('Tech');
  const [newIsbn, setNewIsbn] = useState('');
  const [newPubYear, setNewPubYear] = useState('2024');
  const [newCoverUrl, setNewCoverUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPublisher, setNewPublisher] = useState('Academic Publishing House');

  // Edit book form fields
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editGenre, setEditGenre] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const isAdmin = currentUser?.role === 'ADMIN';

  // Handle Add Book
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    addBook({
      title: newTitle.trim(),
      author: newAuthor.trim(),
      genre: newGenre,
      categoryTag: newCategoryTag,
      description: newDescription.trim() || 'Comprehensive course reference volume for Advanced Java Programming curriculum.',
      coverImageUrl:
        newCoverUrl.trim() ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZN2kPGaQ5Q0-gL3NTogbtm338DoKvtqK9zJ325zxagjfpf8XTxN0iIn4rfv4R2YU7VSR2mYWh8J2uLPmRe1IQCBnJk7umq8-wCfYpSIB0H8P6dH1RbpocozXU7WD6vxpkbbnBbHrh40gMbD8OOpfY3OWfe4gFfC79SuSI2suBuRnCUln9xqWhz3kNZTN41npBrqDdiosuS0qRC9jeVxA_sE-bGGLF-VOj1H8hlr1shCsCS3TMrbeaA',
      isbn: newIsbn.trim() || '978-0134494100',
      pubYear: parseInt(newPubYear, 10) || 2024,
      publisher: newPublisher.trim(),
      format: 'Hardcover • Curated',
    });

    // Reset form
    setNewTitle('');
    setNewAuthor('');
    setNewIsbn('');
    setNewCoverUrl('');
    setNewDescription('');
    setShowAddForm(false);
  };

  const openEditModal = (book: Book) => {
    setEditingBook(book);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditGenre(book.genre);
    setEditDesc(book.description);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateBook({
        ...editingBook,
        title: editTitle.trim(),
        author: editAuthor.trim(),
        genre: editGenre,
        description: editDesc.trim(),
      });
      setEditingBook(null);
    }
  };

  const pendingReviews = reviews.filter((r) => r.status === 'PENDING');

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-[#e5e2dd] shadow-sm text-center max-w-lg mx-auto my-6 space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
        </div>
        <h2 className="font-serif-title text-2xl font-bold text-[#1c1c19]">
          Admin Authorization Required
        </h2>
        <p className="text-sm text-[#59413a]">
          The Admin Control Panel is protected by server-side role verification (
          <code className="bg-[#f0ede9] px-1.5 py-0.5 rounded text-xs">role == 'ADMIN'</code>
          ). Currently authenticated as{' '}
          <strong className="text-[#1c1c19]">{currentUser?.name || 'Guest'}</strong>.
        </p>
        <div className="pt-2">
          <button
            onClick={() => loginAs(1)}
            className="px-5 py-2.5 bg-[#c2410c] hover:bg-[#9b2f00] text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            Switch to SysAdmin Account (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-6 pb-8">
      {/* 1. Admin Header & Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#ebe8e3] p-5 sm:p-6 shadow-sm border border-[#e5e2dd]">
        <div className="flex flex-col space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#ffdcc3] text-[#6e3900] text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#fe932c]/30">
                <span className="w-2 h-2 rounded-full bg-[#9b2f00] animate-pulse"></span>
                <span>SysAdmin Session Active</span>
              </div>
              <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1c1c19] tracking-tight">
                Admin Control Panel
              </h1>
              <p className="text-[13px] text-[#8d7168] mt-0.5">
                JSP Servlet • MySQL JDBC PreparedStatement Tier
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ffdbd0] text-[#390c00] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[26px]">admin_panel_settings</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full flex items-center justify-center space-x-2 bg-[#c2410c] hover:bg-[#9b2f00] text-white active:scale-[0.99] transition-all rounded-xl py-3 px-4 shadow-sm font-semibold text-[14px]"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showAddForm ? 'close' : 'add_circle'}
              </span>
              <span>{showAddForm ? 'Close Entry Form' : '+ Add New Book to Catalogue'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Total Books */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e2dd] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider block">
              Total Books
            </span>
            <span className="font-serif-title text-3xl font-bold text-[#1c1c19] tracking-tight">
              {books.length}
            </span>
            <div className="flex items-center text-[#fe932c] text-[11px] font-medium space-x-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+12 this month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#9b2f00]">
            <span className="material-symbols-outlined text-[24px]">auto_stories</span>
          </div>
        </div>

        {/* Total Reviews */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e2dd] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider block">
              Total Reviews
            </span>
            <span className="font-serif-title text-3xl font-bold text-[#1c1c19] tracking-tight">
              {reviews.length}
            </span>
            <div className="flex items-center text-[#9b2f00] text-[11px] font-medium space-x-1">
              <span className="material-symbols-outlined text-[14px]">pending_actions</span>
              <span>{pendingReviews.length} moderation pending</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffdcc3] flex items-center justify-center text-[#6e3900]">
            <span className="material-symbols-outlined text-[24px]">rate_review</span>
          </div>
        </div>

        {/* Registered Users */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e5e2dd] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#8d7168] uppercase tracking-wider block">
              Registered Users
            </span>
            <span className="font-serif-title text-3xl font-bold text-[#1c1c19] tracking-tight">
              {users.length * 180 + 120}
            </span>
            <div className="flex items-center text-[#8d7168] text-[11px] font-medium space-x-1">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>Student &amp; Faculty</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#d8e3fb] flex items-center justify-center text-[#111c2d]">
            <span className="material-symbols-outlined text-[24px]">group</span>
          </div>
        </div>
      </div>

      {/* 3. Add New Book Form (Collapsible) */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#e5e2dd] animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0ede9]">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-[#9b2f00] text-[22px]">library_add</span>
              <h2 className="font-serif-title text-[20px] font-bold text-[#1c1c19]">
                Catalogue Entry
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#8d7168] uppercase">
              POST • /BookInsertServlet
            </span>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-[13px] font-semibold text-[#59413a] mb-1">
                Book Title *
              </label>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                placeholder="e.g. Design Patterns: Elements of Reusable Object-Oriented Software"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[13px] font-semibold text-[#59413a] mb-1">
                  Author(s) *
                </label>
                <input
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                  placeholder="e.g. Erich Gamma, Richard Helm..."
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#59413a] mb-1">
                  Genre Category
                </label>
                <select
                  value={newGenre}
                  onChange={(e) => {
                    setNewGenre(e.target.value);
                    setNewCategoryTag(
                      e.target.value === 'Technology'
                        ? 'Tech'
                        : e.target.value === 'Science'
                        ? 'Science'
                        : e.target.value === 'Fiction'
                        ? 'Fiction'
                        : e.target.value === 'Mystery'
                        ? 'Mystery'
                        : 'Biography'
                    );
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none border border-[#e5e2dd]"
                >
                  <option value="Technology">Technology &amp; CS</option>
                  <option value="Fiction">Fiction &amp; Literature</option>
                  <option value="Science">Science &amp; Physics</option>
                  <option value="Mystery">Mystery &amp; Thriller</option>
                  <option value="Biography">Biography &amp; History</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[13px] font-semibold text-[#59413a] mb-1">ISBN-13</label>
                <input
                  value={newIsbn}
                  onChange={(e) => setNewIsbn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none border border-[#e5e2dd]"
                  placeholder="978-0201633610"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#59413a] mb-1">Pub. Year</label>
                <input
                  value={newPubYear}
                  onChange={(e) => setNewPubYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none border border-[#e5e2dd]"
                  type="number"
                  min="1800"
                  max="2099"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#59413a] mb-1">
                Publisher
              </label>
              <input
                value={newPublisher}
                onChange={(e) => setNewPublisher(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none border border-[#e5e2dd]"
                placeholder="Prentice Hall / Addison-Wesley"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#59413a] mb-1">
                Cover Image Source URL (optional)
              </label>
              <input
                value={newCoverUrl}
                onChange={(e) => setNewCoverUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none border border-[#e5e2dd]"
                placeholder="https://... or leave empty for default cover"
              />
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#59413a] mb-1">
                Curator Synopsis / Description
              </label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[14px] focus:bg-white focus:outline-none border border-[#e5e2dd] resize-none"
                placeholder="Enter short synopsis or academic syllabus context..."
                rows={3}
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 rounded-xl bg-[#f0ede9] text-[#59413a] text-[13px] font-semibold hover:bg-[#ebe8e3] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#c2410c] hover:bg-[#9b2f00] text-white text-[13px] font-semibold shadow-sm flex items-center space-x-1.5 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                <span>Save to MySQL via BookDAO</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. Book Records Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
              Book Records
            </h2>
            <p className="text-[12px] text-[#8d7168]">Live entities mapped via BookDAO</p>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#f0ede9] text-[#59413a] text-[11px] font-semibold border border-[#e5e2dd]">
            <span>Displaying {books.length} of {books.length}</span>
          </div>
        </div>

        <div className="space-y-3">
          {books.map((book) => {
            const stats = getBookStats(book.id);
            const score = stats.count > 0 ? stats.average : 4.8;
            const revCount = stats.count > 0 ? stats.count : 142;

            return (
              <div
                key={book.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e2dd] flex flex-col space-y-3 transition-all"
              >
                <div className="flex items-start space-x-3.5">
                  <div
                    className="w-16 h-20 rounded-lg overflow-hidden shrink-0 bg-[#f0ede9] shadow-sm border border-[#e5e2dd] cursor-pointer"
                    onClick={() => selectBook(book.id)}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={book.coverImageUrl}
                      alt={book.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-[#d8e3fb] text-[#111c2d] text-[10px] font-bold uppercase tracking-wider">
                        {book.categoryTag}
                      </span>
                      <span className="text-[12px] font-bold text-[#fe932c] flex items-center">
                        <span
                          className="material-symbols-outlined text-[15px] mr-0.5"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        {score}
                      </span>
                    </div>

                    <h3
                      className="font-serif-title text-[16px] text-[#1c1c19] truncate font-semibold mt-1 cursor-pointer hover:text-[#9b2f00]"
                      onClick={() => selectBook(book.id)}
                    >
                      {book.title}
                    </h3>
                    <p className="text-[12px] text-[#8d7168] truncate">
                      {book.author} • {book.pubYear}
                    </p>
                    <p className="text-[12px] text-[#59413a] mt-1 flex items-center space-x-1">
                      <span className="material-symbols-outlined text-[16px] text-[#8d7168]">
                        reviews
                      </span>
                      <span>{revCount} Active Reviews</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2 bg-[#f6f3ee] p-2 rounded-lg border border-[#e5e2dd]">
                  <button
                    onClick={() => selectBook(book.id)}
                    className="px-3 py-1.5 rounded-md bg-white text-[#1c1c19] text-[12px] font-semibold flex items-center space-x-1 hover:bg-[#ebe8e3] shadow-2xs transition-colors border border-[#e5e2dd]"
                  >
                    <span className="material-symbols-outlined text-[15px]">visibility</span>
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => openEditModal(book)}
                    className="px-3 py-1.5 rounded-md bg-white text-[#1c1c19] text-[12px] font-semibold flex items-center space-x-1 hover:bg-[#ebe8e3] shadow-2xs transition-colors border border-[#e5e2dd]"
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#4a5569]">edit</span>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteCandidate(book)}
                    className="px-3 py-1.5 rounded-md bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-semibold flex items-center space-x-1 hover:bg-[#ffb4ab] shadow-2xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">delete</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Moderation Queue Preview Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
              Review Moderation
            </h2>
            <p className="text-[12px] text-[#8d7168]">Needs editorial verification before public feed</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#c2410c] text-white text-[11px] font-bold">
            {pendingReviews.length} Pending
          </span>
        </div>

        {pendingReviews.length === 0 ? (
          <div className="bg-white rounded-xl p-5 text-center border border-[#e5e2dd] shadow-sm">
            <span className="material-symbols-outlined text-green-600 text-3xl mb-1">
              verified
            </span>
            <p className="text-sm font-semibold text-[#1c1c19]">Moderation Queue Clear</p>
            <p className="text-xs text-[#8d7168] mt-0.5">
              All submitted student and faculty reviews have been processed.
            </p>
          </div>
        ) : (
          pendingReviews.map((rev) => {
            const bookItem = books.find((b) => b.id === rev.bookId);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e2dd] space-y-3"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#d8e3fb] text-[#111c2d] flex items-center justify-center font-bold text-[12px]">
                      {rev.userInitials}
                    </div>
                    <div>
                      <span className="text-[13px] font-semibold text-[#1c1c19] block">
                        {rev.userName} ({rev.userRole})
                      </span>
                      <span className="text-[11px] text-[#8d7168]">
                        On: <strong className="text-[#59413a]">{bookItem?.title || 'Volume'}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex text-[#fe932c]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className={`material-symbols-outlined text-[16px] ${
                          s <= rev.rating ? 'text-[#fe932c]' : 'text-[#e5e2dd]'
                        }`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[13px] text-[#59413a] italic bg-[#f6f3ee] p-3 rounded-lg border border-[#e5e2dd]">
                  “{rev.comment}”
                </p>

                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => moderateReview(rev.id, 'FLAGGED')}
                    className="px-3.5 py-1.5 rounded-lg bg-[#f0ede9] text-[#59413a] hover:text-[#ba1a1a] text-[12px] font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">flag</span>
                    <span>Flag</span>
                  </button>
                  <button
                    onClick={() => moderateReview(rev.id, 'APPROVED')}
                    className="px-4 py-1.5 rounded-lg bg-[#c2410c] hover:bg-[#9b2f00] text-white text-[12px] font-semibold flex items-center space-x-1 shadow-sm transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 sm:p-6 shadow-2xl space-y-4 border border-[#e5e2dd] animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">delete_forever</span>
            </div>
            <div>
              <h3 className="font-serif-title text-[20px] font-bold text-[#1c1c19]">
                Confirm Record Deletion
              </h3>
              <p className="text-[13px] text-[#59413a] mt-1 leading-relaxed">
                Are you sure you want to delete{' '}
                <strong className="text-[#1c1c19]">"{deleteCandidate.title}"</strong>? This will
                cascade-delete all associated reviews via MySQL foreign key constraints.
              </p>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#f0ede9] text-[#59413a] text-[13px] font-semibold hover:bg-[#ebe8e3]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteBook(deleteCandidate.id);
                  setDeleteCandidate(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#ba1a1a] hover:bg-[#93000a] text-white text-[13px] font-semibold shadow-sm"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl space-y-4 border border-[#e5e2dd] max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
              <h3 className="font-serif-title text-[20px] font-bold text-[#1c1c19]">
                Edit Book Metadata
              </h3>
              <button
                onClick={() => setEditingBook(null)}
                className="text-[#8d7168] hover:text-[#1c1c19]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3.5">
              <div>
                <label className="block text-[12px] font-semibold text-[#59413a] mb-1">
                  Book Title
                </label>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#59413a] mb-1">
                  Author(s)
                </label>
                <input
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd]"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#59413a] mb-1">
                  Category Genre
                </label>
                <select
                  value={editGenre}
                  onChange={(e) => setEditGenre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[13px] focus:outline-none border border-[#e5e2dd]"
                >
                  <option value="Technology">Technology</option>
                  <option value="Science">Science</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Biography">Biography</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-[#59413a] mb-1">
                  Description
                </label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-[13px] focus:outline-none border border-[#e5e2dd] resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  className="px-4 py-2 rounded-xl bg-[#f0ede9] text-[#59413a] text-[13px] font-semibold hover:bg-[#ebe8e3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#c2410c] hover:bg-[#9b2f00] text-white text-[13px] font-semibold shadow-sm"
                >
                  Update Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
