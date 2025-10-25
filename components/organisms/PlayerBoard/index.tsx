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
          <div className="bg-white rounded-lg  p-4 mb-4">
            <div className="flex items-center gap-4">
              <Avatar wikidata_id={singlePlayer.wikidata_id ?? ""} size="5xl" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {singlePlayer.name_first} {singlePlayer.name_last}
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm max-sm:grid-cols-1">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs">Born</div>
                    <div className="font-medium text-gray-800">
                      {singlePlayer.dob}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs">Country</div>
                    <div className="font-medium text-gray-800">
                      {singlePlayer.ioc}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs">Height</div>
                    <div className="font-medium text-gray-800">
                      {singlePlayer.height ?? "N/A"}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-gray-500 text-xs">Plays</div>
                    <div className="font-medium text-gray-800">
                      {singlePlayer.hand}
                    </div>
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
