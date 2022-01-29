export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();

  const paths = data.map((task) => {
    return {
      params: {
        id: task.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:5000/tasks/${id}`);
  const data = await res.json();

  return {
    props: {
      task: data,
    },
  };
};

const Table = ({ task }) => {
  const { task_name, description, invoiceId } = task.task;
  const titles = task.label;
  return (
    <div>
      <h1>{task_name}</h1>
      <p>{description}</p>
      <h1>Labels</h1>
      <ul>
        {titles.map((label) => {
          return <li>{label.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Table;
