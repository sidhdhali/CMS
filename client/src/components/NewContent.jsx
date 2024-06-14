import { useState } from 'react';
import axios from 'axios';

function NewContent({ onContentAdded })
{
  const [contentData, setContentData] = useState({
    title: '',
    owner: '',
    content: null,
  });

  const handleChange = (e) =>
  {
    const { name, value, files } = e.target;
    setContentData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', contentData.title);
    formData.append('owner', contentData.owner);
    formData.append('content', contentData.content);

    try
    {
      const response = await axios.post('http://localhost:8000/content', formData);
      onContentAdded(response.data);
      alert('Content added successfully');
      setContentData({
        title: '',
        owner: '',
        content: null,
      });
    } catch (error)
    {
      console.error('Error adding content:', error);
    }
  };

  return (
    <div className="m-4 p-4 border rounded-lg shadow-md bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h2 className="text-2xl font-semibold text-blue-500">Add New Content</h2>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={contentData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
            Owner
          </label>
          <input
            type="text"
            name="owner"
            value={contentData.owner}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <input
            type="file"
            name="content"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Content
        </button>
      </form>
    </div>
  );
}

export default NewContent;
