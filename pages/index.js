import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React meetups</title>
                <meta name="description" content="Browse list of meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>

    );
}

/*
// Not run during build process like getStaticProps
// but on the server side after deployment on every incoming request.
// mainly used for authentication.
export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}
*/

// Prepare props for this page.
// async because waits to load data.
export async function getStaticProps() {
    // fetch data from api/db

    const client = await MongoClient.connect('mongodb+srv://root:<password>@cluster0.dc4zl.mongodb.net/meetups?retryWrites=true&w=majority');

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    // always return an object
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                // description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        // 10 seconds to be regenerated on server
        // in order not to be outdated.
        revalidate: 10
    };
}

export default HomePage;