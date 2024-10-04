"use client";


import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface FilterTableProps {
  searchTerm: string; // Search term for course title
  setSearchTerm: (term: string) => void; // Setter for search term
  instructorFilter: string; // Instructor filter
  setInstructorFilter: (instructor: string) => void; // Setter for instructor filter
  scheduleFilter: string; // Schedule filter
  setScheduleFilter: (schedule: string) => void; // Setter for schedule filter
}

export const FilterTable = ({
  searchTerm,
  setSearchTerm,
  instructorFilter,
  setInstructorFilter,
  scheduleFilter,
  setScheduleFilter,
}: FilterTableProps) => {

  const schedules = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="flex space-x-4 w-full">
      {/* Search by Title */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="course title ..."
        className="border py-[8px] px-2 rounded text-[15px]"
      />

      {/* Filter by Instructor */}
      <input
        type="text"
        value={instructorFilter}
        onChange={(e) => setInstructorFilter(e.target.value)}
        placeholder="Search by Instructor ..."
        className="border py-[8px] px-2 rounded text-[15px]"
      />

      {/* Schedule Filter */}
      <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
        <SelectTrigger className="border p-2 rounded">
          <SelectValue placeholder="Filter by Schedule" />
        </SelectTrigger>
        <SelectContent>
          {schedules.map((schedule) => (
            <SelectItem key={schedule} value={schedule}>
              {schedule}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
