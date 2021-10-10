import { memo } from "react";

export const EditProfileButton: React.VFC = memo(() => {
  return <button className="block py-1 px-2 rounded border shadow-sm">Edit Profile</button>;
});

EditProfileButton.displayName = "EditProfileButton";
