import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import "./Candidates.css";
import AddCandidate from "../../components/AddCandidate/AddCandidate";

import axios from "axios";

const statusOptions = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
const positionOptions = ["Designer", "Developer", "Human Resources"];

const Candidates = () => {
    const [showModal, setShowModal] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [filterPosition, setFilterPosition] = useState("");
    const [statusState, setStatusState] = useState({});

    const fetchCandidates = async () => {
        try {
            // const res = await axios.get("http://localhost:9000/getcandidates", {
            //     withCredentials: true,
            // });
            const res = await axios.get("https://hr-managment-assignment.onrender.com/getcandidates", {
                withCredentials: true,
            });
            setCandidates(res.data);

            // Load saved status from localStorage
            const savedStatuses = JSON.parse(localStorage.getItem("candidateStatuses")) || {};

            const initialStatus = {};
            res.data.forEach((c) => {
                initialStatus[c._id] = savedStatuses[c._id] || c.status;
            });
            setStatusState(initialStatus);
        } catch (err) {
            console.error("Error fetching candidates", err);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleDelete = async (id) => {
        try {
            // await axios.delete(`http://localhost:9000/deletecandidate/${id}`, {
            //     withCredentials: true,
            // });
            await axios.delete(`https://hr-managment-assignment.onrender.com/deletecandidate/${id}`, {
                withCredentials: true,
            });
            setCandidates((prev) => prev.filter((c) => c._id !== id));

            // Also delete from localStorage
            const updatedStatuses = { ...statusState };
            delete updatedStatuses[id];
            setStatusState(updatedStatuses);
            localStorage.setItem("candidateStatuses", JSON.stringify(updatedStatuses));
        } catch (err) {
            console.error("Failed to delete candidate", err);
        }
    };

    const handleStatusChange = async (id, value) => {
        const updatedStatus = {
            ...statusState,
            [id]: value,
        };
        setStatusState(updatedStatus);
        localStorage.setItem("candidateStatuses", JSON.stringify(updatedStatus));

        // Automatically add as employee if status is "Selected" all set
        if (value === "Selected") {
            const user = JSON.parse(localStorage.getItem("user"));
            try {
                // await axios.post(
                //     "http://localhost:9000/addemployee",
                //     {
                await axios.post(
                    "https://hr-managment-assignment.onrender.com/addemployee",
                    {
                        candidateId: id,
                        userId: user._id,
                    },
                    { withCredentials: true }
                );
                alert("Candidate added to Employees successfully!");
            } catch (error) {
                console.error("Failed to add employee:", error);
                alert("Error: Could not add employee");
            }
        }
    };


    const filteredCandidates = candidates.filter((c) => {
        const nameMatch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = filterStatus ? statusState[c._id] === filterStatus : true;
        const positionMatch = filterPosition ? c.position === filterPosition : true;
        return nameMatch && statusMatch && positionMatch;
    });

    return (
        <div className="c-candidates-wrapper">


            <div className="c-header-bar">
                <div className="c-select-filters">
                    <select
                        className="c-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Status</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                    <select
                        className="c-select"
                        value={filterPosition}
                        onChange={(e) => setFilterPosition(e.target.value)}
                    >
                        <option value="">Position</option>
                        {positionOptions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="c-search-action">
                    <div className="c-search-box">
                        <FaSearch className="c-search-icon" />
                        <input
                            type="text"
                            className="c-search-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="c-add-button" onClick={() => setShowModal(true)}>
                        Add Candidate
                    </button>
                    {showModal && (
                        <AddCandidate
                            onClose={() => {
                                setShowModal(false);
                                fetchCandidates();
                            }}
                        />
                    )}
                </div>
            </div>

            <div className="c-table-container">
                <table className="c-table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Candidates Name</th>
                            <th>Email Address</th>
                            <th>Phone Number</th>
                            <th>Position</th>
                            <th>Status</th>
                            <th>Experience</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCandidates.length > 0 ? (
                            filteredCandidates.map((c, idx) => (
                                <tr key={c._id}>
                                    <td>{idx + 1}</td>
                                    <td>{c.fullName}</td>
                                    <td>{c.email}</td>
                                    <td>{c.phone}</td>
                                    <td>{c.position}</td>
                                    <td >
                                        <select className="c-select-m"
                                            value={statusState[c._id] || c.status}
                                            onChange={(e) =>
                                                handleStatusChange(c._id, e.target.value)
                                            }
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{c.experience}</td>
                                    <td className="c-action-cell">
                                        <IoIosMore
                                            size={20}
                                            className="c-action-icon"
                                            onClick={() =>
                                                setDropdownOpen(
                                                    dropdownOpen === c._id ? null : c._id
                                                )
                                            }
                                        />
                                        {dropdownOpen === c._id && (
                                            <div className="c-action-dropdown">
                                                <a
                                                    href={c.resumeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <button className="download-btn">
                                                        View Resume
                                                    </button>
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(c._id)}
                                                    className="delete"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="no-data">
                                    No candidates found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Candidates;
