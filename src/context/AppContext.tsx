import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Review, User, ActiveTab } from '../types';
import { INITIAL_BOOKS, INITIAL_REVIEWS, INITIAL_USERS } from '../data/seedData';

interface AppContextType {
  books: Book[];
  reviews: Review[];
  users: User[];
  currentUser: User | null;
  activeTab: ActiveTab;
  selectedBookId: number | null;
  searchQuery: string;
  selectedGenre: string;
  sortBy: string;
  showAuthModal: boolean;
  showJavaModal: boolean;
  activeJavaStage: number;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedBookId: (id: number | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string) => void;
  setSortBy: (sort: string) => void;
  setShowAuthModal: (show: boolean) => void;
  setShowJavaModal: (show: boolean) => void;
  setActiveJavaStage: (stage: number) => void;
  selectBook: (id: number) => void;
  addBook: (bookData: Omit<Book, 'id' | 'createdAt'>) => Book;
  updateBook: (book: Book) => void;
  deleteBook: (id: number) => void;
  addReview: (data: { bookId: number; rating: number; comment: string }) => boolean;
  updateReview: (id: number, rating: number, comment: string) => void;
  deleteReview: (id: number) => void;
  moderateReview: (id: number, status: 'APPROVED' | 'FLAGGED') => void;
  likeReview: (id: number) => void;
  loginAs: (userId: number) => void;
  login: (email: string, password?: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, studentId?: string, department?: string) => boolean;
  showToastMessage: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: () => void;
  getBookStats: (bookId: number) => {
    average: number;
    count: number;
    breakdown: { [score: number]: { count: number; percent: number } };
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKS: 'bookreview_books_v1',
  REVIEWS: 'bookreview_reviews_v1',
  USERS: 'bookreview_users_v1',
  CURRENT_USER: 'bookreview_current_user_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  // Default to Alex Chen (student user from the wireframes) for instant interactivity
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
      return INITIAL_USERS[1]; // Alex Chen
    } catch {
      return INITIAL_USERS[1];
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(101);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('highest_rated');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showJavaModal, setShowJavaModal] = useState<boolean>(false);
  const [activeJavaStage, setActiveJavaStage] = useState<number>(1);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [currentUser]);

  const showToastMessage = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const dismissToast = () => {
    setToast(null);
  };

  const selectBook = (id: number) => {
    setSelectedBookId(id);
    setActiveTab('book-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBookStats = (bookId: number) => {
    const bookReviews = reviews.filter((r) => r.bookId === bookId && r.status === 'APPROVED');
    const count = bookReviews.length;
    if (count === 0) {
      return {
        average: 0,
        count: 0,
        breakdown: {
          5: { count: 0, percent: 0 },
          4: { count: 0, percent: 0 },
          3: { count: 0, percent: 0 },
          2: { count: 0, percent: 0 },
          1: { count: 0, percent: 0 },
        },
      };
    }
    const sum = bookReviews.reduce((acc, r) => acc + r.rating, 0);
    const average = Math.round((sum / count) * 10) / 10;

    const breakdown: { [score: number]: { count: number; percent: number } } = {
      5: { count: 0, percent: 0 },
      4: { count: 0, percent: 0 },
      3: { count: 0, percent: 0 },
      2: { count: 0, percent: 0 },
      1: { count: 0, percent: 0 },
    };

    bookReviews.forEach((r) => {
      const score = Math.min(5, Math.max(1, r.rating));
      breakdown[score].count += 1;
    });

    Object.keys(breakdown).forEach((key) => {
      const k = parseInt(key, 10);
      breakdown[k].percent = Math.round((breakdown[k].count / count) * 100);
    });

    return { average, count, breakdown };
  };

  const addBook = (bookData: Omit<Book, 'id' | 'createdAt'>): Book => {
    const newId = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 101;
    const newBook: Book = {
      ...bookData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setBooks((prev) => [newBook, ...prev]);
    showToastMessage(`"${newBook.title}" successfully inserted into Database via BookDAO!`);
    return newBook;
  };

  const updateBook = (updatedBook: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
    showToastMessage(`Book #${updatedBook.id} synchronized with MySQL database.`);
  };

  const deleteBook = (id: number) => {
    const bookToDelete = books.find((b) => b.id === id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
    // Cascade delete reviews
    setReviews((prev) => prev.filter((r) => r.bookId !== id));
    showToastMessage(
      `Record "${bookToDelete?.title || id}" deleted successfully (CASCADE constraint executed)`,
      'info'
    );
  };

  const addReview = (data: { bookId: number; rating: number; comment: string }): boolean => {
    if (!currentUser) {
      setShowAuthModal(true);
      return false;
    }

    // Check if user already reviewed this book (enforces UNIQUE constraint on user_id, book_id)
    const existingIndex = reviews.findIndex(
      (r) => r.userId === currentUser.id && r.bookId === data.bookId
    );

    if (existingIndex >= 0) {
      // Upsert update
      setReviews((prev) =>
        prev.map((r, i) =>
          i === existingIndex
            ? {
                ...r,
                rating: data.rating,
                comment: data.comment,
                status: 'APPROVED',
                createdAt: new Date().toISOString().split('T')[0],
              }
            : r
        )
      );
      showToastMessage('Review updated in MySQL via PreparedStatement (ON DUPLICATE KEY UPDATE)!');
      return true;
    }

    const newReview: Review = {
      id: reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1,
      userId: currentUser.id,
      bookId: data.bookId,
      userName: currentUser.name,
      userRole: currentUser.role,
      userBadge: currentUser.studentId
        ? `CS Student ID: ${currentUser.studentId} • Today`
        : currentUser.department
        ? `${currentUser.department} • Today`
        : 'Active Session • Today',
      userInitials: currentUser.avatarInitials,
      rating: data.rating,
      comment: data.comment,
      status: 'APPROVED',
      helpfulCount: 0,
      badgeLabel: currentUser.role === 'FACULTY' ? 'Faculty Endorsement' : 'Student Verified',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newReview, ...prev]);
    showToastMessage('Review persisted to MySQL database via JDBC PreparedStatement!');
    return true;
  };

  const updateReview = (id: number, rating: number, comment: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, rating, comment } : r))
    );
    showToastMessage('Review changes updated in database.');
  };

  const deleteReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToastMessage('Review record deleted.');
  };

  const moderateReview = (id: number, status: 'APPROVED' | 'FLAGGED') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    showToastMessage(
      status === 'APPROVED'
        ? 'Review approved and published to student feed!'
        : 'Review flagged for academic moderator review.'
    );
  };

  const likeReview = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const loginAs = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      showToastMessage(`Authenticated as ${user.name} (${user.role})`);
    }
  };

  const login = (email: string, _password?: string): boolean => {
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToastMessage(`Session created for ${found.name}`);
      setShowAuthModal(false);
      return true;
    }
    showToastMessage('Invalid email credentials in MySQL user table.', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    showToastMessage('Session invalidated (Logged out)');
  };

  const register = (
    name: string,
    email: string,
    _password: string,
    studentId?: string,
    department?: string
  ): boolean => {
    const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      showToastMessage('Email already exists in MySQL database (UNIQUE constraint).', 'error');
      return false;
    }

    const initials = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUser: User = {
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email: email.trim().toLowerCase(),
      role: 'USER',
      studentId: studentId || `2024-${Math.floor(100 + Math.random() * 900)}`,
      department: department || 'Computer Science',
      avatarInitials: initials || 'ST',
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToastMessage(`Welcome ${name}! Student account registered with BCrypt hash.`);
    setShowAuthModal(false);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        books,
        reviews,
        users,
        currentUser,
        activeTab,
        selectedBookId,
        searchQuery,
        selectedGenre,
        sortBy,
        showAuthModal,
        showJavaModal,
        activeJavaStage,
        toast,
        setActiveTab,
        setSelectedBookId,
        setSearchQuery,
        setSelectedGenre,
        setSortBy,
        setShowAuthModal,
        setShowJavaModal,
        setActiveJavaStage,
        selectBook,
        addBook,
        updateBook,
        deleteBook,
        addReview,
        updateReview,
        deleteReview,
        moderateReview,
        likeReview,
        loginAs,
        login,
        logout,
        register,
        showToastMessage,
        dismissToast,
        getBookStats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
