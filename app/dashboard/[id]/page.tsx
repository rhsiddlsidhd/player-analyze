import React from "react";
interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  console.log("Dashboard page params object:", params);
  const { id } = await params;

  return <div>dashboard page {id}</div>;
};

export default page;
