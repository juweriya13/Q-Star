import React from "react";

function Team({ team = {} }) {
  return (
    <div className="w-full  p-2 text-center border-2 border-zinc-800 rounded-lg">
      <h1 className="text-purple-400 font-medium">Team Size</h1>
      {team.participation == "variable" ? (
        <h1 className="text-sm font-light">
          {team.min} - {team.max} Members
        </h1>
      ) : (
        <h1 className="text-sm">{team.min} Members</h1>
      )}
    </div>
  );
}

export default Team;
