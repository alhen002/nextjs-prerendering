import React from "react";
import type {
  GetServerSideProps,
  NextPage,
  GetServerSidePropsContext,
} from "next";

interface PageProps {
  id: string;
}

export default function UserIdPage(props: PageProps) {
  return <div>{props.id}</div>;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext,
) => {
  const { params } = context;
  const userId = params?.uid;

  console.log("SERVER SIDE CODE");
  return {
    props: {
      id: "userId-" + userId,
    },
  };
};
