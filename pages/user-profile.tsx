import { GetServerSidePropsContext } from "next";

function UserProfile(props: { username: string }) {
  return <h1>{props.username}</h1>;
}

export default UserProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;

  console.log(req);
  console.log(res);
  return {
    props: {
      username: "Max",
    },
  };
}
