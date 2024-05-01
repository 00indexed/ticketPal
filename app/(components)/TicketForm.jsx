"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/Tickets/", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      throw new Error("Failed to create Ticket");
    }

    router.refresh();
    router.push("/");
  };

  const startTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "Not started",
    category: "Non issue",
  };
  const [formData, setFormData] = useState(startTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-2 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create your ticket</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />

        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="School">School</option>
          <option value="Home">Home</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
        </div>

        <label>Progress</label>
        <input
          id="progress"
          name="progress"
          type="range"
          onChange={handleChange}
          value={formData.progress}
          min="0"
          max="100"
        />
        <label>Status</label>
        <select
          name="status"
          onChange={handleChange}
          value={formData.status}
          checked={formData.priority == 3}
        >
          <option value="Not started">Not started</option>
          <option value="Started">Started</option>
          <option value="Complete">Complete</option>
        </select>
        <label>Interest Level</label>
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          valueLabelDisplay="auto"
        />
        <input
          type="submit"
          className="btn text-white max-w-xs"
          value="Create Ticket"
        />
      </form>
    </div>
  );
};

export default TicketForm;
