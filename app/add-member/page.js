"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMemberPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", role: "", department: "", photo: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!form.name || !form.role || !form.department) {
      setError("All fields are required.");
      return;
    }
    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/members"), 1200);
    } else {
      setError("Failed to add member.");
    }
  };
  return (
    <div className="container" style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2 style={{ fontSize: 28, marginBottom: 18 }}>Add Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <input name="role" value={form.role} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input name="department" value={form.department} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Photo URL:</label>
          <input name="photo" value={form.photo} onChange={handleChange} />
        </div>
        {error && <div style={{ color: "#b71c1c", marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: "#388e3c", marginBottom: 10 }}>Member added!</div>}
        <button className="btn" type="submit">Add Member</button>
      </form>
    </div>
  );
}
