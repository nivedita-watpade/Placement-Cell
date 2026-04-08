import JobCard from "./JobCard";

function LatestOpportunities() {
  return (
    <section className="p-10">
      <h2>Latest Opportunities</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 ">
        <JobCard />
      </div>
    </section>
  );
}

export default LatestOpportunities;
