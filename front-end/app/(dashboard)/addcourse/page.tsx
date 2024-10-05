"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/api";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [schedule, setSchedule] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); 
    try {
      const response = await apiClient.post("/courses", {
        title,
        description,
        instructor,
        schedule,
      });
      console.log("Course created:", response.data);
      setSuccessMessage("Course created successfully!"); 
    } catch (err) {
      setError("Failed to create course. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-semibold mb-4">Create Course</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Course Description"
            required
          />
        </div>
        <div>
          <Label htmlFor="instructor">Instructor</Label>
          <Input
            id="instructor"
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="Instructor Name"
            required
          />
        </div>
        <div>
          <Label htmlFor="schedule">Schedule</Label>
          <Input
            id="schedule"
            type="text"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="Schedule (e.g., Tuesday 10:00)"
            required
          />
        </div>
        <Button className="w-full bg-sky-600 text-white hover:bg-sky-700 transition duration-200 py-2 rounded-md mt-4" type="submit">
          Create Course
        </Button>
      </form>
    </div>
  );
};

export default AddCourse;
