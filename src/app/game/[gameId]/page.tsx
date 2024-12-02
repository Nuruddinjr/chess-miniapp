import { Game } from "@/screens/Game";
import { Layout } from "lucide-react";

export default function GamePage({
  params,
}: {
  params: { gameId: string | any };
}) {
  return (
    <Layout>
      {/* @ts-ignore */}
      <Game gameId={params.gameId} />
    </Layout>
  );
}
