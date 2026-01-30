import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  // Load resume data based on resumeId
  const loadResume = async () => {
    try {
      
      const {data} = await api.get('/api/resumes/public/' + resumeId)

      setResumeData(data.resume)

    } catch (error) {
      console.log(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  // While loading
  if (isLoading) {
    return (
      <div className="bg-slate-600 min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // If resume not found
  if (!resumeData) {
    return (
      <div className="bg-slate-600 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-6xl text-slate-400 font-medium mb-6">Resume Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center transition-colors"
        >
          <ArrowLeftIcon className="mr-2" size={20} />
          Go to Home Page
        </button>
      </div>
    );
  }

  // If resume found, show preview
  return (
    <div className="bg-slate-600 min-h-screen py-10">
      <div className="max-w-3xl mx-auto">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2" size={20} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
