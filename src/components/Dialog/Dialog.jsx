import { useState, useEffect } from "react";
import SCDialog from "./Dialog.styled";

export default function Dialog({
  children,
  shown,
  close,
  duration = 0.33,
  tint,
}) {
  const [hasContent, setHasContent] = useState(shown);

  useEffect(() => {
    let timeout;

    timeout = null;

    if (shown) setHasContent(true);
    else timeout = setTimeout(() => setHasContent(false), 1000 * duration);

    return () => clearTimeout(timeout);
  }, [shown]);

  return (
    <SCDialog
      className={`${shown ? "shown" : "hidden"}`}
      style={{ "--duration": `${duration}s` }}
    >
      <div
        className={`backdrop ${tint ? "tinted" : "transparent"}`}
        onClick={close ? close : null}
      ></div>
      <div className="container">{hasContent ? children : null}</div>
    </SCDialog>
  );
}
