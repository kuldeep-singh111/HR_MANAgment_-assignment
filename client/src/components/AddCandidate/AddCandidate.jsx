import React, { useState } from "react";
import axios from "axios";
import "./AddCandidate.css";

const AddCandidateModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        resume: null,
        agree: false,
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Upload resume to Cloudinary via react first time, otherwise i used multer => frontend/b-multer/cloudnary
            const data = new FormData();
            data.append("file", formData.resume);
            data.append("upload_preset", "resume_upload");
            data.append("resource_type", "auto");

            const cloudRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dl94yl9o2/raw/upload",
                data
            );

            console.log("☁ Cloudinary response:", cloudRes.data);

            const resumeURL = cloudRes.data.secure_url;


            const candidateData = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                position: formData.position,
                experience: formData.experience,
                resumeUrl: resumeURL
            };

            // await axios.post("http://localhost:9000/addcandidates", candidateData, {
            //     withCredentials: true
            // });

            await axios.post("https://hr-managment-assignment.onrender.com/addcandidates", candidateData, {
                withCredentials: true
            });

            alert("Candidate added successfully!");
            onClose();
        } catch (err) {
            alert("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-modal-overlay">
            <div className="add-modal">
                <div className="add-modal-header">
                    <h4>Add New Candidate</h4>
                    <button onClick={onClose} className="close-btn">x</button>
                </div>
                <form onSubmit={handleSubmit} className="add-modal-body">
                    <div className="input-row">
                        <div className="input-field">
                            <label>Full Name*</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        </div>
                        <div className="input-field">
                            <label>Email Address*</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-field">
                            <label>Phone Number*</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                        </div>
                        <div className="input-field">
                            <label>Position*</label>
                            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-field">
                            <label>Experience*</label>
                            <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
                        </div>
                        <div className="input-field">
                            <label>Resume*</label>
                            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="checkbox-row">
                        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
                        <label>I hereby declare that the above information is true to the best of my knowledge and belief</label>
                    </div>

                    <button type="submit" className="save-btn" disabled={!formData.agree || loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidateModal;
