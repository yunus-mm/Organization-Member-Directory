"use client";
import { useState, useEffect } from "react";
import MemberCard from "./MemberCard";
import EditMemberModal from "./EditMemberModal";

export default function MembersModule() {
  const [members, setMembers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  useEffect(() => {
    fetch("/api/members").then(res => res.json()).then(setMembers);
  }, []);
  const handleEditClick = (member) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };
  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const res = await fetch(`/api/members/${id}`, { method: 'DELETE' });
      if (res.ok) setMembers(members.filter(m => m._id !== id));
    }
  };
  return (
    <div>
      <h2 style={{ fontSize: 24, margin: "40px 0 18px" }}>Member List</h2>
      <div className="member-list">
        {Array.isArray(members) && members.length ? members.map(m => (
          <MemberCard key={m._id} member={m} onEdit={handleEditClick} onDelete={handleDeleteMember} />
        )) : <p>No members found.</p>}
      </div>
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={async (id, data) => {
          await fetch(`/api/members/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          fetch('/api/members').then(res => res.json()).then(setMembers);
          setIsEditModalOpen(false);
        }}
        member={editingMember}
      />
    </div>
  );
}
