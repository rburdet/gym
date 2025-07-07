import { useState, useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { ActivityHeatmap } from "./components/ui/activity-heatmap";
import { workoutRoutine } from "./data/workout-config";
import { format, isSameDay } from "date-fns";
import { recordWorkout as apiRecordWorkout } from "./api/workout-history";

const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const today = new Date();
const todayIndex = today.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
const todayRoutineId = `day${todayIndex}`;

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [completedDates, setCompletedDates] = useState<Date[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [activeDay, setActiveDay] = useState(todayRoutineId)
  const tabsListRef = useRef<HTMLDivElement>(null)
  const initialSelectedTabRef = useRef<HTMLButtonElement>(null)
  
  // Scroll to the initial selected tab when component mounts
  useEffect(() => {
    if (tabsListRef.current && initialSelectedTabRef.current) {
      const tabsList = tabsListRef.current
      const selectedTab = initialSelectedTabRef.current
      
      // Get the tab's position relative to the tabsList
      const tabsListRect = tabsList.getBoundingClientRect()
      const selectedTabRect = selectedTab.getBoundingClientRect()
      
      // Calculate scroll position to center the tab
      const scrollPosition = selectedTabRect.left - tabsListRect.left - (tabsListRect.width / 2) + (selectedTabRect.width / 2)
      
      // Scroll to the tab
      tabsList.scrollLeft = scrollPosition
    }
  }, [])
  
  // Fetch workout history when component mounts
  useEffect(() => {
    async function fetchWorkoutHistory() {
      try {
        setIsLoadingHistory(true)
        const userId = "user-1" // In a real app, this would be the logged-in user's ID
        
        const response = await fetch(`/api/workout/history?userId=${userId}`)
        
        if (response.ok) {
          const data = 
            {
            "dates": [
              "2025-05-10",
              "2025-05-12",
              "2025-05-13",
              "2025-05-14",
              "2025-05-16",
              "2025-05-19",
              "2025-05-20",
              "2025-05-21",
              "2025-05-22",
              "2025-05-23",
              "2025-05-24",
              "2025-05-26",
              "2025-05-27",
              "2025-05-28",
              "2025-05-29",
              "2025-05-31",
              "2025-06-02",
              "2025-06-03",
              "2025-06-04",
              "2025-06-05",
              "2025-06-06",
              "2025-06-07",
              "2025-06-09",
              "2025-06-10",
              "2025-06-11",
              "2025-06-12",
              "2025-06-13",
              "2025-06-14",
              "2025-06-16",
              "2025-06-17",
              "2025-06-18",
              "2025-06-20",
              "2025-06-21",
              "2025-06-23",
              "2025-06-24",
              "2025-06-25",
              "2025-06-26",
              "2025-06-28",
              "2025-07-02",
              "2025-07-05"
            ]
          }
          
          // Convert string dates to Date objects in local timezone
          const dates = data.dates.map((dateStr: string) => {
            const [year, month, day] = dateStr.split('-').map(Number)
            return new Date(year, month - 1, day) // month is 0-indexed
          })
          setCompletedDates(dates)
        } else {
          console.error("Failed to fetch workout history")
        }
      } catch (error) {
        console.error("Error fetching workout history:", error)
      } finally {
        setIsLoadingHistory(false)
      }
    }
    
    fetchWorkoutHistory()
  }, [])
  


  // Function to record a completed workout
  async function recordWorkout() {
    try {
      setIsLoading(true)
      
      const dateStr = format(selectedDate, "yyyy-MM-dd")
      const userId = "user-1" // In a real app, this would be the logged-in user's ID
      
      const response = await fetch("/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          date: dateStr,
          dayId: activeDay,
          completed: true,
          exercises: []
        }),
      })
      
      if (response.ok) {
        toast.success(`Workout recorded for ${format(selectedDate, "PP")}`)
        setCompletedDates([...completedDates, selectedDate])
      } else {
        const error = await response.json()
        toast.error(`Failed to record workout: ${error.error}`)
      }
    } catch (error) {
      console.error("Error recording workout:", error)
      toast.error("Failed to record workout")
    } finally {
      setIsLoading(false)
    }
  }

  const today = new Date();
  const alreadyCompletedToday = completedDates.some(date => isSameDay(date, today));

  return (
    <div className="container px-4 py-16 md:py-24 pb-32">
      <h1 className="text-4xl font-mono tracking-tight md:text-5xl mb-8">My Gym Routine</h1>

      <div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">7-Day Workout Routine</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={todayRoutineId} className="w-full" onValueChange={setActiveDay}>
                <TabsList ref={tabsListRef} className="flex w-full justify-start overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-7">
                  {workoutRoutine.map((day, idx) => (
                    <TabsTrigger 
                      key={day.id} 
                      value={day.id}
                      className="whitespace-nowrap"
                      ref={day.id === todayRoutineId ? initialSelectedTabRef : undefined}
                    >
                      {weekdayNames[idx]}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {workoutRoutine.map((day) => (
                  <TabsContent key={day.id} value={day.id}>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold">{day.title}</h3>
                          {day.description && <p className="text-muted-foreground">{day.description}</p>}
                        </div>
                      </div>

                      {/* Warmup Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Warmup</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">Exercise</TableHead>
                              <TableHead className="w-[15%] text-center">Sets</TableHead>
                              <TableHead className="w-[30%] text-center">Reps</TableHead>
                              <TableHead className="w-[15%] text-center">Weight</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.warmup.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell className="text-center">{exercise.sets}</TableCell>
                                <TableCell className="text-center">{exercise.reps}</TableCell>
                                <TableCell className="text-center">{exercise.weight || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>


                      {/* Main Exercises Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Main Exercises</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">Exercise</TableHead>
                              <TableHead className="w-[15%] text-center">Sets</TableHead>
                              <TableHead className="w-[30%] text-center">Reps</TableHead>
                              <TableHead className="w-[15%] text-center">Weight</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.exercises.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell className="text-center">{exercise.sets}</TableCell>
                                <TableCell className="text-center">{exercise.reps}</TableCell>
                                <TableCell className="text-center">{exercise.weight || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>


                      {/* Elongation Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Elongation</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">Exercise</TableHead>
                              <TableHead className="w-[15%] text-center">Sets</TableHead>
                              <TableHead className="w-[30%] text-center">Reps</TableHead>
                              <TableHead className="w-[15%] text-center">Weight</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.elongation.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell className="text-center">{exercise.sets}</TableCell>
                                <TableCell className="text-center">{exercise.reps}</TableCell>
                                <TableCell className="text-center">{exercise.weight || "-"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Workout Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="my-4 overflow-x-auto">
                  <ActivityHeatmap dates={completedDates} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky button at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
        <div className="container flex justify-center">
          <Button 
            size="lg" 
            onClick={recordWorkout} 
            disabled={isLoading || alreadyCompletedToday}
            className="w-full max-w-md"
          >
            {alreadyCompletedToday
              ? "Today's Workout Already Logged"
              : isLoading
                ? "Recording..."
                : "Mark Today's Workout as Completed"}
          </Button>
        </div>
      </div>
    </div>
  )
} 
export default App;
