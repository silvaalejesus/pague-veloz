import { ItemsList } from "@/components/ItemList";
import { getAllCorretoras } from "@/services/corretoraService";
import { Typography } from "@mui/material";

export default async function Home() {
  const corretorasIniciais = await getAllCorretoras();

  if (!corretorasIniciais || corretorasIniciais.length === 0) {
    return (
      <main>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mt: 2 }}
        >
          Nenhuma corretora encontrada no momento.
        </Typography>
      </main>
    );
  }

  return (
    <main>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ mt: 2 }}
      >
        Lista de Corretoras
      </Typography>

      <ItemsList initialItems={corretorasIniciais} />
    </main>
  );
}
