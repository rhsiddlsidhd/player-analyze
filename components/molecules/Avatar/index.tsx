import Img from "@/components/atoms/Img";

const Avatar = ({ source, loading }: { source: string; loading: boolean }) => {
  return (
    <div className="relative w-24 aspect-square border-2  overflow-hidden rounded-full">
      {loading ? (
        <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
          로딩중
        </div>
      ) : (
        <Img src={source} />
      )}
    </div>
  );
};

export default Avatar;
