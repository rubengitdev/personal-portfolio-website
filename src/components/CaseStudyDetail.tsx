import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Sparkles, BookOpen, ThumbsUp, Calendar, ShieldCheck, Heart } from "lucide-react";
import { Project } from "../types";
import ProjectPreview from "./ProjectPreviews";
import { motion, AnimatePresence } from "motion/react";
import DesignStoryCanvas from "./DesignStoryCanvas";

interface CaseStudyDetailProps {
  project: Project;
  onBack: () => void;
  onNextProject: () => void;
}

export default function CaseStudyDetail({
  project,
  onBack,
  onNextProject,
}: CaseStudyDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12"
      id={`case-study-${project.id}`}
    >
      {/* Back to Home Header */}
      <div className="flex items-center justify-between" id="case-study-topbar">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white border-2 border-black dark:border-white bg-white dark:bg-stone-800 rounded-full px-4 py-2 hover:bg-[#ff2a2a] dark:hover:bg-[#ff2a2a] hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer"
          id="back-home-btn"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </button>

        <span className="font-mono text-xs uppercase text-stone-500 dark:text-stone-300 font-extrabold tracking-widest bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1 rounded">
          {project.category} {project.tagline}
        </span>
      </div>

      {/* Case Study Title Header */}
      <div className="space-y-4 text-left font-display" id="case-study-head">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-stone-900 dark:text-white tracking-tight leading-none">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-stone-600 dark:text-stone-300 font-sans font-medium tracking-tight max-w-3xl leading-snug">
          {project.subtitle}
        </p>
      </div>

      {/* Embedded High Fidelity Live Interactive Preview Container */}
      <div className="border-4 border-black dark:border-white rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-stone-950 p-2">
        <ProjectPreview projectId={project.id} />
      </div>

      {/* Key Project Metas Grid (Inspired by Austin's swiss-grid layouts) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-2 border-black dark:border-white bg-[#fafafa] dark:bg-stone-900 p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-left" id="case-study-specs">
        <div className="space-y-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">Timeline</p>
          <p className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
            <Calendar size={12} className="text-[#ff2a2a]" />
            <span>{project.timeline}</span>
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">My Role</p>
          <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{project.role}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">Team</p>
          <p className="text-xs font-bold text-stone-900 dark:text-stone-100">{project.team}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">Scope Type</p>
          <span className="inline-block bg-orange-100 dark:bg-orange-950/55 text-orange-800 dark:text-orange-200 text-[10px] font-black uppercase px-2 py-0.5 rounded border border-orange-200 dark:border-orange-850">
            {project.id === "glean" || project.id === "slack" ? "Corporate Internship" : "Founder Endeavor"}
          </span>
        </div>
      </div>

      {/* Context, Problem, & Solution Double-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 text-left" id="case-study-deep-dive">
        {/* Left Side: Context & Opportunity */}
        <div className="md:col-span-5 space-y-8">
          <div className="bg-stone-50 dark:bg-stone-850/40 border-2 border-stone-200 dark:border-stone-700 p-6 rounded-2xl space-y-3">
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-stone-500 dark:text-stone-300 flex items-center gap-1.5 border-b border-stone-200 dark:border-stone-700 pb-2">
              <BookOpen size={13} className="text-[#ff2a2a]" />
              <span>Project Context</span>
            </h3>
            <p className="text-sm font-sans font-medium text-stone-700 dark:text-stone-300 leading-relaxed">
              {project.context}
            </p>
          </div>

          <div className="bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-200/60 dark:border-amber-800/80 p-6 rounded-2xl space-y-3">
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 border-b border-amber-200 dark:border-amber-800 pb-2">
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
              <span>Opportunity Statement</span>
            </h3>
            <p className="text-sm italic font-display font-bold text-amber-900 dark:text-amber-200 leading-snug">
              &ldquo;{project.opportunityStatement}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Side: Problem & Solution Detailed breakdown */}
        <div className="md:col-span-7 space-y-8">
          {/* Problem Block */}
          <div className="space-y-3 col-span-12">
            <h3 className="text-lg font-display font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-black flex items-center justify-center border border-red-200 dark:border-red-800">!</span>
              <span>The Problem Statement</span>
            </h3>
            <p className="text-base text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution Block */}
          <div className="space-y-3 border-l-4 p-4 bg-[#fafafa] dark:bg-stone-900/60 rounded-r-xl" style={{ borderColor: project.themeColor }}>
            <h3 className="text-lg font-display font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center justify-center border border-emerald-200 dark:border-emerald-800">✓</span>
              <span>The Redesigned Solution</span>
            </h3>
            <p className="text-base text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>
      </div>


      {/* Interactive Story Canvas detailing the design process thoroughly */}
      <DesignStoryCanvas projectId={project.id} />

      {/* Meticulous Lessons Learned & Design Takeaways */}
      <div className="space-y-6 pt-6 border-t-2 border-stone-200 dark:border-stone-800 text-left" id="case-study-takeaways">
        <h3 className="text-xl font-display font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
          <ThumbsUp size={18} className="text-[#ff2a2a]" />
          <span>Kaizen Takeaways & Key Lessons</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(project.lessonsLearned || []).map((lesson, index) => (
            <div
              key={index}
              className="border-2 border-black dark:border-white bg-white dark:bg-stone-900 p-5 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] relative hover:-translate-y-1 transition-all duration-200"
            >
              <span className="absolute -top-3 -left-2 bg-black dark:bg-[#ff2a2a] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-black dark:border-white">
                0{index + 1}
              </span>
              <p className="text-sm text-stone-700 dark:text-stone-300 font-sans leading-relaxed pt-2">
                {lesson}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Case Study Guestbook widget */}
      <div className="p-6 sm:p-8 border-2 border-stone-800 dark:border-white bg-stone-900 dark:bg-stone-900 text-stone-100 rounded-3xl space-y-4" id="case-study-quick-action">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>Are you working on something similar?</span>
            </h4>
            <p className="text-xs text-stone-400 mt-1">
              Let's brainstorm this exact design pattern during a short digital coffee run.
            </p>
          </div>
          <button
            onClick={onNextProject}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900 bg-white border-2 border-white rounded-full px-5 py-2.5 hover:bg-stone-200 hover:scale-105 transition-all cursor-pointer"
          >
            <span>Next Project</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
