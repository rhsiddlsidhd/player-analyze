import PlayerBoard from "@/components/organisms/PlayerBoard";
import PlayerDetailBoard from "@/components/organisms/PlayerDetailBoard";

type Params = Promise<{ id: string }>;

const page = async (props: { params: Params }) => {
  const { id } = await props.params;

  return (
    <div>
      <PlayerBoard id={id} />
      <PlayerDetailBoard id={id} />
    </div>
  );
};

export default page;
