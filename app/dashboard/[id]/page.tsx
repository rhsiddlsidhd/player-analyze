import PlayerBoard from "@/components/organisms/PlayerBoard";
import React from "react";
interface PageProps {
  params: { id: string };
}

const page = async ({ params }: PageProps) => {
  console.log("Dashboard page params object:", params);
  const { id } = await params;

  return (
    <div>
      <PlayerBoard id={id} />
    </div>
  );
};

export default page;
