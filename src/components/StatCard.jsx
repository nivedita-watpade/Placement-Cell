function TeacherStatCard({ title, count }) {
  return (
    <>
      <div className="flex-1 min-w-48 bg-white p-5 rounded-xl text-center">
        <h3>{count}</h3>
        <p>{title}</p>
      </div>
    </>
  );
}

export default TeacherStatCard;
