import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {children}
        <button onClick={onClose} className="btn bg-black text-white mt-4 w-full">Close</button>
      </div>
    </div>
  );
};

const JobCreate = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    content: ''
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    navigate('/job/list');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            value={job.content}
            onChange={handleChange}
            placeholder="Job Content"
            className="border border-gray-300 rounded-lg p-3 w-full"
            rows="6"
          ></textarea>
        </div>
        <button type="submit" className="btn bg-black text-white py-2 px-4 rounded-lg">Create Job</button>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Job Created Successfully</h2>
        <p className="mb-2"><strong>Title:</strong> {job.title}</p>
        <p><strong>Content:</strong> {job.content}</p>
      </Modal>
    </div>
  );
};

export default JobCreate;
