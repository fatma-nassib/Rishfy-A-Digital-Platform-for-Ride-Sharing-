// import { useMobileNav } from '../../hooks/use-mobile';

// export function RatingScreen() {
//   const { setScreen } = useMobileNav();

//   return (
//     <div className="screen">
//       <h1 className="screen-title">Rate your trip</h1>
//       <p className="screen-subtitle">Share quick feedback with your driver.</p>
//       <div className="form">
//         <label className="field">
//           <span>Rating</span>
//           <input placeholder="★★★★★" />
//         </label>
//         <label className="field">
//           <span>Comment (optional)</span>
//           <input placeholder="What went well?" />
//         </label>
//         <button className="primary-button" onClick={() => setScreen('passenger-home')}>
//           Submit rating
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import type { Screen } from "@/components/MobileApp";
import { Star } from "lucide-react";

interface Props { onNavigate: (s: Screen) => void; onDone: () => void; }

const RatingScreen: React.FC<Props> = ({ onDone }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="pt-16 px-6 animate-fade-in flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-xl mb-4">K</div>
      <h1 className="text-xl font-bold text-foreground mb-1">Rate your trip</h1>
      <p className="text-sm text-muted-foreground mb-6">How was your experience with Khadija Omary?</p>

      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)}>
            <Star size={32} className={s <= rating ? "text-rishfy-star fill-rishfy-star" : "text-muted"} />
          </button>
        ))}
      </div>

      <p className="text-sm font-medium text-foreground mb-2 self-start">Leave a review (optional)</p>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience..."
        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring h-24 resize-none mb-6"
      />

      <button onClick={onDone}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base mb-2">
        Submit Rating
      </button>
      <button onClick={onDone}
        className="w-full py-3 rounded-xl text-muted-foreground font-medium text-sm">
        Skip
      </button>
    </div>
  );
};

export default RatingScreen;
