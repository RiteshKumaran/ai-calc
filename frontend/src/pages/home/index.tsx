"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Zap, Brain, ChevronRight, Check } from "lucide-react";
import BackgroundGrid from "@/components/ui/bggrid";
import Spotlight, { SpotlightCard } from "@/components/ui/spotlight-card";
import Navbar from "./Navbar";

export default function Home() {
  const [theme, setTheme] = useState("dark");
  const navigate = useNavigate();
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const color = theme === "light" ? "violet" : "#722F37";
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 transition-colors ">
      <Navbar onThemeChange={handleThemeChange} />
      <main>
        <section className="container   mx-auto px-4 py-36 text-center">
          <BackgroundGrid color={color} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-col  justify-center my-auto items-center "
          >
            <h1 className="text-5xl md:text-7xl mx-5 md:mx-24  text-wrap font-bold mb-6 bg-gradient-to-r from-red-700 to-purple-400 text-transparent bg-clip-text">
              Revolutionize Your Calculations with AI
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the future of mathematics with our AI-powered
              calculator app. Solve complex problems, get intelligent insights,
              and boost your productivity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                size="lg"
                className="w-full sm:w-auto z-20"
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </section>

        <section
          id="features"
          className="bg-white border-t-[0.1px] border-b-[0.1px]  border-black dark:border-gray-500  dark:bg-black py-24"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Features
            </h2>

            <Spotlight className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8   group">
              <SpotlightCard>
                <div className="relative h-full dark:bg-slate-900 bg-black p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                  {/* Radial gradient */}
                  <div
                    className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                  </div>
                  <div className="flex flex-col h-full items-center text-center">
                    {/* Image */}
                    <div className="relative inline-flex">
                      <div
                        className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      ></div>
                    </div>
                    {/* Text */}
                    <div className="grow mb-5">
                      <div className="flex gap-5">
                        <Zap className="h-6 w-6 text-white" />
                        <h2 className="text-xl text-slate-200 font-bold mb-1">
                          Lightning Fast
                        </h2>
                      </div>
                      <p className="text-sm text-start text-slate-500">
                        Perform complex calculations in milliseconds with our
                        advanced AI algorithms. Say goodbye to manual
                        computations and hello to instant results.
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="relative h-full dark:bg-slate-900 bg-black p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                  {/* Radial gradient */}
                  <div
                    className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                  </div>
                  <div className="flex flex-col h-full items-center text-center">
                    {/* Image */}
                    <div className="relative inline-flex">
                      <div
                        className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      ></div>
                    </div>
                    {/* Text */}
                    <div className="grow mb-5">
                      <div className="flex gap-5">
                        <Brain className="h-6 w-6 text-white" />
                        <h2 className="text-xl text-slate-200 font-bold mb-1">
                          Intelligent Suggestions
                        </h2>
                      </div>
                      <p className="text-sm text-start text-slate-500">
                        Get smart recommendations and insights based on your
                        calculation history. Our AI learns from your usage
                        patterns to provide personalized suggestions.
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              <SpotlightCard>
                <div className="relative h-full dark:bg-slate-900 bg-black p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
                  {/* Radial gradient */}
                  <div
                    className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
                  </div>
                  <div className="flex flex-col h-full items-center text-center">
                    {/* Image */}
                    <div className="relative inline-flex">
                      <div
                        className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      ></div>
                    </div>
                    {/* Text */}
                    <div className="grow mb-5">
                      <div className="flex gap-5">
                        <Calculator className="h-6 w-6 text-white" />
                        <h2 className="text-xl text-slate-200 font-bold mb-1">
                          Complex Calculations
                        </h2>
                      </div>
                      <p className="text-sm text-start text-slate-500">
                        Solve complex mathematical problems with ease using our
                        advanced AI calculator. Perform intricate computations
                        in seconds.
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Spotlight>
          </div>
        </section>

        <section id="pricing" className="bg-gray-50 dark:bg-black py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "Free",
                  features: [
                    "Basic calculations",
                    "5 AI-powered insights per day",
                    "Standard support",
                  ],
                },
                {
                  name: "Pro",
                  price: "₹420/mo",
                  features: [
                    "Advanced calculations",
                    "Unlimited AI-powered insights",
                    "Priority support",
                    "Collaboration tools",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "All Pro features",
                    "Dedicated account manager",
                    "Custom AI model training",
                    "API access",
                  ],
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-black border shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <p className="text-3xl font-bold text-primary">
                      {plan.price}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <Check className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6">
                      {plan.name === "Enterprise"
                        ? "Contact Sales"
                        : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-24 border-t-[0.1px] border-gray-400">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {[
                {
                  q: "How accurate is the AI calculator?",
                  a: "Our AI calculator is highly accurate, leveraging advanced algorithms and machine learning models. It undergoes continuous testing and improvement to ensure precision in calculations.",
                },
                {
                  q: "Can I use AI Calc offline?",
                  a: "While most features require an internet connection for AI processing, we offer a basic offline mode for essential calculations. Full functionality is available when you're back online.",
                },
                {
                  q: "Is my data secure?",
                  a: "Absolutely. We employ industry-standard encryption and security measures to protect your data. Your calculations and personal information are never shared without your explicit consent.",
                },
                {
                  q: "How often is the AI model updated?",
                  a: "We update our AI models regularly, typically on a monthly basis, to incorporate the latest advancements in mathematical computations and user feedback.",
                },
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold mb-2">{item.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-black border-t border-black dark:border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} AI Calc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
