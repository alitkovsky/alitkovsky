"use client";

import { Fragment } from "react";
import TextEffect from "@/components/TextEffect";
import LogoLoop from "@/components/LogoLoop";
import BookCTA from "@/components/BookCTA";
import ToolList from "@/components/ToolList";

import useLanguage from "@/hooks/useLanguage";

import {
  SiGoogleanalytics,
  SiHubspot,
  SiLinkedin,
  SiN8N,
  SiMake,
  SiZapier,
  SiSalesforce,
  SiShopify,
  SiShopware,
  SiAirtable,
  SiCalendly,
  SiBrevo,
  SiGoogleads,
  SiGoogletagmanager,
  SiMeta,
  SiWordpress,
  SiWoo,
  SiWhatsapp,
  SiSlack,
  SiDiscord,
  SiTwilio,
  SiMagento,
  SiMailchimp,
  SiWebflow,
  SiFramer,
  SiMatomo,
  SiLooker,
  SiTableau
} from "react-icons/si";

const ActiveCampaignLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 516 53"
    focusable="false"
    aria-hidden="true">
    <path fill="currentColor" d="M387.3 1.2h-3.5v3.5c0 .9.4 2 2.2 2h3.5V3.2c0-.8-.3-2-2.2-2Zm-.3 11.3h-2.8v28.9c0 1.2.8 2 1.9 2.1v.1h3.2v-29c-.1-1.3-.8-2.1-2.3-2.1ZM217.6 35.1c-1.2-1.2-2.7-.9-3.6-.1-3.7 3.1-7.1 4.3-11.5 4.3-8.8 0-15.8-7.4-15.8-16.9 0-9.5 6.8-16.8 15.8-16.8 4.3 0 7.9 1.3 11.3 4.2.8.7 2.2 1 3.2-.1.9-.9 1.8-1.9 1.8-1.9l.2-.2-.2-.2c-3.6-3.5-8.1-6.7-16.3-6.7-11.9 0-21.1 9.6-21.1 21.8 0 12.3 9 21.6 21 21.6 6.7 0 11.6-2.2 16.6-7.4l.1-.2-.1-.2c0 .2-.3-.2-1.4-1.2Zm76-23.3c-4.4 0-7.9 1.9-10.6 5.7-1.2-2.4-4-5.9-9.8-5.9-5 0-7.7 2.6-9.7 5.2v-2.2c0-1.5-.9-2.4-2.3-2.4h-2.8v31.1h2.8c1.4 0 2.2-.4 2.2-2.1V25.7c0-5.4 3.5-9.4 8.2-9.4 4.8 0 7.6 3.3 7.6 8.9v16c0 1.5.8 2.2 2.2 2.2h2.8V25.6c0-6.4 4.1-9.2 8.2-9.2 4.9 0 7.7 3.3 7.7 8.9v15.6c0 1.3.3 2.5 2.3 2.5h2.7V24.3c.1-7.7-4.3-12.5-11.5-12.5Zm36.1.1c-4.6 0-8.4 2-11.5 6.3V15c0-1.6-.9-2.4-2.5-2.4h-2.5v38.2c0 1.5.7 2.2 2.2 2.2h2.8V38.2c3.1 4 6.8 6 11.5 6 7.2 0 14.8-5.7 14.8-16.2s-7.6-16.1-14.8-16.1Zm9.6 16.1c0 6.8-4.3 11.5-10.5 11.5-5.3 0-10.8-4.4-10.8-11.6 0-7.2 5.5-11.6 10.8-11.6 5.2.1 10.5 4.1 10.5 11.7Zm82.9-13.3v2.6c-2.1-2.7-5.8-5.7-11.7-5.7-3.7 0-7.4 1.4-10.1 3.9-2.9 2.7-4.5 6.6-4.5 10.8 0 9.5 7.5 14.6 14.6 14.6 4.6 0 8.5-1.9 11.8-5.9v3c0 6.8-4 10.7-10.8 10.7-3.3 0-6.5-.8-9.5-2.5-.8-.5-1.4-.7-1.9-.7-.6 0-1.2.3-1.6 1-.8 1.3-1.1 1.9-1.1 1.9l-.1.2.2.1c4.1 2.9 8.8 4.3 14 4.3 10 0 15.8-5.5 15.8-15.1V12.4h-2.8c-.9 0-2.3.8-2.3 2.3Zm.3 11.9c0 6.4-5.6 10.2-11 10.2-5.9 0-10.3-4.4-10.3-10.2 0-5.9 4.4-10.1 10.3-10.1 5.3-.1 11 3.4 11 10.1Zm28.4-14.7c-4.4 0-7.8 1.8-10.2 5.4v-2.6c0-1.5-1.2-2.1-2.4-2.1h-2.8v31.1h5.1l-.1-17.8c0-5.5 3.7-9.3 9-9.3 5.2 0 8.2 3.3 8.2 9v16c0 1.5.7 2.1 2 2.1h3V24.3c.1-7.6-4.5-12.4-11.8-12.4Zm-87.6.1c-3.9 0-7.4.8-11.2 2.5l-.2.1.1.2s.5 1.4.9 2.4 1.6 1.1 2.5.7c2.6-1 4.9-1.5 7.5-1.5 5.7 0 8.8 2.9 8.8 8.1V32c0 4.7-4.2 8-10 8-3.6 0-7.5-1.8-7.5-5.8 0-3.8 3.1-5.9 8.7-5.9h2.5c1.5 0 2.2-.7 2.2-2.1v-1.7h-5.2c-8.5 0-13.3 3.6-13.3 9.8 0 4.7 3.6 9.9 11.7 9.9 4.4 0 8.1-1.7 10.8-4.9v2.1c0 1.4.7 2 2.2 2h2.8v-19c-.1-7.9-4.8-12.4-13.3-12.4Zm-125.9 0c-4.8 0-8.2 1.2-11.2 2.5l-.2.2.1.2s.5 1.4.9 2.4 1.6 1.1 2.5.7c2.6-1 4.9-1.5 7.5-1.5 5.7 0 8.9 2.9 8.9 8.1V32c0 4.7-4.2 8-10 8-3.6 0-7.4-1.8-7.4-5.8 0-3.8 3.1-5.9 8.6-5.9h2.5c1.5 0 2.2-.7 2.2-2.1v-1.7h-5.1c-8.5 0-13.4 3.6-13.4 9.8 0 4.7 3.6 9.9 11.6 9.9 4.4 0 8.1-1.7 10.9-4.9v2.1c0 1.4.7 2 2.1 2h2.8v-19c-.1-7.9-4.8-12.4-13.3-12.4Zm276.8 11.6c-.7-.6-29.2-20.5-30.5-21.3l-.4-.3v4.9c0 1.6.8 2.1 1.8 2.9l.2.1c1.4 1 21.7 15.1 24.4 17-2.7 1.9-23.3 16.2-24.6 17-1.6 1-1.7 1.7-1.7 3.1v4.7s30.3-21.1 30.9-21.6c1.4-1 1.7-2.3 1.7-3.1v-.6c0-1-.6-2-1.8-2.8Z" />
    <path fill="currentColor" d="M496.4 29.1c.8 0 1.6-.3 2.4-.9 1-.7 1.9-1.3 1.9-1.3l.3-.2-.3-.2c-.1-.1-13.4-9.3-14.8-10.2-.6-.5-1.4-.6-1.9-.3s-.9.8-.9 1.6v3.1l.1.1c.1.1 9.2 6.4 11 7.6.8.5 1.5.7 2.2.7ZM72.3 36.4c-1.1-1.1-2.5-.4-3.1.1-2.3 2.1-4.9 3.1-7.7 3.1-6.1 0-10.9-5.1-10.9-11.7 0-6.5 4.7-11.6 10.6-11.6 3.4 0 5.6 1.5 7.4 2.9 1.3 1.1 2.4 1.2 3.3.2.8-.8 1.7-1.8 1.7-1.8l.2-.2-.2-.2c-3.5-3.8-7.4-5.5-12.4-5.5-8.9 0-16 7.1-16 16.2 0 8.9 7.2 16.2 16 16.2 6.5 0 10.2-3.3 12.6-6.1h.2l-.2-.2s-.5-.4-1.5-1.4Zm33.2-35.2H102v3.5c0 .9.4 2 2.2 2h3.5V3.6c.1-1.4-.8-2.4-2.2-2.4Zm-.4 11.3h-2.9v28.9c0 1.2.8 2 1.9 2.1v.1h3.2v-29c.1-1.3-.7-2.1-2.2-2.1Zm32.9 1.7c-.4 1.1-8 19.5-9.5 22.9-1.4-3.5-9-21.9-9.4-22.9-.5-1.2-1.5-1.9-2.8-1.9h-3.6l.2.3c.1.4 12.2 28.3 12.7 29.4.5 1.3 1.3 1.6 2.6 1.6h.6c1.2 0 2-.5 2.5-1.6s12.6-28.8 12.7-29.1l.2-.4h-3.5c-1.3 0-2.2.5-2.7 1.7Zm31.3 12h-11.9c-1.3 0-2.1.8-2.1 2.1v2h.3c5.7-.1 12.3-.1 15-.1 1.6 0 2.8-.4 3.7-1.3.8-.9 1.2-2.3 1.1-3.9-.9-8-6.6-13.2-14.4-13.2-8.5 0-15 7-15 16.2 0 9.3 6.7 16.2 15.6 16.2 5.2 0 9.1-1.8 12.8-5.8l.2-.2-.2-.2s-.7-.6-1.5-1.3c-1.2-1-2.3-.6-2.9 0-2.2 2-4.9 3-8.2 3-5.7 0-9.9-4.1-10.6-10.2 0 0-.1-.7-.1-1.6 0-1 .1-1.7.1-1.7.6-6 4.6-10.2 9.7-10.2s8.8 3.4 9.3 8.6c.1.5 0 .9-.1 1.1-.3.4-.5.5-.8.5ZM25.5 2.8c-.6-1.2-1.3-1.6-2.6-1.6h-1.2c-1 0-1.9.6-2.4 1.5-.4.9-18 40.1-18.2 40.5l-.2.4h3.3c1.4 0 2.3-.6 3-2 .6-1.2 3.5-7.8 4-8.9h12.9c1.6 0 2.6-1 2.6-2.5V28H13.2l9.1-20.4c1.9 4.2 14.6 33.2 15.2 34.4.8 1.6 2.7 1.6 3.3 1.6h3l-.2-.4c0-.4-17.5-39.1-18.1-40.4Zm69.3 36.3c-.5-.3-1.2-.4-1.9-.2-1.1.3-1.9.5-2.9.5-3.2 0-4.9-1.6-4.9-4.9V17h9.7v-2.1c0-1.6-1.4-2.4-2.6-2.4H85V3.7c0-1.4-1-2.4-2.5-2.4H80v33.9c0 5.7 3.1 8.9 8.9 8.9 2.2 0 4.7-.5 6.3-1.3l.1-.1v-.1s.1-.9.1-2c.1-.8-.3-1.2-.6-1.5Z" />
  </svg>
);

const CookiebotLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 154 34"
    focusable="false"
    aria-hidden="true"
    fill="currentColor">
    <path d="M30.7,23.2v-12.5c0-1.6-.9-3.1-2.3-3.9L17.6.6c-1.4-.8-3.1-.8-4.5,0L2.3,6.8c-1.4.8-2.3,2.3-2.3,3.9v12.5c0,1.6.9,3.1,2.3,3.9l10.8,6.2c1.4.8,3.1.8,4.5,0l10.8-6.2c1.4-.8,2.3-2.3,2.3-3.9h0ZM11.2,23.1c0,.9-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7v-3.4c0-.9.7-1.6,1.6-1.6h1.2c.2,0,.5.2.5.4v4.6ZM17,23c0,.9-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7v-14.2c0-.9.7-1.6,1.6-1.6h1.2c.2,0,.5.2.5.5v15.4ZM22.8,23c0,.9-.8,1.7-1.7,1.7s-1.7-.8-1.7-1.7v-9.4c0-.9.7-1.6,1.6-1.6h1.2c.2,0,.5.2.5.5v10.6Z" />
    <g>
      <path fillRule="evenodd" d="M55.8,21.5c0,2.3-.4,3.5-1.5,4.4-1.1.9-2.9,1.5-5.5,1.5s-4.1-.5-5.2-1.3c-1.4-1.1-2-3.1-2-6.1v-1.3c0-2.9.6-4.6,1.9-5.9,1.2-1.1,2.8-1.6,5-1.6s2.4.3,3.2.8h0v-5.7c0-.6.2-.8.9-.8h2.1c.7,0,.9.2.9.8v15.2h0ZM51.8,17.1c0-1.3-.3-1.8-.7-2.2-.5-.4-1.1-.7-2.2-.7s-1.9.4-2.4.9c-.7.8-.8,1.8-.8,3.6v1c0,2,.2,3,.8,3.7.5.6,1.2.8,2.3.8s1.9-.2,2.4-.7.6-1.3.6-2.4v-4.2h0Z" />
      <path fillRule="evenodd" d="M69.3,25.8c-.6,1.1-1.7,1.6-3.7,1.6h-1.2c-1.7,0-2.8-.3-3.7-1-1-.8-1.4-2-1.4-3.6v-.7c0-1.7.4-2.9,1.4-3.7,1-.8,2.6-1.2,4.9-1.2h1.2c.6,0,1.3,0,1.9,0v-.9c0-.8-.2-1.3-.6-1.6-.5-.4-1.1-.4-2.3-.4s-2.8.2-4.1.6c-.5.2-.7,0-.8-.5l-.3-1.5c-.1-.5,0-.8.5-1,1.2-.4,3.3-.8,5-.8s3.7.3,4.8,1c1.2.8,1.7,1.9,1.7,4.2v10.1c0,.4-.2.6-.7.6h-1.5c-.5,0-.7-.2-.8-.6l-.2-.8h0ZM68.7,20.3c-.6,0-1.3,0-1.9,0h-1.2c-.8,0-1.4.1-1.7.4-.4.3-.5.8-.5,1.6v.4c0,.7.2,1.1.5,1.4.3.2.7.4,1.5.4h1.2c1.5,0,2.2-.7,2.2-2.1v-2h0Z" />
      <path d="M81.8,11.5h3.3c.6,0,.7.2.7.8v1.6c0,.5-.1.8-.7.8h-3.3v7c0,1.1,0,1.5.4,1.9.3.3.7.4,1.6.4h1.6c.7,0,.8.2.8.8v1.6c0,.6,0,.8-.8.8h-2.4c-1.9,0-3.1-.3-3.9-1-.9-.8-1.3-2-1.3-3.8v-7.6h-2c-.5,0-.7-.1-.7-.6v-1.4c0-.5.1-.6.5-.7l2.1-.4v-3.6c0-.6.2-.8.9-.8h2.1c.7,0,.9.2.9.8v3.5h0Z" />
      <g>
        <path fillRule="evenodd" d="M98.4,25.8c-.6,1.1-1.7,1.6-3.7,1.6h-1.2c-1.7,0-2.8-.3-3.7-1-1-.8-1.4-2-1.4-3.6v-.7c0-1.7.4-2.9,1.4-3.7,1-.8,2.6-1.2,4.9-1.2h1.2c.6,0,1.3,0,1.9,0v-.9c0-.8-.2-1.3-.6-1.6-.5-.4-1.1-.4-2.3-.4s-2.8.2-4.1.6c-.5.2-.7,0-.8-.5l-.3-1.5c-.1-.5,0-.8.5-1,1.2-.4,3.3-.8,5-.8s3.7.3,4.8,1c1.2.8,1.7,1.9,1.7,4.2v10.1c0,.4-.2.6-.7.6h-1.5c-.5,0-.7-.2-.8-.6l-.2-.8h0ZM97.8,20.3c-.6,0-1.3,0-1.9,0h-1.2c-.8,0-1.4.1-1.7.4-.4.3-.5.8-.5,1.6v.4c0,.7.2,1.1.5,1.4.3.2.7.4,1.5.4h1.2c1.5,0,2.2-.7,2.2-2.1v-2h0Z" />
        <path fillRule="evenodd" d="M109.8,12.4h0c.9-.8,2.2-1.2,4-1.2s3.6.5,4.6,1.6c1.1,1.2,1.5,3.2,1.5,5.9v1.3c0,2.8-.6,4.6-1.8,5.8-1.2,1.2-2.9,1.6-5.5,1.6s-3.6-.2-4.8-.9c-1.3-.8-2.1-2-2.1-4.6V6.3c0-.6.2-.8.9-.8h2.1c.7,0,.9.2.9.8v6.1h0ZM116,18.8c0-1.9,0-2.9-.6-3.7-.5-.6-1.3-.9-2.5-.9s-1.9.2-2.3.6c-.4.4-.7.9-.7,2.1v4.3c0,1.3.1,1.8.5,2.2.5.5,1.2.8,2.5.8s2-.3,2.5-.9c.5-.6.7-1.4.7-3.7v-1h0Z" />
        <path fillRule="evenodd" d="M135.4,13.1c1.2,1.3,1.7,3.4,1.7,5.8v1c0,2.5-.5,4.4-1.7,5.8-1.1,1.2-2.8,1.9-5.3,1.9s-4.2-.7-5.3-1.9c-1.2-1.3-1.7-3.3-1.7-5.8v-1c0-2.4.5-4.4,1.7-5.8,1.1-1.2,2.8-1.9,5.3-1.9s4.2.7,5.3,1.9ZM132.3,23.5c.6-.7.7-2,.7-3.9v-.7c0-2-.2-3.2-.7-3.9-.5-.6-1-.9-2.2-.9s-1.8.3-2.2.9c-.6.7-.7,1.9-.7,3.9v.7c0,2,.2,3.2.7,3.9.5.5,1,.9,2.2.9s1.8-.3,2.2-.9Z" />
      </g>
      <path d="M153.4,26.4c.2.4.2.7-.6.7h-2.7c-.7,0-.8-.1-1.1-.6l-2.4-5.1c-.2-.5-.3-.7-.5-.7h-.4c-.2,0-.3.3-.5.7l-2.5,5.1c-.2.5-.4.6-1.1.6h-2.7c-.7,0-.8-.4-.6-.7l3.9-7c.1-.2.1-.4,0-.6l-3.7-6.6c-.2-.4-.2-.7.6-.7h2.6c.7,0,.8.1,1.1.6l2.3,4.8c.2.4.3.6.5.6h.4c.2,0,.3-.2.5-.6l2.3-4.8c.3-.5.4-.6,1.1-.6h2.6c.7,0,.8.4.6.7l-3.8,6.6c-.1.2-.1.4,0 .6l3.9,7h0Z" />
    </g>
  </svg>
);

const KlaviyoLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 7340 2186"
    focusable="false"
    aria-hidden="true"
    fill="none">
    <path fill="currentColor" d="M4029.53 291.505c-.01-38.964 15.28-76.382 42.6-104.238s64.49-43.935 103.56-44.791c39.67.445 77.59 16.368 105.63 44.358s43.97 65.82 44.38 105.383c-.97 38.965-17.23 75.997-45.27 103.142-28.05 27.145-65.66 42.239-104.74 42.04-38.72-.225-75.79-15.672-103.15-42.988-27.37-27.316-42.82-64.295-43.01-102.906m1165.26 315.867c70.57 0 117.01 39.608 117.01 125.52 0 48.442-19.86 129.795-61.87 244.345-57.14 154.013-117.01 330.113-181.01 530.293-28.58-96.74-83.87-250.9-152.16-427.43l-58.58-162.418c-33.15-90.186-50.86-160.569-50.86-206.873 0-63.829 31-99.733 90.58-105.574V576.74h-501.62v28.495c68.44 6.553 123.58 70.382 196.45 264.148l317.74 838.467c42.01 109.99 37.58 209.01-13.14 299.2-37.58 79.21-88.3 118.82-150.16 118.82-77.15 0-117.01-33.05-117.01-101.3 0-26.36 50.86-79.21 50.86-129.79 0-70.39-55.15-103.44-117.01-103.44-85.72 0-142.87 59.41-142.87 149.6 2.14 132.07 114.3 244.34 264.88 244.34 77.15 6.56 139.01-33.05 180.88-68.24 26.57-19.81 59.57-88.05 77.29-120.96a498 498 0 0 0 33.15-81.5c15.43-37.47 24.28-68.25 30.86-88.05 6.57-19.8 19.85-52.86 35.28-103.44l35.29-112.27c95.01-294.92 185.74-552.37 271.46-770.217 50.86-125.378 116.44-199.465 149.58-215.564a194.3 194.3 0 0 1 57.15-19.804V576.74h-361.75zM1710.88 1648.44c-64.01-10.97-119.16-68.25-119.16-189.35V0l-364.17 79.217v30.774c61.72-6.553 123.58 48.442 123.58 165.129v1183.97c0 113.98-61.86 180.51-123.58 189.35-6 .99-11.86 1.71-17.43 2.13a195 195 0 0 1-92.16-16.24c-52.63-24.52-96.14-65.01-124.293-115.69l-168.588-268.85c-35.428-56.5-88.218-100.06-150.5-124.19a310.65 310.65 0 0 0-195.104-9.73l189.732-209.158C812.792 748.279 945.091 646.98 1070.96 605.235V576.74H653.777v28.495c108.153 41.745 101.581 134.211-22.002 279.536L364.749 1195.08V0L.572 79.218v30.774c61.863 0 123.583 61.692 123.583 169.546V1459.09c0 129.93-59.577 180.51-123.583 189.35v28.49h483.332v-28.49c-79.436-10.97-119.155-72.67-119.155-189.35v-217.85l103.725-113.98 251.595 411.47c59.577 99.73 114.297 138.63 203.02 138.63h839.221v-22.51s-23.43-2.14-51.43-6.41m1120.39 3.42v28.49s-247.74 89.19-322.6-61.83a303.7 303.7 0 0 1-31.29-128.23c-68.43 140.76-218.45 215.71-359.75 215.71-178.73 0-306.74-83.64-306.74-266.29.11-45.96 13.94-90.84 39.72-128.94 53-79.22 114.29-120.96 229.59-164.99 57.15-22.08 105.87-37.47 142.87-48.44s85.72-22.08 142.87-33.05l110.3-26.36V905.287c0-220.124-94.87-319.144-227.31-319.144-103.72 0-163.3 68.246-163.3 147.462 0 44.025 30.86 107.853 30.86 154.015 0 61.692-55.15 105.717-132.44 105.717-72.72 0-116.87-59.412-116.87-138.629 0-81.495 39.72-151.878 121.3-213.712 78.26-60.569 174.67-93.136 273.74-92.466 309.74 0 445.18 146.606 449.9 468.46v491.25c1.71 32.06 10.71 160.86 119.15 143.62m-353.89-581.59c-13.29 6.7-44.15 17.67-94.87 37.47l-101.58 37.48c-25.43 11.68-44.14 21.94-81.58 41.74a268.8 268.8 0 0 0-77.29 55c-37.36 42.11-59.14 95.7-61.72 151.87 0 129.94 70.58 200.32 178.73 200.32 55.15 0 108.16-22.08 158.87-63.82 53.01-41.89 79.44-101.3 79.44-173.82zm4086.11 56.99a569.7 569.7 0 0 1-41.53 221.68 570.9 570.9 0 0 1-124.34 188.37 543 543 0 0 1-179.75 125.31 544.3 544.3 0 0 1-214.79 44.18 544.3 544.3 0 0 1-214.8-44.18 542.8 542.8 0 0 1-179.74-125.31c-106.74-109.85-165.51-257.39-163.45-410.33a568.6 568.6 0 0 1 40.83-220.229 569.7 569.7 0 0 1 122.76-187.536c50.33-54.224 111.36-97.487 179.26-127.075a538.9 538.9 0 0 1 215.28-44.861 538.9 538.9 0 0 1 215.28 44.861c67.9 29.588 128.93 72.851 179.26 127.075a561.9 561.9 0 0 1 124.61 187.021 560.65 560.65 0 0 1 41.26 220.744zm-360.75-389.809c-43.72-85.485-101.3-134.923-168.45-148.458-136.58-27.356-257.16 112.555-302.17 335.101a1049 1049 0 0 0-14.28 303.046 835.9 835.9 0 0 0 83.29 291.07c43.72 85.49 101.29 135.07 168.44 148.46 136.59 27.5 260.74-118.54 306.03-343.22 38.44-188.07 19.29-416.738-72.86-585.999M4303.7 1459.09V576.597h-776.79v26.501c103.72 15.387 153.02 93.463 105.87 219.981-242.88 658.091-227.31 628.601-242.88 681.311-15.43-50.57-50.72-175.1-108.16-331.39-57.43-156.3-95.15-259.592-109.44-305.896-59.57-182.653-39.71-250.899 57.15-261.869V576.74h-503.76v28.495c75.15 15.387 141.3 101.299 196.45 255.315l77.29 200.32c84.87 216.28 184.59 515.05 218.02 616.2h167.3c53.87-156.72 269.89-781.614 298.75-845.158 31.14-72.377 66.58-127.23 106.15-165.128 40.37-38.764 93.85-61.03 149.87-62.404 0 0 121.3-5.272 121.3 116.829v737.881c0 123.38-59.58 180.51-121.3 189.35v28.49h481.05v-28.49c-64.01-8.84-116.87-65.97-116.87-189.35M6740.42 1500.99c-19.08-19.1-45.04-29.56-73.02-29.56-27.99 0-53.94 10.46-73.02 29.56-19.15 19.03-29.65 44.91-29.65 72.82s10.5 53.79 29.65 72.82c19.14 19.03 45.03 29.56 73.02 29.56 27.98 0 53.94-10.47 73.02-29.5 19.15-18.59 29.64-44.47 29.64-72.88 0-28.42-10.49-53.79-29.64-72.82m-73.02 155.47c-22.46 0-42.62-8.31-58.27-23.91-14.94-15.8-23.21-36.67-23.21-58.74 0-22.08 8.2-42.88 23.15-58.68 15.71-15.66 35.94-23.97 58.33-23.97s42.62 8.31 58.33 23.91c14.94 15.79 23.21 36.66 23.21 58.74 0 22.07-8.2 42.88-23.15 58.67-15.71 15.67-35.88 23.98-58.33 23.98z" />
    <path fill="currentColor" d="M6709.56 1554.02c0-18.96-13.74-29.56-36.76-29.56h-44.27v95.4h22.13v-34.44h15.52l22.58 34.44h24.81l-26.14-39.32c14.18-4.89 22.13-14.15 22.13-26.52m-39.88 14.59h-19.02v-26.51h19.02c10.62 0 16.79 4.88 16.79 13.25 0 8.82-5.72 13.26-16.79 13.26M6494.92 0h844.37L7172.7 288.37l166.59 288.227h-844.37z" />
  </svg>
);

const PipedriveLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 121 32"
    focusable="false"
    aria-hidden="true"
    fill="currentColor">
    <path d="M20.5,7.7c1.3,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3-2.3,1-2.3,2.3,1,2.3,2.3,2.3Z" />
    <path d="M22.6,8.8h-4.2v14.3h4.2v-14.3Z" />
    <path d="M87.7,7.7c1.3,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3-2.3,1-2.3,2.3,1,2.3,2.3,2.3Z" />
    <path d="M89.7,8.8h-4.2v14.3h4.2v-14.3Z" />
    <path d="M120.1,15.5c0-4.1-3.3-7-7.2-7s-7.6,3.1-7.6,7.5,3,7.5,7.6,7.5,6.5-2.4,7-5.1h-4c-.5,1.2-1.8,1.8-3.1,1.8-1.7,0-2.9-1-3.3-3.2h10.6v-1.4ZM109.6,14.3c.5-2.1,2-2.6,3.3-2.6s2.9.7,3.1,2.6h-6.4Z" />
    <path d="M102.2,8.8h4.3l-5.8,14.3h-4.4l-5.8-14.3h4.5l3.6,9.5,3.7-9.5Z" />
    <path d="M79.3,11.1c1-1.5,2.5-2.5,4.3-2.5s.7,0,1,.1v3.9c-.3,0-.7,0-1.1,0-2.7,0-4.1,2-4.1,4.8v5.8h-4.1v-10.5c0-.2,0-.3-.3-.3h-1.4v-3.5h3.6c1.5,0,2.2.7,2.2,2v.3Z" />
    <path d="M72.7,19.7c-.2,0-.3,0-.3-.3V5.1c0-1.4-.7-2.1-2.3-2.1h-3.6v3.5h1.3c.3,0,.3,0,.3.3v3.4c-.5-.7-2.1-1.6-4.1-1.6-4,0-7,3.1-7,7.5s2.8,7.5,6.9,7.5,3.9-1.1,4.5-2.1c0,.6.5,1.8,2,1.8h3.7v-3.5h-1.5ZM64.9,20c-2,0-3.5-1.5-3.5-4s1.5-4,3.5-4,3.4,2,3.4,3.9c0,3-1.8,4.1-3.4,4.1Z" />
    <path d="M56.3,15.5c0-4.1-3.3-7-7.2-7s-7.6,3.1-7.6,7.5,3,7.5,7.6,7.5,6.5-2.4,7-5.1h-4c-.5,1.2-1.8,1.8-3.1,1.8-1.7,0-2.9-1-3.3-3.2h10.6v-1.4ZM45.8,14.3c.5-2.1,2-2.6,3.3-2.6s2.9.7,3.1,2.6h-6.4Z" />
    <path d="M33.8,8.5c-2.3,0-4,1.2-4.6,2.3-.1-.6-.5-2-2.1-2h-3.5v3.5h1.4c.3,0,.3,0,.3.3v16.4h4.2v-7.4c.6,1,2.2,1.8,4.1,1.8,4.1,0,6.9-3,6.9-7.5,0-4.5-2.7-7.5-6.7-7.5ZM32.8,20c-2.3,0-3.3-2-3.3-4,0-3,1.8-4,3.4-4s3.5,1.6,3.5,4c0,2.8-1.9,4-3.5,4Z" />
    <path d="M17.4,16c0,4.4-2.9,7.5-6.9,7.5s-3.5-.8-4.1-1.8v1s0,6.3,0,6.3H2.2V12.6c0-.2,0-.3-.3-.3H.4v-3.5h3.5c1.6,0,2,1.4,2.1,2,.6-1.1,2.3-2.3,4.6-2.3,4,0,6.7,3,6.7,7.5ZM13.1,16c0-2.4-1.5-4-3.5-4s-3.4,1.1-3.4,4,1.1,4,3.3,4c1.7,0,3.5-1.2,3.5-4Z" />
  </svg>
);

const UsercentricsLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 218 30"
    focusable="false"
    aria-hidden="true">
    <g>
      <path d="m40.317 0.99805v21.34c0 1.6347 0.5019 2.5073 1.7399 2.5073 1.3161 0 1.7176-0.9941 1.7176-2.5073v-21.34h5.5095v20.992c0 4.965-2.3031 7.4227-7.3107 7.4227-5.0077 0-7.1379-2.3748-7.1379-7.4669v-20.948h5.4816z" fill="currentColor"></path>
      <path d="m56.948 20.387v1.944c0 1.8446 0.4629 2.7007 1.7008 2.7007 1.238 0 1.5503-1.2703 1.5503-2.5902 0-2.6455-0.5019-3.4131-3.3905-5.8045-3.1842-2.6731-4.8237-4.2581-4.8237-8.3837 0-4.1256 1.3384-7.6933 6.6974-7.6933 5.6936 0 6.5301 3.8439 6.5301 7.0527v1.6127h-5.1416v-1.6789c0-1.701-0.2844-2.5405-1.355-2.5405-1.0038 0-1.3272 0.85604-1.3272 2.4411 0 1.69 0.3122 2.5239 2.6488 4.3299 4.16 3.2364 5.6545 5.0589 5.6545 9.6705 0 4.6115-1.5112 8.0025-7.1379 8.0025-5.6266 0-6.9371-3.2253-6.9371-7.3784v-1.679h5.3311v-0.0055z" fill="currentColor"></path>
      <path d="m79.354 16.644h-5.833v7.6381h6.8368l-0.6525 4.7386h-11.632v-28.023h11.594v4.7662h-6.1453v6.1414h5.833v4.7386z" fill="currentColor"></path>
      <path d="m87.752 12.59h0.6748c1.8179 0 2.5596-0.5689 2.5596-3.1757v-1.3531c0-1.8778-0.3792-2.8166-2.3867-2.8166h-0.8477v7.3454zm-0.0111 4.247v12.183h-5.4371v-28.023h7.0598c4.7456 0 7.0878 2.0655 7.0878 6.9643v1.0107c0 3.993-1.6117 5.1804-2.8218 5.7493 1.7622 0.845 2.5875 2.1263 2.5875 6.0364 0 2.7062-0.0446 6.7986 0.1952 8.2677h-5.2642c-0.3513-1.2647-0.329-4.9153-0.329-8.4941 0-3.1535-0.3625-3.6893-2.4369-3.6893h-0.6413v-0.0055z" fill="currentColor"></path>
      <path d="m112.92 19.879v1.5187c0 3.5347-0.658 8.0523-7.144 8.0523-4.79 0-6.8698-2.5294-6.8698-7.6822v-13.741c0-4.8767 2.4538-7.4448 6.9868-7.4448 5.978 0 6.949 3.8936 6.949 7.5663v1.7618h-5.482v-2.3914c0-1.5409-0.334-2.3251-1.467-2.3251-1.132 0-1.483 0.73454-1.483 2.3251v14.818c0 1.4967 0.251 2.5184 1.483 2.5184 1.233 0 1.523-0.856 1.523-2.6399v-2.3306h5.509l-5e-3 -0.0055z" fill="currentColor"></path>
      <path d="m126.55 16.644h-5.838v7.6381h6.842l-0.652 4.7386h-11.638v-28.023h11.593v4.7662h-6.145v6.1414h5.838v4.7386z" fill="currentColor"></path>
      <path d="m129.5 29.021v-28.023h6.023c0.897 3.4186 3.736 16.116 3.959 17.342h0.134c-0.301-3.7279-0.497-8.8255-0.497-12.741v-4.6005h5.053v28.028h-6.079c-0.585-2.6675-3.68-17.165-3.864-18.065h-0.145c0.212 3.2971 0.379 8.8752 0.379 13.277v4.7883h-4.963v-0.0055z" fill="currentColor"></path>
      <path d="m150.18 5.7642h-4.121v-4.7662h13.701v4.7662h-4.149v23.257h-5.431v-23.257z" fill="currentColor"></path>
      <path d="m167.14 12.591h0.675c1.818 0 2.56-0.5689 2.56-3.1756v-1.3531c0-1.8778-0.379-2.8166-2.387-2.8166h-0.848v7.3454zm-0.016 4.247v12.183h-5.437v-28.023h7.059c4.746 0 7.088 2.0655 7.088 6.9643v1.0107c0 3.993-1.611 5.1804-2.822 5.7493 1.763 0.845 2.588 2.1263 2.588 6.0364 0 2.7062-0.045 6.7986 0.195 8.2677h-5.264c-0.351-1.2647-0.329-4.9153-0.329-8.4941 0-3.1535-0.363-3.6892-2.437-3.6892h-0.641v-0.0056z" fill="currentColor"></path>
      <path d="m184.23 0.99823h-5.437v28.028h5.437v-28.028z" fill="currentColor"></path>
      <path d="m201.22 19.879v1.5187c0 3.5346-0.658 8.0523-7.144 8.0523-4.79 0-6.87-2.5294-6.87-7.6822v-13.741c0-4.8766 2.454-7.4448 6.987-7.4448 5.978 0 6.949 3.8936 6.949 7.5663v1.7618h-5.482v-2.3914c0-1.5409-0.335-2.3251-1.467-2.3251s-1.483 0.73454-1.483 2.3251v14.818c0 1.4967 0.251 2.5184 1.483 2.5184 1.233 0 1.523-0.856 1.523-2.6399v-2.3306h5.509l-5e-3 -0.0055z" fill="currentColor"></path>
      <path d="m208.38 20.386v1.9441c0 1.8446 0.463 2.7006 1.701 2.7006s1.55-1.2702 1.55-2.5902c0-2.6454-0.502-3.4131-3.391-5.8045-3.184-2.673-4.823-4.2581-4.823-8.3836 0-4.1256 1.338-7.6933 6.697-7.6933 5.694 0 6.53 3.8439 6.53 7.0526v1.6127h-5.141v-1.6789c0-1.701-0.285-2.5405-1.355-2.5405-1.004 0-1.328 0.85603-1.328 2.4411 0 1.69 0.313 2.5239 2.649 4.3299 4.16 3.2364 5.655 5.0589 5.655 9.6705s-1.511 8.0026-7.138 8.0026-6.937-3.2254-6.937-7.3785v-1.679h5.331v-0.0055z" fill="currentColor"></path>
      <path d="m4.7715 4.8694v10.074c0 5.556 4.5616 10.074 10.172 10.074 5.6099 0 10.172-4.5176 10.172-10.074v-10.074h-20.343zm10.172 24.323c-7.9298 0-14.387-6.3899-14.387-14.249v-14.249h28.769v14.249c0 7.8534-6.4519 14.249-14.387 14.249h0.0056z" fill="currentColor"></path>
      <path d="m7.7402 12.621 4.2828 7.4558h4.8738l-4.2827-7.4558h-4.8739z" fill="currentColor"></path>
      <path d="m17.61 8.3635-5.6043 11.714h4.8682l5.61-11.714h-4.8739z" fill="currentColor"></path>
    </g>
  </svg>
);

// Custom inline SVG components to keep logos theme-aware via currentColor.
// We can remove the custom CmiLogo/EfsetLogo/TelcLogo if we are fully replacing with Tech Stack.

const systemToolLogos = [
  // Control Center
  { node: <SiHubspot />, title: "HubSpot", aspectRatio: "1 / 1" },
  // { node: <ActiveCampaignLogo />, title: "ActiveCampaign", aspectRatio: "9 / 1" },
  { node: <SiBrevo />, title: "Brevo", aspectRatio: "1 / 1" },
  { node: <KlaviyoLogo />, title: "Klaviyo", aspectRatio: "9 / 2" },
  { node: <SiN8N />, title: "n8n", aspectRatio: "1 / 1" },
  { node: <SiMake />, title: "Make.com", aspectRatio: "1 / 1" },
  { node: <SiZapier />, title: "Zapier", aspectRatio: "1 / 1" },
  { node: <SiAirtable />, title: "Airtable", aspectRatio: "1 / 1" },
  { node: <PipedriveLogo />, title: "Pipedrive", aspectRatio: "4 / 1" },
  { node: <SiSalesforce />, title: "Salesforce", aspectRatio: "1 / 1" },
  { node: <SiCalendly />, title: "Calendly", aspectRatio: "1 / 1" },
  { node: <SiWhatsapp />, title: "WhatsApp", aspectRatio: "1 / 1" },
  { node: <SiSlack />, title: "Slack", aspectRatio: "1 / 1" },
  { node: <SiDiscord />, title: "Discord", aspectRatio: "1 / 1" },
  { node: <SiTwilio />, title: "Twilio", aspectRatio: "1 / 1" },

  // Growth Engine
  { node: <SiShopify />, title: "Shopify", aspectRatio: "1 / 1" },
  { node: <SiShopware />, title: "Shopware", aspectRatio: "1 / 1" },
  { node: <SiWoo />, title: "WooCommerce", aspectRatio: "1 / 1" },
  { node: <SiMagento />, title: "Magento", aspectRatio: "1 / 1" },
  { node: <SiWordpress />, title: "WordPress", aspectRatio: "1 / 1" },
  { node: <SiMeta />, title: "Meta Ads", aspectRatio: "1 / 1" },
  { node: <SiLinkedin />, title: "LinkedIn Ads", aspectRatio: "1 / 1" },
  { node: <SiMailchimp />, title: "Mailchimp", aspectRatio: "1 / 1" },
  { node: <SiWebflow />, title: "Webflow", aspectRatio: "1 / 1" },
  { node: <SiFramer />, title: "Framer", aspectRatio: "1 / 1" },

  // Intelligence Hub
  { node: <SiGoogleanalytics />, title: "Google Analytics 4", aspectRatio: "1 / 1" },
  { node: <SiGoogletagmanager />, title: "Google Tag Manager", aspectRatio: "1 / 1" },
  { node: <CookiebotLogo />, title: "Cookiebot", aspectRatio: "4 / 1" },
  { node: <UsercentricsLogo />, title: "Usercentrics", aspectRatio: "4 / 1" },
  { node: <SiGoogleads />, title: "Google Ads", aspectRatio: "1 / 1" },
  { node: <SiMatomo />, title: "Matomo", aspectRatio: "1 / 1" },
  { node: <SiLooker />, title: "Looker Studio (Google Data Studio)", aspectRatio: "1 / 1" },
  { node: <SiTableau />, title: "Tableau", aspectRatio: "1 / 1" },
];

const VALUES_EFFECT_STYLE_PRESETS = Object.freeze({
  resultOneUnderline: Object.freeze({
    top: "-1.4em",
    width: "6ch",
    left: "5.25ch",
  }),
  resultTwoDashedSide: Object.freeze({
    top: "-0.72em",
  }),
  resultThreeEllipse: Object.freeze({
    height: "1.8em",
    top: "-0.4em",
    left: "-0.9ch",
    width: "6.4ch",
  }),
  resultFourUnderlineCurved: Object.freeze({
    top: "1em",
    left: "-0.3ch",
    width: "6.5ch",
  }),
  resultTwoEnDashed: Object.freeze({
    top: "0em",
    transform: "translateY(-1em)",
  }),
  resultsLabelArrow: Object.freeze({
    rotate: "-10deg",
    top: "0.925em",
    left: "110%",
    width: "3.4ch",
  }),
  expertiseLabelArrow: Object.freeze({
    rotate: "20deg",
    top: "0.525em",
    left: "auto",
    right: "-6ch",
    width: "5.4ch",
  }),
});

const VALUES_COPY = {
  de: {
    title: {
      transparent: "transparent",
      handsOn: "systematisch",
      eyeLevel: "skalierbar",
      local: "zukunftssicher",
    },
    description: "keine bauchgefühle, sondern infrastruktur. ich baue marketing-systeme, die funktionieren — egal ob du urlaub machst oder schläfst. von der daten-erfassung über crm-automatisierung bis hin zu profitablen kampagnen. mein 'tech stack' ist dein wettbewerbsvorteil.",
    label: "messbare effekte",
    results: [
      {
        counter: "bis zu +48%",
        counterLines: ["bis zu +48%", "mehr sichtbar"],
        title: "mehr sichtbar",
        subtitles: ["lokal top 3.", "stabil"],
        variant: "underline",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultOneUnderline,
          },
        },
      },
      {
        counter: "+35%",
        counterLines: ["+35%", "neukunden"],
        title: "neukunden",
        subtitles: ["bei fixem", "fixes budget"],
        variant: "dashedSide",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultTwoDashedSide,
          },
        },
      },
      {
        counter: "+25%",
        counterLines: ["+25%", "passende leads"],
        title: "passende leads",
        subtitles: ["hohe absicht.", "statt lead-spam", "die kaufen"],
        variant: "ellipseThin",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultThreeEllipse,
          },
        },
      },
      {
        counter: "-22%",
        counterLines: ["-22%", "prozessaufwand"],
        title: "prozessaufwand",
        subtitles: [""],
        variant: "underlineCurved",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultFourUnderlineCurved,
          },
        },
      },
    ],
    expertiseTitle: "mein system stack", // Changed from "meine zertifizierungen"
    toolsTitle: "meine werkzeuge", // This might be redundant if we merge everything. Let's keep one section for the Stack maruqee.
    logosLabel: "technologien",
    cta: {
      label: "ist dein stack bereit? lass uns reden",
      // label: "ist dein stack bereit?\nlass uns reden",
    },
  },
  en: {
    title: {
      transparent: "transparent",
      handsOn: "systematic",
      eyeLevel: "scalable",
      local: "future-proof",
    },
    description: "no gut feelings, just infrastructure. i build marketing systems that work — whether you're on vacation or sleeping. from data capture to crm automation to profitable campaigns. my 'tech stack' is your competitive advantage.",
    label: "it's a win win",
    results: [
      {
        counter: "up to +48%",
        counterLines: ["up to +48%", "more visibility"],
        title: "more visibility",
        subtitles: ["local search", "lifted"],
        variant: "underline",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultOneUnderline,
          },
        },
      },
      {
        counter: "+35%",
        counterLines: ["+35%", "new leads"],
        title: "new leads",
        subtitles: ["same cost", "budget fixed"],
        variant: "dashedSide",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultTwoDashedSide,
          },
        },
      },
      {
        counter: "+25%",
        counterLines: ["+25%", "high-fit leads"],
        title: "high-fit leads",
        subtitles: ["buyer intent.", "instead of spam", "that close"],
        variant: "ellipseThin",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultThreeEllipse,
          },
        },
      },
      {
        counter: "-22%",
        counterLines: ["-22%", "manual effort"],
        title: "manual effort",
        subtitles: [""],
        variant: "underlineCurved",
        counterEffectOverrides: {
          style: {
            ...VALUES_EFFECT_STYLE_PRESETS.resultFourUnderlineCurved,
          },
        },
      },
    ],
    expertiseTitle: "my system stack",
    toolsTitle: "my toolkit",
    logosLabel: "technologies",
    cta: {
      label: "is your stack ready?\nlet's talk",
    },
  },
};


export default function Values() {
  const { language } = useLanguage();

  const copy = VALUES_COPY[language] ?? VALUES_COPY.en;
  const fallbackCopy = VALUES_COPY.en;

  const titleCopy = copy.title ?? fallbackCopy.title;
  const description = copy.description ?? fallbackCopy.description ?? "";
  const resultsLabel = copy.label ?? fallbackCopy.label ?? "";
  const results = copy.results ?? fallbackCopy.results ?? [];
  const fallbackResults = fallbackCopy.results ?? [];
  const resultOne = results[0] ?? fallbackResults[0] ?? {};
  const resultTwo = results[1] ?? fallbackResults[1] ?? {};
  const resultThree = results[2] ?? fallbackResults[2] ?? {};
  const resultFour = results[3] ?? fallbackResults[3] ?? {};

  const renderSubtitles = (subtitles) => {
    if (!Array.isArray(subtitles) || subtitles.length === 0) return null;
    return (
      <p className="subtitle">
        {subtitles.map((subtitle, index) => (
          <Fragment key={index}>
            {subtitle}
            {index < subtitles.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    );
  };
  const expertiseTitle = copy.expertiseTitle ?? fallbackCopy.expertiseTitle ?? "my system stack";
  const logosLabel = copy.logosLabel ?? fallbackCopy.logosLabel ?? "Technologies";
  const ctaLabel = copy.cta?.label ?? fallbackCopy.cta?.label ?? "book a free call";

  return (
    <section className="section values" id="values">
      <div className="content">
        <div className="title">
          <h2>{titleCopy.transparent}</h2>
          <h2>{titleCopy.handsOn}</h2>
          <TextEffect
            as="h2"
            variant="ellipseBold"
            trigger="visible"
            visibilityRootMargin="0px 0px -25%"
            className="inline-block"
          >
            {titleCopy.eyeLevel}
          </TextEffect>
          <h2>{titleCopy.local}</h2>
        </div>
        <div className="main">
          <p className="description">
            {description}
          </p>
          <div className="results_subtitle">
            <TextEffect
              as="h3"
              variant="arrowDown"
              trigger="always"
              className="inline-block"
              effectOverrides={{
                style: {
                  ...VALUES_EFFECT_STYLE_PRESETS.resultsLabelArrow,
              }}}
            >
              {resultsLabel}
            </TextEffect>
          </div>
          <div className="results">
            <div className="result-effect result result--one">
              <div className="counter counter--one">
                {Array.isArray(resultOne.counterLines) && resultOne.counterLines[1] ? (
                  <>
                    <span className="counter-line">{resultOne.counterLines[0]}</span>
                    <TextEffect
                      variant={resultOne.variant}
                      trigger="visible"
                      className="counter-line counter-line--effect"
                      effectOverrides={resultOne.counterEffectOverrides}
                    >
                      {resultOne.counterLines[1]}
                    </TextEffect>
                  </>
                ) : (
                  <TextEffect
                    variant={resultOne.variant}
                    trigger="visible"
                    className="inline-block"
                    effectOverrides={resultOne.counterEffectOverrides}
                  >
                    {resultOne.counter}
                  </TextEffect>
                )}
              </div>
              <div className="subtitles">
                {renderSubtitles(resultOne.subtitles)}
              </div>
            </div>

            <div className="result-effect result result--two">
              <div className="counter counter--two">
                {Array.isArray(resultTwo.counterLines) && resultTwo.counterLines[1] ? (
                  <>
                    <span className="counter-line">{resultTwo.counterLines[0]}</span>
                    <TextEffect
                      variant={resultTwo.variant}
                      trigger="visible"
                      className="counter-line counter-line--effect"
                      effectOverrides={resultTwo.counterEffectOverrides}
                    >
                      {resultTwo.counterLines[1]}
                    </TextEffect>
                  </>
                ) : (
                  <TextEffect
                    variant={resultTwo.variant}
                    trigger="visible"
                    className="inline-block"
                    effectOverrides={resultTwo.counterEffectOverrides}
                  >
                    {resultTwo.counter}
                  </TextEffect>
                )}
              </div>
              <div className="subtitles">
                {renderSubtitles(resultTwo.subtitles)}
              </div>
            </div>

            <div className="result-effect result result--three">
              <div className="counter counter--three">
                <TextEffect
                  variant={resultThree.variant}
                  trigger="visible"
                  className="inline-block"
                  effectOverrides={resultThree.counterEffectOverrides}
                >
                  {resultThree.counter}
                </TextEffect>
              </div>
              <p className="title">{resultThree.title}</p>
              <div className="subtitles">
                {renderSubtitles(resultThree.subtitles)}
              </div>
            </div>

            <div className="result-effect result result--four">
              <div className="counter counter--four">
                <TextEffect
                  variant={resultFour.variant}
                  trigger="visible"
                  className="inline-block"
                  effectOverrides={resultFour.counterEffectOverrides}
                >
                  {resultFour.counter}
                </TextEffect>
              </div>
              <p className="title">{resultFour.title}</p>
              <div className="subtitles">
                {renderSubtitles(resultFour.subtitles)}
              </div>
            </div>
          </div>
        </div>

        <div className="tools">
          <ToolList />
        </div>

        <div className="results_subtitle">
            <TextEffect
              as="h3"
              variant="arrowDownRight"
              trigger="always"
              className="inline-block"
              effectOverrides={{
                style: {
                  ...VALUES_EFFECT_STYLE_PRESETS.expertiseLabelArrow,
              }}}
            >
              {expertiseTitle}
            </TextEffect>
          </div>
        <div className="logos clients-cards-groups">
          <div className="gradient-mask left is--visible"></div>
          <div className="gradient-mask right is--visible"></div>
          <LogoLoop
            logos={systemToolLogos}
            speed={30}
            direction="left"
            logoHeight={40}
            gap={60} // Increased gap for clarity
            hoverSpeed={0}
            className="clients-cards-group"
            scaleOnHover
            ariaLabel={logosLabel}
            renderItem={(item, itemIndex) => {
              // Simply render the icon, no button needed as we aren't opening a dialog anymore
              return (
                <div
                  className="client-card"
                  key={itemIndex}
                  title={item.title}
                  aria-label={item.title}
                >
                  <span className="client-logo" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.node}
                  </span>
                </div>
              );
            }}
          />
        </div>

        <div className="cta">
          <BookCTA label={ctaLabel} ctaLocation="values" />
        </div>
      </div>
    </section>
  );
}
