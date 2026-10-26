import { JavaCodeStage } from '../types';

export const JAVA_PROJECT_STAGES: JavaCodeStage[] = [
  {
    id: 1,
    stageName: 'Stage 1',
    title: 'MySQL Database Schema & Seed Data',
    description:
      'Creates the book_review_db database with users, books, and reviews tables, enforcing foreign keys, unique email constraints, cascades, and sample data.',
    instructions:
      '1. Open MySQL Workbench, phpMyAdmin, or mysql CLI via terminal.\n2. Run: mysql -u root -p\n3. Execute the SQL script below to create the schema and populate records.\n4. Verify with: SHOW TABLES; and SELECT * FROM books;',
    files: [
      {
        path: 'database/book_review_db.sql',
        language: 'sql',
        description: 'Complete MySQL schema with tables, constraints, indexes, and initial seeds',
        code: `-- ==========================================================
-- Online Book Review System - Advanced Java Programming (AJP)
-- Database Creation & Schema Script for MySQL 8.x
-- Database: book_review_db
-- ==========================================================

DROP DATABASE IF EXISTS book_review_db;
CREATE DATABASE book_review_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE book_review_db;

-- 1. Table: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    student_id VARCHAR(50) DEFAULT NULL,
    department VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- 2. Table: books
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(200) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    cover_image_url VARCHAR(500) DEFAULT NULL,
    isbn VARCHAR(50) DEFAULT NULL,
    pub_year INT DEFAULT NULL,
    publisher VARCHAR(150) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_book_title (title),
    INDEX idx_book_genre (genre)
) ENGINE=InnoDB;

-- 3. Table: reviews
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    status ENUM('APPROVED', 'PENDING', 'FLAGGED') NOT NULL DEFAULT 'APPROVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_book UNIQUE (user_id, book_id)
) ENGINE=InnoDB;

-- ==========================================================
-- Sample Data Seeding
-- Passwords: BCrypt hashed values (Default password for all: password123)
-- BCrypt hash for "password123": $2a$12$e80yqZ.Hh1N78B7u7Jq7oO4l1o8.Q0aC/l2z3nQyL0M4a0bKjQn9K
-- ==========================================================

INSERT INTO users (id, name, email, password_hash, role, student_id, department) VALUES
(1, 'Admin SysAdmin', 'admin@bookreview.edu', '$2a$12$e80yqZ.Hh1N78B7u7Jq7oO4l1o8.Q0aC/l2z3nQyL0M4a0bKjQn9K', 'ADMIN', NULL, 'Campus IT Administration'),
(2, 'Alex Chen', 'alex.chen@university.edu', '$2a$12$e80yqZ.Hh1N78B7u7Jq7oO4l1o8.Q0aC/l2z3nQyL0M4a0bKjQn9K', 'USER', '2024-884', 'Computer Science'),
(3, 'Prof. David K.', 'david.k@university.edu', '$2a$12$e80yqZ.Hh1N78B7u7Jq7oO4l1o8.Q0aC/l2z3nQyL0M4a0bKjQn9K', 'USER', NULL, 'Dept. of Computer Science'),
(4, 'Priya Sharma', 'priya.s@university.edu', '$2a$12$e80yqZ.Hh1N78B7u7Jq7oO4l1o8.Q0aC/l2z3nQyL0M4a0bKjQn9K', 'USER', '2024-712', 'Final Year CS');

INSERT INTO books (id, title, author, genre, description, cover_image_url, isbn, pub_year, publisher) VALUES
(101, 'Clean Architecture', 'Robert C. Martin', 'Technology', 
'By applying universal rules of software structure, Martin establishes direct guidelines for component cohesion, boundaries, and clean separation of concerns. Equips aspiring engineers to build robust enterprise architectures.',
'https://lh3.googleusercontent.com/aida-public/AB6AXuCTUyfzZWqHNWG-QY0-uvwIPkW9PE80odFeUlGiPFvZIPr7Y6eN5DtUHqxXTcmLyOIsYhbwF2_RyAwY5nvoXwE0KQ-X0lgc7x-f70GHp5nNpaBVeF-iX-Hy3em0joHe1O99OULiIVmnWskwJMRrpRnOD2obSO2iN0i9spMgKv8R_kbdyvcOKRhsQnv2dWPyYweS0yW6vXlT99G5vzsjNA8tyTvIdKzOsALZdiw8btZLpVfHeouK5tNIeg',
'978-0134494166', 2017, 'Prentice Hall'),

(102, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', 
'A classic exploration of moral courage, racial injustice, and empathy in the American South as lawyer Atticus Finch defends an innocent man.',
'https://lh3.googleusercontent.com/aida-public/AB6AXuDbvzmDdpE0qhfxHZrQmpqcMUfgYXMUw30FA205ZcNdzh1T_LiB_lmGqdTdZuA9u0iTZ2r_4ZcmyDEz-15JVIgAmJ9oB8k-gxEGIndt583MjmlRx4gVRgtj9KCIgkwexNE_wScX08WZ7LOVr4XK1vFKLaG3h8NdEgNlqIcb6ssMoNiaxHMDTz02ZDADtSM_5rahXl5llpkQvv98j1e7ogWLjfTU0EyE85-fkmjUaROQuTm8PFHXmR3KcA',
'978-0061120084', 1960, 'J. B. Lippincott & Co.'),

(103, 'A Brief History of Time', 'Stephen Hawking', 'Science', 
'Hawking guides readers through the cosmos, exploring the Big Bang, black holes, general relativity, and quantum mechanics.',
'https://lh3.googleusercontent.com/aida-public/AB6AXuC7LyteOVXwW_SE5qthh2UDHlzf4R65VHpJAV10dY-Yfd-IKmFO_eZUf5GWxn6YV-JAIdmrXoPwsoSAqxZuLOG4w-7T3tNrZGYyEKsqQDq_J29ATHky9pkaNfPVWSquZkgLHJHb5Wv71bQQ3Qdi4HreyIkiRwdDe8Ea-o0tY9oBKGOZMqVsdX1zQ3dGdCj-XVmH8pOs7fpP3LPSiLgyP3ma4pa4QZReZdZT4foSuYN6oiWf4CQfqzwPDA',
'978-0553380163', 1988, 'Bantam Books'),

(104, 'Effective Java (3rd Edition)', 'Joshua Bloch', 'Technology', 
'The definitive best-practices guide for modern Java programming, covering 90 essential items across lambdas, streams, generics, and concurrency.',
'https://lh3.googleusercontent.com/aida-public/AB6AXuCaZN2kPGaQ5Q0-gL3NTogbtm338DoKvtqK9zJ325zxagjfpf8XTxN0iIn4rfv4R2YU7VSR2mYWh8J2uLPmRe1IQCBnJk7umq8-wCfYpSIB0H8P6dH1RbpocozXU7WD6vxpkbbnBbHrh40gMbD8OOpfY3OWfe4gFfC79SuSI2suBuRnCUln9xqWhz3kNZTN41npBrqDdiosuS0qRC9jeVxA_sE-bGGLF-VOj1H8hlr1shCsCS3TMrbeaA',
'978-0134685991', 2018, 'Addison-Wesley');

INSERT INTO reviews (user_id, book_id, rating, comment, status) VALUES
(3, 101, 5, 'Essential reading for any student embarking on large-scale Java web applications and MVC enterprise architecture.', 'APPROVED'),
(4, 101, 4, 'Clear breakdown of SOLID principles. Made our Advanced Java mini project modular and easy to maintain.', 'APPROVED'),
(2, 102, 5, 'An extraordinary emotional journey. Atticus Finch represents integrity at its peak.', 'APPROVED'),
(2, 104, 5, 'The concurrency items in Chapter 11 are indispensable for clearing Advanced Java lab assignments. A must-read masterwork.', 'PENDING');
`,
      },
    ],
    commonErrors: [
      {
        error: "ERROR 1049 (42000): Unknown database 'book_review_db'",
        solution: 'Make sure to run the CREATE DATABASE book_review_db statement before executing USE book_review_db.',
      },
      {
        error: 'ERROR 1062 (23000): Duplicate entry for key email',
        solution: 'The email column has a UNIQUE constraint. Use a distinct email address for each user.',
      },
    ],
  },
  {
    id: 2,
    stageName: 'Stage 2',
    title: 'Eclipse Project Setup, JARs & DBConnection',
    description:
      'Setting up an Eclipse "Dynamic Web Project", web.xml deployment descriptor, placing required JARs into WebContent/WEB-INF/lib, and implementing the thread-safe JDBC connection utility.',
    instructions:
      '1. In Eclipse IDE: File -> New -> Dynamic Web Project -> Project name: BookReviewSystem -> Target runtime: Apache Tomcat v9.0 -> Dynamic web module version: 4.0 -> Check "Generate web.xml deployment descriptor".\n2. Download JARs and paste into WebContent/WEB-INF/lib/:\n   - mysql-connector-j-8.3.0.jar\n   - jbcrypt-0.4.jar\n   - jstl-1.2.jar\n3. Right-click project -> Build Path -> Configure Build Path -> Add JARs -> select the 3 JARs from WEB-INF/lib.\n4. Create package "util" under src/ and add DBConnection.java & PasswordUtil.java.',
    files: [
      {
        path: 'WebContent/WEB-INF/web.xml',
        language: 'xml',
        description: 'Standard Tomcat 9 Servlet 4.0 Deployment Descriptor',
        code: `<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                             http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <display-name>BookReviewSystem</display-name>

    <welcome-file-list>
        <welcome-file>index.jsp</welcome-file>
    </welcome-file-list>

    <!-- Session Timeout Configuration (30 minutes) -->
    <session-config>
        <session-timeout>30</session-timeout>
        <cookie-config>
            <http-only>true</http-only>
        </cookie-config>
    </session-config>
</web-app>`,
      },
      {
        path: 'src/util/DBConnection.java',
        language: 'java',
        description: 'Thread-safe JDBC connection manager with environment fallback',
        code: `package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * DBConnection utility class for obtaining MySQL connections using JDBC PreparedStatement.
 * Advanced Java Programming Capstone Project.
 */
public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/book_review_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";
    private static final String USER = "root";
    private static final String PASSWORD = "root"; // Change to your local MySQL root password

    static {
        try {
            // Load MySQL Connector/J driver
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println("CRITICAL: MySQL JDBC Driver not found in WEB-INF/lib!");
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}`,
      },
      {
        path: 'src/util/PasswordUtil.java',
        language: 'java',
        description: 'BCrypt password hashing and verification helper',
        code: `package util;

import org.mindrot.jbcrypt.BCrypt;

/**
 * Secure password hashing using BCrypt algorithm to protect credentials in MySQL.
 */
public class PasswordUtil {
    private static final int WORKLOAD = 12;

    public static String hashPassword(String plainPassword) {
        if (plainPassword == null || plainPassword.trim().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be blank.");
        }
        String salt = BCrypt.gensalt(WORKLOAD);
        return BCrypt.hashpw(plainPassword, salt);
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        if (plainPassword == null || hashedPassword == null) {
            return false;
        }
        try {
            return BCrypt.checkpw(plainPassword, hashedPassword);
        } catch (Exception e) {
            return false;
        }
    }
}`,
      },
    ],
    commonErrors: [
      {
        error: 'ClassNotFoundException: com.mysql.cj.jdbc.Driver',
        solution: 'mysql-connector-j-8.x.jar is missing from WebContent/WEB-INF/lib. Paste it there and restart Tomcat.',
      },
      {
        error: 'Access denied for user "root"@"localhost"',
        solution: 'Verify the PASSWORD string inside DBConnection.java matches your local MySQL server password.',
      },
    ],
  },
  {
    id: 3,
    stageName: 'Stage 3',
    title: 'Model Classes & DAO (Data Access Object) Layer',
    description:
      'Implements standard POJO models (User, Book, Review) and robust DAO classes using JDBC PreparedStatement, try-with-resources, and transaction safeguards.',
    instructions:
      '1. Under src/, create package "model".\n2. Add User.java, Book.java, and Review.java.\n3. Under src/, create package "dao".\n4. Add UserDAO.java, BookDAO.java, and ReviewDAO.java.\n5. Notice how each DAO uses try-with-resources to guarantee Connection, PreparedStatement, and ResultSet closure without leaks.',
    files: [
      {
        path: 'src/model/Book.java',
        language: 'java',
        description: 'Book POJO entity',
        code: `package model;

import java.io.Serializable;
import java.sql.Timestamp;

public class Book implements Serializable {
    private static final long serialVersionUID = 1L;

    private int id;
    private String title;
    private String author;
    private String genre;
    private String description;
    private String coverImageUrl;
    private String isbn;
    private Integer pubYear;
    private String publisher;
    private Timestamp createdAt;

    // Derived fields calculated via DAO
    private double averageRating;
    private int reviewCount;

    public Book() {}

    public Book(int id, String title, String author, String genre, String description,
                String coverImageUrl, String isbn, Integer pubYear, String publisher) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.description = description;
        this.coverImageUrl = coverImageUrl;
        this.isbn = isbn;
        this.pubYear = pubYear;
        this.publisher = publisher;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public Integer getPubYear() { return pubYear; }
    public void setPubYear(Integer pubYear) { this.pubYear = pubYear; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public double getAverageRating() { return averageRating; }
    public void setAverageRating(double averageRating) { this.averageRating = averageRating; }

    public int getReviewCount() { return reviewCount; }
    public void setReviewCount(int reviewCount) { this.reviewCount = reviewCount; }
}`,
      },
      {
        path: 'src/dao/BookDAO.java',
        language: 'java',
        description: 'Book data access methods: search, genre filter, ratings calculation, CRUD',
        code: `package dao;

import model.Book;
import util.DBConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class BookDAO {

    public List<Book> getAllBooks(String searchQuery, String genreFilter, String sortBy) {
        List<Book> books = new ArrayList<>();
        StringBuilder sql = new StringBuilder(
            "SELECT b.*, COALESCE(AVG(r.rating), 0.0) AS avg_rating, COUNT(r.id) AS rev_count " +
            "FROM books b " +
            "LEFT JOIN reviews r ON b.id = r.book_id AND r.status = 'APPROVED' " +
            "WHERE 1=1 "
        );

        List<Object> params = new ArrayList<>();
        if (searchQuery != null && !searchQuery.trim().isEmpty()) {
            sql.append("AND (LOWER(b.title) LIKE ? OR LOWER(b.author) LIKE ?) ");
            String q = "%" + searchQuery.trim().toLowerCase() + "%";
            params.add(q);
            params.add(q);
        }
        if (genreFilter != null && !genreFilter.trim().isEmpty() && !genreFilter.equalsIgnoreCase("all")) {
            sql.append("AND LOWER(b.genre) = ? ");
            params.add(genreFilter.trim().toLowerCase());
        }

        sql.append("GROUP BY b.id ");

        if ("rating".equalsIgnoreCase(sortBy)) {
            sql.append("ORDER BY avg_rating DESC, b.title ASC");
        } else if ("reviews".equalsIgnoreCase(sortBy)) {
            sql.append("ORDER BY rev_count DESC, b.title ASC");
        } else {
            sql.append("ORDER BY b.title ASC");
        }

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql.toString())) {

            for (int i = 0; i < params.size(); i++) {
                ps.setObject(i + 1, params.get(i));
            }

            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Book b = mapRow(rs);
                    b.setAverageRating(Math.round(rs.getDouble("avg_rating") * 10.0) / 10.0);
                    b.setReviewCount(rs.getInt("rev_count"));
                    books.add(b);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return books;
    }

    public Book getBookById(int id) {
        String sql = "SELECT b.*, COALESCE(AVG(r.rating), 0.0) AS avg_rating, COUNT(r.id) AS rev_count " +
                     "FROM books b " +
                     "LEFT JOIN reviews r ON b.id = r.book_id AND r.status = 'APPROVED' " +
                     "WHERE b.id = ? GROUP BY b.id";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Book b = mapRow(rs);
                    b.setAverageRating(Math.round(rs.getDouble("avg_rating") * 10.0) / 10.0);
                    b.setReviewCount(rs.getInt("rev_count"));
                    return b;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean insertBook(Book book) {
        String sql = "INSERT INTO books (title, author, genre, description, cover_image_url, isbn, pub_year, publisher) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setString(1, book.getTitle());
            ps.setString(2, book.getAuthor());
            ps.setString(3, book.getGenre());
            ps.setString(4, book.getDescription());
            ps.setString(5, book.getCoverImageUrl());
            ps.setString(6, book.getIsbn());
            if (book.getPubYear() != null) ps.setInt(7, book.getPubYear()); else ps.setNull(7, Types.INTEGER);
            ps.setString(8, book.getPublisher());

            int rows = ps.executeUpdate();
            if (rows > 0) {
                try (ResultSet keys = ps.getGeneratedKeys()) {
                    if (keys.next()) book.setId(keys.getInt(1));
                }
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean updateBook(Book book) {
        String sql = "UPDATE books SET title=?, author=?, genre=?, description=?, cover_image_url=?, isbn=?, pub_year=?, publisher=? WHERE id=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, book.getTitle());
            ps.setString(2, book.getAuthor());
            ps.setString(3, book.getGenre());
            ps.setString(4, book.getDescription());
            ps.setString(5, book.getCoverImageUrl());
            ps.setString(6, book.getIsbn());
            if (book.getPubYear() != null) ps.setInt(7, book.getPubYear()); else ps.setNull(7, Types.INTEGER);
            ps.setString(8, book.getPublisher());
            ps.setInt(9, book.getId());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean deleteBook(int id) {
        String sql = "DELETE FROM books WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    private Book mapRow(ResultSet rs) throws SQLException {
        Book b = new Book();
        b.setId(rs.getInt("id"));
        b.setTitle(rs.getString("title"));
        b.setAuthor(rs.getString("author"));
        b.setGenre(rs.getString("genre"));
        b.setDescription(rs.getString("description"));
        b.setCoverImageUrl(rs.getString("cover_image_url"));
        b.setIsbn(rs.getString("isbn"));
        b.setPubYear((Integer) rs.getObject("pub_year"));
        b.setPublisher(rs.getString("publisher"));
        b.setCreatedAt(rs.getTimestamp("created_at"));
        return b;
    }
}`,
      },
    ],
    commonErrors: [
      {
        error: 'SQLSyntaxErrorException: You have an error in your SQL syntax',
        solution: 'Check the commas and spaces in the dynamic StringBuilder inside getAllBooks().',
      },
    ],
  },
  {
    id: 4,
    stageName: 'Stage 4',
    title: 'Servlets, Authentication & Session Handling',
    description:
      'Implements LoginServlet, RegisterServlet, LogoutServlet, BookListServlet, BookDetailsServlet, and ReviewServlet with role checking and redirect-after-POST.',
    instructions:
      '1. Under src/, create package "servlet".\n2. Add LoginServlet.java, RegisterServlet.java, LogoutServlet.java, BookListServlet.java, BookDetailsServlet.java, and ReviewServlet.java.\n3. Annotated with @WebServlet("/path") for clean zero-XML servlet configuration.',
    files: [
      {
        path: 'src/servlet/LoginServlet.java',
        language: 'java',
        description: 'Validates user credentials against MySQL and initializes HTTP session',
        code: `package servlet;

import dao.UserDAO;
import model.User;
import util.PasswordUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    private UserDAO userDAO;

    @Override
    public void init() {
        this.userDAO = new UserDAO();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("login.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            req.setAttribute("errorMessage", "Email and password are required.");
            req.getRequestDispatcher("login.jsp").forward(req, resp);
            return;
        }

        User user = userDAO.getUserByEmail(email.trim().toLowerCase());
        if (user != null && PasswordUtil.checkPassword(password, user.getPasswordHash())) {
            HttpSession session = req.getSession(true);
            session.setAttribute("currentUser", user);
            session.setAttribute("userRole", user.getRole());

            if ("ADMIN".equals(user.getRole())) {
                resp.sendRedirect("AdminDashboardServlet");
            } else {
                resp.sendRedirect("BookListServlet");
            }
        } else {
            req.setAttribute("errorMessage", "Invalid email or password credentials.");
            req.getRequestDispatcher("login.jsp").forward(req, resp);
        }
    }
}`,
      },
      {
        path: 'src/servlet/ReviewServlet.java',
        language: 'java',
        description: 'Handles 1-5 star review submissions, validation, and update handling',
        code: `package servlet;

import dao.ReviewDAO;
import model.Review;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/ReviewServlet")
public class ReviewServlet extends HttpServlet {
    private ReviewDAO reviewDAO;

    @Override
    public void init() {
        this.reviewDAO = new ReviewDAO();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);
        User currentUser = (session != null) ? (User) session.getAttribute("currentUser") : null;

        if (currentUser == null) {
            resp.sendRedirect("login.jsp?error=Must+login+to+submit+review");
            return;
        }

        try {
            int bookId = Integer.parseInt(req.getParameter("bookId"));
            int rating = Integer.parseInt(req.getParameter("rating"));
            String comment = req.getParameter("comment");

            if (rating < 1 || rating > 5 || comment == null || comment.trim().isEmpty()) {
                resp.sendRedirect("BookDetailsServlet?id=" + bookId + "&error=Invalid+rating+or+empty+comment");
                return;
            }

            Review review = new Review();
            review.setUserId(currentUser.getId());
            review.setBookId(bookId);
            review.setRating(rating);
            review.setComment(comment.trim());
            review.setStatus("APPROVED");

            reviewDAO.upsertReview(review);
            resp.sendRedirect("BookDetailsServlet?id=" + bookId + "&success=Review+submitted+successfully");
        } catch (Exception e) {
            e.printStackTrace();
            resp.sendRedirect("BookListServlet?error=Review+processing+error");
        }
    }
}`,
      },
    ],
    commonErrors: [
      {
        error: 'NullPointerException when submitting a review',
        solution: 'Session was null. Ensure user is logged in before allowing the POST request.',
      },
    ],
  },
  {
    id: 5,
    stageName: 'Stage 5',
    title: 'JSP Pages, CSS & JavaScript Client',
    description:
      'Implements clean, accessible JSP templates with JSTL tags, the warm cream / terracotta bookstore theme, and interactive star selectors.',
    instructions:
      '1. Create index.jsp, books.jsp, book-details.jsp, login.jsp, register.jsp, dashboard.jsp in WebContent/.\n2. Create WebContent/css/style.css and WebContent/js/script.js.\n3. Make sure taglib <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> is included.',
    files: [
      {
        path: 'WebContent/book-details.jsp',
        language: 'jsp',
        description: 'Book detail page showing ratings breakdown and review submission form',
        code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>\${book.title} - BookReview</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="bg-cream">
    <header class="navbar">
        <a href="BookListServlet" class="brand">BookReview</a>
        <nav>
            <a href="BookListServlet">Catalogue</a>
            <c:choose>
                <c:when test="\${not empty sessionScope.currentUser}">
                    <a href="DashboardServlet">My Account</a>
                    <a href="LogoutServlet">Logout (\${sessionScope.currentUser.name})</a>
                </c:when>
                <c:otherwise>
                    <a href="login.jsp">Login</a>
                    <a href="register.jsp">Register</a>
                </c:otherwise>
            </c:choose>
        </nav>
    </header>

    <main class="container">
        <div class="book-card-detail">
            <img src="\${book.coverImageUrl}" alt="\${book.title}" class="book-cover-large">
            <div class="book-info">
                <h1>\${book.title}</h1>
                <p class="author">by \${book.author} | <span class="genre">\${book.genre}</span></p>
                <p class="isbn">ISBN: \${book.isbn} • Published: \${book.pubYear}</p>
                <div class="rating-badge">★ \${book.averageRating} / 5.0 (\${book.reviewCount} reviews)</div>
                <p class="synopsis">\${book.description}</p>
            </div>
        </div>

        <section class="review-submission">
            <h2>Write a Review</h2>
            <c:choose>
                <c:when test="\${not empty sessionScope.currentUser}">
                    <form action="ReviewServlet" method="POST">
                        <input type="hidden" name="bookId" value="\${book.id}">
                        <label>Rating (1 to 5 Stars):</label>
                        <select name="rating" required>
                            <option value="5">★★★★★ - 5.0 Exceptional</option>
                            <option value="4">★★★★☆ - 4.0 Highly Recommended</option>
                            <option value="3">★★★☆☆ - 3.0 Competent</option>
                            <option value="2">★★☆☆☆ - 2.0 Needs Revision</option>
                            <option value="1">★☆☆☆☆ - 1.0 Disappointing</option>
                        </select>
                        <label>Your Critique & Comments:</label>
                        <textarea name="comment" rows="4" required></textarea>
                        <button type="submit" class="btn-primary">Submit Review via Servlet</button>
                    </form>
                </c:when>
                <c:otherwise>
                    <p class="login-notice">Please <a href="login.jsp">Log In</a> to submit your academic review.</p>
                </c:otherwise>
            </c:choose>
        </section>
    </main>
</body>
</html>`,
      },
    ],
    commonErrors: [
      {
        error: 'JSP translation error: The absolute uri: [http://java.sun.com/jsp/jstl/core] cannot be resolved',
        solution: 'jstl-1.2.jar is missing from WebContent/WEB-INF/lib/. Paste jstl-1.2.jar there.',
      },
    ],
  },
  {
    id: 6,
    stageName: 'Stage 6',
    title: 'Admin Dashboard & Content Moderation',
    description:
      'AdminBookServlet and AdminReviewServlet allowing admins to add, edit, and delete books, plus moderate flagged student reviews.',
    instructions:
      '1. Implement AdminBookServlet.java and AdminReviewServlet.java.\n2. Protect every action using: if (!"ADMIN".equals(user.getRole())) { resp.sendError(403); }\n3. Create admin-dashboard.jsp to render the KPI counters and records table.',
    files: [
      {
        path: 'src/servlet/AdminBookServlet.java',
        language: 'java',
        description: 'Protected Servlet handling Add, Edit, and Delete book operations with role verification',
        code: `package servlet;

import dao.BookDAO;
import model.Book;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/AdminBookServlet")
public class AdminBookServlet extends HttpServlet {
    private BookDAO bookDAO;

    @Override
    public void init() {
        this.bookDAO = new BookDAO();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);
        User currentUser = (session != null) ? (User) session.getAttribute("currentUser") : null;

        // Role check
        if (currentUser == null || !"ADMIN".equals(currentUser.getRole())) {
            resp.sendError(HttpServletResponse.SC_FORBIDDEN, "Access denied. Admin authorization required.");
            return;
        }

        String action = req.getParameter("action");
        if ("add".equalsIgnoreCase(action)) {
            Book b = new Book();
            b.setTitle(req.getParameter("title"));
            b.setAuthor(req.getParameter("author"));
            b.setGenre(req.getParameter("genre"));
            b.setDescription(req.getParameter("description"));
            b.setCoverImageUrl(req.getParameter("coverImageUrl"));
            b.setIsbn(req.getParameter("isbn"));
            String yr = req.getParameter("pubYear");
            if (yr != null && !yr.isEmpty()) b.setPubYear(Integer.parseInt(yr));
            bookDAO.insertBook(b);
        } else if ("delete".equalsIgnoreCase(action)) {
            int bookId = Integer.parseInt(req.getParameter("id"));
            bookDAO.deleteBook(bookId);
        }

        resp.sendRedirect("AdminDashboardServlet");
    }
}`,
      },
    ],
    commonErrors: [
      {
        error: 'HTTP Status 403 - Forbidden',
        solution: 'Log in with the SysAdmin account (admin@bookreview.edu) before visiting /AdminDashboardServlet.',
      },
    ],
  },
  {
    id: 7,
    stageName: 'Stage 7',
    title: 'Testing, Troubleshooting & Project Submission Guide',
    description:
      'Step-by-step instructions to compile, run on Apache Tomcat 9, verify MySQL connections, and execute end-to-end test cases for college viva demonstration.',
    instructions:
      '1. Start MySQL Server on port 3306.\n2. In Eclipse, right-click Tomcat v9.0 Server in the "Servers" tab -> Start.\n3. Right-click BookReviewSystem project -> Run As -> Run on Server.\n4. Browse to: http://localhost:8080/BookReviewSystem/\n5. Test User Flow: Register -> Login -> Browse -> Submit Review.\n6. Test Admin Flow: Login as admin@bookreview.edu -> Add book -> Delete book -> Approve review in queue.',
    files: [
      {
        path: 'docs/PROJECT_DOCUMENTATION.md',
        language: 'markdown',
        description: 'Comprehensive Mini Project Report, Viva Q&A, and Architecture Guide',
        code: `# Online Book Review System - Advanced Java Programming (AJP)
## Mini Project Documentation & Viva Voce Reference

### 1. Architectural Model (MVC Architecture)
- **Model Layer**: Java POJOs (\`User.java\`, \`Book.java\`, \`Review.java\`) representing business entities.
- **View Layer**: JSP files with JSTL (\`<c:forEach>\`, \`<c:if>\`) and CSS3 styling with warm cream and terracotta tones.
- **Controller Layer**: Java Servlets (\`BookListServlet\`, \`ReviewServlet\`, \`LoginServlet\`) routing requests and enforcing security.
- **DAO Layer**: JDBC \`PreparedStatement\` data access avoiding SQL injection vulnerabilities.

### 2. Common Viva Voce Questions & Answers
- **Q: Why use PreparedStatement over Statement?**
  *A: PreparedStatement precompiles SQL queries, boosts performance for repetitive queries, and automatically escapes input parameters to prevent SQL Injection.*
- **Q: How is session tracking maintained?**
  *A: Via HTTP Sessions using \`req.getSession(true)\`. Tomcat manages a JSESSIONID cookie transmitted in HTTP headers.*
- **Q: How does the application prevent duplicate reviews?**
  *A: The database enforces a UNIQUE constraint on \`(user_id, book_id)\`, and \`ReviewDAO\` executes an \`ON DUPLICATE KEY UPDATE\` or upsert operation.*
`,
      },
    ],
    commonErrors: [
      {
        error: 'Tomcat Port 8080 already in use',
        solution: 'Kill the process using port 8080 via: kill $(lsof -t -i:8080) or change Tomcat HTTP connector port to 8081 in Server.xml.',
      },
    ],
  },
];
