import { generateMetadata } from "@/lib/farcaster-embed";
import SlotMachine from "@/components/slot-machine";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center px-4">
      <SlotMachine />
    </main>
  );
}
