import React, { useState, useEffect } from 'react';
import './Leaves.css';
import { FaEllipsisV, FaUserCircle } from 'react-icons/fa';
import { SiGoogledocs } from "react-icons/si";
import AddLeave from '../../components/AddLeaves/AddLeaves';
import axios from 'axios';

const statusOptions = ['Approved', 'Rejected', 'Pending'];

export default function Leaves() {
    const [leaves, setLeaves] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [showAddLeaveModal, setShowAddLeaveModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchLeaves = async () => {
        try {
            // const res = await axios.get("http://localhost:9000/getleaves", { withCredentials: true });
            const res = await axios.get("https://hr-managment-assignment.onrender.com/getleaves", { withCredentials: true });
            setLeaves(res.data);
        } catch (err) {
            console.error("Failed to fetch leaves", err);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            // await axios.put(`http://localhost:9000/leaves/${id}/status`, { status: newStatus }, { withCredentials: true });
            await axios.put(`https://hr-managment-assignment.onrender.com/leaves/${id}/status`, { status: newStatus }, { withCredentials: true });
            setLeaves(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };
    const filteredLeaves = leaves.filter(l =>
        (selectedStatus ? l.status === selectedStatus : true) &&
        (searchTerm ? l.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );

    const approvedDates = leaves
        .filter(l => l.status === 'Approved')
        .map(l => l.date);

    return (
        <div className="leaves-container">

            <div className="leaves-header">
                <div className="left-section">
                    <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                        <option value="">Status</option>
                        {statusOptions.map(status => <option key={status}>{status}</option>)}
                    </select>
                </div>
                <div className="right-section">
                    <input placeholder="Search" className="search-input" value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)} />
                    <button className="add-leave-btn" onClick={() => setShowAddLeaveModal(true)}>Add Leave</button>
                </div>
            </div>

            {showAddLeaveModal && (
                <AddLeave
                    onClose={() => setShowAddLeaveModal(false)}
                    onSave={() => {
                        fetchLeaves();
                        setShowAddLeaveModal(false);
                    }}
                />
            )}

            <div className="leaves-content">
                <div className="leave-table">
                    <div className="leave-table-header">
                        <span>Profile</span>
                        <span>Name</span>
                        <span>Date</span>
                        <span>Reason</span>
                        <span>Status</span>
                        <span>Docs</span>
                        <span></span>
                    </div>
                    {filteredLeaves.map(leave => (
                        <div className="leave-row" key={leave._id}>
                            <FaUserCircle className="profile-icon" />
                            <span>
                                <strong>{leave.name}</strong>
                                <div className="designation">{leave.designation}</div>
                            </span>
                            <span>{leave.date}</span>
                            <span>{leave.reason}</span>
                            <span>
                                <select
                                    className={`status-select ${leave.status.toLowerCase()}`}
                                    value={leave.status}
                                    onChange={e => handleStatusChange(leave._id, e.target.value)}
                                >
                                    {statusOptions.map(status => <option key={status}>{status}</option>)}
                                </select>
                            </span>
                            <span className='doc'>
                                {leave.document && <SiGoogledocs />}
                            </span>
                            <span><FaEllipsisV /></span>
                        </div>
                    ))}
                </div>

                <div className="leave-calendar">
                    <div className='leave-h-t'><h4>Leave Calendar</h4></div>
                    <div className="calendar">
                        <div className="calendar-header">September, 2024</div>
                        <div className="calendar-grid">
                            {Array.from({ length: 30 }, (_, i) => {
                                const day = i + 1;
                                const dateStr = `2024-09-${day < 10 ? `0${day}` : day}`;
                                const isHighlighted = approvedDates.includes(dateStr);
                                return (
                                    <div key={day} className={`calendar-day ${isHighlighted ? 'highlight' : ''}`}>{day}</div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
