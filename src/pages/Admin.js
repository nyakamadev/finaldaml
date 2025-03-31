/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from "chart.js";
import io from "socket.io-client";
import { 
  FiHome, FiUsers, FiCalendar, FiBell, FiMessageSquare, 
  FiSettings, FiLogOut, FiPlus, FiEdit2, FiTrash2, FiSearch,
  FiChevronLeft, FiChevronRight, FiUser, FiBookmark, FiClipboard, FiDollarSign,
  FiChevronUp, FiChevronDown
} from "react-icons/fi";
import "./Admin.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const localizer = momentLocalizer(moment);

const Admin = () => {
  // Authentication state
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  
  // Data state
  const [dashboardStats, setDashboardStats] = useState({
    studentCount: 0,
    teacherCount: 0,
    parentCount: 0,
    staffCount: 0,
    attendance: { presentCount: 0, absentCount: 0, dailyAttendance: [] },
    financialData: [],
    adminStats: { pendingLeaveRequests: 0, unpaidFees: 0, overdueLoans: 0 },
  });
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]); // Initialize calendarEvents
  
  // UI state
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Search and Pagination state
  const [teacherSearch, setTeacherSearch] = useState("");
  const [teacherPage, setTeacherPage] = useState(1);
  const [studentSearch, setStudentSearch] = useState("");
  const [studentPage, setStudentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Form states
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    qualification: "",
  });
  
  const [studentForm, setStudentForm] = useState({
    name: "",
    grade: "",
    parentName: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
  });
  
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    date: "",
    priority: "normal",
  });
  
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    role: "teacher",
  });
  
  // Editing states
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch all data
  const fetchDashboardData = useCallback(async () => {
    try {
      const [
        statsRes, 
        eventsRes, 
        announcementsRes, 
        teachersRes, 
        studentsRes, 
        usersRes, 
        leaveRequestsRes,
        auditLogsRes
      ] = await Promise.all([
        fetch("http://localhost:5000/api/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/announcements", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/leave-requests", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/audit-logs", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const statsData = await statsRes.json();
      const eventsData = await eventsRes.json();
      const announcementsData = await announcementsRes.json();
      const teachersData = await teachersRes.json();
      const studentsData = await studentsRes.json();
      const usersData = await usersRes.json();
      const leaveRequestsData = await leaveRequestsRes.json();
      const auditLogsData = await auditLogsRes.json();

      if (statsRes.ok) setDashboardStats(statsData);
      if (eventsRes.ok) {
        setEvents(eventsData);
        setCalendarEvents(eventsData.map(event => ({
          title: event.title,
          start: new Date(event.date),
          end: new Date(event.date),
          desc: event.description,
        })));
      }
      if (announcementsRes.ok) setAnnouncements(announcementsData);
      if (teachersRes.ok) setTeachers(teachersData.teachers || []);
      if (studentsRes.ok) setStudents(studentsData.students || []);
      if (usersRes.ok) setUsers(usersData);
      if (leaveRequestsRes.ok) setLeaveRequests(leaveRequestsData);
      if (auditLogsRes.ok) setAuditLogs(auditLogsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [token]);

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        setToken(data.token);
        setRole(data.role);
        setUserId(data.id);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setToken("");
    setRole("");
    setUserId("");
    setDashboardStats({
      studentCount: 0,
      teacherCount: 0,
      parentCount: 0,
      staffCount: 0,
      attendance: { presentCount: 0, absentCount: 0, dailyAttendance: [] },
      financialData: [],
      adminStats: { pendingLeaveRequests: 0, unpaidFees: 0, overdueLoans: 0 },
    });
    setEvents([]);
    setAnnouncements([]);
    setTeachers([]);
    setStudents([]);
    setUsers([]);
    setLeaveRequests([]);
    setAuditLogs([]);
    setCalendarEvents([]); // Reset calendarEvents on logout
  };

  // Set up Socket.IO for real-time updates
  useEffect(() => {
    if (token) {
      const socket = io("http://localhost:5000", { auth: { token } });
      
      socket.on("newNotification", (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadNotifications(prev => prev + 1);
      });

      socket.on("newAttendance", (attendance) => {
        fetchDashboardData();
      });

      return () => socket.disconnect();
    }
  }, [token, fetchDashboardData]);

  // Fetch data on mount if authenticated
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  // CRUD Operations for Teachers
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingTeacher ? "PUT" : "POST";
      const url = editingTeacher 
        ? `http://localhost:5000/api/teachers/${editingTeacher._id}`
        : "http://localhost:5000/api/teachers";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teacherForm),
      });
      
      if (response.ok) {
        setShowTeacherModal(false);
        setEditingTeacher(null);
        setTeacherForm({
          name: "",
          subject: "",
          email: "",
          phone: "",
          address: "",
          qualification: "",
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error saving teacher:", error);
    }
  };

  const handleTeacherEdit = (teacher) => {
    setEditingTeacher(teacher);
    setTeacherForm({
      name: teacher.name,
      subject: teacher.subject,
      email: teacher.email,
      phone: teacher.phone || "",
      address: teacher.address || "",
      qualification: teacher.qualification || "",
    });
    setShowTeacherModal(true);
  };

  const handleTeacherDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await fetch(`http://localhost:5000/api/teachers/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  // CRUD Operations for Students
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingStudent ? "PUT" : "POST";
      const url = editingStudent 
        ? `http://localhost:5000/api/students/${editingStudent._id}`
        : "http://localhost:5000/api/students";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(studentForm),
      });
      
      if (response.ok) {
        setShowStudentModal(false);
        setEditingStudent(null);
        setStudentForm({
          name: "",
          grade: "",
          parentName: "",
          email: "",
          phone: "",
          address: "",
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleStudentEdit = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      grade: student.grade,
      parentName: student.parent || "",
      email: student.email,
      phone: student.phone || "",
      address: student.address || "",
    });
    setShowStudentModal(true);
  };

  const handleStudentDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(`http://localhost:5000/api/students/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // CRUD Operations for Events
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingEvent ? "PUT" : "POST";
      const url = editingEvent 
        ? `http://localhost:5000/api/events/${editingEvent._id}`
        : "http://localhost:5000/api/events";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventForm),
      });
      
      if (response.ok) {
        setShowEventModal(false);
        setEditingEvent(null);
        setEventForm({
          title: "",
          date: "",
          description: "",
          location: "",
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEventEdit = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      date: moment(event.date).format("YYYY-MM-DD"),
      description: event.description,
      location: event.location || "",
    });
    setShowEventModal(true);
  };

  const handleEventDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`http://localhost:5000/api/events/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  // CRUD Operations for Announcements
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingAnnouncement ? "PUT" : "POST";
      const url = editingAnnouncement 
        ? `http://localhost:5000/api/announcements/${editingAnnouncement._id}`
        : "http://localhost:5000/api/announcements";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(announcementForm),
      });
      
      if (response.ok) {
        setShowAnnouncementModal(false);
        setEditingAnnouncement(null);
        setAnnouncementForm({
          title: "",
          content: "",
          date: "",
          priority: "normal",
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  const handleAnnouncementEdit = (announcement) => {
    setEditingAnnouncement(announcement);
    setAnnouncementForm({
      title: announcement.title,
      content: announcement.content,
      date: moment(announcement.date).format("YYYY-MM-DD"),
      priority: announcement.priority || "normal",
    });
    setShowAnnouncementModal(true);
  };

  const handleAnnouncementDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await fetch(`http://localhost:5000/api/announcements/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting announcement:", error);
      }
    }
  };

  // CRUD Operations for Users
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser 
        ? `http://localhost:5000/api/users/${editingUser._id}`
        : "http://localhost:5000/api/users";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userForm),
      });
      
      if (response.ok) {
        setShowUserModal(false);
        setEditingUser(null);
        setUserForm({
          email: "",
          password: "",
          role: "teacher",
        });
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleUserEdit = (user) => {
    setEditingUser(user);
    setUserForm({
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowUserModal(true);
  };

  const handleUserDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Pagination for Teachers
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
    teacher.email.toLowerCase().includes(teacherSearch.toLowerCase())
  );
  const totalTeacherPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (teacherPage - 1) * itemsPerPage,
    teacherPage * itemsPerPage
  );

  // Pagination for Students
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );
  const totalStudentPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (studentPage - 1) * itemsPerPage,
    studentPage * itemsPerPage
  );

  // Render Admin Dashboard
  const renderAdminDashboard = () => (
    <>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="dashboard-actions">
          <button className="btn btn-primary" onClick={() => setShowAnnouncementModal(true)}>
            <FiPlus size={16} /> New Announcement
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card bg-indigo-100">
          <div className="stat-icon">
            <FiUsers size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Students</span>
            <span className="stat-value">{dashboardStats.studentCount}</span>
          </div>
        </div>
        <div className="stat-card bg-amber-100">
          <div className="stat-icon">
            <FiUsers size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Teachers</span>
            <span className="stat-value">{dashboardStats.teacherCount}</span>
          </div>
        </div>
        <div className="stat-card bg-emerald-100">
          <div className="stat-icon">
            <FiClipboard size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending Leave Requests</span>
            <span className="stat-value">{dashboardStats.adminStats?.pendingLeaveRequests || 0}</span>
          </div>
        </div>
        <div className="stat-card bg-red-100">
          <div className="stat-icon">
            <FiDollarSign size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Unpaid Fees</span>
            <span className="stat-value">{dashboardStats.adminStats?.unpaidFees || 0}</span>
          </div>
        </div>
        <div className="stat-card bg-yellow-100">
          <div className="stat-icon">
            <FiBookmark size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Overdue Loans</span>
            <span className="stat-value">{dashboardStats.adminStats?.overdueLoans || 0}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Teachers Management</h2>
          <div className="section-actions">
            <div className="search-bar">
              <FiSearch size={16} />
              <input
                type="text"
                placeholder="Search teachers..."
                value={teacherSearch}
                onChange={(e) => {
                  setTeacherSearch(e.target.value);
                  setTeacherPage(1);
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setShowTeacherModal(true)}>
              <FiPlus size={16} /> Add Teacher
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTeachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone || "N/A"}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="btn-icon btn-edit" 
                        onClick={() => handleTeacherEdit(teacher)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        onClick={() => handleTeacherDelete(teacher._id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="btn btn-secondary"
              onClick={() => setTeacherPage(prev => Math.max(prev - 1, 1))}
              disabled={teacherPage === 1}
            >
              <FiChevronLeft size={16} /> Previous
            </button>
            <span>Page {teacherPage} of {totalTeacherPages}</span>
            <button
              className="btn btn-secondary"
              onClick={() => setTeacherPage(prev => Math.min(prev + 1, totalTeacherPages))}
              disabled={teacherPage === totalTeacherPages}
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Students Management</h2>
          <div className="section-actions">
            <div className="search-bar">
              <FiSearch size={16} />
              <input
                type="text"
                placeholder="Search students..."
                value={studentSearch}
                onChange={(e) => {
                  setStudentSearch(e.target.value);
                  setStudentPage(1);
                }}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setShowStudentModal(true)}>
              <FiPlus size={16} /> Add Student
            </button>
          </div>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Parent</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.parent || "N/A"}</td>
                  <td>{student.email}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="btn-icon btn-edit" 
                        onClick={() => handleStudentEdit(student)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        onClick={() => handleStudentDelete(student._id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="btn btn-secondary"
              onClick={() => setStudentPage(prev => Math.max(prev - 1, 1))}
              disabled={studentPage === 1}
            >
              <FiChevronLeft size={16} /> Previous
            </button>
            <span>Page {studentPage} of {totalStudentPages}</span>
            <button
              className="btn btn-secondary"
              onClick={() => setStudentPage(prev => Math.min(prev + 1, totalStudentPages))}
              disabled={studentPage === totalStudentPages}
            >
              Next <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>User Management</h2>
          <button className="btn btn-primary" onClick={() => setShowUserModal(true)}>
            <FiPlus size={16} /> Add User
          </button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="btn-icon btn-edit" 
                        onClick={() => handleUserEdit(user)}
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        onClick={() => handleUserDelete(user._id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>School Calendar</h2>
          <button className="btn btn-primary" onClick={() => setShowEventModal(true)}>
            <FiPlus size={16} /> Add Event
          </button>
        </div>
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={(event) => {
              const selectedEvent = events.find(e => e.title === event.title && new Date(e.date).toISOString() === event.start.toISOString());
              if (selectedEvent) handleEventEdit(selectedEvent);
            }}
          />
        </div>
        <div className="events-list">
          <h3>Upcoming Events</h3>
          {events.map((event) => (
            <div key={event._id} className="event-item">
              <div className="event-details">
                <span className="event-title">{event.title}</span>
                <span className="event-date">{moment(event.date).format("MMM D, YYYY")}</span>
                <p>{event.description}</p>
              </div>
              <div className="event-actions">
                <button className="btn-icon btn-edit" onClick={() => handleEventEdit(event)}>
                  <FiEdit2 size={16} />
                </button>
                <button className="btn-icon btn-delete" onClick={() => handleEventDelete(event._id)}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Announcements</h2>
        </div>
        <div className="announcements-list">
          {announcements.map((announcement) => (
            <div key={announcement._id} className={`announcement-item ${announcement.priority}`}>
              <div className="announcement-details">
                <span className="announcement-title">{announcement.title}</span>
                <span className="announcement-date">{moment(announcement.date).format("MMM D, YYYY")}</span>
                <p>{announcement.content}</p>
              </div>
              <div className="announcement-actions">
                <button className="btn-icon btn-edit" onClick={() => handleAnnouncementEdit(announcement)}>
                  <FiEdit2 size={16} />
                </button>
                <button className="btn-icon btn-delete" onClick={() => handleAnnouncementDelete(announcement._id)}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Leave Requests</h2>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request._id}>
                  <td>{request.teacherId?.name || "N/A"}</td>
                  <td>{moment(request.startDate).format("MMM D, YYYY")}</td>
                  <td>{moment(request.endDate).format("MMM D, YYYY")}</td>
                  <td>{request.reason}</td>
                  <td>
                    <select
                      value={request.status}
                      onChange={async (e) => {
                        try {
                          await fetch(`http://localhost:5000/api/leave-requests/${request._id}`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ status: e.target.value }),
                          });
                          fetchDashboardData();
                        } catch (error) {
                          console.error("Error updating leave request:", error);
                        }
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-icon btn-delete"
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to delete this leave request?")) {
                          try {
                            await fetch(`http://localhost:5000/api/leave-requests/${request._id}`, {
                              method: "DELETE",
                              headers: { Authorization: `Bearer ${token}` },
                            });
                            fetchDashboardData();
                          } catch (error) {
                            console.error("Error deleting leave request:", error);
                          }
                        }
                      }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Audit Logs</h2>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Resource</th>
                <th>Resource ID</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log._id}>
                  <td>{log.userId?.email || "N/A"} ({log.userId?.role || "N/A"})</td>
                  <td>{log.action}</td>
                  <td>{log.resource}</td>
                  <td>{log.resourceId || "N/A"}</td>
                  <td>{moment(log.timestamp).format("MMM D, YYYY, h:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Render Teacher Dashboard (Placeholder)
  const renderTeacherDashboard = () => (
    <div>
      <h1>Teacher Dashboard</h1>
      <p>This is a placeholder for the teacher dashboard.</p>
    </div>
  );

  // Render Student Dashboard (Placeholder)
  const renderStudentDashboard = () => (
    <div>
      <h1>Student Dashboard</h1>
      <p>This is a placeholder for the student dashboard.</p>
    </div>
  );

  // Render Dashboard based on Role
  const renderDashboard = () => {
    switch (role) {
      case "admin":
        return renderAdminDashboard();
      case "teacher":
        return renderTeacherDashboard();
      case "student":
        return renderStudentDashboard();
      default:
        return null;
    }
  };

  // If not logged in, show login form
  if (!token) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>School Management System</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>School Admin</h2>
          <button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
        <ul className="sidebar-menu">
          <li className={activeMenu === "dashboard" ? "active" : ""} onClick={() => setActiveMenu("dashboard")}>
            <FiHome size={20} /> <span>Dashboard</span>
          </li>
          <li className={activeMenu === "users" ? "active" : ""} onClick={() => setActiveMenu("users")}>
            <FiUsers size={20} /> <span>Users</span>
          </li>
          <li className={activeMenu === "calendar" ? "active" : ""} onClick={() => setActiveMenu("calendar")}>
            <FiCalendar size={20} /> <span>Calendar</span>
          </li>
          <li className={activeMenu === "notifications" ? "active" : ""} onClick={() => setActiveMenu("notifications")}>
            <FiBell size={20} /> <span>Notifications {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}</span>
          </li>
          <li className={activeMenu === "messages" ? "active" : ""} onClick={() => setActiveMenu("messages")}>
            <FiMessageSquare size={20} /> <span>Messages</span>
          </li>
          <li className={activeMenu === "settings" ? "active" : ""} onClick={() => setActiveMenu("settings")}>
            <FiSettings size={20} /> <span>Settings</span>
          </li>
          <li onClick={handleLogout}>
            <FiLogOut size={20} /> <span>Logout</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {renderDashboard()}
      </div>

      {/* Teacher Modal */}
      {showTeacherModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h2>
              <button className="modal-close" onClick={() => setShowTeacherModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleTeacherSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={teacherForm.subject}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                  placeholder="Enter subject"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={teacherForm.email}
                  onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={teacherForm.phone}
                  onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={teacherForm.address}
                  onChange={(e) => setTeacherForm({ ...teacherForm, address: e.target.value })}
                  placeholder="Enter address"
                />
              </div>
              <div className="form-group">
                <label>Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={teacherForm.qualification}
                  onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                  placeholder="Enter qualification"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowTeacherModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTeacher ? "Update" : "Add"} Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingStudent ? "Edit Student" : "Add New Student"}</h2>
              <button className="modal-close" onClick={() => setShowStudentModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleStudentSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={studentForm.grade}
                  onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                  placeholder="Enter grade"
                  required
                />
              </div>
              <div className="form-group">
                <label>Parent Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={studentForm.parentName}
                  onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                  placeholder="Enter parent name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                  placeholder="Enter address"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowStudentModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingStudent ? "Update" : "Add"} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingEvent ? "Edit Event" : "Add New Event"}</h2>
              <button className="modal-close" onClick={() => setShowEventModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleEventSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  placeholder="Enter event description"
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Enter event location"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEventModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? "Update" : "Add"} Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingAnnouncement ? "Edit Announcement" : "Add New Announcement"}</h2>
              <button className="modal-close" onClick={() => setShowAnnouncementModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAnnouncementSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="Enter announcement title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  placeholder="Enter announcement content"
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={announcementForm.date}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  name="priority"
                  value={announcementForm.priority}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                  className="select-input"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAnnouncementModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingAnnouncement ? "Update" : "Add"} Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
              <button className="modal-close" onClick={() => setShowUserModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleUserSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password {editingUser && "(Leave blank to keep unchanged)"}</label>
                <input
                  type="password"
                  name="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                  placeholder="Enter password"
                  required={!editingUser}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                  className="select-input"
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowUserModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? "Update" : "Add"} User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;