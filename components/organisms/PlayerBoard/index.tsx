import Text from "@/components/atoms/Text";
import { PieChart } from "@/components/Chart";
import Avatar from "@/components/molecules/Avatar";
import InfoItem from "@/components/molecules/InfoItem";
import Board from "@/components/template/Board";
import playerMap from "@/models/ATPTourPlayers";
import React from "react";
import PlayerAnalytics from "../PlayerAnalytics";

const PlayerBoard = ({ id }: { id: string }) => {
  const singlePlayer = playerMap.get(id);
  return (
    <Board>
      {singlePlayer && (
        <div>
          <div className="mb-4 flex items-center gap-4 rounded-lg bg-white p-4">
            <Avatar wikidata_id={singlePlayer.wikidata_id ?? ""} size="5xl" />
            <div className="flex-1">
              <Text textColor="black" textSize="xl" textBold={600}>
                {singlePlayer.name_first} {singlePlayer.name_last}
              </Text>
              <div className="grid grid-cols-2 gap-2 text-sm max-sm:grid-cols-1">
                <InfoItem label="Born" value={singlePlayer.dob} />
                <InfoItem label="Country" value={singlePlayer.ioc} />
                <InfoItem label="Height" value={singlePlayer.height ?? "N/A"} />
                <InfoItem label="Plays" value={singlePlayer.hand} />
              </div>
            </div>
          </div>
          <div>
            <PlayerAnalytics data={singlePlayer} />
          </div>
        </div>
      )}
    </Board>
  );
};

export default PlayerBoard;
