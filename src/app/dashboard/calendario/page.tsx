'use client'

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { listarDefesas } from "@/lib/supabase/functions-select";
import ModalDetalhesDefesa from "@/components/ModalDetalhesDefesa";
import { MembroBanca } from "@/lib/supabase/interfaces";

export default function CalendarioPage() {
  const { usuario } = useAuth();
  const [eventos, setEventos] = useState<
  {
    id: string
    title: string
    start: string
    allDay: boolean
    extendedProps: { local: string; horario: string; banca: MembroBanca[] }
  }[]>([]);
  const [defesaSelecionada, setDefesaSelecionada] = useState<{ local: string; horario: string; banca: any } | null>(null);

  useEffect(() => {
    async function carregar() {
      if (!usuario) return
      const defesas = await listarDefesas(usuario.id, usuario.perfil)

      const eventosFormatados = defesas.map((defesa) => (
        {
          id: defesa.id,
          title: `Defesa - ${defesa.status}`,
          start: defesa.data_defesa,
          allDay: true,
          extendedProps: { local: defesa.local_defesa, horario: defesa.horario_defesa, banca: defesa.banca_examinadora },

         }
      ))
      setEventos(eventosFormatados)
    }
    carregar()
  }, [usuario])

    return (
      <>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4 dark:text-slate-50"> Calendário de Defesas</h1>
          <FullCalendar 
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={eventos}
            locale="pt-br"
            height="auto"
            eventClick={(info) => {
              const { local, horario, banca } = info.event.extendedProps
              setDefesaSelecionada({ local, horario, banca })
            }}
            />
        </div>
        <ModalDetalhesDefesa
          isOpen={!!defesaSelecionada}
          onClose={() => setDefesaSelecionada(null)}
          local={defesaSelecionada?.local ?? ''}
          horario={defesaSelecionada?.horario ?? ''}
          banca={defesaSelecionada?.banca ?? []}
        />
      </>
      );
}