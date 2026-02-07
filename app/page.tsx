import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { checkAndAddUser } from "./actions";

export default async function Home() {
  await checkAndAddUser();
  return (
    <div>
        <Header />
        <Hero />
        
    </div>
  );
}