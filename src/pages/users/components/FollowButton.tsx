import { memo } from "react";

export const FollowButton: React.VFC = memo(() => {
  return <button className="block p-2 bg-blue-200 rounded-xl shadow-sm">Follow</button>;
});

FollowButton.displayName = "FollowButton";
