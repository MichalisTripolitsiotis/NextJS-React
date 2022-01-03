import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A first meetup',
        image: 'https://thessaloniki.travel/wp-content/uploads/2021/09/DJI_0402-min-scaled.jpg',
        address: 'Some address 5, 12345, Thessaloniki',
        description: 'This is our first meetup',
    },
    {
        id: 'm2',
        title: 'A second meetup',
        image: 'https://media.timeout.com/images/105237758/image.jpg',
        address: 'Some address 5, 12345, Athens',
        description: 'This is our second meetup'
    }
]


function HomePage(props) {
    return (
        <MeetupList meetups={props.meetups} />
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
    // always return an object
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        // 10 seconds to be regenerated on server
        // in order not to be outdated.
        revalidate: 10
    };
}

export default HomePage;