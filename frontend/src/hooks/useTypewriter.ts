import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  /** Phrases cycled through, in order. */
  words: readonly string[];
  /** Milliseconds per character while typing. */
  typeMs?: number;
  /** Milliseconds per character while deleting — deletion reads better fast. */
  deleteMs?: number;
  /** How long a completed word sits on screen before it starts deleting. */
  holdMs?: number;
  /** Pause on the empty string before the next word begins. */
  pauseMs?: number;
}

interface TypewriterState {
  /** The slice of the current word to render. */
  text: string;
  /** Index of the word being typed — lets callers sync other UI to it. */
  wordIndex: number;
  /** False when reduced motion is set; callers can skip the caret entirely. */
  isAnimating: boolean;
}

/**
 * Types a word out character by character, holds it, deletes it, moves on.
 *
 * Three things this handles that a naive setInterval version does not:
 *
 *  - prefers-reduced-motion. Text that rewrites itself is motion even though
 *    nothing moves, so those users get the first word, complete and static.
 *  - Hidden tabs. Browsers throttle timers in background tabs, which makes a
 *    chained setTimeout drift badly; the loop stops on visibilitychange and
 *    restarts cleanly when the tab returns.
 *  - Cleanup. Every scheduled timeout is cancelled on unmount, so a fast
 *    route change cannot leave a timer writing into a dead component.
 *
 * Callers must reserve height for the longest word — see HomeHero. The text
 * length changes every tick, so an unreserved line will reflow the page on
 * every keystroke and wreck CLS.
 */
export function useTypewriter({
  words,
  typeMs = 72,
  deleteMs = 34,
  holdMs = 1600,
  pauseMs = 320,
}: UseTypewriterOptions): TypewriterState {
  const [text, setText] = useState(words[0] ?? "");
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Held in a ref so the effect below never needs them as dependencies.
  const timer = useRef<number>();
  const phase = useRef<"typing" | "holding" | "deleting">("typing");
  const charCount = useRef(0);
  const index = useRef(0);

  useEffect(() => {
    if (words.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Static fallback: show the first word in full and stop.
    if (reduceMotion.matches) {
      setText(words[0]);
      setWordIndex(0);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);

    const clear = () => window.clearTimeout(timer.current);

    const step = () => {
      const word = words[index.current];

      if (phase.current === "typing") {
        charCount.current += 1;
        setText(word.slice(0, charCount.current));

        if (charCount.current >= word.length) {
          phase.current = "holding";
          timer.current = window.setTimeout(step, holdMs);
          return;
        }
        timer.current = window.setTimeout(step, typeMs);
        return;
      }

      if (phase.current === "holding") {
        phase.current = "deleting";
        timer.current = window.setTimeout(step, deleteMs);
        return;
      }

      // deleting
      charCount.current -= 1;
      setText(word.slice(0, Math.max(charCount.current, 0)));

      if (charCount.current <= 0) {
        phase.current = "typing";
        index.current = (index.current + 1) % words.length;
        setWordIndex(index.current);
        timer.current = window.setTimeout(step, pauseMs);
        return;
      }
      timer.current = window.setTimeout(step, deleteMs);
    };

    // Start from an empty line so the first word types in rather than
    // appearing whole and then deleting.
    charCount.current = 0;
    phase.current = "typing";
    setText("");
    timer.current = window.setTimeout(step, pauseMs);

    const onVisibility = () => {
      if (document.hidden) {
        clear();
      } else {
        clear();
        timer.current = window.setTimeout(step, typeMs);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clear();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [words, typeMs, deleteMs, holdMs, pauseMs]);

  return { text, wordIndex, isAnimating };
}
