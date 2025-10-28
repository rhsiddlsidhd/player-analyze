import MatchComparison from "@/components/organisms/MatchComparison";

type Params = Promise<{ num: string }>;

// type SearchParams = Promise<{ t: string; y: string }>;

const page = async (props: { params: Params }) => {
  const { num } = await props.params;

  return (
    <div className="p-4">
      <MatchComparison num={num} />
    </div>
  );
};

export default page;
