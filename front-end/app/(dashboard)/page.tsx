"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterTable } from "@/components/table/table-filter";
import { CourseTable } from "@/components/table/course-table";
import apiClient from "@/lib/api";

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
        const response = await apiClient.get("/courses", {
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
    <div className="container mx-auto p-6">
      <div className="mb-2">
        <FilterTable
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          instructorFilter={instructorFilter}
          setInstructorFilter={setInstructorFilter}
          scheduleFilter={scheduleFilter}
          setScheduleFilter={setScheduleFilter}
        />
      </div>

      <div className="relative">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <CourseTable currentItems={courses} />
        )}
      </div>

      <div className="flex justify-center items-center space-x-4 mt-6">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft />
          <span className="ml-2">Previous</span>
        </Button>

        <span className="text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>

        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          variant="outline"
          className="flex items-center"
        >
          <span className="mr-2">Next</span>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
