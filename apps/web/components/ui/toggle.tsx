type ToggleProps = {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "lg" | "xl";
};

const sizes = {
  sm: {
    track: "w-9 h-5",
    knob: "w-4 h-4",
    translate: "peer-checked:translate-x-4",
  },
  lg: {
    track: "w-14 h-7",
    knob: "w-5 h-5",
    translate: "peer-checked:translate-x-7",
  },
  xl: {
    track: "w-16 h-9",
    knob: "w-7 h-7",
    translate: "peer-checked:translate-x-7",
  },
};

export default function Toggle({
  id,
  checked,
  onChange,
  size = "lg",
}: ToggleProps) {
  const s = sizes[size];

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />

      <div
        className={`${s.track} bg-white rounded-full peer-checked:bg-accent transition-colors`}
      />

      <span
        className={`absolute left-1 bg-background rounded-full ${s.knob} transition-transform ${s.translate}`}
      />
    </label>
  );
}
