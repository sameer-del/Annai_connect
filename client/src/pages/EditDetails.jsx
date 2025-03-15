import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useUser } from "../pages/UserContext";

const EditStudent = () => {
  const { rollNo } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    bio:'',
    
  });
  const [error, setError] = useState('');
  const { user, setUser } = useUser();
  const [image, setimage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    // Fetch student details
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${rollNo}`)
        setStudent(response.data);
        if(response.data.image_url) {
            setPreviewUrl(`${response.data.image_url}`);
          }
       
      } catch (err) {
        setError('Failed to fetch student details');
        console.error(err);
      }
    };
    fetchStudent();
  }, [rollNo,user,setUser]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value

      
    });
  
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setimage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this student?")){
      try{
        await axios.delete(`http://localhost:5000/users/${rollNo}`);
        toast.success("Student deleted successfully");
        navigate("/admin");
      }catch(err){
        console.error(err);
        toast.error("Failed to delete student");
      }
    }
  }
  const refreshUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${rollNo}`);
      // Update the user context with fresh data
      if (user && user.roll_no === rollNo) {
        setUser(response.data);
        // Also update local storage to persist the changes
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    } catch (err) {
      console.error('Failed to refresh user data:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        Object.keys(student).forEach(key => {
            formData.append(key, student[key]);
          });
          if (image) {
            formData.append('image', image);
          }
      await axios.put(`http://localhost:5000/users/${rollNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      await refreshUserData();
      navigate('/admin'); // Redirect to admin dashboard after successful update
      toast.success('Student details updated successfully');
    } catch (err) {
      setError('Failed to update student details');
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Student Details</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-blue-500">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors">
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Department</label>
          <input
            type="text"
            name="department"
            value={student.department}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Student
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;