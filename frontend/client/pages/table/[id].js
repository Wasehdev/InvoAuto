import axios from "axios";

export const getStaticPaths = async () => {
  const res = await axios.get("http://de0e-111-68-102-12.ngrok.io/tasks");

  // map data to an array of path objects with params (id)
  const paths = res.data.map((ninja) => {
    return {
      params: { id: ninja.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await axios.get("http://de0e-111-68-102-12.ngrok.io/tasks" + id);
  const data = res.data;
  console.log(data);

  return {
    props: { task: data },
  };
};

const Table = ({ task }) => {
  return (
    <div>
      <h1>{task.task_name}</h1>
      <p>{task.description}</p>
    </div>
  );
};

export default Table;
