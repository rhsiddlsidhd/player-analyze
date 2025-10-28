import Avatar from "@/components/molecules/Avatar";
import { fetcher } from "@/lib/swr";
import { ApiResponse, Player } from "@/types";
import useSWR from "swr";

interface PlayerCardProps {
  type: "winner" | "loser";
  player: {
    id: Player["player_id"];
    name: string;
    hand: string;
    age: string;
    ioc: string;
    ht: string;
    seed: string;
    rank: string;
    rank_points: string;
    ace: string;
    df: string;
    svpt: string;
    firstIn: string;
    firstWon: string;
    secondWon: string;
  };
}

const PlayerCard = ({ type, player }: PlayerCardProps) => {
  const isWinner = type === "winner";

  const { data } = useSWR<ApiResponse<Record<Player["player_id"], Player>>>(
    `/api/atp/player`,
    fetcher,
  );

  if (!data || !data.success) return <div>No Data</div>;

  return (
    <div
      className={`rounded-lg border-l-4 bg-white p-4 shadow-sm ${
        isWinner ? "border-green-500" : "border-red-500"
      }`}
    >
      {/* 컴팩트 헤더 */}
      <div className="mb-4 flex items-center gap-3">
        <Avatar wikidata_id={data.data[player.id].wikidata_id} size="base" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="truncate font-bold text-gray-800">{player.name}</h4>
            <span
              className={`rounded px-1.5 py-0.5 text-xs ${
                isWinner
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isWinner ? "W" : "L"}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {player.ioc} • #{player.rank} • {player.hand}
          </div>
        </div>
      </div>

      {/* 핵심 통계만 */}
      <div className="mb-3 grid grid-cols-3 gap-2 text-xs">
        <div className="rounded bg-gray-50 p-2 text-center">
          <div className="font-medium text-gray-800">{player.ace}</div>
          <div className="text-gray-500">Aces</div>
        </div>
        <div className="rounded bg-gray-50 p-2 text-center">
          <div className="font-medium text-gray-800">{player.df}</div>
          <div className="text-gray-500">DF</div>
        </div>
        <div className="rounded bg-gray-50 p-2 text-center">
          <div className="font-medium text-gray-800">
            {player.svpt && player.firstIn
              ? `${((parseInt(player.firstIn) / parseInt(player.svpt)) * 100).toFixed(0)}%`
              : "0%"}
          </div>
          <div className="text-gray-500">1st%</div>
        </div>
      </div>

      {/* 간단한 서브 통계 */}
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">1st Serve Won</span>
          <span className="font-medium">{player.firstWon}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">2nd Serve Won</span>
          <span className="font-medium">{player.secondWon}</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
