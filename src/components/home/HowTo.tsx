import React from 'react'

const HowTo = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
      How it Works
      </h2>
      
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          
          <h3 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          Input Your Project Details
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
          Provide basic information about your project, such as purpose, target audience, and key features.
          </p>
          
        </div>
        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          
          <h3 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          Let AI Work its Magic
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
          Our advanced algorithms analyze your input and generate a comprehensive SRS document tailored to your project.
          </p>
          
        </div>

        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          
          <h3 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          Review and Customize
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
          The generated SRS document is yours to modify. Add, edit, or remove any section to ensure it aligns perfectly with your vision.
          </p>
          
        </div>

        <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          
          <h3 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
          Download and Share
          </h3>
          <p className="text-gray-500 dark:text-gray-300">
          Once satisfied, download your SRS document in various formats, ready for use in your development process.
          </p>
          
        </div>
        
      </div>
    </div>
  </section>
  
  
  )
}

export default HowTo