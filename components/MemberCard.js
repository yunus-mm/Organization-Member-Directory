export default function MemberCard({ member, onEdit, onDelete }) {
  return (
    <div className="member-card">
      {member.profilePhoto && (
        <img src={member.profilePhoto} alt={member.name} />
      )}
      <h3>{member.name}</h3>
      <p className="text-gray-600">{member.role}</p>
      <p className="text-gray-600">{member.department}</p>
      <div className="mt-4 flex justify-between">
        <p className="text-sm text-gray-600">{member.email}</p>
        {member.phone && (
          <p className="text-sm text-gray-600">{member.phone}</p>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(member)}
          className="btn btn-primary"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(member._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
