export default function SearchField({
  placeholder,
  fieldHeight,
  className,
  onChange,
}: {
  placeholder?: string;
  fieldHeight?: number;
  className?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`relative bg-white rounded overflow-hidden ${className}`}>
      <svg
        className="absolute left-3 top-[48%] -translate-y-1/2"
        xmlns="http://www.w3.org/2000/svg"
        width="13.842"
        height="13.842"
        viewBox="0 0 13.842 13.842"
      >
        <path
          id="search-icon"
          d="M8.721,9.908V9.277L8.5,9.055a4.926,4.926,0,0,1-3.34,1.224A5,5,0,0,1,1.5,8.795,4.914,4.914,0,0,1,0,5.158,4.976,4.976,0,0,1,1.5,1.5,4.976,4.976,0,0,1,5.158,0,4.914,4.914,0,0,1,8.795,1.5a5,5,0,0,1,1.484,3.655A4.926,4.926,0,0,1,9.055,8.5l.222.223h.631l3.934,3.933-1.188,1.188Z"
          fill="#363565"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
                        h-auto p-4 pl-9 min-h-auto leading-none
                        text-sm font-normal text-neutral-950 placeholder-neutral-950 min-w-56
                        outline-none ${fieldHeight ? fieldHeight : "h-auto"}`}
      />
    </div>
  );
}
