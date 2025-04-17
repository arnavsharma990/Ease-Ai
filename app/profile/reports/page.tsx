"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, Sparkles } from "lucide-react"
import { useState } from "react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, ResponsiveContainer, Legend } from 'recharts'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// Updated color scheme to match the image
const colors = {
  joyful: "#7FE0AA",    // Bright mint green
  content: "#B4E6C9",   // Light mint green
  sad: "#9F9FE6",       // Light purple
  stressed: "#8080DB",  // Medium purple
  angry: "#6161D0"      // Dark purple
}

// Mock data for the example
const moodData = {
  distribution: [
    { name: "Joyful", value: 30, color: colors.joyful },
    { name: "Content", value: 25, color: colors.content },
    { name: "Sad", value: 20, color: colors.sad },
    { name: "Stressed", value: 15, color: colors.stressed },
    { name: "Angry", value: 10, color: colors.angry }
  ],
  weeklyTrends: [
    { date: "Mar 16", intensity: 8.5, mood: "stressed", color: colors.stressed },
    { date: "Mar 17", intensity: 6, mood: "content", color: colors.content },
    { date: "Mar 18", intensity: 1, mood: "sad", color: colors.sad },
    { date: "Mar 19", intensity: 1, mood: "sad", color: colors.sad },
    { date: "Mar 20", intensity: 3, mood: "stressed", color: colors.stressed },
    { date: "Mar 21", intensity: 6, mood: "content", color: colors.content },
    { date: "Mar 22", intensity: 8.5, mood: "joyful", color: colors.joyful }
  ],
  insights: {
    journalEntries: 45,
    avgLength: 113,
    topThemes: ["work", "relationships", "challenges"]
  }
}

// Custom tooltip for pie chart
const PieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="bg-white rounded-lg shadow-lg p-3 border"
      >
        <p className="text-lg font-semibold">{payload[0].name}</p>
        <p className="text-muted-foreground">
          {payload[0].value} entries ({(payload[0].value).toFixed(1)}%)
        </p>
      </div>
    )
  }
  return null
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm border">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">{payload[0].value}</p>
      </div>
    )
  }
  return null
}

export default function ReportsPage() {
  const [selectedDate] = useState("Week of Mar 22, 2025")
  const [activeTab, setActiveTab] = useState("weekly")

  const handleDownload = async () => {
    try {
      const report = document.getElementById("reportContent");
      if (!report) {
        console.error('Could not find report content');
        return;
      }

      // Store current scroll position
      const scrollPos = window.scrollY;

      // Create canvas with specific settings for PDF quality
      const canvas = await html2canvas(report, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        windowWidth: report.scrollWidth,
        windowHeight: report.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all charts and images are visible in clone
          const elements = clonedDoc.querySelectorAll('canvas, img, svg');
          elements.forEach(el => {
            if (el instanceof HTMLElement) {
              el.style.visibility = 'visible';
              el.style.opacity = '1';
            }
          });
        }
      });

      // Restore scroll position
      window.scrollTo(0, scrollPos);

      // Calculate dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Create PDF with calculated dimensions
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [imgWidth, imgHeight],
        compress: true,
        hotfixes: ['px_scaling']
      });

      // Add image with specific settings
      pdf.addImage({
        imageData: canvas,
        format: 'PNG',
        x: 0,
        y: 0,
        width: imgWidth,
        height: imgHeight,
        compression: 'FAST',
        alias: `image_${new Date().getTime()}`
      });

      // Save the PDF
      pdf.save(`sukoon-mood-report-${selectedDate.replace(/\s+/g, '-').toLowerCase()}.pdf`);

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const reportContent = (
    <>
      {/* Charts Grid */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Mood Distribution */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={moodData.distribution}
                    cx="45%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {moodData.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<PieTooltip />}
                    cursor={false}
                    wrapperStyle={{ outline: "none" }}
                    offset={10}
                  />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-sm font-medium">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Based on 7 mood entries
            </p>
          </CardContent>
        </Card>

        {/* Weekly Mood Trends */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Weekly Mood Trends</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={moodData.weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="intensity" fill={colors.joyful}>
                    {moodData.weeklyTrends.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Daily intensity levels for the past week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Fluctuations */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Mood Fluctuations Over Time</h3>
          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData.weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke={colors.joyful}
                  strokeWidth={2}
                  dot={{ fill: colors.joyful, strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Daily mood intensity levels over the selected time period
          </p>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/5 to-blue-500/5 rounded-full blur-3xl -z-10" />
        
        <CardContent className="pt-6 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-500">AI Powered</span>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            This week, your mood data shows patterns that reveal insights into your emotional wellbeing. Here's what our AI has observed and the actionable steps you can take.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid md:grid-cols-3 gap-4 py-4"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                {moodData.insights.journalEntries}
              </div>
              <div className="text-sm text-muted-foreground">Journal Entries</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-4 text-center shadow-sm"
            >
              <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                {moodData.insights.avgLength}
              </div>
              <div className="text-sm text-muted-foreground">Avg. Length</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-xl p-4 text-center shadow-sm"
            >
              <div className="flex gap-2 justify-center flex-wrap">
                {moodData.insights.topThemes.map((theme, index) => (
                  <motion.span 
                    key={theme}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                    className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {theme}
                  </motion.span>
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-2">Top Themes</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-4 gap-6"
          >
            {[
              {
                title: "Mood Pattern Recognition",
                content: "Your mood tends to fluctuate most significantly in the middle of the week. Consider implementing mindfulness practices on Tuesdays and Wednesdays to help maintain emotional balance."
              },
              {
                title: "Journal Analysis",
                content: "Your journaling shows recurring themes of work-related stress. Setting clearer boundaries between work and personal time could help improve your overall wellbeing."
              },
              {
                title: "Emotional Triggers",
                content: "Based on your entries, social interactions are often followed by anxiety. Consider exploring specific aspects of social situations that may be triggering this response."
              },
              {
                title: "Positive Reinforcement",
                content: "You consistently note feeling more joyful after outdoor activities. Incorporating more nature walks into your routine could help boost your mood."
              }
            ].map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <h4 className="text-lg font-semibold mb-2">{insight.title}</h4>
                <div className="overflow-hidden">
                  <motion.p 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 0, y: -20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground text-sm"
                  >
                    {insight.content}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <section className="space-y-6">
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold"
        >
          Recommendations
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Mindfulness Practice",
              description: "Try 5-minute breathing exercises when you notice anxiety peaking, usually mid-day."
            },
            {
              title: "Journal Consistency",
              description: "Consider journaling at the same time each day to establish a reflective routine."
            },
            {
              title: "Sleep Quality",
              description: "Your mood improves with better sleep. Consider a consistent sleep schedule."
            }
          ].map((recommendation, index) => (
            <motion.div
              key={recommendation.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2">{recommendation.title}</h4>
                  <p className="text-muted-foreground">{recommendation.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );

  return (
    <div className="container max-w-6xl py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-500">AI-Powered</span>
          </div>
          <h1 className="text-4xl font-bold">Weekly Mood Report</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Deep insights into your emotional wellbeing based on your mood tracking and journal entries.
          </p>
        </div>

        {/* Report Controls */}
        <div className="flex justify-between items-center">
          <p className="text-lg text-muted-foreground">{selectedDate}</p>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" /> Download
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
        </div>

        {/* Report Tabs */}
        <div className="flex justify-center">
          <Tabs defaultValue="weekly" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-full bg-white dark:bg-slate-900/80 p-1 text-muted-foreground relative w-[400px] gap-1">
                <TabsTrigger 
                  value="weekly" 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Weekly Report
                </TabsTrigger>
                <TabsTrigger 
                  value="monthly"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Monthly Report
                </TabsTrigger>
                <TabsTrigger 
                  value="custom"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  Custom Range
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="weekly" className="space-y-8 mt-8" id="reportContent">
              {reportContent}
            </TabsContent>

            <TabsContent value="monthly">
              <div className="space-y-8">
                {/* Charts Grid */}
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Mood Distribution */}
                  <Card className="md:col-span-2">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
                      <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Joyful", value: 35, color: colors.joyful },
                                { name: "Content", value: 30, color: colors.content },
                                { name: "Sad", value: 15, color: colors.sad },
                                { name: "Stressed", value: 12, color: colors.stressed },
                                { name: "Angry", value: 8, color: colors.angry }
                              ]}
                              cx="45%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={75}
                              paddingAngle={2}
                              dataKey="value"
                              startAngle={90}
                              endAngle={450}
                            >
                              {moodData.distribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<PieTooltip />} cursor={false} />
                            <Legend 
                              layout="vertical"
                              align="right"
                              verticalAlign="middle"
                              iconType="circle"
                              iconSize={8}
                              formatter={(value) => (
                                <span className="text-sm font-medium">{value}</span>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Based on 30 mood entries
                      </p>
                    </CardContent>
                  </Card>

                  {/* Monthly Mood Trends */}
                  <Card className="md:col-span-3">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Monthly Mood Trends</h3>
                      <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { date: "Week 1", intensity: 7.5, color: colors.content },
                            { date: "Week 2", intensity: 8.5, color: colors.joyful },
                            { date: "Week 3", intensity: 4.5, color: colors.sad },
                            { date: "Week 4", intensity: 6.5, color: colors.content }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="intensity" fill={colors.joyful}>
                              {moodData.weeklyTrends.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Weekly intensity levels for the past month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Mood Fluctuations */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Mood Fluctuations Over Time</h3>
                    <div className="h-[300px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={moodData.weeklyTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Line 
                            type="monotone" 
                            dataKey="intensity" 
                            stroke={colors.joyful}
                            strokeWidth={2}
                            dot={{ fill: colors.joyful, strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Daily mood intensity levels over the selected time period
                    </p>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/5 to-blue-500/5 rounded-full blur-3xl -z-10" />
                  <CardContent className="pt-6 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between"
                    >
                      <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
                      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">AI Powered</span>
                      </div>
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground"
                    >
                      This week, your mood data shows patterns that reveal insights into your emotional wellbeing. Here's what our AI has observed and the actionable steps you can take.
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid md:grid-cols-3 gap-4 py-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-4 text-center shadow-sm"
                      >
                        <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                          {moodData.insights.journalEntries}
                        </div>
                        <div className="text-sm text-muted-foreground">Journal Entries</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-4 text-center shadow-sm"
                      >
                        <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                          {moodData.insights.avgLength}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg. Length</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-xl p-4 text-center shadow-sm"
                      >
                        <div className="flex gap-2 justify-center flex-wrap">
                          {moodData.insights.topThemes.map((theme, index) => (
                            <motion.span 
                              key={theme}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + (index * 0.1) }}
                              className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {theme}
                            </motion.span>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">Top Themes</div>
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-4 gap-6"
                    >
                      {[
                        {
                          title: "Mood Pattern Recognition",
                          content: "Your mood tends to fluctuate most significantly in the middle of the week. Consider implementing mindfulness practices on Tuesdays and Wednesdays to help maintain emotional balance."
                        },
                        {
                          title: "Journal Analysis",
                          content: "Your journaling shows recurring themes of work-related stress. Setting clearer boundaries between work and personal time could help improve your overall wellbeing."
                        },
                        {
                          title: "Emotional Triggers",
                          content: "Based on your entries, social interactions are often followed by anxiety. Consider exploring specific aspects of social situations that may be triggering this response."
                        },
                        {
                          title: "Positive Reinforcement",
                          content: "You consistently note feeling more joyful after outdoor activities. Incorporating more nature walks into your routine could help boost your mood."
                        }
                      ].map((insight, index) => (
                        <motion.div
                          key={insight.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          className="group relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <h4 className="text-lg font-semibold mb-2">{insight.title}</h4>
                          <div className="overflow-hidden">
                            <motion.p 
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 0, y: -20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-muted-foreground text-sm"
                            >
                              {insight.content}
                            </motion.p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <section className="space-y-6">
                  <motion.h3 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-semibold"
                  >
                    Recommendations
                  </motion.h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Mindfulness Practice",
                        description: "Try 5-minute breathing exercises when you notice anxiety peaking, usually mid-day."
                      },
                      {
                        title: "Journal Consistency",
                        description: "Consider journaling at the same time each day to establish a reflective routine."
                      },
                      {
                        title: "Sleep Quality",
                        description: "Your mood improves with better sleep. Consider a consistent sleep schedule."
                      }
                    ].map((recommendation, index) => (
                      <motion.div
                        key={recommendation.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card className="h-full transition-shadow hover:shadow-md">
                          <CardContent className="pt-6">
                            <h4 className="font-semibold mb-2">{recommendation.title}</h4>
                            <p className="text-muted-foreground">{recommendation.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="custom">
              <div className="space-y-8">
                {/* Charts Grid */}
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Mood Distribution */}
                  <Card className="md:col-span-2">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Mood Distribution</h3>
                      <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Joyful", value: 40, color: colors.joyful },
                                { name: "Content", value: 25, color: colors.content },
                                { name: "Sad", value: 15, color: colors.sad },
                                { name: "Stressed", value: 10, color: colors.stressed },
                                { name: "Angry", value: 10, color: colors.angry }
                              ]}
                              cx="45%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={75}
                              paddingAngle={2}
                              dataKey="value"
                              startAngle={90}
                              endAngle={450}
                            >
                              {moodData.distribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip content={<PieTooltip />} cursor={false} />
                            <Legend 
                              layout="vertical"
                              align="right"
                              verticalAlign="middle"
                              iconType="circle"
                              iconSize={8}
                              formatter={(value) => (
                                <span className="text-sm font-medium">{value}</span>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Based on 45 mood entries
                      </p>
                    </CardContent>
                  </Card>

                  {/* Custom Range Mood Trends */}
                  <Card className="md:col-span-3">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-semibold mb-4">Custom Range Mood Trends</h3>
                      <div className="h-[250px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { date: "Mar 1-7", intensity: 6.5, color: colors.content },
                            { date: "Mar 8-14", intensity: 7.5, color: colors.content },
                            { date: "Mar 15-21", intensity: 8.5, color: colors.joyful },
                            { date: "Mar 22-28", intensity: 5.5, color: colors.sad },
                            { date: "Mar 29-31", intensity: 7.0, color: colors.content }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="intensity" fill={colors.joyful}>
                              {moodData.weeklyTrends.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-4">
                        Weekly intensity levels for March 2025
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Mood Fluctuations */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Mood Fluctuations Over Time</h3>
                    <div className="h-[300px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={moodData.weeklyTrends}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip content={<CustomTooltip />} />
                          <Line 
                            type="monotone" 
                            dataKey="intensity" 
                            stroke={colors.joyful}
                            strokeWidth={2}
                            dot={{ fill: colors.joyful, strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      Daily mood intensity levels over the selected time period
                    </p>
                  </CardContent>
                </Card>

                {/* AI Insights */}
                <Card className="overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/5 to-blue-500/5 rounded-full blur-3xl -z-10" />
                  <CardContent className="pt-6 space-y-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between"
                    >
                      <h3 className="text-xl font-semibold">AI-Generated Insights</h3>
                      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-500">AI Powered</span>
                      </div>
                    </motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground"
                    >
                      This week, your mood data shows patterns that reveal insights into your emotional wellbeing. Here's what our AI has observed and the actionable steps you can take.
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid md:grid-cols-3 gap-4 py-4"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl p-4 text-center shadow-sm"
                      >
                        <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                          {moodData.insights.journalEntries}
                        </div>
                        <div className="text-sm text-muted-foreground">Journal Entries</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-4 text-center shadow-sm"
                      >
                        <div className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                          {moodData.insights.avgLength}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg. Length</div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 rounded-xl p-4 text-center shadow-sm"
                      >
                        <div className="flex gap-2 justify-center flex-wrap">
                          {moodData.insights.topThemes.map((theme, index) => (
                            <motion.span 
                              key={theme}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.4 + (index * 0.1) }}
                              className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {theme}
                            </motion.span>
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">Top Themes</div>
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-4 gap-6"
                    >
                      {[
                        {
                          title: "Mood Pattern Recognition",
                          content: "Your mood tends to fluctuate most significantly in the middle of the week. Consider implementing mindfulness practices on Tuesdays and Wednesdays to help maintain emotional balance."
                        },
                        {
                          title: "Journal Analysis",
                          content: "Your journaling shows recurring themes of work-related stress. Setting clearer boundaries between work and personal time could help improve your overall wellbeing."
                        },
                        {
                          title: "Emotional Triggers",
                          content: "Based on your entries, social interactions are often followed by anxiety. Consider exploring specific aspects of social situations that may be triggering this response."
                        },
                        {
                          title: "Positive Reinforcement",
                          content: "You consistently note feeling more joyful after outdoor activities. Incorporating more nature walks into your routine could help boost your mood."
                        }
                      ].map((insight, index) => (
                        <motion.div
                          key={insight.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + (index * 0.1) }}
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          className="group relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <h4 className="text-lg font-semibold mb-2">{insight.title}</h4>
                          <div className="overflow-hidden">
                            <motion.p 
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 0, y: -20 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-muted-foreground text-sm"
                            >
                              {insight.content}
                            </motion.p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <section className="space-y-6">
                  <motion.h3 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-semibold"
                  >
                    Recommendations
                  </motion.h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Mindfulness Practice",
                        description: "Try 5-minute breathing exercises when you notice anxiety peaking, usually mid-day."
                      },
                      {
                        title: "Journal Consistency",
                        description: "Consider journaling at the same time each day to establish a reflective routine."
                      },
                      {
                        title: "Sleep Quality",
                        description: "Your mood improves with better sleep. Consider a consistent sleep schedule."
                      }
                    ].map((recommendation, index) => (
                      <motion.div
                        key={recommendation.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index }}
                        whileHover={{ 
                          scale: 1.02,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <Card className="h-full transition-shadow hover:shadow-md">
                          <CardContent className="pt-6">
                            <h4 className="font-semibold mb-2">{recommendation.title}</h4>
                            <p className="text-muted-foreground">{recommendation.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Hidden export clone */}
        <div 
          id="exportClone" 
          className="fixed opacity-0 pointer-events-none"
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '100%',
            height: 'auto',
            background: '#ffffff',
            padding: '2rem',
            zIndex: -9999,
            visibility: 'hidden'
          }}
        >
          {reportContent}
        </div>
      </motion.div>
    </div>
  )
} 