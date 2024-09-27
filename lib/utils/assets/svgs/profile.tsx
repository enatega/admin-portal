import React from 'react';
import { IGlobalSVGProps } from '../../interfaces/svg.interface';

export function ProfileLogoSVG({
  width = '64',
  height = '71',
  strokeColor = '#1E1E1E',
  ...props
}: IGlobalSVGProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M31.735 0C14.2041 0 0 13.9954 0 31.2689C0 46.171 10.5941 58.6553 24.7745 61.7706L31.5698 70.3027L38.2944 61.8636C52.6636 58.8878 63.47 46.3105 63.47 31.2689C63.47 13.9954 49.2423 0 31.735 0ZM31.735 53.8662C19.0646 53.8662 8.80086 43.7532 8.80086 31.2689C8.80086 18.7846 19.0646 8.67159 31.735 8.67159C44.4054 8.67159 54.6691 18.7846 54.6691 31.2689C54.6691 43.7532 44.4054 53.8662 31.735 53.8662Z"
        fill={strokeColor}
      />
      <path
        d="M47.425 40.0331C48.9115 41.5674 48.8407 44.0085 47.3778 45.5429C46.1745 46.8215 44.8296 47.9607 43.3195 48.9139C39.9926 51.0527 36.0051 52.2849 31.758 52.3081C20.1258 52.3314 10.5227 43.0321 10.3576 31.5475C10.1924 19.7838 19.8191 10.2056 31.7109 10.2056C35.9107 10.2056 39.8039 11.3912 43.1071 13.4371C44.9475 14.5762 46.5756 15.9711 47.9677 17.5985C49.3834 19.2259 49.5013 21.6437 48.1328 23.2943C48.0856 23.3641 48.0149 23.4338 47.9441 23.5036C46.3396 25.1774 43.5554 24.9914 42.1162 23.1781C40.8656 21.6205 39.2848 20.365 37.4444 19.4816C35.6984 18.6679 33.7636 18.203 31.7109 18.203C25.6234 18.203 20.4797 22.2482 18.9461 27.7812C19.0876 28.5717 19.7719 29.1994 20.6449 29.2226L23.0516 29.3156C23.8774 29.3389 24.7032 29.1296 25.4346 28.7112L27.1807 27.665C28.5256 26.8513 30.0828 26.4328 31.6637 26.4328H43.1779C44.2397 26.4328 45.1127 27.293 45.1127 28.3392V29.3854H34.0939C33.9288 29.3854 33.8108 29.5016 33.8108 29.6643C33.8108 29.8038 33.9288 29.9433 34.0703 29.9433L45.0891 30.5943V32.7331L33.74 33.2213C33.4097 33.2446 33.4097 33.7095 33.74 33.7328L45.0655 34.128V34.1513C45.0655 35.2439 44.1689 36.1274 43.06 36.1506L30.13 36.3133C29.139 36.3366 28.1716 36.0344 27.3458 35.4764C26.2369 34.7557 24.9863 34.1513 23.2403 33.9188C21.6831 33.7095 20.1494 34.3372 19.1584 35.4997C20.8572 40.3353 25.3874 43.9388 30.7907 44.2875C33.0086 44.427 35.1085 44.0318 36.9961 43.2181C38.9781 42.3579 40.1106 41.7302 41.1488 40.4283C42.3521 38.9171 44.4756 38.4057 46.2217 39.2194C46.6936 39.4286 47.0947 39.6843 47.425 40.0331Z"
        fill={strokeColor}
      />
      <path
        d="M19.2031 35.5C19.1087 35.6162 19.0143 35.7325 18.9199 35.872L19.2031 35.5Z"
        fill={strokeColor}
      />
      <path
        d="M18.9199 27.3887C18.9199 27.5514 18.9199 27.6677 18.9435 27.7839L18.9199 27.3887Z"
        fill={strokeColor}
      />
    </svg>
  );
}