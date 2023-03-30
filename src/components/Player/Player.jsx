import SCPlayer from "./Player.styled";

export default function Player({ name, score }) {
  return (
    <SCPlayer>
      <h1 className="heading-l">{name}</h1>
      <h3 className="heading-s">{score}</h3>
    </SCPlayer>
  );
}
