export type UserRole = 'USER' | 'FACULTY' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  avatarInitials: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  categoryTag: string; // e.g. "Tech", "Fiction", "Science", "Mystery", "Biography"
  description: string;
  coverImageUrl: string;
  isbn: string;
  pubYear: number;
  publisher?: string;
  format?: string; // e.g. "Hardcover • 412 pp"
  featured?: boolean;
  departmentChoice?: string; // e.g. "CS Dept Choice", "All-time Favorite"
  createdAt: string;
}

export interface Review {
  id: number;
  userId: number;
  bookId: number;
  userName: string;
  userRole: UserRole;
  userBadge?: string; // e.g. "CS Student ID: 2024-884", "Dept. of Computer Science", "Final Year CS"
  userInitials: string;
  rating: number; // 1 to 5
  comment: string;
  status: 'APPROVED' | 'PENDING' | 'FLAGGED';
  helpfulCount: number;
  badgeLabel?: string; // e.g. "Course Syllabus Recommended", "Practical Java Capstone"
  createdAt: string;
}

export type ActiveTab = 'home' | 'browse' | 'top-rated' | 'account' | 'book-details';

export interface JavaCodeStage {
  id: number;
  stageName: string;
  title: string;
  description: string;
  files: {
    path: string;
    language: string;
    description: string;
    code: string;
  }[];
  instructions: string;
  commonErrors: {
    error: string;
    solution: string;
  }[];
}
