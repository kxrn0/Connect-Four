import SCPlayer from "./Player.styled";

export default function Player({ name, score, mode }) {
  return (
    <SCPlayer className={`${mode} bordered`}>
      <span className="pic"></span>
      <h3 className="heading-s">{name}</h3>
      <h1 className="heading-l">{score}</h1>
    </SCPlayer>
  );
}
