"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface FilterTableProps {
  searchTerm: string; 
  setSearchTerm: (term: string) => void;
  instructorFilter: string; 
  setInstructorFilter: (instructor: string) => void; 
  scheduleFilter: string; 
  setScheduleFilter: (schedule: string) => void;
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
    <div className="flex items-center gap-4  flex-wrap md:flex-nowrap">
      {/* Search by Title */}
      <div className="w-full md:w-1/3">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by course title..."
          className="w-full border py-2 px-4 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Filter by Instructor */}
      <div className="w-full md:w-1/3">
        <input
          type="text"
          value={instructorFilter}
          onChange={(e) => setInstructorFilter(e.target.value)}
          placeholder="Search by instructor..."
          className="w-full border py-2 px-4 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Schedule Filter */}
      <div className="w-full md:w-1/3">
        <Select value={scheduleFilter} onValueChange={setScheduleFilter}>
          <SelectTrigger className="w-full border py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Filter by schedule" />
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
    </div>
  );
};
