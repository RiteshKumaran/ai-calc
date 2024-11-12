"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calculator, ChevronRight, Pen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-xs w-full"
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-black h-screen">
      <Navbar />
      <div className=" bg-white dark:bg-black text-white flex flex-col justify-center items-center p-4 my-3 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full text-center"
        >
          <h1 className="text-4xl  md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-700 to-purple-400 text-transparent bg-clip-text">
            AI Calc.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-black dark:text-gray-300">
            Draw. Solve. Amaze.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <FeatureCard
            icon={<Pen className="w-12 h-12 text-purple-400" />}
            title="Draw Anything"
            description="Sketch any mathematical problem on your device"
          />
          <FeatureCard
            icon={<Calculator className="w-12 h-12 text-pink-400" />}
            title="Instant Solutions"
            description="Get immediate answers to complex equations"
          />
          <FeatureCard
            icon={<Sparkles className="w-12 h-12 text-yellow-400" />}
            title="AI-Powered"
            description="Utilizes cutting-edge AI for accurate results"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-lg text-black dark:text-white md:text-xl mb-6 max-w-2xl">
            Experience the future of problem-solving. Our AI-powered calculator
            app transforms your hand-drawn mathematical problems into instant
            solutions.
          </p>
          <Button
            onClick={() => {
              navigate("/login");
            }}
            size="lg"
            className="w-full sm:w-auto z-20"
          >
            Try Now
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
