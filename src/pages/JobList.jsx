import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineDotsVertical } from "react-icons/hi";
import Modal from './Modal'; 

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEditClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedJob) => {
    try {
      await axios.put(`http://localhost:3001/jobs/${updatedJob.id}`, updatedJob);
      setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.content && job.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 flex-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job List</h1>
        <button onClick={() => navigate('/job/create')} className="btn bg-black text-white rounded-lg">New Job</button>
      </div>
      <div className="mb-4 w-[17rem]">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input "
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-full">
        {currentJobs.map(job => (
          <div key={job.id} className="card relative p-4 bg-white shadow rounded-lg">
            <img src={job.companyLogo} alt={`${job.title} logo`} className="w-12 h-12 rounded-lg" />
            <h2 className="text-xl font-semibold mt-4">{job.title}</h2>
            <p className="text-gray-600 mt-2">Posted date: {job.postedDate}</p>
            <p className="text-green-600 mt-2">{job.candidates} candidates</p>
            <div className='flex gap-4 mt-4'>
              <p className="text-gray-600">{job.experience}</p>
              <p className="text-gray-600">{job.type}</p>
            </div>
            <div className='flex gap-4 mt-2'>
              <p className="text-gray-600">{job.salary}</p>
              <p className="text-gray-600">{job.position}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => navigate(`/job/view/${job.id}`)} className="text-blue-500">View</button>
              <button onClick={() => handleEditClick(job)} className="text-yellow-500">Edit</button>
              <button onClick={() => handleDelete(job.id)} className="text-red-500">Delete</button>
            </div>
            <button className="absolute top-2 right-2 p-2 text-[20px]">
              <HiOutlineDotsVertical />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        {[...Array(totalPages).keys()].map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === pageNumber + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onSave={handleSave}
      />
    </div>
  );
};

export default JobList;
