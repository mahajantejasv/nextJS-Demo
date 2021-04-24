import React, { Fragment } from "react";
import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
const homePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title> Meetup List</title>
        <meta name="description" content="MeetUp Application"></meta>
      </Head>
      <MeetUpList meetups={props.meetups} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://testUser:testPassword@democluster.7km74.mongodb.net/meetups?retryWrites=true&w=majority",
	{ useUnifiedTopology: true }
  );
  const db = client.db();
  const meetUpsCollections = db.collection("meetups");
  let response = await meetUpsCollections.find().toArray();
  response = response.map((data) => ({
    id: data._id.toString(),
    title: data.title,
    image: data.image.toString(),
    address: data.address,
    description: data.description,
  }));
  client.close();
  console.log;
  return {
    props: {
      meetups: response,
    },
  };
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://testUser:testPassword@democluster.7km74.mongodb.net/meetups?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
  const dataBase = client.db();
  const meetUpsCollections = dataBase.collection("meetups");
  let result = await meetUpsCollections.find({}).toArray();
  client.close();
  return {
    fallback: false,
    paths: result.map((meeting) => ({
      params: { meetUpId: meeting._id.toString() },
    })),
  };
}

export default homePage;
