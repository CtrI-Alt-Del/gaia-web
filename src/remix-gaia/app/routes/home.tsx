import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New Gaia App" },
    { name: "description", content: "Welcome to Gaia!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
