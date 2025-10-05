import React from 'react';

export type IconName = 'plus' | 'edit' | 'trash' | 'calendar' | 'service' | 'accessibility' | 'contrast' | 'logout' | 'arrow-left' | 'arrow-right' | 'check' | 'font' | 'clock' | 'save' | 'close' | 'warning' | 'menu' | 'home' | 'settings';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  title?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size = 18, title, className, ...rest }) => {
  const common = {
    width: size,
    height: size,
    stroke: 'currentColor',
    fill: 'none' as const,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': title ? undefined : true,
    role: title ? 'img' : 'presentation'
  };

  let path: React.ReactNode = null;
  switch (name) {
    case 'plus': path = <path d="M12 5v14M5 12h14" />; break;
    case 'edit': path = <><path d="M11 4h-6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L13 14l-4 1 1-4 8.5-8.5Z" /></>; break;
    case 'trash': path = <><path d="m4 7 1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" /><path d="M3 7h18" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 7V4h6v3" /></>; break;
    case 'calendar': path = <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M3 11h18" /></>; break;
    case 'service': path = <><circle cx="12" cy="12" r="3" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="M12 3v3" /><path d="M12 18v3" /><path d="m5.6 5.6 2.1 2.1" /><path d="m16.3 16.3 2.1 2.1" /><path d="m18.4 5.6-2.1 2.1" /><path d="m7.7 16.3-2.1 2.1" /></>; break;
    case 'accessibility': path = <><circle cx="12" cy="4" r="2" /><path d="m18 19-3-9 5-2" /><path d="m6 19 3-9-5-2" /><path d="M12 7v4" /><path d="M9 21h6" /></>; break;
    case 'contrast': path = <><circle cx="12" cy="12" r="9" /><path d="M12 3v18" /></>; break;
    case 'logout': path = <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>; break;
    case 'arrow-left': path = <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>; break;
    case 'arrow-right': path = <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>; break;
    case 'check': path = <path d="m5 13 4 4L19 7" />; break;
    case 'font': path = <><path d="M4 20h16" /><path d="m6 16 6-12 6 12" /><path d="M8 12h8" /></>; break;
    case 'clock': path = <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>; break;
    case 'save': path = <><path d="M5 21h14a2 2 0 0 0 2-2V7.5L16.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" /><path d="M15 21v-8H9v8" /><path d="M9 3v5h6V3" /></>; break;
    case 'close': path = <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>; break;
    case 'warning': path = <><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /></>; break;
  case 'menu': path = <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>; break;
  case 'home': path = <><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10" /><path d="M9 21V9h6v12" /></>; break;
  case 'settings': path = <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9.4 19a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .69.4 1.31 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.69 0 1.31.4 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></>; break;
  }

  // viewBox expandido (-1  -1  26 26) dá margem para linecaps arredondados não serem cortados
  return (
    <svg
      viewBox="-1 -1 26 26"
      className={`icon ${className || ''}`}
      style={{ display: 'block' }}
      {...common}
      {...rest}
    >
      {title && <title>{title}</title>}
      {path}
    </svg>
  );
};
