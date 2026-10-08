"use client";

import dynamic from "next/dynamic";

const KitchenForm = dynamic(() => import("@/components/KitchenForm"), { ssr: false });

export default function KitchenLoader(props) {
  return <KitchenForm {...props} />;
}