import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-[#FAFAFA] text-gray-900 min-h-screen relative overflow-hidden font-space-grotesk">
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:64px_64px] -z-20"></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cusoc-red/10 blur-[120px] -z-10 mix-blend-multiply pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[150px] -z-10 mix-blend-multiply pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-64px)] overflow-hidden">
        {/* Hero Background Watermark Logo */}
        <div className="absolute inset-y-0 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 flex items-center justify-center pointer-events-none z-0">
          <img
            src="/cusoc.png"
            alt=""
            className="w-full max-w-full h-auto object-contain opacity-[0.25] select-none blur-[2px]"
          />
        </div>
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col z-10 lg:mt-0 relative">
          <div className="flex items-center text-cusoc-red tracking-[0.3em] text-xs md:text-sm mb-6 font-bold uppercase">
            <span className="w-10 h-[2px] bg-cusoc-red mr-4 opacity-80"></span>
            CUSoC
            <span className="w-10 h-[2px] bg-cusoc-red ml-4 opacity-80"></span>
          </div>
          
          <h1 className="text-[3.5rem] md:text-[4rem] lg:text-[4.5rem] font-black tracking-tighter leading-none mb-4 font-space-grotesk drop-shadow-sm">
            <div className="text-gray-900">Build.</div>
            <div className="text-cusoc-red bg-clip-text text-transparent bg-gradient-to-r from-cusoc-red to-red-600">Compete.</div>
            <div className="text-gray-900">Grow.</div>
          </h1>
          
          <div className="bg-white/30 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] mb-6 max-w-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
            <p className="text-gray-800 tracking-[0.2em] text-xs md:text-sm font-black mb-4 uppercase relative z-10">
              Chandigarh University<br/>Summer of Code
            </p>
            
            <p className="text-gray-700 text-sm leading-relaxed font-medium relative z-10">
              Chandigarh University Summer of Code is a student-driven open-source program 
              where beginners become contributors, contributors become maintainers, and 
              maintainers become builders through real-world projects, mentorship, and 
              collaborative development.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#applications" className="px-8 py-3.5 bg-cusoc-red text-white text-sm font-bold rounded-md hover:bg-red-700 transition-all hover:shadow-[0_4px_15px_rgba(230,57,70,0.3)] hover:-translate-y-0.5">
              APPLY NOW
            </a>
            <a href="#timeline" className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-md hover:bg-gray-50 transition-all hover:shadow-sm hover:-translate-y-0.5">
              VIEW TIMELINE
            </a>
          </div>
        </div>

        {/* Right Content - Code Editor Mockup */}
        <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute inset-0 bg-cusoc-red/5 blur-[60px] -z-10 rounded-full"></div>
            {/* Light-themed frosted glass editor */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/40 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] relative w-full transform hover:scale-[1.02] transition-transform duration-500">
              {/* Header */}
              <div className="flex items-center px-4 py-3 bg-white/30 border-b border-white/40">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm"></div>
                </div>
                <div className="mx-auto text-[11px] text-gray-500 font-mono flex items-center font-medium tracking-wide">
                  <span className="text-gray-400 mr-2">{'</>'}</span> CUSoC.js
                </div>
                <div className="text-[10px] text-gray-400 font-mono">UTF-8</div>
              </div>
              {/* Code Area */}
              <div className="p-6 font-mono text-[13px] leading-[1.6] overflow-hidden text-left flex bg-white/10">
                {/* Line Numbers */}
                <div className="text-gray-400 select-none pr-4 text-right flex flex-col font-medium border-r border-gray-200 mr-4">
                  <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
                </div>
                {/* Code Content - Light syntax colors */}
                <div className="text-gray-800 flex-grow font-medium tracking-tight">
<div><span className="text-[#0000FF]">class</span> <span className="text-[#267F99]">CUSoC</span> {'{'}</div>
<div>{'  '}<span className="text-[#0000FF]">async</span> <span className="text-[#795E26]">join</span>() {'{'}</div>
<div>{'    '}<span className="text-[#001080]">console</span>.<span className="text-[#795E26]">log</span>(</div>
<div>{'      '}<span className="text-[#A31515]">&quot;Welcome to Open Source!&quot;</span></div>
<div>{'    '});</div>
<div>{'  '}{'}'}</div>
<br/>
<div>{'  '}<span className="text-[#0000FF]">static</span> <span className="text-[#0000FF]">async</span> <span className="text-[#795E26]">init</span>() {'{'}</div>
<div>{'    '}<span className="text-[#0000FF]">const</span> <span className="text-[#001080]">cohort</span> = <span className="text-[#0000FF]">new</span> <span className="text-[#267F99]">CUSoC</span>();</div>
<div>{'    '}<span className="text-[#AF00DB]">await</span> <span className="text-[#001080]">cohort</span>.<span className="text-[#795E26]">join</span>();</div>
<div>{'  '}{'}'}</div>
<div>{'}'}</div>
                </div>
              </div>
              {/* Footer */}
              <div className="flex justify-between items-center px-4 py-2 bg-white/30 border-t border-white/40 text-[10px] text-gray-600 font-mono">
                <div className="font-medium">{'>_'} Node 20.x</div>
                <div className="flex items-center font-medium"><span className="w-2 h-2 rounded-full bg-[#27C93F] mr-2 shadow-[0_0_6px_#27C93F]"></span> Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Program Applications */}
      <section id="applications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 tracking-tight text-gray-900">Application Portals</h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto font-medium">Join the upcoming cohort as a contributor, mentor, or propose a project to shape the future of open-source at CU.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contributor Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group hover:border-cusoc-red/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(230,57,70,0.1)] relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cusoc-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-cusoc-red transition-colors tracking-tight">Contributor</h3>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed font-medium flex-grow">Register as an open-source contributor for the pilot program. Ideal for students looking to build real-world skills.</p>
            <Link to="/register/contributor" className="text-gray-900 font-bold text-sm flex items-center uppercase tracking-widest mt-auto group-hover:text-cusoc-red transition-colors">
              Apply Now <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          {/* Mentor Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group hover:border-cusoc-red/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(230,57,70,0.1)] relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cusoc-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-cusoc-red transition-colors tracking-tight">Mentor</h3>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed font-medium flex-grow">Industry professionals, Faculty, and Senior Students. Guide real-world projects and mentor the next generation.</p>
            <Link to="/register/mentor" className="text-gray-900 font-bold text-sm flex items-center uppercase tracking-widest mt-auto group-hover:text-cusoc-red transition-colors">
              Apply Now <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>

          {/* Project Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 group hover:border-cusoc-red/30 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(230,57,70,0.1)] relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cusoc-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-cusoc-red transition-colors tracking-tight">Project</h3>
            <p className="text-gray-600 text-sm mb-8 leading-relaxed font-medium flex-grow">Propose open-source projects for contributors to work on. Submit your ideas for the upcoming cohort.</p>
            <Link to="/register/project" className="text-gray-900 font-bold text-sm flex items-center uppercase tracking-widest mt-auto group-hover:text-cusoc-red transition-colors">
              Submit Idea <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Program Timeline */}
      <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent -z-10"></div>
        <h2 className="text-4xl font-black mb-12 text-center tracking-tight text-gray-900">Program Timeline</h2>
        <div className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap text-base font-bold text-gray-900">Pilot Summer Program</td>
                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-cusoc-red">15 May 2026 – 15 July 2026</td>
                <td className="px-8 py-6 text-sm font-medium text-gray-600">Identification and training of high-potential contributors</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors bg-gray-50/50">
                <td className="px-8 py-6 whitespace-nowrap text-base font-bold text-gray-900">Final Showcase & Evaluation</td>
                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-cusoc-red">21 July 2026</td>
                <td className="px-8 py-6 text-sm font-medium text-gray-600">Final assessment and project showcase</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-8 py-6 whitespace-nowrap text-base font-bold text-gray-900">CUSoC Cohort Program</td>
                <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-cusoc-red">25 July 2026 – April 2027</td>
                <td className="px-8 py-6 text-sm font-medium text-gray-600">Long-term mentorship and production-scale engineering training</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
