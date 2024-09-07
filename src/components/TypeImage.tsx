export default function TypeImage({
  type,
  height,
  width,
}: {
  type: { name: string; url: string };
  height?: number | string;
  width?: number | string;
}) {
  const typeId = type.url.split('/').slice(-2)[0];
  return (
    <img
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${typeId}.png`}
      alt={type.name}
      height={height}
      width={width}
      loading="lazy"
    />
  );
}
