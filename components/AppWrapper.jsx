"use client";

import useInitialPageLoad from "@/hooks/useInitialPageLoad";
import useTouchDetection from "@/hooks/useTouchDetection";

import Header from "@/components/Header";
import Nav from "@/components/Nav";
import Aside from "@/components/Aside";
import GridOverlay from "@/components/GridOverlay";

export default function AppWrapper({ children }) {
  useInitialPageLoad();
  useTouchDetection();

  return (
    <>
      <Header />
      <Nav />
      {children}
      <Aside />
      <GridOverlay />
    </>
  );
};