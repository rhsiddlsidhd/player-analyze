import Text from "@/components/atoms/Text";
import Avatar from "@/components/molecules/Avatar";
import InfoItem from "@/components/molecules/InfoItem";
import Board from "@/components/template/Board";
import playerMap from "@/models/ATPTourPlayers";
import PlayerAnalytics from "../PlayerAnalytics";
import LinkBtn from "@/components/molecules/LinkBtn";

const PlayerBoard = ({ id, home }: { id: string; home?: boolean }) => {
  const singlePlayer = playerMap.get(id);
  return (
    <div>
      {singlePlayer && (
        <div className="max-md:space-y-4 md:flex md:items-stretch md:justify-between md:gap-4">
          <Board>
            <div className="flex justify-between">
              <Text textColor="black" textSize="xl" textBold={600}>
                {singlePlayer.name_first} {singlePlayer.name_last}
              </Text>
              {home && <LinkBtn path={`/dashboard/${id}`} label="더보기" />}
            </div>
            <div className="flex items-center gap-1 p-2 max-sm:flex-col">
              <Avatar wikidata_id={singlePlayer.wikidata_id ?? ""} size="2xl" />

              <div className="w-full flex-1 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <InfoItem label="Born" value={singlePlayer.dob} />
                  <InfoItem label="Country" value={singlePlayer.ioc} />
                  <InfoItem
                    label="Height"
                    value={singlePlayer.height ?? "N/A"}
                  />
                  <InfoItem
                    label="Plays"
                    value={
                      singlePlayer.hand === "R"
                        ? "Right"
                        : singlePlayer.hand === "L"
                          ? "Left"
                          : "N/A"
                    }
                  />
                </div>
              </div>
            </div>
          </Board>
          <Board>
            <PlayerAnalytics data={singlePlayer} />
          </Board>
        </div>
      )}
    </div>
  );
};

export default PlayerBoard;
