import { Link, Form, useLocation } from "react-router";
import type { ParameterDto } from "@/core/dtos/ParameterDto";
import { Input } from "@/ui/shadcn/components/input";
import { Button } from "@/ui/shadcn/components/button";
import { Badge } from "@/ui/shadcn/components/badge";
import { getParameterVisuals, getParameterTexts, palette } from "@/ui/telemetry/widgets/components/parameter-visuals";
import { Pencil, Power, Eye } from "lucide-react";

export type ParametersListPageProps = {
  items: ParameterDto[];
  nextCursor: string | null;
  prevCursor: string | null;
  limit: number;
  q: string;
};

function StatusPill({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-200">
      <span className="size-2 rounded-full bg-green-500" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-300">
      <span className="size-2 rounded-full bg-stone-500" />
      Inactive
    </span>
  );
}

export function ParametersListPage({
  items,
  nextCursor,
  prevCursor,
  limit,
  q,
}: ParametersListPageProps) {
  const { search } = useLocation();

  const urlWith = (patch: Record<string, string | null>) => {
    const p = new URLSearchParams(search);
    p.set("q", q ?? "");
    p.set("limit", String(limit));
    if (patch.cursor === null) p.delete("cursor");
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null) return;
      p.set(k, v);
    });
    return `?${p.toString()}`;
  };

  return (
    <section className="container mx-auto p-4 pt-16">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold">Parâmetros Meteorológicos</h1>
          <p className="text-sm text-stone-600">Filtro por nome • paginação por cursor</p>
        </div>

        <Form method="get" replace className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col">
            <label htmlFor="q" className="text-xs text-stone-600">Filtrar por nome</label>
            <Input id="q" name="q" defaultValue={q} placeholder="Ex.: Temperature" className="h-9 w-56" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="limit" className="text-xs text-stone-600">Itens por página</label>
            <select
              id="limit" name="limit" defaultValue={String(limit ?? 10)}
              className="h-9 rounded-md border border-stone-300 px-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 20, 50].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <Button type="submit" className="h-9">Aplicar</Button>
        </Form>
      </header>

      <div className="overflow-x-auto rounded-lg border border-stone-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-stone-50 text-stone-700">
            <tr>
              <th className="px-4 py-3 font-medium">NAME</th>
              <th className="px-4 py-3 font-medium">DESCRIPTION</th>
              <th className="px-4 py-3 font-medium">UNIT</th>
              <th className="px-4 py-3 font-medium">FACTOR</th>
              <th className="px-4 py-3 font-medium">OFFSET</th>
              <th className="px-4 py-3 font-medium">STATUS</th>
              <th className="px-4 py-3 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-stone-500">
                  Nenhum parâmetro encontrado.
                </td>
              </tr>
            )}

            {items.map((p) => {
              const { color, Icon } = getParameterVisuals(p.name);
              const styles = palette[color];
              const { description, category } = getParameterTexts(p.name);

              return (
                <tr key={p.id} className="border-t border-stone-200">
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex size-9 items-center justify-center rounded-xl ${styles.iconBg} ring-1 ${styles.iconRing}`}>
                        <Icon className="size-5" />
                      </span>
                      <div className="leading-tight">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-stone-500">Criado em {new Date(p.createdAt).toLocaleString("pt-BR")}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="text-stone-800">{description}</div>
                    <div className="text-xs text-stone-500">{category}</div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    <Badge color={color} className="capitalize">{p.unit}</Badge>
                  </td>

                  <td className="px-4 py-3 align-top tabular-nums">{p.factor}</td>

                  <td className="px-4 py-3 align-top tabular-nums">{p.offset}</td>

                  <td className="px-4 py-3 align-top">
                    <StatusPill active={p.active} />
                  </td>

                  <td className="px-4 py-3 align-top">
                    <div className="flex justify-end gap-3 text-sm">
                      <button type="button" className="inline-flex items-center gap-1 text-blue-700 hover:underline">
                        <Eye className="size-4" /> View
                      </button>
                      <button type="button" className="inline-flex items-center gap-1 text-stone-700 hover:underline">
                        <Pencil className="size-4" /> Edit
                      </button>
                      <button type="button" className="inline-flex items-center gap-1 text-red-700 hover:underline">
                        <Power className="size-4" /> {p.active ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <footer className="mt-4 flex items-center justify-between">
        <div className="text-xs text-stone-600">
          Mostrando até {limit} itens • Filtro: {q ? `"${q}"` : "nenhum"}
        </div>

        <nav className="flex items-center gap-2">
          <Link
            to={prevCursor ? urlWith({ cursor: prevCursor }) : "#"}
            aria-disabled={!prevCursor}
            className={`rounded-full border px-3 py-1.5 text-sm ${prevCursor ? "hover:bg-stone-50" : "pointer-events-none opacity-50"}`}
          >
            Anterior
          </Link>
          <Link
            to={nextCursor ? urlWith({ cursor: nextCursor }) : "#"}
            aria-disabled={!nextCursor}
            className={`rounded-full border px-3 py-1.5 text-sm ${nextCursor ? "hover:bg-stone-50" : "pointer-events-none opacity-50"}`}
          >
            Próxima
          </Link>
        </nav>
      </footer>
    </section>
  );
}
