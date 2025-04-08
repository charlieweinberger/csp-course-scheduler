"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Preferences({
  preferredDays,
  setPreferredDays,
  preferredTimeRange,
  setPreferredTimeRange,
  avoidBackToBack,
  setAvoidBackToBack,
  preferCompactSchedule,
  setPreferCompactSchedule,
  maxClassesPerDay,
  setMaxClassesPerDay,
}: PreferencesProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Customize your schedule constraints</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="time">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="time">Time</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>

          <TabsContent value="time" className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                {["M", "Tu", "W", "Th", "F"].map((day) => (
                  <Button
                    key={day}
                    variant={
                      preferredDays.includes(day as DayOption) ? "default" : "outline"
                    }
                    className="flex-1"
                    onClick={() => {
                      if (preferredDays.includes(day as DayOption)) {
                        setPreferredDays(
                          preferredDays.filter((d) => d !== day)
                        );
                      } else {
                        setPreferredDays([...preferredDays, day as DayOption]);
                      }
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Time Range</Label>
                <span className="text-sm text-gray-500">
                  {preferredTimeRange[0]}:00 - {preferredTimeRange[1]}:00
                </span>
              </div>
              <div className="pt-4 pb-2">
                <Slider
                  defaultValue={preferredTimeRange}
                  min={7}
                  max={22}
                  step={1}
                  onValueChange={(value) =>
                    setPreferredTimeRange(value as number[])
                  }
                  className="relative"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7 AM</span>
                <span>10 PM</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Campus Regions</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">
                    Engineering Complex
                  </SelectItem>
                  <SelectItem value="sciences">Sciences Buildings</SelectItem>
                  <SelectItem value="humanities">Humanities Gateway</SelectItem>
                  <SelectItem value="social">Social Sciences</SelectItem>
                  <SelectItem value="business">Business School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Maximum Walking Distance</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (5 min)</SelectItem>
                  <SelectItem value="medium">Medium (10 min)</SelectItem>
                  <SelectItem value="long">Long (15+ min)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="other" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="avoid-back-to-back">
                Avoid Back-to-Back Classes
              </Label>
              <Switch
                id="avoid-back-to-back"
                checked={avoidBackToBack}
                onCheckedChange={setAvoidBackToBack}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="compact-schedule">Prefer Compact Schedule</Label>
              <Switch
                id="compact-schedule"
                checked={preferCompactSchedule}
                onCheckedChange={setPreferCompactSchedule}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="max-classes">Maximum Classes Per Day</Label>
                <span className="text-sm text-gray-500">
                  {maxClassesPerDay} classes
                </span>
              </div>
              <div className="pt-4 pb-2">
                <Slider
                  id="max-classes"
                  defaultValue={[maxClassesPerDay]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setMaxClassesPerDay(value[0])}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 class</span>
                <span>10 classes</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select defaultValue="balanced">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="time">
                    Optimize for Time Preferences
                  </SelectItem>
                  <SelectItem value="location">
                    Optimize for Location
                  </SelectItem>
                  <SelectItem value="balanced">Balanced Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
