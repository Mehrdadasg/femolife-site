import { Instagram, Youtube } from "iconsax-react";
import React from "react";

function Social({ instaUrl, youtubeUrl }: { instaUrl: string; youtubeUrl: string }) {
  return (
    <nav className="flex items-center gap-3">
      {instaUrl && <a href={instaUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="size-10 flex items-center justify-center rounded-full bg-skin-100"><Instagram size={20} color="var(--color-skin-500)" /></a>}
      {youtubeUrl && <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="size-10 flex items-center justify-center rounded-full bg-skin-100"><Youtube size={20} color="var(--color-skin-500)" /></a>}
    </nav>
  );
}

export default Social;
