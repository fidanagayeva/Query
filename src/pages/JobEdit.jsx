import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchJob = async (id) => {
  const { data } = await axios.get(`/api/jobs/${id}`);
  return data;
};

const updateJob = async ({ id, job }) => {
  const { data } = await axios.put(`/api/jobs/${id}`, job);
  return data;
};

const JobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: job } = useQuery(['job', id], () => fetchJob(id));
  const mutation = useMutation(updateJob, {
    onSuccess: () => {
      queryClient.invalidateQueries(['job', id]);
      navigate(`/job/view/${id}`);
    },
  });

  const [jobDetails, setJobDetails] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    if (job) {
      setJobDetails(job);
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevJob) => ({
      ...prevJob,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id, job: jobDetails });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
          <textarea
            name="content"
            value={jobDetails.content}
            onChange={handleChange}
            placeholder="Job Content"
            className="border border-gray-300 rounded-lg p-3 w-full"
            rows="6"
          ></textarea>
        </div>
        <button type="submit" className="btn bg-black text-white py-2 px-4 rounded-lg">Save Changes</button>
      </form>
    </div>
  );
};

export default JobEdit;
