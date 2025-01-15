import React from "react";

const SupplierIcon = ({selected} : {selected:boolean}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M16.8426 2.10886L13.6369 0.252441L7.75972 3.64832L13.6369 7.0442L19.514 3.64832L16.8426 2.10886ZM14.1802 7.97693L20.0573 4.58106V11.3728L14.1802 14.7687V7.97693ZM0.252563 16.6432V23.435C2.20859 24.5669 4.16462 25.6989 6.1297 26.8309V20.0391L0.252563 16.6432ZM7.21638 26.8218C9.17241 25.6898 11.1284 24.5579 13.0935 23.435V16.6432C11.1375 17.7752 9.18146 18.9071 7.21638 20.0391V26.8218ZM14.1802 16.6432V23.435L20.0573 26.8218V20.03L14.1802 16.6432ZM21.135 26.8218L27.0121 23.4259V16.6342L21.135 20.03V26.8218ZM13.0935 14.7687L7.21638 11.3728V4.58106L13.0935 7.97693V14.7687ZM20.5916 12.3146L14.7145 15.7105L20.5916 19.1064L26.4687 15.7105L20.5916 12.3146ZM12.5502 15.7014C10.5941 16.8334 8.62906 17.9653 6.67304 19.0973L0.795904 15.7014L6.67304 12.3055L12.5502 15.7014Z"
        fill="url(#paint0_linear_20826_3088)"
        fillOpacity={selected ? "1":"0.4"}
      />
      <defs>
        <linearGradient
          id="paint0_linear_20826_3088"
          x1="22.2003"
          y1="5.19848"
          x2="8.8175"
          y2="28.3782"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6E95EC" />
          <stop offset="1" stop-color="#1F4498" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SupplierIcon;
