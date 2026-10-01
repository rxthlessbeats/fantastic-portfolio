export function ProjectVisual({ kind }: { kind: "agents" | "memory" | "cityscapes" }) {
  if (kind === "agents") return (
    <svg className="project-visual" viewBox="0 0 640 430" fill="none" aria-hidden="true">
      <g stroke="#69705C" strokeWidth="1.25">
        <path d="M75 110h90v65h76M75 320h90v-55h76M402 175h75v-65h88M402 265h75v55h88M320 74v45M320 320v40" />
        <path d="M55 215h180M402 215h180M105 175h28v80h-28M535 175h-28v80h28" />
        <circle cx="75" cy="110" r="7" /><circle cx="75" cy="320" r="7" /><circle cx="565" cy="110" r="7" /><circle cx="565" cy="320" r="7" /><circle cx="320" cy="66" r="7" /><circle cx="320" cy="368" r="7" />
      </g>
      <rect x="224" y="119" width="192" height="202" rx="24" fill="#FEFFEE" stroke="#69705C" strokeWidth="1.5" />
      <rect x="239" y="134" width="162" height="172" rx="15" stroke="#D8DCC8" />
      <g fill="#283929" fontFamily="var(--font-sans), sans-serif" textAnchor="middle"><text x="320" y="184" fontSize="14">PI agent</text><text x="320" y="227" fontSize="21" fontWeight="500">Circuit agent</text><text x="320" y="270" fontSize="14">Testbench agent</text></g>
      <path d="M275 199h90M275 243h90" stroke="#D8DCC8" />
      <g fill="#283929"><circle cx="194" cy="175" r="3" /><circle cx="446" cy="265" r="3" /><circle cx="320" cy="95" r="3" /></g>
      <g stroke="#ACB49B"><path d="M232 175h-17m17 20h-17m17 20h-17m17 20h-17m17 20h-17M408 175h17m-17 20h17m-17 20h17m-17 20h17m-17 20h17" /></g>
    </svg>
  );
  if (kind === "memory") return (
    <svg className="project-visual" viewBox="0 0 640 430" fill="none" aria-hidden="true">
      <path d="m166 112 154 102 154-102M166 298l154-84 154 84" stroke="#9285B6" strokeWidth="1.5" />
      <rect x="259" y="177" width="122" height="74" rx="12" fill="#CEC9E4" stroke="#9B8BBA" />
      <g fill="#4E426D" fontFamily="var(--font-sans), sans-serif" textAnchor="middle"><text x="320" y="210" fontSize="16">Shared</text><text x="320" y="231" fontSize="16">context</text></g>
      {[{ name: "Codex", x: 90, y: 65 }, { name: "Claude Code", x: 398, y: 65 }, { name: "Cursor", x: 90, y: 251 }, { name: "OpenCode", x: 398, y: 251 }].map(({ name, x, y }, i) => (
        <g key={name} transform={`translate(${x} ${y})`}>
          <rect width="152" height="94" rx="10" fill="#ECE9F4" stroke="#A99FBD" />
          <text x="18" y="24" fill="#746687" fontFamily="ui-monospace, monospace" fontSize="10">0{i + 1}</text>
          <text x="18" y="48" fill="#44395D" fontFamily="var(--font-sans), sans-serif" fontSize="16">{name}</text>
          <path d="M18 67h100M18 77h65" stroke="#D0C9E0" strokeWidth="3" />
        </g>
      ))}
    </svg>
  );

  return (
    <svg className="project-visual" viewBox="0 0 640 430" fill="none" aria-hidden="true">
      <g transform="translate(110 -74) scale(.9)">
        <path d="m40 355 207-82 195 82-195 87Z" fill="#A7BDB7" stroke="#687F7B" />
        <path d="m40 355 207 87M247 273v169" stroke="#8BA49C" />
        <path d="m116 321 40-17 188 88-40 17Z" fill="#E8ECE3" stroke="#9AAE9D" />
        <path d="m60 328 67-26V165l-67 27Zm67-26 60 26V188l-60-23Z" fill="#829F99" stroke="#526F69" />
        <path d="m60 192 67-27 60 23-67 28Z" fill="#E6EEDB" stroke="#526F69" />
        <path d="m255 290 72-31V114l-72 30Zm72-31 62 27V139l-62-25Z" fill="#A5A1B9" stroke="#696781" />
        <path d="m255 144 72-30 62 25-72 28Z" fill="#E9E3F2" stroke="#696781" />
        <path d="m300 328 35-14 38 16-36 14Z" fill="#F3CDC1" stroke="#A67970" />
        <path d="m300 328v18l37 16v-18Zm37 16v18l36-15v-17Z" fill="#C89483" stroke="#A67970" />
        <path d="M79 228v56m24-66v57m163-86v68m25-78v68" stroke="#D5E2D8" strokeWidth="4" />
        <path d="m157 339 15 7m10 5 15 7m10 5 15 7m10 5 15 7" stroke="#607971" strokeWidth="2" />
      </g>
    </svg>
  );
}
