"use client";

import { useRouter } from "next/navigation";
import Mach10MenuCore from "@/components/Mach10MenuCore";

export default function Mach10Menu() {
  const router = useRouter();

  return <Mach10MenuCore navigateTo={(href) => router.push(href)} />;
}
