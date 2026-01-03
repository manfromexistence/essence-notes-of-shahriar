import React from "react";

const Report = ({ pageContent }) => {
  const reportData = pageContent?.report || {};
  
  const stats = [
    { value: reportData.stat_1_value || '11', label: reportData.stat_1_label || 'Years Journey' },
    { value: reportData.stat_2_value || '200', label: reportData.stat_2_label || 'Projects' },
    { value: reportData.stat_3_value || '6', label: reportData.stat_3_label || 'Certification' },
    { value: reportData.stat_4_value || '5', label: reportData.stat_4_label || 'Int Article' },
    { value: reportData.stat_5_value || '4', label: reportData.stat_5_label || 'Books' },
    { value: reportData.stat_6_value || '4', label: reportData.stat_6_label || 'Books' },
    { value: reportData.stat_7_value || '100', label: reportData.stat_7_label || 'Mentoring' },
  ];
  
  return (
    <div className="bg-slate-950 text-white">
      <div className="w-11/12 mx-auto">
        <div className="py-8">
          <div className="grid grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-auto">
            {stats.map((stat, index) => (
              <div key={index}>
                <h1 className="text-white font-semibold text-4xl mb-3 text-center">
                  {stat.value}
                </h1>
                <p className="text-lg text-slate-300 text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16 lg:w-2/3 mx-auto">
          <p className="text-2xl text-white text-center font-light">
            {reportData.description || "Living an extraordinary life means shaping it on your terms, filled with deep meaning and significant impact. Fueled by the quest for excellence and a strong sense of purpose, Shahriar Khan has motivated millions to dream boldly and strive for greater heights."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
