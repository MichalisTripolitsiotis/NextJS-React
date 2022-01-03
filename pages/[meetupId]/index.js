import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {

    return (
        <MeetupDetail
            image="https://thessaloniki.travel/wp-content/uploads/2021/09/DJI_0402-min-scaled.jpg" alt="A first meetup"
            title="A first meetup"
            description="Meetup description"
            address="my address"
        />
    )
};

// Describes all the dynamic segment values.
export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1'
                },
            },
            {
                params: {
                    meetupId: 'm2'
                }
            }
        ]
    }
}

// pre-generate the page for all IDs.
export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;
    console.log(meetupId);
    return {
        props: {
            id: meetupId,
            image: 'https://thessaloniki.travel/wp-content/uploads/2021/09/DJI_0402-min-scaled.jpg',
            title: 'First meetup',
            address: 'my address',
            description: 'Meetup description'
        }
    }
}

export default MeetupDetails;