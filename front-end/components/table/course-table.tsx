"use client"; 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Popup from "@/components/popup"; 
import { useState } from "react";

interface CourseTableProps {
  currentItems: {
    id: number;
    title: string;
    description: string; 
    instructor: string;
    schedule: string;
  }[];
}

interface Course {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
}

export const CourseTable: React.FC<CourseTableProps> = ({ currentItems }) => {
  const [selectedCourse, setSelectedCourse] = useState<null | {
    title: string;
    description: string;
    instructor: string;
    schedule: string;
  }>(null); 
  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  const handleRowClick = (course : Course) => {
    setSelectedCourse(course); 
    setIsPopupOpen(true); 
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedCourse(null); 
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[600px] border-separate border-spacing-y-3">
        <TableHeader>
          <TableRow className="bg-[#abbee7] hover:bg-none text-left rounded-md">
            <TableHead className="px-4">ID</TableHead>
            <TableHead className="px-4">Title</TableHead>
            <TableHead className="px-4 hidden md:table-cell">Instructor</TableHead>
            <TableHead className="px-4">Schedule</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <TableRow
                key={item.id}
                className="bg-white cursor-pointer rounded-lg shadow-sm hover:bg-gray-100"
                onClick={() => handleRowClick(item)} // Handle click on the row
              >
                <TableCell className="font-medium py-2 px-4">{index + 1}</TableCell>
                <TableCell className="py-2 px-4">{item.title}</TableCell>
                <TableCell className="py-2 px-4 hidden md:table-cell">{item.instructor}</TableCell>
                <TableCell className="py-2 px-4">{item.schedule}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Popup
        isOpen={isPopupOpen} 
        onClose={closePopup}
        course={selectedCourse} 
      />
    </div>
  );
};
