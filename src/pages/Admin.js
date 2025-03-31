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
  FiChevronLeft, FiChevronRight, FiUser, FiBookmark, FiClipboard, FiDollarSign
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
  });
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  
  // UI state
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // Form states
  const [homeworkForm, setHomeworkForm] = useState({
    subject: "",
    title: "",
    description: "",
    dueDate: "",
    classId: "",
  });
  
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
  
  // Editing states
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Fetch all data
  const fetchDashboardData = useCallback(async () => {
    try {
      const [statsRes, eventsRes, announcementsRes, teachersRes, studentsRes] = 
        await Promise.all([
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
        ]);

      const statsData = await statsRes.json();
      const eventsData = await eventsRes.json();
      const announcementsData = await announcementsRes.json();
      const teachersData = await teachersRes.json();
      const studentsData = await studentsRes.json();

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
    });
    setEvents([]);
    setAnnouncements([]);
    setTeachers([]);
    setStudents([]);
  };

  // Set up Socket.IO for real-time updates
  useEffect(() => {
    if (token) {
      const socket = io("http://localhost:5000", { auth: { token } });
      
      socket.on("newNotification", (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadNotifications(prev => prev + 1);
      });
      
      socket.on("newAttendance", (data) => {
        const notification = `New attendance: ${data.status} for student ${data.studentId}`;
        setNotifications(prev => [notification, ...prev]);
        setUnreadNotifications(prev => prev + 1);
        fetchDashboardData();
      });

      return () => socket.disconnect();
    }
  }, [token, fetchDashboardData]);

  // Fetch data on component mount or when token/role changes
  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  // Chart Data Configurations
  const attendanceDoughnutData = {
    labels: ["Present", "Absent"],
    datasets: [{
      data: [dashboardStats.attendance.presentCount, dashboardStats.attendance.absentCount],
      backgroundColor: ["#4ade80", "#f87171"],
      hoverBackgroundColor: ["#22c55e", "#ef4444"],
      borderWidth: 0,
    }],
  };

  const dailyAttendanceBarData = {
    labels: dashboardStats.attendance.dailyAttendance.map(day => moment(day._id).format("ddd")),
    datasets: [
      {
        label: "Present",
        data: dashboardStats.attendance.dailyAttendance.map(day => day.present),
        backgroundColor: "#4ade80",
        borderRadius: 6,
      },
      {
        label: "Absent",
        data: dashboardStats.attendance.dailyAttendance.map(day => day.absent),
        backgroundColor: "#f87171",
        borderRadius: 6,
      },
    ],
  };

  const financeLineData = {
    labels: dashboardStats.financialData.map(data => data._id),
    datasets: [{
      label: "Income",
      data: dashboardStats.financialData.map(data => data.total),
      borderColor: "#60a5fa",
      backgroundColor: "rgba(96, 165, 250, 0.1)",
      fill: true,
      tension: 0.3,
    }],
  };

  const chartOptions = {
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: { 
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      tooltip: { 
        enabled: true,
        backgroundColor: "#1e293b",
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        grid: {
          drawBorder: false,
          color: "#e2e8f0",
        },
        ticks: {
          padding: 10,
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 10,
        }
      }
    }
  };

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
      phone: teacher.phone,
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
      parentName: student.parentName || "",
      email: student.email,
      phone: student.phone,
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

  // Homework Handler for Teachers
  const handleHomeworkSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/homework", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(homeworkForm),
      });
      setShowHomeworkModal(false);
      setHomeworkForm({
        subject: "",
        title: "",
        description: "",
        dueDate: "",
        classId: "",
      });
      fetchDashboardData();
    } catch (error) {
      console.error("Error saving homework:", error);
    }
  };

  // Render Dashboard Based on Role
  const renderDashboard = () => {
    if (!token) {
      return (
        <div className="login-container">
          <div className="login-card">
            <h2>School Management System</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" required />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="test-credentials">
              <h4>Test Credentials:</h4>
              <ul>
                <li><strong>Admin:</strong> admin@school.com / admin123</li>
                <li><strong>Teacher:</strong> teacher@school.com / teacher123</li>
                <li><strong>Student:</strong> student@school.com / student123</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    switch (role) {
      case "admin":
        return renderAdminDashboard();
      case "teacher":
        return renderTeacherDashboard();
      case "student":
        return renderStudentDashboard();
      default:
        return <div>Unauthorized access</div>;
    }
  };

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
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Teachers Management</h2>
          <button className="btn btn-primary" onClick={() => setShowTeacherModal(true)}>
            <FiPlus size={16} /> Add Teacher
          </button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>
                    <div className="user-info">
                      <div className="avatar">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="user-name">{teacher.name}</p>
                        <p className="user-email">{teacher.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.phone}</td>
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
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Students Management</h2>
          <button className="btn btn-primary" onClick={() => setShowStudentModal(true)}>
            <FiPlus size={16} /> Add Student
          </button>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Parent</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <div className="user-info">
                      <div className="avatar">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="user-name">{student.name}</p>
                        <p className="user-email">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>{student.grade}</td>
                  <td>{student.parentName || "N/A"}</td>
                  <td>{student.phone}</td>
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
          <div className="calendar-wrapper">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              views={["month", "week", "day"]}
              defaultView="month"
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: "#4f46e5",
                  borderRadius: "4px",
                  border: "none",
                },
              })}
            />
          </div>
          <div className="upcoming-events">
            <h3>Upcoming Events</h3>
            <ul>
              {events.slice(0, 5).map((event) => (
                <li key={event._id}>
                  <div className="event-date">
                    {moment(event.date).format("DD")}
                    <span>{moment(event.date).format("MMM")}</span>
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                  <div className="event-actions">
                    <button 
                      className="btn-icon btn-edit" 
                      onClick={() => {
                        setEditingEvent(event);
                        setEventForm({
                          title: event.title,
                          date: event.date,
                          description: event.description,
                          location: event.location || "",
                        });
                        setShowEventModal(true);
                      }}
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      onClick={() => handleEventDelete(event._id)}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Announcements</h2>
          <button className="btn btn-primary" onClick={() => setShowAnnouncementModal(true)}>
            <FiPlus size={16} /> New Announcement
          </button>
        </div>
        <div className="announcements-grid">
          {announcements.slice(0, 3).map((announcement) => (
            <div key={announcement._id} className="announcement-card">
              <div className="announcement-header">
                <h3>{announcement.title}</h3>
                <span className="announcement-date">
                  {moment(announcement.date).format("MMM D, YYYY")}
                </span>
              </div>
              <p className="announcement-content">{announcement.content}</p>
              <div className="announcement-actions">
                <button 
                  className="btn-icon btn-edit" 
                  onClick={() => {
                    setEditingAnnouncement(announcement);
                    setAnnouncementForm({
                      title: announcement.title,
                      content: announcement.content,
                      date: announcement.date,
                      priority: announcement.priority || "normal",
                    });
                    setShowAnnouncementModal(true);
                  }}
                >
                  <FiEdit2 size={14} />
                </button>
                <button 
                  className="btn-icon btn-delete" 
                  onClick={() => handleAnnouncementDelete(announcement._id)}
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderTeacherDashboard = () => (
    <div className="dashboard-section">
      <h2>Teacher Dashboard</h2>
      <div className="dashboard-actions">
        <button className="btn btn-primary" onClick={() => setShowHomeworkModal(true)}>
          <FiPlus size={16} /> Assign Homework
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Subject</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers
              .filter(t => t._id === userId)
              .map(teacher => (
                <tr key={teacher._id}>
                  <td>{teacher.classAssigned || "N/A"}</td>
                  <td>{teacher.subject}</td>
                  <td>{dashboardStats.studentCount}</td>
                  <td>
                    <button className="btn btn-secondary">
                      View Class
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="dashboard-section">
      <h2>Student Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card bg-indigo-100">
          <div className="stat-content">
            <span className="stat-label">Classes</span>
            <span className="stat-value">5</span>
          </div>
        </div>
        <div className="stat-card bg-emerald-100">
          <div className="stat-content">
            <span className="stat-label">Assignments</span>
            <span className="stat-value">12</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`admin-app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {token && (
        <>
          <div className="admin-sidebar">
            <div className="sidebar-header">
              <h2 className="logo">EduAdmin</h2>
              <button 
                className="sidebar-toggle" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
              </button>
            </div>
            
            <nav className="sidebar-nav">
              <ul>
                <li 
                  className={activeMenu === "dashboard" ? "active" : ""}
                  onClick={() => setActiveMenu("dashboard")}
                >
                  <FiHome size={20} />
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </li>
                {role === "admin" && (
                  <>
                    <li 
                      className={activeMenu === "students" ? "active" : ""}
                      onClick={() => setActiveMenu("students")}
                    >
                      <FiUser size={20} />
                      {!sidebarCollapsed && <span>Students</span>}
                    </li>
                    <li 
                      className={activeMenu === "teachers" ? "active" : ""}
                      onClick={() => setActiveMenu("teachers")}
                    >
                      <FiUsers size={20} />
                      {!sidebarCollapsed && <span>Teachers</span>}
                    </li>
                    <li 
                      className={activeMenu === "calendar" ? "active" : ""}
                      onClick={() => setActiveMenu("calendar")}
                    >
                      <FiCalendar size={20} />
                      {!sidebarCollapsed && <span>Calendar</span>}
                    </li>
                  </>
                )}
                {role === "teacher" && (
                  <li 
                    className={activeMenu === "homework" ? "active" : ""}
                    onClick={() => setActiveMenu("homework")}
                  >
                    <FiBookmark size={20} />
                    {!sidebarCollapsed && <span>Homework</span>}
                  </li>
                )}
              </ul>
            </nav>
            
            <div className="sidebar-footer">
              <button className="logout-btn" onClick={handleLogout}>
                <FiLogOut size={20} />
                {!sidebarCollapsed && <span>Logout</span>}
              </button>
            </div>
          </div>

          <div className="admin-main">
            <header className="admin-header">
              <div className="search-bar">
                <FiSearch size={18} />
                <input type="text" placeholder="Search..." />
              </div>
              <div className="user-profile">
                <div className="notifications">
                  <FiBell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="badge">{unreadNotifications}</span>
                  )}
                </div>
                <div className="user-info">
                  <div className="avatar">
                    {role ? role.charAt(0).toUpperCase() : "G"}
                  </div>
                  {!sidebarCollapsed && (
                    <div className="user-details">
                      <span className="user-name">
                        {role === "admin" ? "Administrator" : 
                         role === "teacher" ? "Teacher" : 
                         role === "student" ? "Student" : "Guest"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <main className="admin-content">
              {renderDashboard()}
            </main>
          </div>
        </>
      )}

      {!token && (
        <div className="admin-main">
          {renderDashboard()}
        </div>
      )}

      {/* Teacher Modal */}
      {showTeacherModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingTeacher ? "Edit Teacher" : "Add New Teacher"}</h2>
              <button className="modal-close" onClick={() => setShowTeacherModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleTeacherSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  placeholder="Enter full name"
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
                  type="tel"
                  name="phone"
                  value={teacherForm.phone}
                  onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                  placeholder="Enter phone number"
                  required
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
                &times;
              </button>
            </div>
            <form onSubmit={handleStudentSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="Enter full name"
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
                  type="tel"
                  name="phone"
                  value={studentForm.phone}
                  onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                  placeholder="Enter phone number"
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
                &times;
              </button>
            </div>
            <form onSubmit={handleEventSubmit}>
              <div className="form-group">
                <label>Event Title</label>
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
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Location (optional)</label>
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
                &times;
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
                  rows="4"
                  required
                ></textarea>
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
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAnnouncementModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingAnnouncement ? "Update" : "Publish"} Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Homework Modal */}
      {showHomeworkModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Assign Homework</h2>
              <button className="modal-close" onClick={() => setShowHomeworkModal(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleHomeworkSubmit}>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={homeworkForm.subject}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, subject: e.target.value })}
                  placeholder="Enter subject"
                  required
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={homeworkForm.title}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, title: e.target.value })}
                  placeholder="Enter homework title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={homeworkForm.description}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, description: e.target.value })}
                  placeholder="Enter homework description"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={homeworkForm.dueDate}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, dueDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Class</label>
                <input
                  type="text"
                  name="classId"
                  value={homeworkForm.classId}
                  onChange={(e) => setHomeworkForm({ ...homeworkForm, classId: e.target.value })}
                  placeholder="Enter class ID"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowHomeworkModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Assign Homework
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