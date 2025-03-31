import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Dashboard.css";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [summary, setSummary] = useState({ students: 0, teachers: 0, parents: 0, stats: 0 });
  const [attendanceData, setAttendanceData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const fetchSummary = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/dashboard/summary", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setSummary(data);
  };

  const fetchAttendance = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/dashboard/attendance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAttendanceData(data);
  };

  const fetchFinance = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/dashboard/finance", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFinanceData(data);
  };

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/events", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setEvents(data);
    const calendarData = data.map((item) => ({
      title: item.title,
      start: new Date(item.date),
      end: new Date(item.date),
    }));
    setCalendarEvents(calendarData);
  };

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/api/announcements", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchSummary();
    fetchAttendance();
    fetchFinance();
    fetchEvents();
    fetchAnnouncements();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>{summary.students}</h3>
          <p>Students</p>
        </div>
        <div className="summary-card">
          <h3>{summary.teachers}</h3>
          <p>Teachers</p>
        </div>
        <div className="summary-card">
          <h3>{summary.parents}</h3>
          <p>Parents</p>
        </div>
        <div className="summary-card">
          <h3>{summary.stats}</h3>
          <p>Stats</p>
        </div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-container">
          <h3>Attendance</h3>
          <BarChart width={500} height={300} data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="present" fill="#82ca9d" />
            <Bar dataKey="absent" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="calendar-container">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 300, width: 300 }}
          />
        </div>
      </div>

      <div className="dashboard-events-finance">
        <div className="events-container">
          <h3>Events</h3>
          {events.map((event) => (
            <div key={event._id} className="event-item">
              <p>{event.title}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="finance-container">
          <h3>Finance</h3>
          <LineChart width={500} height={200} data={financeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>

      <div className="dashboard-announcements">
        <h3>Announcements</h3>
        {announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-item">
            <p>{announcement.title}</p>
            <p>{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;