// Home.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "@/components/table/search-bar";
import {FilterTable} from "@/components/table/table-filter";
import {CourseTable} from "@/components/table/course-table";

const initialData = [
  { id: 1, title: "Open-architected bandwidth-monitored contingency", instructor: "Beth Williamson", schedule: "Tuesday 10:00" },
  { id: 2, title: "Self-enabling analyzing neural-net", instructor: "Hannah Ward", schedule: "Thursday 13:00" },
  { id: 3, title: "Introduction to JavaScript", instructor: "Regina Ford", schedule: "Monday 14:00" },
  { id: 4, title: "Advanced CSS Techniques", instructor: "Michael Meyers Jr.", schedule: "Wednesday 11:00" },
  { id: 5, title: "Data Structures and Algorithms", instructor: "Kimberly Hatfield", schedule: "Thursday 15:00" },
];

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [scheduleFilter, setScheduleFilter] = useState("");
  const itemsPerPage = 8;

  const totalPages = Math.ceil(initialData.length / itemsPerPage);

  const filteredData = initialData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInstructor = instructorFilter ? item.instructor === instructorFilter : true;
    const matchesSchedule = scheduleFilter ? item.schedule.includes(scheduleFilter) : true;
    return matchesSearch && matchesInstructor && matchesSchedule;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <div className="flex mb-4 items-center justify-between">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterTable
          instructorFilter={instructorFilter}
          setInstructorFilter={setInstructorFilter}
          scheduleFilter={scheduleFilter}
          setScheduleFilter={setScheduleFilter}
        />
      </div>

      <CourseTable currentItems={currentItems} />

      <div className="flex justify-center items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center mr-2"
        >
          <ChevronLeft />
        </Button>
        <span className="text-center px-4">{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
