import React from 'react';

/**
 * WORKSPACESIDEBAR COMPONENT:
 * Acts as the "Expert Guide" for students while they are creating a new service listing.
 * It uses a "sticky" layout to stay visible as the user scrolls through the long form.
 */
const WorkspaceSidebar = () => {
  // 1. DATA ARRAY:
  // Storing tips in an array of objects makes the UI "Data-Driven." 
  // In a viva, explain that this makes the code cleaner and easier to update 
  // than hardcoding three separate <div> blocks.
  const tips = [
    { id: "01", text: "Use natural lighting in your gallery photos for a premium feel." },
    { id: "02", text: "Keep your title concise but evocative of the value you provide." },
    { id: "03", text: "Detailed descriptions help set clear expectations from the start." }
  ];

  return (
    /* 2. STICKY POSITIONING:
       'sticky top-12' ensures that as the user fills out the ExpertiseForm, 
       these tips remain in their line of sight. Mention this as a UX (User Experience) choice. */
    <div className="sticky top-12">
      
      {/* SECTION LABEL: Uses the Amigo accent color (#8b2e5f) for brand consistency */}
      <p className="text-[10px] font-bold text-[#8b2e5f] uppercase tracking-widest mb-4">
        Curator Workspace
      </p>

      {/* MAIN HEADING: 
          Uses 'tracking-tighter' and a large font size to create a high-end, 
          editorial look suitable for a campus marketplace. */}
      <h2 className="text-5xl font-extrabold leading-[1.1] tracking-tighter mb-8">
        List Your <br /> Expertise.
      </h2>

      {/* SUPPORTING TEXT: Provides the "Why" behind the form */}
      <p className="text-gray-500 text-lg leading-relaxed mb-10">
        Turn your creative talent into a gallery-ready service. 
        High-quality visuals and clear descriptions attract the best clients.
      </p>

      {/* 3. THE TIPS CARD:
          A container that highlights the "Editorial Tips" to help students succeed. */}
      <div className="bg-[#EFEFEF] rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-lg">💡</span>
          <h4 className="font-bold text-sm">Editorial Tips</h4>
        </div>

        {/* 4. MAPPING THE TIPS:
            Explain that .map() is used to iterate through the 'tips' array.
            'key={tip.id}' is essential for React's reconciliation process to 
            efficiently track which items change in the DOM. */}
        <div className="space-y-6">
          {tips.map((tip) => (
            <div key={tip.id} className="flex gap-4">
              {/* Numbering: Using a secondary color (gray-400) to keep focus on the text */}
              <span className="font-bold text-gray-400 text-sm">{tip.id}</span>
              <p className="text-sm leading-snug text-gray-700">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;