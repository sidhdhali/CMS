import { useEffect, useState } from 'react';
import axios from 'axios';
import NewContent from './NewContent';

function Content()
{
  const [contents, setContents] = useState([]);

  useEffect(() =>
  {
    const fetchContents = async () =>
    {
      try
      {
        const response = await axios.get('http://localhost:8000/content');
        setContents(response.data);
      } catch (error)
      {
        console.error('Error fetching contents:', error);
      }
    };
    fetchContents();
  }, []);

  const handleDelete = async (id) =>
  {
    try
    {
      await axios.delete(`http://localhost:8000/content/${id}`);
      setContents((prevContents) => prevContents.filter((c) => c._id !== id));
      alert('Content deleted successfully');
    } catch (error)
    {
      console.error('Error deleting content:', error);
    }
  };

  const handleContentAdded = (newContent) =>
  {
    setContents((prevContents) => [...prevContents, newContent]);
  };

  const isVideo = (url) =>
  {
    const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
    const extension = url.split('.').pop().toLowerCase();
    return videoExtensions.includes(extension);
  };

  return (
    <div className="p-4">
      <NewContent onContentAdded={handleContentAdded} />
      {contents.length === 0 ? (
        <p>No contents available</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map((c) => (
            <li key={c._id} className="border rounded-lg shadow-md p-4 bg-white">
              <h2 className="text-xl font-semibold mb-2">{c.title}</h2>
              <p className="text-gray-600 mb-2">Owner: {c.owner}</p>
              {c.content_url && (
                isVideo(c.content_url) ? (
                  <video controls className="max-w-full h-auto mb-2">
                    <source src={c.content_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img src={c.content_url} alt={c.title} className="max-w-full h-auto mb-2" />
                )
              )}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Content;
