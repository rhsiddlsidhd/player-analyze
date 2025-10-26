import { PieChart } from "@/components/Chart";
import Avatar from "@/components/molecules/Avatar";
import Board from "@/components/template/Board";
import playerMap from "@/models/ATPTourPlayers";
import React from "react";

const PlayerBoard = ({ id }: { id: string }) => {
  const singlePlayer = playerMap.get(id);
  return (
    <Board>
      {singlePlayer && (
        <div>
          <div className="mb-4 flex items-center gap-4 rounded-lg bg-white p-4">
            <Avatar wikidata_id={singlePlayer.wikidata_id ?? ""} size="5xl" />
            <div className="flex-1">
              <h2 className="mb-3 text-xl font-bold text-gray-800">
                {singlePlayer.name_first} {singlePlayer.name_last}
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm max-sm:grid-cols-1">
                <div className="rounded bg-gray-50 p-2">
                  <div className="text-xs text-gray-500">Born</div>
                  <div className="font-medium text-gray-800">
                    {singlePlayer.dob}
                  </div>
                </div>
                <div className="rounded bg-gray-50 p-2">
                  <div className="text-xs text-gray-500">Country</div>
                  <div className="font-medium text-gray-800">
                    {singlePlayer.ioc}
                  </div>
                </div>
                <div className="rounded bg-gray-50 p-2">
                  <div className="text-xs text-gray-500">Height</div>
                  <div className="font-medium text-gray-800">
                    {singlePlayer.height ?? "N/A"}
                  </div>
                </div>
                <div className="rounded bg-gray-50 p-2">
                  <div className="text-xs text-gray-500">Plays</div>
                  <div className="font-medium text-gray-800">
                    {singlePlayer.hand}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <PieChart data={singlePlayer} />
          </div>
        </div>
      )}
    </Board>
  );
};

export default PlayerBoard;
