import * as React from "react";

export interface VisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        {...props}
        style={{
          position: "absolute",
          border: 0,
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          wordWrap: "normal",
        }}
      >
        {children}
      </span>
    );
  }
);
VisuallyHidden.displayName = "VisuallyHidden";

export { VisuallyHidden };
