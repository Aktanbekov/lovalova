import { currentUser } from "@/lib/auth";
import { StartBookButton } from "./StartBookButton";
import type { Preset } from "./AuthForm";

export async function CreateButton({
  label = "Создать книгу",
  className = "btn btn-primary",
  preset,
}: {
  label?: string;
  className?: string;
  preset?: Preset;
}) {
  const user = await currentUser();
  return <StartBookButton signedIn={Boolean(user)} label={label} className={className} preset={preset} />;
}
