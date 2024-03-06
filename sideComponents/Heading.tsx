import style from "./Heading.module.css";

const Heading: React.FC<{ title: string }> = (props) => {
  return (
    <div className={style.articleTitle}>
      <h2>{props.title}</h2>
    </div>
  );
};

export default Heading;
