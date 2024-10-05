"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Course {
  title: string;
  description: string;
  instructor: string;
  schedule: string;
}

interface PopupProps {
  isOpen: boolean; 
  onClose: () => void;
  course: Course | null; 
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, course }) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 capitalize">
            {course.title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-600">
            <p>{course.description}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="font-medium text-gray-700">Instructor: {course.instructor}</p>
          <p className="mt-1 text-gray-700">Schedule: {course.schedule}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
