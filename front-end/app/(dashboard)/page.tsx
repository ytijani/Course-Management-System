"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterTable } from "@/components/table/table-filter";
import { CourseTable } from "@/components/table/course-table";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [scheduleFilter, setScheduleFilter] = useState("");
  const [error, setError] = useState("");

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/courses', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            search: searchTerm.trim(),
            instructor: instructorFilter.trim(),
            schedule: scheduleFilter,
          },
        });
  
        setCourses(response.data.courses);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses.");
      }
    };
  
    fetchCourses();
  }, [currentPage, searchTerm, instructorFilter, scheduleFilter]);

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <FilterTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          instructorFilter={instructorFilter} 
          setInstructorFilter={setInstructorFilter} 
          scheduleFilter={scheduleFilter}
          setScheduleFilter={setScheduleFilter}
        />
      </div>

      {error ? <p>{error}</p> : <CourseTable currentItems={courses} />}

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
