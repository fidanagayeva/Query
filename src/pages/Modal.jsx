import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, job, onSave }) => {
  const [editedJob, setEditedJob] = useState(job);

  useEffect(() => {
    setEditedJob(job);
  }, [job]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob({ ...editedJob, [name]: value });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
        <input
          type="text"
          name="title"
          value={editedJob?.title || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Job Title"
        />
        <input
          type="text"
          name="companyLogo"
          value={editedJob?.companyLogo || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Company Logo URL"
        />
        <input
          type="text"
          name="postedDate"
          value={editedJob?.postedDate || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Posted Date"
        />
        <input
          type="number"
          name="candidates"
          value={editedJob?.candidates || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Candidates"
        />
        <input
          type="text"
          name="experience"
          value={editedJob?.experience || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Experience"
        />
        <input
          type="text"
          name="type"
          value={editedJob?.type || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Job Type"
        />
        <input
          type="text"
          name="salary"
          value={editedJob?.salary || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Salary"
        />
        <input
          type="text"
          name="position"
          value={editedJob?.position || ''}
          onChange={handleChange}
          className="input mb-2 w-full"
          placeholder="Position"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => onSave(editedJob)}
            className="btn bg-black text-white rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="btn bg-black text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
