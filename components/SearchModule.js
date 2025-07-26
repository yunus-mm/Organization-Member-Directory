"use client";
import { useState, useEffect } from "react";

export default function SearchModule() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("/api/members").then(res => res.json()).then(setMembers);
  }, []);

  useEffect(() => {
    setFiltered(
      Array.isArray(members) ? members.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.department.toLowerCase().includes(searchTerm.toLowerCase())
      ) : []
    );
  }, [searchTerm, members]);

  return (
    <div>
      <h2 style={{ fontSize: 24, margin: "40px 0 18px" }}>Search Members</h2>
      <input
        style={{ marginBottom: 24, minWidth: 240 }}
        placeholder="Search by name, role, or department..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul style={{ marginTop: 20 }}>
        {filtered.map(m => (
          <li key={m._id} style={{ marginBottom: 12 }}>
            <b>{m.name}</b> ({m.role}, {m.department})
          </li>
        ))}
        {!filtered.length && <li>No members found.</li>}
      </ul>
    </div>
  );
}
