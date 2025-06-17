import React, { useEffect, useState } from 'react';
import './AddLeaves.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const AddLeave = ({ onClose, onSave }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmpId, setSelectedEmpId] = useState('');
    const [designation, setDesignation] = useState('');
    const [leaveDate, setLeaveDate] = useState(null);
    const [reason, setReason] = useState('');
    const [document, setDocument] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const res = await axios.get('http://localhost:9000/present-employees', { withCredentials: true });
                setEmployees(res.data);
            } catch (err) {
                console.error('Failed to fetch present employees', err);
            }
        };
        fetchEmployees();
    }, []);

    console.log(employees)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setDocument(file);
        } else {
            alert("Only PDF files are allowed.");
        }
    };

    const handleEmpChange = (e) => {
        const empId = e.target.value;
        setSelectedEmpId(empId);
        const emp = employees.find(emp => emp._id === empId);
        if (emp) {
            setDesignation(emp.position);
        }
    };

    const handleSubmit = async () => {
        if (!selectedEmpId || !designation || !leaveDate || !reason) {
            alert("All required fields must be filled.");
            return;
        }

        const payload = {
            employeeId: selectedEmpId,
            date: leaveDate.toISOString().split("T")[0],
            reason,
        };



        try {
            await axios.post('http://localhost:9000/leaves', payload, { withCredentials: true });
            onSave();
        } catch (err) {
            console.error("Failed to save leave", err);
            alert(err.response?.data?.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New Leave</h2>
                    <button className="close-btn" onClick={onClose}>x</button>
                </div>

                <div className="modal-body">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Employee Name<span className="required">*</span></label>
                            <select className='s-name' value={selectedEmpId} onChange={handleEmpChange}>
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.fullName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Designation<span className="required">*</span></label>
                            <input type="text" value={designation} readOnly />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Leave Date<span className="required">*</span></label>
                            <DatePicker
                                selected={leaveDate}
                                onChange={setLeaveDate}
                                placeholderText="Select date"
                                dateFormat="yyyy-MM-dd"
                                className="date-picker"
                            />
                        </div>

                        <div className="form-group">
                            <label>Document</label>
                            <input type="file" accept="application/pdf" onChange={handleFileChange} />
                            {document && <p className="file-name">{document.name}</p>}
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Reason<span className="required">*</span></label>
                        <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Medical Leave" />
                    </div>
                </div>

                <div className="modal-footer">
                    <button onClick={handleSubmit} className="save-btn">Save</button>
                </div>
            </div>
        </div>
    );
};

export default AddLeave;
