import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Review } from '../types';

export const UserDashboardView: React.FC = () => {
  const {
    currentUser,
    reviews,
    books,
    deleteReview,
    updateReview,
    selectBook,
    setActiveTab,
    setShowAuthModal,
    logout,
    loginAs,
  } = useApp();

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>('');

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-[#e5e2dd] shadow-sm text-center max-w-lg mx-auto my-6 space-y-4">
        <div className="w-14 h-14 rounded-full bg-[#f0ede9] text-[#9b2f00] flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[30px]">lock</span>
        </div>
        <h2 className="font-serif-title text-2xl font-bold text-[#1c1c19]">
          Sign In to View Dashboard
        </h2>
        <p className="text-sm text-[#59413a]">
          Log in with your academic credentials to view your profile, submitted reviews, and course
          bookmarks.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-5 py-2.5 bg-[#c2410c] hover:bg-[#9b2f00] text-white text-sm font-semibold rounded-xl shadow-sm transition-all"
          >
            Log In or Register
          </button>
        </div>
      </div>
    );
  }

  // If user is Admin, show an option to switch to Admin View or render Admin view directly
  const isSysAdmin = currentUser.role === 'ADMIN';

  const userReviews = reviews.filter((r) => r.userId === currentUser.id);

  const startEdit = (review: Review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReview) {
      updateReview(editingReview.id, editRating, editComment.trim());
      setEditingReview(null);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-6 pb-8">
      {/* Profile Header Banner */}
      <div className="bg-[#ebe8e3] rounded-2xl p-5 sm:p-6 border border-[#e5e2dd] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-sm ${
              currentUser.role === 'ADMIN'
                ? 'bg-[#9b2f00]'
                : currentUser.role === 'FACULTY'
                ? 'bg-[#4a5569]'
                : 'bg-[#c2410c]'
            }`}
          >
            {currentUser.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-title text-xl sm:text-2xl font-bold text-[#1c1c19]">
                {currentUser.name}
              </h1>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                  currentUser.role === 'ADMIN'
                    ? 'bg-[#ffece7] text-[#9b2f00]'
                    : currentUser.role === 'FACULTY'
                    ? 'bg-[#d8e3fb] text-[#111c2d]'
                    : 'bg-[#f0ede9] text-[#59413a]'
                }`}
              >
                {currentUser.role}
              </span>
            </div>
            <p className="text-[13px] text-[#59413a]">{currentUser.email}</p>
            <p className="text-[12px] text-[#8d7168] mt-0.5">
              {currentUser.studentId ? (
                <>
                  Student ID: <span className="font-mono text-[#9b2f00] font-semibold">{currentUser.studentId}</span>
                </>
              ) : (
                <span>{currentUser.department || 'Academic Member'}</span>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end">
          {isSysAdmin && (
            <button
              onClick={() => setActiveTab('account')}
              className="px-3.5 py-2 bg-[#9b2f00] text-white text-xs font-semibold rounded-xl flex items-center gap-1 shadow-xs hover:bg-[#832600]"
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              <span>Admin Panel</span>
            </button>
          )}
          <button
            onClick={logout}
            className="px-3.5 py-2 bg-white text-[#ba1a1a] hover:bg-[#ffdad6] text-xs font-semibold rounded-xl border border-[#e5e2dd] transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Account Quick Switcher (Demo Feature) */}
      <div className="bg-white rounded-xl p-3.5 border border-[#e5e2dd] flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="text-[#8d7168] font-semibold">Test Session As:</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => loginAs(2)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              currentUser.id === 2
                ? 'bg-[#c2410c] text-white border-[#c2410c]'
                : 'bg-[#f6f3ee] text-[#59413a] border-[#e5e2dd] hover:bg-[#ebe8e3]'
            }`}
          >
            Alex Chen (Student)
          </button>
          <button
            onClick={() => loginAs(3)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              currentUser.id === 3
                ? 'bg-[#4a5569] text-white border-[#4a5569]'
                : 'bg-[#f6f3ee] text-[#59413a] border-[#e5e2dd] hover:bg-[#ebe8e3]'
            }`}
          >
            Prof. David K. (Faculty)
          </button>
          <button
            onClick={() => loginAs(1)}
            className={`px-2.5 py-1 rounded-lg border transition-all ${
              currentUser.id === 1
                ? 'bg-[#9b2f00] text-white border-[#9b2f00]'
                : 'bg-[#f6f3ee] text-[#59413a] border-[#e5e2dd] hover:bg-[#ebe8e3]'
            }`}
          >
            SysAdmin (Admin)
          </button>
        </div>
      </div>

      {/* My Reviews Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-title text-[20px] font-semibold text-[#1c1c19]">
              My Course Reviews
            </h2>
            <p className="text-[12px] text-[#8d7168]">
              Contributions linked to your session ({userReviews.length} record{userReviews.length === 1 ? '' : 's'})
            </p>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="text-[12px] text-[#9b2f00] font-semibold hover:underline flex items-center gap-1"
          >
            <span>Review More Books</span>
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>

        {userReviews.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-[#e5e2dd] shadow-sm">
            <span className="material-symbols-outlined text-4xl text-[#8d7168] mb-2">rate_review</span>
            <h3 className="font-serif-title text-lg font-semibold text-[#1c1c19]">No reviews written yet</h3>
            <p className="text-sm text-[#59413a] mt-1 max-w-sm mx-auto">
              You haven't submitted any course evaluations yet. Browse the catalog to write your first review!
            </p>
            <button
              onClick={() => setActiveTab('browse')}
              className="mt-4 px-4 py-2 bg-[#c2410c] text-white text-xs font-semibold rounded-lg hover:bg-[#9b2f00]"
            >
              Browse Catalogue
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {userReviews.map((rev) => {
              const bookItem = books.find((b) => b.id === rev.bookId);

              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-[#e5e2dd] space-y-3"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-[#f0ede9] border border-[#e5e2dd] cursor-pointer"
                        onClick={() => selectBook(rev.bookId)}
                      >
                        <img
                          src={bookItem?.coverImageUrl}
                          alt={bookItem?.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <h3
                          onClick={() => selectBook(rev.bookId)}
                          className="font-serif-title text-[16px] font-semibold text-[#1c1c19] hover:text-[#9b2f00] cursor-pointer"
                        >
                          {bookItem?.title || `Book #${rev.bookId}`}
                        </h3>
                        <p className="text-[12px] text-[#8d7168]">
                          {bookItem?.author} • Published {rev.createdAt}
                        </p>
                      </div>
                    </div>

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

                  <p className="text-[14px] text-[#1c1c19] leading-relaxed bg-[#f6f3ee] p-3 rounded-lg border border-[#e5e2dd]">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#8d7168]">
                      Status: <strong className="text-green-700 font-semibold">{rev.status}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(rev)}
                        className="px-3 py-1.5 rounded-lg bg-[#f0ede9] text-[#1c1c19] hover:bg-[#ebe8e3] text-xs font-semibold flex items-center gap-1 border border-[#e5e2dd]"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit</span>
                        <span>Edit Review</span>
                      </button>
                      <button
                        onClick={() => deleteReview(rev.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#ffdad6] text-[#ba1a1a] hover:bg-[#ffb4ab] text-xs font-semibold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-2xl space-y-4 border border-[#e5e2dd] animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0ede9]">
              <h3 className="font-serif-title text-[20px] font-bold text-[#1c1c19]">
                Edit Your Course Review
              </h3>
              <button
                onClick={() => setEditingReview(null)}
                className="text-[#8d7168] hover:text-[#1c1c19]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={saveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#59413a] mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-1 justify-around bg-[#f6f3ee] p-2 rounded-xl border border-[#e5e2dd]">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => setEditRating(score)}
                      className={`p-1 text-2xl ${
                        score <= editRating ? 'text-[#fe932c]' : 'text-[#dcdad5]'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#59413a] mb-1">
                  Review Comment
                </label>
                <textarea
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl bg-[#f6f3ee] text-[#1c1c19] text-sm focus:outline-none border border-[#e5e2dd] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-xl bg-[#f0ede9] text-[#59413a] text-xs font-semibold hover:bg-[#ebe8e3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#c2410c] hover:bg-[#9b2f00] text-white text-xs font-semibold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
