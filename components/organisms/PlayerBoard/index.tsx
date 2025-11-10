import Text from "@/components/atoms/Text";
import Avatar from "@/components/molecules/Avatar";
import InfoItem from "@/components/molecules/InfoItem";
import Board from "@/components/template/Board";

import PlayerAnalytics from "../PlayerAnalytics";
import LinkBtn from "@/components/molecules/LinkBtn";
import { transformBon } from "@/utils";
import playerMap from "@/models/ATPTourPlayers";
import NotFound from "@/app/not-found";

const PlayerBoard = ({ id, home }: { id: string; home?: boolean }) => {
  const player = playerMap.get(id);

  if (!player) return NotFound();
  return (
    <div>
      {player && (
        <div className="max-md:space-y-4 md:flex md:items-stretch md:justify-between md:gap-4">
          <Board>
            <div className="flex justify-between">
              <Text textColor="black" textSize="xl" textBold={600}>
                {player.name_first} {player.name_last}
              </Text>
              {home && <LinkBtn path={`/dashboard/${id}`} label="더보기" />}
            </div>
            <div className="flex items-center gap-1 p-2 max-sm:flex-col">
              <Avatar wikidata_id={player.wikidata_id ?? ""} size="2xl" />

              <div className="w-full flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <InfoItem label="Born" value={transformBon(player.dob)} />
                  <InfoItem label="Country" value={player.ioc ?? "N/A"} />
                  <InfoItem
                    label="Height"
                    value={player.height ? `${player.height} cm` : "N/A"}
                  />
                  <InfoItem
                    label="Plays"
                    value={
                      player.hand === "R"
                        ? "Right"
                        : player.hand === "L"
                          ? "Left"
                          : "N/A"
                    }
                  />
                </div>
              </div>
            </div>
          </Board>
          <Board>
            <PlayerAnalytics data={player} />
          </Board>
        </div>
      )}
    </div>
  );
};

export default PlayerBoard;
