import { useState, useEffect, useRef } from "react";
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

const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [completedDates, setCompletedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get today's routine
  const today = new Date();
  const todayIndex = today.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
  const todayRoutineId = `day${todayIndex}`;

  const [activeDay, setActiveDay] = useState(todayRoutineId);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const initialSelectedTabRef = useRef<HTMLButtonElement>(null);

  // Mock data for demo - in real app this would come from an API
  useEffect(() => {
    // Add some sample completed dates for demo
    const sampleDates = [
      new Date(2025, 4, 10), // May 10
      new Date(2025, 4, 12), // May 12
      new Date(2025, 4, 14), // May 14
      new Date(2025, 4, 16), // May 16
      new Date(2025, 4, 19), // May 19
      new Date(2025, 4, 21), // May 21
      new Date(2025, 4, 23), // May 23
    ];
    setCompletedDates(sampleDates);
  }, []);

  // Scroll to the initial selected tab when component mounts
  useEffect(() => {
    if (tabsListRef.current && initialSelectedTabRef.current) {
      const tabsList = tabsListRef.current;
      const selectedTab = initialSelectedTabRef.current;

      // Get the tab's position relative to the tabsList
      const tabsListRect = tabsList.getBoundingClientRect();
      const selectedTabRect = selectedTab.getBoundingClientRect();

      // Calculate scroll position to center the tab
      const scrollPosition =
        selectedTabRect.left -
        tabsListRect.left -
        tabsListRect.width / 2 +
        selectedTabRect.width / 2;

      // Scroll to the tab
      tabsList.scrollLeft = scrollPosition;
    }
  }, []);

  // Function to record a completed workout
  function recordWorkout() {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const today = new Date();
      setCompletedDates([...completedDates, today]);
      setIsLoading(false);

      // Show success message (in real app you'd use a toast library)
      alert(`Workout recorded for ${format(today, "PP")}`);
    }, 1000);
  }

  const alreadyCompletedToday = completedDates.some((date) =>
    isSameDay(date, today)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24 pb-32">
        <div className="mb-8">
          <h1 className="text-4xl font-mono tracking-tight md:text-5xl mb-2">
            My Gym Routine
          </h1>
          <p className="text-muted-foreground">Train at train.rburdet.com</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">7-Day Workout Routine</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue={todayRoutineId}
                className="w-full"
                onValueChange={setActiveDay}
              >
                <TabsList
                  ref={tabsListRef}
                  className="flex w-full justify-start overflow-x-auto pb-2 md:pb-0 md:grid md:grid-cols-7"
                >
                  {workoutRoutine.map((day, idx) => (
                    <TabsTrigger
                      key={day.id}
                      value={day.id}
                      className="whitespace-nowrap"
                      ref={
                        day.id === todayRoutineId
                          ? initialSelectedTabRef
                          : undefined
                      }
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
                          {day.description && (
                            <p className="text-muted-foreground">
                              {day.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Warmup Section */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Warmup</h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">
                                Exercise
                              </TableHead>
                              <TableHead className="w-[15%] text-center">
                                Sets
                              </TableHead>
                              <TableHead className="w-[30%] text-center">
                                Reps
                              </TableHead>
                              <TableHead className="w-[15%] text-center">
                                Weight
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.warmup.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell className="text-center">
                                  {exercise.sets}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exercise.reps}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exercise.weight || "-"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Main Exercises
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">
                                Exercise
                              </TableHead>
                              <TableHead className="w-[15%] text-center">
                                Sets
                              </TableHead>
                              <TableHead className="w-[30%] text-center">
                                Reps
                              </TableHead>
                              <TableHead className="w-[15%] text-center">
                                Weight
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.exercises.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell className="text-center">
                                  {exercise.sets}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exercise.reps}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exercise.weight || "-"}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Elongation
                        </h3>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">
                                Exercise
                              </TableHead>
                              <TableHead className="w-[15%] text-center">
                                Sets
                              </TableHead>
                              <TableHead className="w-[30%] text-center">
                                Reps
                              </TableHead>
                              <TableHead className="w-[15%] text-center">
                                Weight
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {day.elongation.map((exercise, index) => (
                              <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell className="text-center">
                                  {exercise.sets}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exercise.reps}
                                </TableCell>
                                <TableCell className="text-center">
                                  {exercise.weight || "-"}
                                </TableCell>
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

        {/* Sticky button at the bottom */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
          <div className="container mx-auto flex justify-center">
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
    </div>
  );
}

export default App;
