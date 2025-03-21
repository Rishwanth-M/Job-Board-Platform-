
import { create } from 'zustand';

const useJobsStore = create((set) => ({
  jobs: [], 
  previewJob: null,
  addJob: (job) => {
    set((state) => {
      const updatedJobs = [...state.jobs, job]; 
      localStorage.setItem("jobs", JSON.stringify(updatedJobs)); 
      return { jobs: updatedJobs }; 
    });
  },
  setPreviewJob: (job) => set({ previewJob: job }),
}));

export { useJobsStore }; 
