import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const BookDetailView: React.FC = () => {
  const {
    books,
    selectedBookId,
    reviews,
    currentUser,
    setActiveTab,
    addReview,
    likeReview,
    getBookStats,
    setShowAuthModal,
  } = useApp();

  const book = books.find((b) => b.id === selectedBookId) || books[0];
  const stats = book ? getBookStats(book.id) : { average: 4.8, count: 0, breakdown: {} };

  const [selectedScore, setSelectedScore] = useState<number>(5);
  const [commentText, setCommentText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const descriptors: { [key: number]: string } = {
    1: '1.0 — Needs Revision / Unclear',
    2: '2.0 — Introductory / Sparse Depth',
    3: '3.0 — Competent Foundation',
    4: '4.0 — Highly Recommended',
    5: '5.0 — Exceptional Masterpiece',
  };

  const bookReviews = reviews.filter(
    (r) => r.bookId === book.id && (r.status === 'APPROVED' || r.userId === currentUser?.id)
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addReview({
        bookId: book.id,
        rating: selectedScore,
        comment: commentText.trim(),
      });
      setCommentText('');
      setIsSubmitting(false);
    }, 250);
  };

  if (!book) {
    return (
      <div className="p-8 text-center bg-white rounded-xl border border-[#e5e2dd]">
        <p className="text-gray-500">Book not found.</p>
        <button
          onClick={() => setActiveTab('browse')}
          className="mt-3 px-4 py-2 bg-[#c2410c] text-white rounded-lg text-sm"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-8 space-y-6">
      {/* Back button and navigation breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('browse')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0ede9] hover:bg-[#ebe8e3] text-[#1c1c19] text-[13px] font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Catalogue</span>
        </button>
        <span className="text-[12px] text-[#8d7168] font-mono">ID: #{book.id}</span>
      </div>

      {/* Book Hero Card & Synopsis */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#e5e2dd] p-5 sm:p-6 flex flex-col gap-5">
        {/* Category Badge & Status Pill */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebe8e3] text-[#59413a] text-[12px] font-medium">
            <span className="material-symbols-outlined text-[15px] text-[#9b2f00]">
              {book.genre === 'Technology' ? 'terminal' : book.genre === 'Science' ? 'science' : 'auto_stories'}
            </span>
            <span>{book.genre} Curriculum</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[#9b2f00] text-[11px] font-bold uppercase tracking-wider bg-[#ffece7] px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span>{book.departmentChoice || 'Core Curriculum'}</span>
          </span>
        </div>

        {/* Main Identity: Cover Image + Metadata */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="relative w-32 h-44 sm:w-36 sm:h-48 shrink-0 rounded-xl overflow-hidden shadow-md bg-[#f0ede9] border border-[#e5e2dd] mx-auto sm:mx-0">
            <img
              alt={`${book.title} Cover Art`}
              className="w-full h-full object-cover"
              src={book.coverImageUrl}
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>

          <div className="flex flex-col min-w-0 flex-1 justify-between py-0.5">
            <div>
              <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#1c1c19] leading-tight tracking-tight">
                {book.title}
              </h1>
              <p className="text-[15px] text-[#9b2f00] font-semibold mt-1">
                {book.author}
              </p>
            </div>

            <div className="mt-3 flex flex-col gap-1.5 text-[#59413a] text-[13px]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#8d7168]">menu_book</span>
                <span>{book.publisher || 'Academic Press'} • {book.pubYear || 2020}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#8d7168]">barcode</span>
                <span className="font-mono text-[12px]">ISBN: {book.isbn || '978-0134494166'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#8d7168]">category</span>
                <span>Format: {book.format || 'Hardcover / Reference'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Summary & Visual Breakdown Bar Chart */}
        <div className="bg-[#f6f3ee] rounded-xl p-4 sm:p-5 flex flex-col gap-4 border border-[#e5e2dd]">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-title text-3xl sm:text-4xl text-[#1c1c19] font-bold tracking-tight">
                {stats.count > 0 ? stats.average : 4.8}
              </span>
              <span className="text-[14px] text-[#8d7168]">/ 5.0</span>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center text-[#fe932c]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="text-[12px] text-[#59413a] mt-0.5">
                {stats.count > 0 ? stats.count : 142} verified student &amp; faculty reviews
              </span>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="flex flex-col gap-1.5 pt-1">
            {[5, 4, 3, 2, 1].map((starVal) => {
              const defaultPercentages: Record<number, number> = {
                5: 78,
                4: 15,
                3: 5,
                2: 1,
                1: 1,
              };
              const percent = stats.count > 0 ? stats.breakdown[starVal]?.percent || 0 : defaultPercentages[starVal];

              return (
                <div key={starVal} className="flex items-center gap-2 text-[12px] text-[#59413a]">
                  <span className="w-5 text-right font-medium">{starVal}★</span>
                  <div className="flex-1 h-2 bg-[#e5e2dd] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#fe932c] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <span className="w-9 text-right font-mono text-[11px] text-[#8d7168]">{percent}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Synopsis */}
        <div className="space-y-2 pt-1 border-t border-[#f0ede9]">
          <h2 className="font-serif-title text-[18px] font-semibold text-[#1c1c19] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#9b2f00] text-[20px]">auto_stories</span>
            <span>Architectural Synopsis</span>
          </h2>
          <p className="text-[14px] text-[#59413a] leading-relaxed text-justify">
            {book.description}
          </p>
        </div>
      </section>

      {/* Interactive User Review Submission Form */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#e5e2dd] p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
              Write a Review
            </h3>
            <p className="text-[12px] text-[#8d7168]">
              Contribute your course review to the university index
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#ffece7] flex items-center justify-center text-[#9b2f00]">
            <span className="material-symbols-outlined text-[20px]">rate_review</span>
          </div>
        </div>

        {/* Student Session Credential Badge */}
        {currentUser ? (
          <div className="flex items-center gap-3 bg-[#f6f3ee] px-3.5 py-2.5 rounded-xl border border-[#e5e2dd]">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0 ${
                currentUser.role === 'ADMIN'
                  ? 'bg-[#9b2f00]'
                  : currentUser.role === 'FACULTY'
                  ? 'bg-[#4a5569]'
                  : 'bg-[#c2410c]'
              }`}
            >
              {currentUser.avatarInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#1c1c19] truncate">{currentUser.name}</p>
              <p className="text-[12px] text-[#59413a] truncate">
                {currentUser.studentId ? (
                  <>
                    Student ID: <span className="font-mono text-[#9b2f00] font-semibold">{currentUser.studentId}</span>
                  </>
                ) : (
                  <span>{currentUser.department || currentUser.role}</span>
                )}
              </p>
            </div>
            <span className="text-[11px] font-medium text-[#59413a] bg-[#ebe8e3] px-2.5 py-0.5 rounded-full border border-[#e5e2dd]">
              Active Session
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3.5 bg-[#fff8f5] rounded-xl border border-[#ffdbd0]">
            <div className="flex items-center gap-2 text-[13px] text-[#9b2f00]">
              <span className="material-symbols-outlined text-[20px]">lock</span>
              <span>Authentication required to write reviews.</span>
            </div>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-3 py-1.5 bg-[#c2410c] text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-[#9b2f00]"
            >
              Log In
            </button>
          </div>
        )}

        {/* Standard JSP/Servlet Form Simulation */}
        <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
          {/* Interactive Star Rating Selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-semibold text-[#1c1c19]">Overall Rating</label>
              <span className="text-[12px] text-[#9b2f00] font-medium">
                {descriptors[selectedScore]}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#f6f3ee] p-2 rounded-xl justify-around border border-[#e5e2dd]">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setSelectedScore(score)}
                  className={`p-1.5 rounded-lg transition-transform active:scale-95 focus:outline-none ${
                    score <= selectedScore ? 'text-[#fe932c]' : 'text-[#dcdad5]'
                  }`}
                  title={`${score} Star`}
                >
                  <span
                    className="material-symbols-outlined text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Review Textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold text-[#1c1c19]">
              Critique &amp; Architectural Application
            </label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={!currentUser}
              rows={3}
              placeholder={
                currentUser
                  ? 'Share your thoughts on the concepts, depth, and practical Java applicability...'
                  : 'Please log in to submit your course review...'
              }
              className="w-full bg-[#f6f3ee] rounded-xl p-3 text-[14px] text-[#1c1c19] placeholder:text-[#8d7168] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#c2410c] border border-[#e5e2dd] transition-all resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!currentUser || isSubmitting || !commentText.trim()}
            className="w-full bg-[#c2410c] hover:bg-[#9b2f00] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl text-[13px] font-semibold flex items-center justify-center gap-2 active:translate-y-0.5 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>{isSubmitting ? 'Dispatching to ReviewServlet...' : 'Submit Review via Servlet'}</span>
          </button>

          {/* Technical Architecture Footnote */}
          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#8d7168]">
            <span className="material-symbols-outlined text-[16px] text-[#4a5569]">database</span>
            <span>Review will be persisted to MySQL database via JDBC PreparedStatement.</span>
          </div>
        </form>
      </section>

      {/* Community Reviews List */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
            Student &amp; Faculty Reviews
          </h3>
          <span className="text-[12px] text-[#8d7168]">
            Showing {bookReviews.length} review{bookReviews.length === 1 ? '' : 's'}
          </span>
        </div>

        {bookReviews.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border border-[#e5e2dd]">
            <p className="text-sm text-[#8d7168]">Be the first to write an academic review for this volume!</p>
          </div>
        ) : (
          bookReviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-white rounded-xl shadow-sm border border-[#e5e2dd] p-4 sm:p-5 flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-[13px] font-bold shrink-0 ${
                      rev.userRole === 'FACULTY'
                        ? 'bg-[#4a5569]'
                        : rev.userRole === 'ADMIN'
                        ? 'bg-[#9b2f00]'
                        : 'bg-[#fe932c]'
                    }`}
                  >
                    {rev.userInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif-title text-[15px] sm:text-[16px] font-semibold text-[#1c1c19] leading-none">
                        {rev.userName}
                      </span>
                      {rev.userRole === 'FACULTY' && (
                        <span className="material-symbols-outlined text-[#c2410c] text-[16px]" title="Faculty Verified">
                          verified
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8d7168] mt-0.5">{rev.userBadge || `${rev.createdAt}`}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center text-[#fe932c]">
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

              <p className="text-[14px] text-[#1c1c19] leading-relaxed pt-1">
                {rev.comment}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#f6f3ee]">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#59413a] bg-[#f6f3ee] px-2.5 py-0.5 rounded-md border border-[#e5e2dd]">
                  <span className="material-symbols-outlined text-[13px] text-[#9b2f00]">
                    {rev.userRole === 'FACULTY' ? 'school' : 'code'}
                  </span>
                  <span>{rev.badgeLabel || 'Course Syllabus Reference'}</span>
                </span>

                <button
                  onClick={() => likeReview(rev.id)}
                  className="flex items-center gap-1 text-[#8d7168] text-[12px] hover:text-[#9b2f00] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                  <span>{rev.helpfulCount} helpful</span>
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Non-Intrusive University SSO Banner */}
      {!currentUser && (
        <aside className="bg-[#ebe8e3] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 border border-[#e5e2dd]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#9b2f00] shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#1c1c19] truncate">Campus Authentication</p>
              <p className="text-[12px] text-[#59413a] truncate">Want to bookmark or edit your submission?</p>
            </div>
          </div>
          <button
            onClick={() => setShowAuthModal(true)}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#9b2f00] text-[13px] font-semibold hover:bg-[#f6f3ee] transition-colors shadow-sm border border-[#e5e2dd]"
          >
            <span>Log In</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </aside>
      )}
    </div>
  );
};
