import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID; // For unique IDs

/**
 * Represents a user in the system (Student or Instructor).
 * Implements Serializable for potential use with data persistence.
 */
class User implements Serializable {
    private static final long serialVersionUID = 1L;

    public enum Role {
        STUDENT, INSTRUCTOR
    }

    private String userId;
    private String username;
    private String email;
    private String passwordHash; // In a real app, store hash, not plain password
    private Role role;
    private String fullName;
    private String studentId; // For students
    private String facultyId; // For instructors

    public User(String username, String email, String passwordHash, Role role, String fullName) {
        this.userId = UUID.randomUUID().toString();
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.fullName = fullName;
    }

    // --- Getters ---
    public String getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPasswordHash() { return passwordHash; }
    public Role getRole() { return role; }
    public String getFullName() { return fullName; }
    public String getStudentId() { return studentId; }
    public String getFacultyId() { return facultyId; }

    // --- Setters (for profile updates) ---
    public void setUsername(String username) { this.username = username; }
    public void setEmail(String email) { this.email = email; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public void setFacultyId(String facultyId) { this.facultyId = facultyId; }

    @Override
    public String toString() {
        return "User{" +
               "userId='" + userId.substring(0, 8) + '\'' +
               ", username='" + username + '\'' +
               ", email='" + email + '\'' +
               ", role=" + role +
               ", fullName='" + fullName + '\'' +
               '}';
    }
}

/**
 * Represents a university course.
 * Implements Serializable for potential use with data persistence.
 */
class Course implements Serializable {
    private static final long serialVersionUID = 1L;
    private String courseId;
    private String courseCode; // e.g., "CS101"
    private String courseName; // e.g., "Introduction to Programming"
    private String instructorId; // Link to User.userId of the instructor
    private List<String> studentIds; // List of User.userIds enrolled in this course

    public Course(String courseCode, String courseName, String instructorId) {
        this.courseId = UUID.randomUUID().toString();
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.instructorId = instructorId;
        this.studentIds = new ArrayList<>();
    }

    // --- Getters ---
    public String getCourseId() { return courseId; }
    public String getCourseCode() { return courseCode; }
    public String getCourseName() { return courseName; }
    public String getInstructorId() { return instructorId; }
    public List<String> getStudentIds() { return studentIds; }

    // --- Setters ---
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public void setInstructorId(String instructorId) { this.instructorId = instructorId; }

    public void addStudent(String studentId) {
        if (!studentIds.contains(studentId)) {
            studentIds.add(studentId);
        }
    }

    public void removeStudent(String studentId) {
        studentIds.remove(studentId);
    }

    @Override
    public String toString() {
        return "Course{" +
               "courseCode='" + courseCode + '\'' +
               ", courseName='" + courseName + '\'' +
               ", instructorId='" + instructorId.substring(0, 8) + '\'' +
               '}';
    }
}

/**
 * Represents an attendance record for a student in a specific course on a given date.
 * Implements Serializable for potential use with data persistence.
 */
class AttendanceRecord implements Serializable {
    private static final long serialVersionUID = 1L;
    private String recordId;
    private String courseId;
    private String studentId;
    private LocalDate date;
    private LocalTime timeMarked; // When attendance was marked
    private boolean isPresent;

    public AttendanceRecord(String courseId, String studentId, LocalDate date, LocalTime timeMarked, boolean isPresent) {
        this.recordId = UUID.randomUUID().toString();
        this.courseId = courseId;
        this.studentId = studentId;
        this.date = date;
        this.timeMarked = timeMarked;
        this.isPresent = isPresent;
    }

    // --- Getters ---
    public String getRecordId() { return recordId; }
    public String getCourseId() { return courseId; }
    public String getStudentId() { return studentId; }
    public LocalDate getDate() { return date; }
    public LocalTime getTimeMarked() { return timeMarked; }
    public boolean isPresent() { return isPresent; }

    // --- Setters (for updating status if needed) ---
    public void setPresent(boolean present) { isPresent = present; }

    @Override
    public String toString() {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
        return "AttendanceRecord{" +
               "courseId='" + courseId.substring(0, 8) + '\'' +
               ", studentId='" + studentId.substring(0, 8) + '\'' +
               ", date=" + date.format(dateFormatter) +
               ", timeMarked=" + timeMarked.format(timeFormatter) +
               ", isPresent=" + isPresent +
               '}';
    }
}

/**
 * Conceptual Authentication Manager.
 * In a real Android app, this would use Firebase Authentication or a custom backend.
 */
class AuthenticationManager {
    // In a real app, this would interact with a database (e.g., Firebase Firestore/Auth)
    // private DatabaseManager dbManager; // Reference to your database manager

    // For simulation, we'll use in-memory storage for users
    private Map<String, User> registeredUsers = new HashMap<>();
    private User currentUser = null; // Currently logged-in user

    public AuthenticationManager(/*DatabaseManager dbManager*/) {
        // this.dbManager = dbManager;
        // Load users from DB on init
        // For demo, add some dummy users
        User instructor = new User("profsmith", "smith@university.edu", "pass123", User.Role.INSTRUCTOR, "Prof. John Smith");
        instructor.setFacultyId("F001");
        registeredUsers.put(instructor.getUserId(), instructor);

        User student1 = new User("johndoe", "john@student.edu", "pass123", User.Role.STUDENT, "John Doe");
        student1.setStudentId("S001");
        registeredUsers.put(student1.getUserId(), student1);

        User student2 = new User("janesmith", "jane@student.edu", "pass123", User.Role.STUDENT, "Jane Smith");
        student2.setStudentId("S002");
        registeredUsers.put(student2.getUserId(), student2);
    }

    /**
     * Registers a new user.
     * @param username
     * @param email
     * @param password
     * @param role
     * @param fullName
     * @return The registered User object, or null if registration fails (e.g., username/email taken).
     */
    public User registerUser(String username, String email, String password, User.Role role, String fullName) {
        // In a real app: check if username/email already exists in DB
        // Hash the password before storing! (e.g., BCrypt)
        for (User user : registeredUsers.values()) {
            if (user.getUsername().equals(username) || user.getEmail().equals(email)) {
                System.out.println("Registration failed: Username or email already exists.");
                return null;
            }
        }

        User newUser = new User(username, email, password /* HASHED PASSWORD */, role, fullName);
        registeredUsers.put(newUser.getUserId(), newUser);
        // dbManager.saveUser(newUser); // Save to database
        System.out.println("User registered: " + newUser.getUsername());
        return newUser;
    }

    /**
     * Authenticates a user.
     * @param usernameOrEmail
     * @param password
     * @return The authenticated User object, or null if authentication fails.
     */
    public User loginUser(String usernameOrEmail, String password) {
        for (User user : registeredUsers.values()) {
            if ((user.getUsername().equals(usernameOrEmail) || user.getEmail().equals(usernameOrEmail)) &&
                user.getPasswordHash().equals(password) /* COMPARE HASHED PASSWORD */) {
                currentUser = user;
                System.out.println("User logged in: " + user.getUsername());
                return user;
            }
        }
        System.out.println("Login failed: Invalid credentials.");
        return null;
    }

    /**
     * Logs out the current user.
     */
    public void logoutUser() {
        currentUser = null;
        System.out.println("User logged out.");
    }

    /**
     * Gets the currently logged-in user.
     * @return The current User, or null if no one is logged in.
     */
    public User getCurrentUser() {
        return currentUser;
    }

    /**
     * Retrieves a user by their ID.
     * @param userId
     * @return User object or null.
     */
    public User getUserById(String userId) {
        return registeredUsers.get(userId);
    }
}

/**
 * Conceptual Database Manager.
 * This class would abstract the actual database operations (SQLite or Firebase).
 * In a real app, this would be an interface or an abstract class with concrete
 * implementations for SQLiteManager and FirebaseManager.
 */
class DatabaseManager {
    // This class would contain methods to interact with your chosen database.
    // For Firebase:
    // private FirebaseFirestore db;
    // For SQLite:
    // private SQLiteOpenHelper dbHelper;

    public DatabaseManager(/* Android Context or Firebase App instance */) {
        // Initialize FirebaseFirestore or SQLiteOpenHelper here
    }

    // --- User Operations ---
    public void saveUser(User user) {
        System.out.println("DB: Saving user: " + user.getUsername());
        // Firebase: db.collection("users").document(user.getUserId()).set(user);
        // SQLite: Insert into users table
    }

    public User getUser(String userId) {
        System.out.println("DB: Fetching user: " + userId);
        // Firebase: db.collection("users").document(userId).get().toObject(User.class);
        // SQLite: Select from users table
        return null; // Placeholder
    }

    public List<User> getAllUsersByRole(User.Role role) {
        System.out.println("DB: Fetching all " + role + "s");
        // Firebase: db.collection("users").whereEqualTo("role", role.name()).get().toObjects(User.class);
        // SQLite: Select from users table where role = ?
        return new ArrayList<>(); // Placeholder
    }

    // --- Course Operations ---
    public void saveCourse(Course course) {
        System.out.println("DB: Saving course: " + course.getCourseCode());
        // Firebase: db.collection("courses").document(course.getCourseId()).set(course);
        // SQLite: Insert into courses table
    }

    public Course getCourse(String courseId) {
        System.out.println("DB: Fetching course: " + courseId);
        // Firebase: db.collection("courses").document(courseId).get().toObject(Course.class);
        // SQLite: Select from courses table
        return null; // Placeholder
    }

    public List<Course> getCoursesByInstructor(String instructorId) {
        System.out.println("DB: Fetching courses for instructor: " + instructorId);
        // Firebase: db.collection("courses").whereEqualTo("instructorId", instructorId).get().toObjects(Course.class);
        // SQLite: Select from courses table where instructorId = ?
        return new ArrayList<>(); // Placeholder
    }

    public List<Course> getCoursesByStudent(String studentId) {
        System.out.println("DB: Fetching courses for student: " + studentId);
        // Firebase: db.collection("courses").whereArrayContains("studentIds", studentId).get().toObjects(Course.class);
        // SQLite: Complex join or separate enrollment table
        return new ArrayList<>(); // Placeholder
    }

    // --- Attendance Operations ---
    public void saveAttendanceRecord(AttendanceRecord record) {
        System.out.println("DB: Saving attendance record for " + record.getStudentId() + " on " + record.getDate());
        // Firebase: db.collection("attendance").document(record.getRecordId()).set(record);
        // SQLite: Insert into attendance table
    }

    public List<AttendanceRecord> getAttendanceForCourse(String courseId) {
        System.out.println("DB: Fetching attendance for course: " + courseId);
        // Firebase: db.collection("attendance").whereEqualTo("courseId", courseId).get().toObjects(AttendanceRecord.class);
        // SQLite: Select from attendance table where courseId = ?
        return new ArrayList<>(); // Placeholder
    }

    public List<AttendanceRecord> getAttendanceForStudentInCourse(String studentId, String courseId) {
        System.out.println("DB: Fetching attendance for student " + studentId + " in course " + courseId);
        // Firebase: db.collection("attendance").whereEqualTo("studentId", studentId).whereEqualTo("courseId", courseId).get().toObjects(AttendanceRecord.class);
        // SQLite: Select from attendance table where studentId = ? AND courseId = ?
        return new ArrayList<>(); // Placeholder
    }

    // Other CRUD methods (update, delete) for all models would also go here.
}

/**
 * Main application logic manager.
 * Orchestrates interactions between AuthenticationManager and DatabaseManager.
 */
class UniversityAttendanceSystem {
    private AuthenticationManager authManager;
    private DatabaseManager dbManager;

    public UniversityAttendanceSystem() {
        this.dbManager = new DatabaseManager(); // Initialize DB connection
        this.authManager = new AuthenticationManager(); // Pass dbManager if it loads users from DB
        // For demo, we'll manually add some data to dbManager for testing
        // In a real app, dbManager would load data from the actual database
        addInitialDummyData();
    }

    private void addInitialDummyData() {
        // Simulate adding users to the database via authManager's internal map
        // In a real app, users would be loaded from dbManager.getAllUsers()
        User instructor = authManager.getUserById("F001"); // Assuming F001 is set in AuthManager
        if (instructor == null) {
            instructor = authManager.registerUser("profsmith", "smith@university.edu", "pass123", User.Role.INSTRUCTOR, "Prof. John Smith");
            if (instructor != null) instructor.setFacultyId("F001");
        }

        User student1 = authManager.getUserById("S001"); // Assuming S001 is set in AuthManager
        if (student1 == null) {
            student1 = authManager.registerUser("johndoe", "john@student.edu", "pass123", User.Role.STUDENT, "John Doe");
            if (student1 != null) student1.setStudentId("S001");
        }

        User student2 = authManager.getUserById("S002"); // Assuming S002 is set in AuthManager
        if (student2 == null) {
            student2 = authManager.registerUser("janesmith", "jane@student.edu", "pass123", User.Role.STUDENT, "Jane Smith");
            if (student2 != null) student2.setStudentId("S002");
        }


        if (instructor != null && student1 != null && student2 != null) {
            // Simulate adding courses to the database
            Course cs101 = new Course("CS101", "Intro to Programming", instructor.getUserId());
            cs101.addStudent(student1.getUserId());
            cs101.addStudent(student2.getUserId());
            dbManager.saveCourse(cs101);

            Course ma201 = new Course("MA201", "Calculus I", instructor.getUserId());
            ma201.addStudent(student1.getUserId());
            dbManager.saveCourse(ma201);

            // Simulate marking attendance
            dbManager.saveAttendanceRecord(new AttendanceRecord(cs101.getCourseId(), student1.getUserId(), LocalDate.now(), LocalTime.now(), true));
            dbManager.saveAttendanceRecord(new AttendanceRecord(cs101.getCourseId(), student2.getUserId(), LocalDate.now(), LocalTime.now(), false));
            dbManager.saveAttendanceRecord(new AttendanceRecord(cs101.getCourseId(), student1.getUserId(), LocalDate.now().minusDays(1), LocalTime.now().minusHours(1), true));
        }
    }

    public AuthenticationManager getAuthManager() {
        return authManager;
    }

    public DatabaseManager getDbManager() {
        return dbManager;
    }

    // You would add high-level methods here that combine auth and db operations
    // e.g., markStudentAttendance(currentUser, courseId, studentId, isPresent)
    // e.g., getStudentCourses(currentUser.getUserId())
}

// --- Conceptual Android Activity/Fragment Integration ---
/*
// Example of how you might use these managers in an Android Activity/Fragment
// This is NOT runnable code as it requires Android SDK, project setup, and actual database implementation.

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;
import android.widget.RadioButton;
import android.widget.Toast;
import android.content.Intent;
import android.view.View;

// For Firebase integration, you'd need:
// import com.google.firebase.FirebaseApp;
// import com.google.firebase.auth.FirebaseAuth;
// import com.google.firebase.firestore.FirebaseFirestore;

public class LoginActivity extends AppCompatActivity {

    private EditText etUsernameEmail, etPassword;
    private Button btnLogin, btnRegister;
    private UniversityAttendanceSystem appSystem; // Main system instance

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login); // Your login layout

        // Initialize your main system
        // In a real app, this might be a singleton or passed via Application class
        appSystem = new UniversityAttendanceSystem();

        etUsernameEmail = findViewById(R.id.etUsernameEmail);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        btnRegister = findViewById(R.id.btnRegister);

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String usernameEmail = etUsernameEmail.getText().toString().trim();
                String password = etPassword.getText().toString().trim();

                User loggedInUser = appSystem.getAuthManager().loginUser(usernameEmail, password);
                if (loggedInUser != null) {
                    Toast.makeText(LoginActivity.this, "Login Successful!", Toast.LENGTH_SHORT).show();
                    // Navigate to appropriate dashboard based on role
                    Intent intent;
                    if (loggedInUser.getRole() == User.Role.STUDENT) {
                        intent = new Intent(LoginActivity.this, StudentDashboardActivity.class);
                    } else {
                        intent = new Intent(LoginActivity.this, InstructorDashboardActivity.class);
                    }
                    startActivity(intent);
                    finish(); // Close login activity
                } else {
                    Toast.makeText(LoginActivity.this, "Login Failed: Invalid credentials.", Toast.LENGTH_LONG).show();
                }
            }
        });

        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to registration activity
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
    }
}

public class RegisterActivity extends AppCompatActivity {
    private EditText etRegUsername, etRegEmail, etRegPassword, etRegFullName;
    private RadioGroup rgRole;
    private Button btnSubmitRegister;
    private UniversityAttendanceSystem appSystem;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register); // Your registration layout

        appSystem = new UniversityAttendanceSystem(); // Or get from Application class

        etRegUsername = findViewById(R.id.etRegUsername);
        etRegEmail = findViewById(R.id.etRegEmail);
        etRegPassword = findViewById(R.id.etRegPassword);
        etRegFullName = findViewById(R.id.etRegFullName);
        rgRole = findViewById(R.id.rgRole);
        btnSubmitRegister = findViewById(R.id.btnSubmitRegister);

        btnSubmitRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String username = etRegUsername.getText().toString().trim();
                String email = etRegEmail.getText().toString().trim();
                String password = etRegPassword.getText().toString().trim();
                String fullName = etRegFullName.getText().toString().trim();

                int selectedRoleId = rgRole.getCheckedRadioButtonId();
                User.Role role = null;
                if (selectedRoleId == R.id.rbStudent) {
                    role = User.Role.STUDENT;
                } else if (selectedRoleId == R.id.rbInstructor) {
                    role = User.Role.INSTRUCTOR;
                }

                if (username.isEmpty() || email.isEmpty() || password.isEmpty() || fullName.isEmpty() || role == null) {
                    Toast.makeText(RegisterActivity.this, "Please fill all fields!", Toast.LENGTH_SHORT).show();
                    return;
                }

                User newUser = appSystem.getAuthManager().registerUser(username, email, password, role, fullName);
                if (newUser != null) {
                    Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_SHORT).show();
                    finish(); // Go back to login
                } else {
                    Toast.makeText(RegisterActivity.this, "Registration failed. Try different username/email.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}

// Conceptual Student Dashboard Activity
public class StudentDashboardActivity extends AppCompatActivity {
    // ... UI elements for displaying courses, marking attendance ...
    // private UniversityAttendanceSystem appSystem;
    // private User currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_dashboard);

        // currentUser = appSystem.getAuthManager().getCurrentUser(); // Get logged in user

        // Fetch courses for this student using appSystem.getDbManager().getCoursesByStudent(currentUser.getUserId());
        // Display them in a RecyclerView
        // Implement logic for marking attendance (e.g., button click marks present for today)
    }
}

// Conceptual Instructor Dashboard Activity
public class InstructorDashboardActivity extends AppCompatActivity {
    // ... UI elements for managing courses, viewing student rosters, marking attendance ...
    // private UniversityAttendanceSystem appSystem;
    // private User currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_instructor_dashboard);

        // currentUser = appSystem.getAuthManager().getCurrentUser(); // Get logged in user

        // Fetch courses taught by this instructor using appSystem.getDbManager().getCoursesByInstructor(currentUser.getUserId());
        // Display them in a RecyclerView
        // Implement logic for viewing student attendance, adding/removing students from courses
    }
}
*/
