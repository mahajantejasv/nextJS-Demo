import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";
const newMeeting = () => {
  let router = useRouter();
  let createNewMeetUp = (meetupData) => {
    fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "content-type": "application/json" },
    })
      .then((response) => response.text()) // 1
      .then((json) => {
        // 2
        console.log("new meetup response :::: ", json);
        router.push("/");
      })
      .catch((error) => {
        // 3
        // handle error
      });
  };
  return (
    <Fragment>
      <Head>
        <title>Add new Meetup</title>
        <meta name="description" content="MeetUp Application"></meta>
      </Head>
      <NewMeetupForm
        onAddMeetup={(meetupData) => createNewMeetUp(meetupData)}
      />
    </Fragment>
  );
};
export default newMeeting;
