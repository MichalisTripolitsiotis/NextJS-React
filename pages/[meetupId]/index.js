import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from "react";
import Head from 'next/head';

const MeetupDetails = (props) => {

    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                description={props.meetupData.description}
                address={props.meetupData.address}
            />
        </Fragment>
    )
};

// Describes all the dynamic segment values.
export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://root:<password>@cluster0.dc4zl.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    // fetch only the ids
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();
    return {
        // 'blocking' for production
        fallback: false,
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))
    }
}

// pre-generate the page for all IDs.
export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://root:<password>@cluster0.dc4zl.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    // fetch only the ids
    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId)
    });

    client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;