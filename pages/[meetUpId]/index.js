import MeetUpDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
const meetupDetail = (props) => {
  console.log(props);
  return (
    <Fragment>
      <Head>
        <title> Meetup Details</title>
        <meta name="description" content="MeetUp Application"></meta>
      </Head>
      <MeetUpDetails
        id={props.id}
        title={props.title}
        image={props.image}
        address={props.address}
      />
    </Fragment>
  );
};

// export async function getStaticProps(context) {
// 	return {
// 		props: {
// 			id: '',
// 			title: '',
// 			image: '',
// 			address: '',
// 		}
// 	};
// }

export async function getServerSideProps(context) {
  const client = await MongoClient.connect(
    "mongodb+srv://testUser:testPassword@democluster.7km74.mongodb.net/meetups?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
  const db = client.db();
  console.log(
    "getServerSideProps :::: meetUpId :::: ",
    context.params.meetUpId
  );
  const meetUpsCollections = db.collection("meetups");
  let response = await meetUpsCollections.findOne({
    _id: ObjectId(context.params.meetUpId),
  });
  console.log("getServerSideProps :::: response :::: ", response);
  client.close();
  return {
    props: {
      id: response._id.toString(),
      title: response.title,
      image: response.image.toString(),
      address: response.address,
    },
  };
}

export default meetupDetail;
