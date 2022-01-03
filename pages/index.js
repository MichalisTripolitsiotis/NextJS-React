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


function HomePage() {
    return (
        <MeetupList meetups={DUMMY_MEETUPS} />
    );
}
export default HomePage;