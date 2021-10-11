import Link from "next/link";
import { memo } from "react";

export const EditProfileButton: React.VFC = memo(() => {
  return (
    <Link href="/settings">
      <a className="block py-1 px-2 rounded border active:ring-1 active:ring-blue-200 shadow-sm transition-all">
        Edit Profile
      </a>
    </Link>
  );
});

EditProfileButton.displayName = "EditProfileButton";
