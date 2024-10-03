// FilterTable.tsx
"use client"; // 

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Import shadcn Select components

interface FilterTableProps {
  instructorFilter: string;
  setInstructorFilter: (instructor: string) => void;
  scheduleFilter: string;
  setScheduleFilter: (schedule: string) => void;
}

export const FilterTable = ({
  instructorFilter,
  setInstructorFilter,
  scheduleFilter,
  setScheduleFilter,
}: FilterTableProps) => {
  return (
    <div className="flex space-x-4">
      {/* Instructor Filter */}
      <Select value={instructorFilter} onValueChange={setInstructorFilter}>
        <SelectTrigger className="border p-2 rounded">
          <SelectValue placeholder="Filter by Instructor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Beth Williamson">Beth Williamson</SelectItem>
          <SelectItem value="Hannah Ward">Hannah Ward</SelectItem>
          <SelectItem value="Regina Ford">Regina Ford</SelectItem>
          <SelectItem value="Michael Meyers Jr.">Michael Meyers Jr.</SelectItem>
          <SelectItem value="Kimberly Hatfield">Kimberly Hatfield</SelectItem>
        </SelectContent>
      </Select>

      {/* Schedule Filter */}
      <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
        <SelectTrigger className="border p-2 rounded">
          <SelectValue placeholder="Filter by Schedule" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Monday">Monday</SelectItem>
          <SelectItem value="Tuesday">Tuesday</SelectItem>
          <SelectItem value="Wednesday">Wednesday</SelectItem>
          <SelectItem value="Thursday">Thursday</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
