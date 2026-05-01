import React, { useState } from 'react';

/**
 * EXPERTISEFORM:
 * A specialized form for students to list their skills (e.g., photography, tutoring)
 * as services on the Amigo marketplace.
 */
const ExpertiseForm = () => {
  /* 
     1. STATE MANAGEMENT (The "Brain" of the Form)
     We use a single object state to track all input fields. 
     During a viva, explain that this is more efficient than having 
     four separate useState hooks because it simplifies the 'handleChange' logic.
  */
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: ''
  });

  /* 
     2. DYNAMIC INPUT HANDLER
     This function updates the state based on the 'name' attribute of the input.
     Explain that '[name]: value' is an ES6 "Computed Property Name" that allows 
     one function to handle every input in the entire form.
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* 
     3. FORM SUBMISSION
     This handles the 'Publish' action. Mention that 'e.preventDefault()' 
     is critical because it stops the browser from refreshing the page, 
     allowing React to handle the data transmission via an API call.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ready to send to backend:", formData);
    // Logic for MERN stack: would use axios.post('/api/services', formData)
    alert("Post Published successfully!");
  };

  return (
    /* We wrap the UI in a <form> element to ensure accessibility (aiding screen readers) 
       and to allow the 'Enter' key to trigger submission. */
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
      
      {/* 4. VISUAL GALLERY (UI Placeholder)
          The marketplace relies on visual proof. This section uses a 
          responsive grid (grid-cols-4) to create a layout for image uploads. */}
      <section className="mb-10">
        <h3 className="text-lg font-bold mb-1">Visual Gallery</h3>
        <p className="text-sm text-gray-400 mb-6">Upload up to 5 high-resolution images of your work.</p>
        
        <div className="grid grid-cols-4 gap-4">
          {/* Featured Image: Spans 2 columns to signify its importance (the thumbnail) */}
          <div className="col-span-2 aspect-square bg-[#F3F3F3] border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
             <span className="text-2xl mb-2">📸</span>
             <p className="text-[10px] font-bold text-gray-400 uppercase">Featured Image</p>
          </div>
          {/* Auxiliary Images: Mapped for clean code repetition */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-[#F3F3F3] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300 text-2xl hover:bg-gray-50 cursor-pointer">
              +
            </div>
          ))}
        </div>
      </section>

      {/* 5. DATA INPUT FIELDS
          Every input has a 'name' attribute that matches the 'formData' state keys. */}
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-bold mb-3">Service Title</label>
          <input 
            type="text"
            name="title" 
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Professional Editorial Photography for Campus Events"
            className="w-full bg-[#F3F3F3] border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-green-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold mb-3">Category</label>
            {/* 'appearance-none' removes the default browser dropdown arrow for a custom UI look */}
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#F3F3F3] border-none rounded-lg p-4 text-sm appearance-none"
            >
              <option value="">Select a specialty</option>
              <option value="Photography">Photography</option>
              <option value="Tutoring">Tutoring</option>
              <option value="Notes Swap">Notes Swap</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-3">Estimated Price</label>
            <div className="relative">
              {/* Dollar sign positioned absolutely inside the input container for a pro look */}
              <span className="absolute left-4 top-4 text-gray-400 text-sm">$</span>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00" 
                className="w-full bg-[#F3F3F3] border-none rounded-lg p-4 pl-8 text-sm" 
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-3">Full Description</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="6"
            placeholder="Detail your process, deliverables, and any requirements for the client..."
            className="w-full bg-[#F3F3F3] border-none rounded-lg p-4 text-sm"
          ></textarea>
        </div>
      </div>

      {/* 6. ACTION FOOTER
          Contains auto-save status and final submission buttons. */}
      <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
        {/* Visual indicator of "Auto-save" to improve User Experience (UX) */}
        <p className="text-[10px] text-gray-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span> Auto-saved at 10:42 AM
        </p>
        <div className="flex gap-4">
          {/* Note: 'Save Draft' uses type="button" to prevent it from accidentally submitting the form */}
          <button type="button" className="bg-[#f08fb3] text-white px-8 py-3 rounded-lg font-bold text-sm hover:opacity-90">
            Save Draft
          </button>
          {/* 'Publish Post' uses type="submit" to trigger the form's onSubmit event */}
          <button type="submit" className="bg-[#064e3b] text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-green-900">
            Publish Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpertiseForm;